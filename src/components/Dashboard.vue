
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
                  :width="15"
                  :value="50"
                  color="orange lighten-1"
                  class="my-3"
                >
                  <div class="display-1">
                    <v-icon class="task__icon--progress my-4">
                      fa-thermometer-half
                    </v-icon>
                    <div class="display-1">50<span class="title font-weight-regular">ºC</span></div>
                  </div>
                </v-progress-circular>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col>
                <v-progress-circular
                  :rotate="-90"
                  :size="200"
                  :width="15"
                  :value="50"
                  color="primary"
                  class="my-3"
                >
                  <div class="display-1">
                    <v-icon class="task__icon--progress my-3">
                      fa-tint
                    </v-icon>
                    <div>
                      50<span class="title font-weight-regular">%</span>
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
                <v-icon class="task__icon">
                  fa-lightbulb
                </v-icon>
                <!-- <liquid-gauge :value=90></liquid-gauge> -->
                <!-- LED OFF -->
                <!-- <v-icon class="task__icon">
                  far fa-lightbulb
                </v-icon> -->
              </v-col>
            </v-row>
            <v-row>
              <div class="headline font-weight-light">
                Main LED
              </div>
              <v-tabs v-model="ledState" fixed-tabs color="green lighten-2">
                <v-tabs-slider></v-tabs-slider>
                <v-tab href="#led-1" @click="turnLEDOn" class="body-1 font-weight-bold" :class="{'v-tab--active': ledState}">
                  ON
                </v-tab>
                <v-tab href="#led-0" @click="turnLEDOn" class="body-1 font-weight-bold" :class="{'v-tab--active': !ledState}">
                  OFF
                </v-tab>
              </v-tabs>
            </v-row>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col sm="3" class="ma-auto">
            <v-row class="my-5">
              <v-col>
                <v-icon class="task__icon spinning">
                  fa-fan
                </v-icon>
              </v-col>
            </v-row>
            <v-row>
              <div class="headline font-weight-light">
                Main FAN
              </div>
              <v-tabs v-model="fanState" fixed-tabs color="green lighten-2">
                <v-tabs-slider></v-tabs-slider>
                <v-tab href="#mobile-tabs-5-1" @click="turnFANOn" class="body-1 font-weight-bold">
                  ON
                </v-tab>
                <v-tab href="#mobile-tabs-5-3" @click="turnFANOff" class="body-1 font-weight-bold">
                  OFF
                </v-tab>
              </v-tabs>
            </v-row>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col sm="3" class="ma-auto">
            <v-row class="my-5">
              <v-col>
                <v-icon class="task__icon">
                  fa-shower
                </v-icon>
              </v-col>
            </v-row>
            <v-row>
              <div class="headline font-weight-light">
                Water Pump
              </div>
              <v-tabs fixed-tabs color="green lighten-2">
                <v-tabs-slider></v-tabs-slider>
                <v-tab :v-model="false" href="#mobile-tabs-5-1" @click="turnFANOn" class="body-1 font-weight-bold">
                  ON
                </v-tab>
                <v-tab :v-model="true" href="#mobile-tabs-5-3" @click="turnFANOff" class="body-1 font-weight-bold">
                  OFF
                </v-tab>
              </v-tabs>
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

  .spinning {
    animation-name: spin;
    animation-duration: 2000ms;
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

export default {
  data: () => ({
    ledState: 0,
    fanState: 0,
    wpState: 1
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
    async turnLEDOn () {
      try {
        this.ledState = !this.ledState
        // await fetch ('http://192.168.0.125/26/on')
        // alert("LED ligado!")
      } catch (error) {
        // alert("Ocorreu um erro!")
        console.log(error)
      }
    },
    async turnFANOn () {
      try {
        await fetch ('http://192.168.0.125/27/on')
        console.log("FAN ligado!")
      } catch (error) {
        // alert("Ocorreu um erro!")
        console.log(error)
      }
    },
    async turnFANOn () {
      try {
        await fetch ('http://192.168.0.125/27/on')
        console.log("FAN ligado!")
      } catch (error) {
        // alert("Ocorreu um erro!")
        console.log(error)
      }
    }
  }
};
</script>
