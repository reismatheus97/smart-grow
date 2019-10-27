
<template>
  <v-container>
    <v-row align="center">
      <v-col offset="1" cols="10" align="center">
        <v-row justify="center">
          <v-col xs12 sm="2">
            <v-icon class="welcome-icon d-flex">
              fa-seedling
            </v-icon>
          </v-col>
          <v-col xs12 sm="6" align-self="center">
            <span class="d-flex" :class="isMobile ? 'display-2' : 'display-4'">
              SmartGrow
            </span>
          </v-col>
        </v-row>
        <v-divider class="mt-5"></v-divider>
        <v-row align="center" >
          <v-col sm="12" class="ma-auto pa-0">
            <v-row>
              <v-col>
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
                      fa-thermometer-half
                    </v-icon>
                    <div class="display-1">{{ temperature }}<span class="title font-weight-regular">ºC</span></div>
                  </div>
                </v-progress-circular>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col>
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
                      fa-tint
                    </v-icon>
                    <div>
                      {{ humidity }}<span class="title font-weight-regular">%</span>
                    </div>
                  </div>
                </v-progress-circular>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row align="center" >
          <v-col sm="3" class="ma-auto">
            <v-row class="my-5">
              <v-col>
                <transition name="fade">
                  <v-icon v-if="ledState" class="task__icon" color="yellow lighten-3">
                    fa-lightbulb
                  </v-icon>
                  <v-icon v-else class="task__icon">
                    far fa-lightbulb
                  </v-icon>
                </transition>
              </v-col>
            </v-row>
            <v-row>
              <div class="headline font-weight-light">
                Iluminação
              </div>
            </v-row>
            <v-row>
              <v-btn-toggle shaped mandatory color="green lighten-2">
                <v-btn class="button--grow" :disabled="loading" :input-value="!ledState" @change="toggleLED">
                  OFF
                </v-btn>
                <v-btn class="button--grow" :disabled="loading" :input-value="ledState" @change="toggleLED">
                  ON
                </v-btn>
              </v-btn-toggle>
            </v-row>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col sm="3" class="ma-auto">
            <v-row class="my-5">
              <v-col>
                <v-icon class="task__icon" :class="{ spinning: fanState }">
                  fa-fan
                </v-icon>
              </v-col>
            </v-row>
            <v-row>
              <div class="headline font-weight-light">
                Exaustão
              </div>
            </v-row>
            <v-row>
              <v-btn-toggle shaped mandatory color="green lighten-2">
                <v-btn class="button--grow" :disabled="loading" :input-value="!fanState" @change="toggleFAN">
                  OFF
                </v-btn>
                <v-btn class="button--grow" :disabled="loading" :input-value="fanState" @change="toggleFAN">
                  ON
                </v-btn>
              </v-btn-toggle>
            </v-row>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col sm="3" class="ma-auto">
            <v-row class="my-5">
              <v-col>
                <v-icon class="task__icon" :class="{ 'blue-grey--text text--lighten-1': wpState} ">
                  fa-shower
                </v-icon>
              </v-col>
            </v-row>
            <v-row>
              <div class="headline font-weight-light">
                Bomba d'água
              </div>
            </v-row>
            <v-row>
              <v-btn-toggle v-model="wpState" shaped mandatory color="blue lighten-2">
                <v-btn class="button--grow" :disabled="loading">
                  OFF
                </v-btn>
                <v-btn class="button--grow" :disabled="loading">
                  ON
                </v-btn>
              </v-btn-toggle>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
  .welcome-icon {
    font-size: 128px !important;
    color: #81C784 !important;
  }

  .task__icon {
    font-size: 110px !important;
    margin-bottom: 10px;

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

<script>
/* eslint-disable */
import http from '@/plugins/http'

export default {
  data: () => ({
    loading: false,
    ledState: 0,
    fanState: 0,
    wpState: 0
  }),
  computed: {
    isMobile () {
      return this.$vuetify.breakpoint.xsOnly
    },
    temperature () {
      return this.$store.state.temperature
    },
    humidity () {
      return this.$store.state.humidity
    }
  },
  methods: {
    toggleLoading () {
      this.loading = !this.loading
    },
    async toggleLED (value) {
      this.toggleLoading()
      try {
        const action = this.ledState ? "off" : "on"   // if LED is on, then turn LED off
        let res = await http.get(`/led/${action}`)
        console.log(`res >>`, res.data)
        this.ledState = Number(!this.ledState)
        this.$store.commit('SET_GROW_DATA', res.data)
        console.log("O estado do LED foi alterado!")
      } catch (error) {
        console.log(error)
        this.ledState = this.ledState
      } finally {
        this.toggleLoading()
      }
    },
    async toggleFAN (value) {
      this.toggleLoading()
      try {
        const action = this.fanState ? "off" : "on"   // if FAN is on, then turn FAN off
        let res = await http.get(`/fan/${action}`)
        console.log(`res >>`, res)
        this.fanState = Number(!this.fanState)
        console.log("O estado do FAN foi alterado!")
      } catch (error) {
        console.log(error)
      } finally {
        this.toggleLoading()
      }
    },
    async toggleWaterPump (value) {
      this.toggleLoading()
      try {
        const action = value ? "on" : "off"   // if value is 1, then turn FAN on
        let res = await http.get(`/water-pump/${action}`)
        console.log(`res >>`, res)
        this.wpState = Number(!value)
        console.log("O estado da Bomba d'agua foi alterado!")
      } catch (error) {
        console.log(error)
      } finally {
        this.toggleLoading()
      }
    },
  },
  // watch: {
  //   ledState: {
  //     handler (val, oldVal) {
  //       console.log("led val >>", val, oldVal, this.ledState)
  //       this.toggleLED(val)
  //     }
  //   },
  //   fanState (val) {
  //     console.log("fan val >>", val)
  //     this.toggleFAN(val)
  //   },
  //   wpState (val) {
  //     console.log("wp val >>", val)
  //     this.toggleWaterPump(val)
  //   }
  // }
};
</script>
