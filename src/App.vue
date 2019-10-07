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
      <v-system-bar color="transparent">
        <div class="flex-grow-1"></div>
        <v-icon>mdi-wifi-strength-4</v-icon>
        <span>12:30</span>
      </v-system-bar>
    </v-app-bar>

    <v-content>
      <dashboard/>
    </v-content>
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
};
</script>
