<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <v-icon class="my-icon">
          fa-seedling
        </v-icon>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-1 font-weight-bold mb-3">
          Welcome to SmartGrow UI
        </h1>
        <v-divider class="mt-3"></v-divider>
      </v-flex>

      <v-flex 
        xs12
        mb-5
      >
        <div class="headline font-weight-bold justify-center">Tasks</div>    
      </v-flex>
      <v-flex
        xs12
        sm6
        mb-5
      >
        <v-btn block class="green lighten-2 my-2" @click="turnLEDOn">Turn LED on</v-btn>
      </v-flex>
      <v-flex
        xs12
        sm6
        mb-5
      >
        <v-btn block class="red lighten-2 my-2" @click="turnLEDOff">Turn LED off</v-btn>
      </v-flex>

      <v-flex
        xs12
        sm6
        mb-5
      >
        <v-btn block class="green lighten-2 my-2" @click="turnFANOn">Turn FAN on</v-btn>
      </v-flex>
      <v-flex
        xs12
        sm6
        mb-5
      >
        <v-btn block class="red lighten-2 my-2" @click="turnFANOff">Turn FAN off</v-btn>
      </v-flex>
    </v-layout>	      
  </v-container>
</template>

<style>
  .my-icon {
    font-size: 128px !important;
    color: #81C784 !important;
  }
</style>

<script>
export default {
  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com',
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer',
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/layout/pre-defined',
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
      },
    ],
  }),
  methods: {
    turnLEDOn () {
      let a = async () => {
        try {
          await fetch ('http://192.168.0.125/26/on')
          alert("LED ligado!")
        } catch (error) {
          // alert("Ocorreu um erro!")          
          console.log(error)
        }
      }
      a()
    },
    turnLEDOff () {
      let a = async () => {
        try {
          await fetch ('http://192.168.0.125/26/off')
          alert("LED ligado!")
        } catch (error) {
          // alert("Ocorreu um erro!")          
          console.log(error)
        }
      }
      a()
    },
    turnFANOn () {
      let a = async () => {
        try {
          await fetch ('http://192.168.0.125/27/on')
          alert("LED ligado!")
        } catch (error) {
          // alert("Ocorreu um erro!")          
          console.log(error)
        }
      }
      a()
    },
    turnFANOff () {
      let a = async () => {
        try {
          await fetch ('http://192.168.0.125/27/off')
          alert("LED ligado!")
        } catch (error) {
          // alert("Ocorreu um erro!")          
          console.log(error)
        }
      }
      a()
    }
  }
};
</script>
