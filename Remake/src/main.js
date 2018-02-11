// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import firebase from 'firebase';

Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyA2RncOjv4KIM43y7qTlr79Pqg3GkeXyNQ",
  authDomain: "basketball-lineup.firebaseapp.com",
  databaseURL: "https://basketball-lineup.firebaseio.com",
  projectId: "basketball-lineup",
  storageBucket: "basketball-lineup.appspot.com",
  messagingSenderId: "890404077686"
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  created() {
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged((user) => {
        if (this.$route.name !== "ViewPage") {
          if(user) {
            this.$router.push('/editor');
          } else {
            this.$router.push('/auth');
          }
        }
      });
    },
  router,
  template: '<App/>',
  components: { App }
});