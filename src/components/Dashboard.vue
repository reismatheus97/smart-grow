<template>
  <v-container>
    <v-row align="center">
      <v-col offset="1" cols="10" align="center">
        <v-row justify="center">
          <v-col xs="12" sm="2">
            <v-icon class="welcome-icon d-flex">
              mdi-sprout
            </v-icon>
          </v-col>
          <v-col xs12 sm="6" align-self="center">
            <span class="d-flex" :class="isMobile ? 'display-3 justify-center pb-9' : 'display-4'">
              SmartGrow
            </span>
          </v-col>
        </v-row>
        <v-divider v-if="!isMobile" class="mt-5"></v-divider>
        <v-row align="center" class="flex-column flex-sm-row">
          <v-col sm="12" class="ma-auto pa-0">
            <v-row class="flex-sm-row flex-wrap" justify="center">
              <v-col sm="5" md="3">
                <v-progress-circular
                  :rotate="-90"
                  :size="200"
                  :width="12"
                  :value="temperature * 2"
                  color="orange lighten-1"
                  class="my-3"
                >
                  <div class="display-1">
                    <v-icon class="task__icon--progress my-4">
                      mdi-thermometer
                    </v-icon>
                    <div class="display-1">{{ temperature }}<span class="title font-weight-regular">ºC</span></div>
                  </div>
                </v-progress-circular>
              </v-col>
              <v-divider v-if="!isMobile" vertical></v-divider>
              <v-col sm="5" md="3">
                <v-progress-circular
                  :rotate="-90"
                  :size="200"
                  :width="12"
                  :value="humidity"
                  color="primary"
                  class="my-3"
                >
                  <div class="display-1">
                    <v-icon class="task__icon--progress my-3">
                      mdi-water
                    </v-icon>
                    <div>
                      {{ humidity }}<span class="title font-weight-regular">%</span>
                    </div>
                  </div>
                </v-progress-circular>
              </v-col>
              <v-divider v-if="!isMobile" vertical></v-divider>
              <v-col sm="5" md="3">
                <v-progress-circular
                  :rotate="-90"
                  :size="200"
                  :width="12"
                  :value="soilHumidity"
                  color="primary lighten-1"
                  class="my-3"
                >
                  <div class="display-1">
                    <v-icon class="task__icon--progress my-4">
                      mdi-cup-water
                    </v-icon>
                    <div>
                      {{ soilHumidity }}<span class="title font-weight-regular">%</span>
                    </div>
                  </div>
                </v-progress-circular>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider v-if="!isMobile"></v-divider>
        <v-row align="center" class="flex-column flex-sm-row">
          <v-col sm="3" class="ma-auto">
            <v-row class="my-5">
              <v-col class="task__icon--container">
                <div>
                  <transition name="fade-transition">
                    <v-icon v-if="Number(ledState)" class="task__icon" color="yellow lighten-3">
                      mdi-lightbulb-on
                    </v-icon>
                    <v-icon v-else class="task__icon">
                      mdi-lightbulb-outline
                    </v-icon>
                  </transition>
                </div>
                <v-switch v-model="ledState" inset color="green accent-2" readonly :loading="loading" class="d-inline-block"></v-switch>
              </v-col>
            </v-row>
            <v-row>
              <div class="headline py-2">Iluminação</div>
              <v-btn-toggle>
                <v-btn class="task__btn" @click="toggleComponent('off', 'led')">
                  OFF
                </v-btn>
                <v-btn class="task__btn" @click="toggleComponent('on', 'led')">
                  ON
                </v-btn>
              </v-btn-toggle>
            </v-row>
          </v-col>
          <v-divider v-if="!isMobile" vertical></v-divider>
          <v-col sm="3" class="ma-auto">
            <v-row class="my-5">
              <v-col class="task__icon--container">
                <div>
                  <transition name="fade-transition">
                    <v-icon v-if="Number(fanState)" class="task__icon" :class="{ spinning: Number(fanState) }">
                      mdi-fan
                    </v-icon>
                    <v-icon v-else class="task__icon">
                      mdi-fan-off
                    </v-icon>
                  </transition>
                </div>
                <v-switch v-model="fanState" inset color="green accent-2" readonly :loading="loading" class="d-inline-block"></v-switch>
              </v-col>
            </v-row>
            <v-row px-2>
              <div class="headline py-2">Exaustão</div>
              <v-btn-toggle>
                <v-btn class="task__btn" @click="toggleComponent('off', 'fan')">
                  OFF
                </v-btn>
                <v-btn class="task__btn" @click="toggleComponent('on', 'fan')">
                  ON
                </v-btn>
              </v-btn-toggle>
            </v-row>
          </v-col>
          <v-divider v-if="!isMobile" vertical></v-divider>
          <v-col sm="3" class="ma-auto">
            <v-row class="my-5">
              <v-col class="task__icon--container">
                <div class="mb-5">
                  <transition name="fade-transition">
                    <v-icon v-if="Number(wpState)" class="task__icon" :class="{ flash: Number(wpState) }">
                      mdi-water-pump
                    </v-icon>
                    <v-icon v-else class="task__icon">
                      mdi-water-pump-off
                    </v-icon>
                  </transition>
                </div>
                <!-- <v-switch v-model="wpState" inset color="green accent-2" readonly :loading="loading" class="d-inline-block"></v-switch> -->
              </v-col>
            </v-row>
            <v-row>
              <div class="headline py-2 d-inline-block text-truncate">Irrigação</div>
              <v-btn-toggle>
                <v-btn class="task__btn" @click="pulseWaterPump()">
                  PULSAR
                </v-btn>
              </v-btn-toggle>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
import http from '@/plugins/http'

export default {
  async mounted () {
    this.$store.commit('TOGGLE_APP_LOADING')
    await this.timeout(3000);
    await this.$store.dispatch(`getGrowData`)
    this.$store.commit('TOGGLE_APP_LOADING')

    setInterval(async () => {
      this.toggleLoading()
      await this.$store.dispatch(`getGrowData`)
      this.toggleLoading()
    }, 15000)
  },
  data () {
    return { wpState: false }
  },
  computed: {
    isMobile () {
      return this.$vuetify.breakpoint.xsOnly
    },
    loading () {
      return this.$store.state.loading
    },
    temperature () {
      return this.$store.state.temperature
    },
    humidity () {
      return this.$store.state.humidity
    },
    soilHumidity () {
      return this.$store.state.soilHumidity
    },
    ledState: {
      get () {
        return Number(this.$store.state.ledState)
      },
    },
    fanState: {
      get () { return Number(this.$store.state.fanState) },
    },
  },
  methods: {
    timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    toggleLoading () {
      this.$store.commit('TOGGLE_LOADING')
    },
    async toggleComponent (action, component) {
      this.toggleLoading()
      try {
        let res = await http.get(`/${component}/${action}`)   // dinamically hits a component and its
        console.log(`res >>`, res.data)
        this.$store.commit('SET_GROW_DATA', res.data)
      } catch (error) {
        console.log(error)
        await this.$store.dispatch(`getGrowData`)
      } finally {
        this.toggleLoading()
      }
    },
    async pulseWaterPump () {
      this.wpState = true
      try {
        http.get(`/water-pump/on`)
      } catch (error) {
        console.error("Fail on /water-pump", error)
      } finally {
        await this.timeout(5000)
        this.wpState = false
      }
    }
  }
};
</script>


<style lang="scss">
  .welcome-icon {
    font-size: 128px !important;
    color: #81C784 !important;
  }

  .v-btn:before {
    background-color: unset !important;
  }

  .v-input--selection-controls__ripple {
    cursor: unset !important;
  }

  .v-input--selection-controls__input > input {
      cursor: unset !important;
  }

  .task {
    &__btn > .v-btn:focus::before {
      background-color: unset !important;
    }

    &__btn {
      display: flex !important;
      flex-grow: 1 !important;
      background-color: rgb(49, 49, 49) !important;
    }

    &__btn:hover {
      transform: scale(1.02) !important;
    }
  }

  .task__icon {
    font-size: 110px !important;
    margin-bottom: 20px;
    display: block !important;

    &--container {
      max-height: 165px !important;

      & > div {
        height: 125px;
      }
    }

    &--progress {
      font-size: 75px !important;
      color: inherit !important;
    }
  }

  .button--grow {
    flex-grow: 1 !important;
  }

  .v-item-group {
    width: 100%;
  }

  .spinning {
    animation-name: spin;
    animation-duration: 3000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
  }
</style>