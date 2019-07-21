<template>
    <div class="home">
    <div class="col-md-12" style="height: 520px;">
        <div class="col-md-6 col-md-offset-3 panel-primary">
           <div class="content-box-large">
                <div class="panel-heading">
                    <div class="panel-title">Push Notifications</div>
                </div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" @submit.prevent="sendNotification()">
                        <div class="form-group">
                        <label for="inputEmail3" class="col-sm-2 control-label">Title</label>
                        <div class="col-sm-10">
                            <input v-model="form.title" type="text" class="form-control" id="inputEmail3" placeholder="Title" required>
                        </div>
                        </div>
                        <div class="form-group">
                        <label for="inputEmail3" class="col-sm-2 control-label">Target Url</label>
                        <div class="col-sm-10">
                            <input v-validate="{url: {require_protocol: true }}" data-vv-name='url' data-vv-as="url" v-model="form.url" type="text" class="form-control" id="inputEmail3" placeholder="Url" required>
                            <small class='text-danger'>{{ errors.first('url') }}</small>
                        </div>
                        </div>
                        <div class="form-group">
                        <label for="inputPassword3" class="col-sm-2 control-label">Topic</label>
                        <div class="col-sm-10">
                            <select type="password" v-model="form.topic" class="form-control" id="inputPassword3" placeholder="Topic" required>
                                <option value="">Select Topic</option>
                                <option value="all">All</option>
                                <option v-for='day in dayOne' :key='day.id' :value="day.details.notification_slug">{{day.details.title}}</option>
                                <option v-for='day in dayTwo' :key='day.id' :value="day.details.notification_slug">{{day.details.title}}</option>
                            </select>
                        </div>
                        </div>
                        <div class="form-group">
                        <label class="col-sm-2 control-label">Message</label>
                        <div class="col-sm-10">
                            <textarea v-model="form.message"  v-validate="'max:200'" data-vv-name='message' data-vv-as="message" class="form-control" placeholder="Textarea" rows="3" required></textarea>
                            <small class='text-danger'>{{ errors.first('message') }}</small>
                        </div>
                        </div>
                        
                        <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <button type="submit" class="btn btn-primary">Send</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            form: {
                url : 'https://droidcon.co.ke',
                message: '',
                topic : '',
                title : ''
            }
        }
    },
    mounted(){
        this.$store.dispatch("getFirstDay");
        this.$store.dispatch("getDayTwo");
        this.$store.dispatch('getSpeakers');
    },
    computed: {
        dayOne() {
          return this.$store.state.dayOne;
        },
        dayTwo() {
          return this.$store.state.dayTwo;
        },
        speakers(){
            return this.$store.state.speakers
        },
    },
    methods: {
        sendNotification(){
            const jsonBody = {
                "notification": {
                    "title": this.$data.form.title,
                    "body": this.$data.form.message,
                    "icon": "https://droidcon.co.ke/assets/img/about-logo.png",
                    "click_action": this.$data.form.url
                },
                "data": {
                    "title": "droidcon.co.ke",
                    "body": "droidconKE2019"
                },
                "to": "/topics/"+this.$data.form.topic
                }
            const headers = {
            'Authorization': 'key='+process.env.VUE_APP_SERVER_KEY,
            'Content-Type' : 'application/json'
            };
            this.axios.post('https://fcm.googleapis.com/fcm/send',jsonBody,{headers})
            .then(response => {
                this.$toast.success('Notifications sent', 'Notifications',{position: 'topCenter'});
                return
                // console.log('Sent.:' ,response);
            }).catch((err) => {
                console.log('Unable to send ', err);
            });
        }
    }
}
</script>

