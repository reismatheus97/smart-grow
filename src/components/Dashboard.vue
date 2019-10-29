
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
                <v-icon v-if="Number(ledState)" class="task__icon" color="yellow lighten-3">
                  fa-lightbulb
                </v-icon>
                <v-icon v-else class="task__icon">
                  far fa-lightbulb
                </v-icon>
              </v-col>
            </v-row>
            <v-row>
              <div class="headline font-weight-light">
                Iluminação <v-switch v-model="ledState" inset color="green lighten-2" :loading="loading" class="d-inline-block"></v-switch>
              </div>
            </v-row>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col sm="3" class="ma-auto">
            <v-row class="my-5">
              <v-col>
                <v-icon class="task__icon" :class="{ spinning: Number(fanState) }">
                  fa-fan
                </v-icon>
              </v-col>
            </v-row>
            <v-row>
              <div class="headline font-weight-light">
                Exaustão <v-switch v-model="fanState" inset color="green lighten-2" :loading="loading" class="d-inline-block"></v-switch>
              </div>
            </v-row>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col sm="3" class="ma-auto">
            <v-row class="my-5">
              <v-col>
                <v-icon class="task__icon" :class="{ 'blue--text text--lighten-1': wpState} ">
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
              <v-switch v-model="fanState" inset color="blue lighten-2"></v-switch>
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
    await this.$store.dispatch(`getGrowData`)

    setInterval(async () => {
      this.toggleLoading()
      await this.$store.dispatch(`getGrowData`)
      this.toggleLoading()
    }, 8000)
  },
  data: () => ({
    loading: false
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
    },
    // soilHumidity () {
    //   return this.$store.state.soilHumidity
    // },
    ledState: {
      get () {
        return Number(this.$store.state.ledState)
      },
      set (val) { this.toggleComponent(val, "led") }
    },
    fanState: {
      get () { return Number(this.$store.state.fanState) },
      set (val) { this.toggleComponent(val, "fan") }
    },
    wpState: {
      get () { return this.$store.state.wpState },
      // async set (val) {
      //   await this.toggleComponent("on", "water-pump")
      //   setTimeout(() => {
      //     this.$store.commit('SET_WATER_PUMP', 1)
      //   }, 3000)
      // }
    }
  },
  methods: {
    toggleLoading () {
      this.loading = !this.loading
    },
    async toggleComponent (val, component) {
      this.toggleLoading()
      try {
        const action = val ? "on" : "off"                     // if val is on, then turn on
        let res = await http.get(`/${component}/${action}`)   // dinamically hits a component and its
        // console.log(`res >>`, res.data)
        this.$store.commit('SET_GROW_DATA', res.data)
      } catch (error) {
        console.log(error)
        this.$store.commit('SET_GROW_DATA', {
          temperature: 0,
          humidity: 30,
          ledState: 1,
          fanState: 1,
          waterPump: 0
        })
        // await this.$store.dispatch(`getGrowData`)
      } finally {
        this.toggleLoading()
      }
    },
  }
};
</script>


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