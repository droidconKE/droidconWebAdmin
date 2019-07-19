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
                    <h1>19</h1>
               </div>
               <div class="col-md-3">
                   <h6>Speakers</h6>
                    <h1>19</h1>
               </div>
               <div class="col-md-3">
                   <h6>Users</h6>
                    <h1>19</h1>
               </div>
               <div class="col-md-3">
                   <h6>Feedbacks</h6>
                    <h1>19</h1>
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
  computed: {
      user(){
          return firebase.auth().currentUser;
      }
  }
}
</script>
