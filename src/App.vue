<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>SmartGrow</span>
        <!-- <span class="font-weight-light"></span> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/reismatheus97/smart-grow"
        target="_blank"
      >
        <span class="mr-2">v0.0.1</span>
      </v-btn>
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
  data: () => ({
    //
  }),
};
</script>
