import Vue from 'vue'
import Vuex from 'vuex'
import db from './services/Database';
import firebase from './services/Firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    speakers : Array(),
    agendas : Array(),
    dayOne : Array(),
    dayTwo : Array(),
    stars : Array(),
    sessionReviews : Array(),
    eventReviews : Array(),
    rooms : Array(),
    session : Array(),
  },
  mutations: {
    getSpeakers: state => {
        let items = []
      db.collection('speakers2019').orderBy('id').onSnapshot((snapshot) => {
        items = []
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, details: doc.data() })
        })
        state.speakers = items
        // var source = snapshot.metadata.fromCache ? "local cache" : "server";
        //   console.log("Data came from " + source);
      })
    },
    getAgendas: state => {
        let items = []
      db.collection('agenda').orderBy('id').onSnapshot((snapshot) => {
        items = []
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, details: doc.data() })
        })
        state.agendas = items
      })
    },
    getFirstDay: state => {
        let items = []
      db.collection('day_one_2019').orderBy('id').onSnapshot((snapshot) => {
        items = []
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, details: doc.data() })
        })
        state.dayOne = items
      })
    },
    getDayTwo: state => {
        let items = []
      db.collection('day_two_2019').orderBy('id').onSnapshot((snapshot) => {
        items = []
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, details: doc.data() })
        })
        state.dayTwo = items
      })
    },
    getStars: state => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                let items = []
                db.collection('starred_sessions').onSnapshot((snapshot) => {
                    items = []
                    snapshot.forEach((doc) => {
                    items.push({ id: doc.id, details: doc.data() })
                    })
                    state.stars = items
                })
            }
        })
    },
    updateSessionFeedback(state, params){
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                let items = []
                db.collection('session_feedback_2019').where('session_id','==',parseInt(params.id, 10)).where('day_number','==',params.day).onSnapshot((snapshot) => {
                    items = []
                    snapshot.forEach((doc) => {
                    items.push({ id: doc.id, details: doc.data() })
                    })
                    state.sessionReviews = items
                })
            }
        })
    },
    updateEventReviews(state){
        let items = []
        db.collection('event_feedback_2019').onSnapshot((snapshot) => {
            items = []
            snapshot.forEach((doc) => {
            items.push({ id: doc.id, details: doc.data() })
            })
            state.eventReviews = items
        })     
    },
    updateRooms(state){
        let items = []
        db.collection('rooms').onSnapshot((snapshot) => {
            items = []
            snapshot.forEach((doc) => {
            items.push({ id: doc.id, details: doc.data() })
            })
            state.rooms = items
        })
    },
    updateSession(state, params){
        let items = []
        // console.log(params)
        db.collection(params.day ==='day_one'?'day_one_2019':'day_two_2019').where('id','==',parseInt(params.id, 10)).onSnapshot((snapshot) => {
            items = []
            snapshot.forEach((doc) => {
            items.push({ id: doc.id, details: doc.data() })
            })
            // console.log(items[0])
            state.session = items[0]
        })
    },
  },
  actions: {
    getSpeakers: context =>{
        context.commit('getSpeakers')
    },
    getAgendas: context =>{
        context.commit('getAgendas')
    },
    getFirstDay: context =>{
        context.commit('getFirstDay')
    },
    getDayTwo: context =>{
        context.commit('getDayTwo')
    },
    getStars: context =>{
        context.commit('getStars')
    },
    getSessionReviews: context =>{
        context.commit('updateSessionReviews')
    },
    getEventReviews: context =>{
        context.commit('updateEventReviews')
    },
    getRooms: context =>{
        context.commit('updateRooms')
    }
  }
})
