<template>
  <div class="home">
    <div class="col-md-12" style="height: 520px;">
        <div class="content-box-large">
            <div class="panel-heading">
                <div class="panel-title">{{user.displayName}}</div>
            </div>
            <div class="panel-body">
               <div class="col-md-3">
                   <h6>Sessions</h6>
                    <h1> {{dayOne.length + dayTwo.length}} </h1>
               </div>
               <div class="col-md-3">
                   <h6>Speakers</h6>
                    <h1>{{speakers.length}}</h1>
               </div>
               <div class="col-md-3">
                   <h6>Rooms</h6>
                    <h1>{{rooms.length}} </h1>
               </div>
               <div class="col-md-3">
                   <h6>Feedbacks</h6>
                    <h1> {{feedbacks.length}} </h1>
               </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import firebase from './../services/Firebase.js';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  mounted() {
        this.$store.dispatch("getFirstDay");
        this.$store.dispatch("getDayTwo");
        this.$store.dispatch('getSpeakers');
        this.$store.dispatch('getEventReviews');
        this.$store.dispatch('getRooms');
  },
  computed: {
      user(){
          return firebase.auth().currentUser;
      },
        dayOne() {
          return this.$store.state.dayOne;
        },
         dayTwo() {
          return this.$store.state.dayTwo;
         },
        speakers(){
            return this.$store.state.speakers
        },
        feedbacks(){
            return this.$store.state.eventReviews
        },
        rooms(){
            return this.$store.state.rooms
        },
  },
}
</script>
