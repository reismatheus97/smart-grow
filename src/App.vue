<template>
  <v-app>
    <v-app-bar app>
      <v-btn
        text
        href="https://github.com/reismatheus97/smart-grow"
        target="_blank"
      >
        <span class="mr-2">SmartGrow v0.0.1</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-system-bar dense color="transparent">
        <div class="flex-grow-1"></div>
        <!-- <v-icon>mdi-wifi-strength-4</v-icon> -->
        <span>{{ currentDate }}</span>
      </v-system-bar>
    </v-app-bar>

    <v-content>
      <dashboard/>
    </v-content>
    <v-overlay :value="appLoading" opacity="0.90" class="text-center">
      <v-progress-circular indeterminate size="300" width="8" color="green">
        <h3 class="display-1 my-12">
          Sincronizando...
        </h3>
      </v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import Dashboard from './components/Dashboard';

export default {
  name: 'App',
  components: {
    dashboard: Dashboard,
  },
  created () {
    this.$vuetify.theme.dark = true
  },
  computed: {
    currentDate () {
      return this.$store.state.currentDate
    },
    appLoading () {
      return this.$store.state.appLoading || false   
    }
  }
};
</script>
