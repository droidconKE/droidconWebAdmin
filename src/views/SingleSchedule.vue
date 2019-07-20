<template>
    <div class="home">
        <div class="col-md-12">
            <div class="content-box-large">
                <div class="panel-heading">
                    <div class="panel-title"> {{session.details.title}} => Type: {{session.details.type}}</div>
                    <div class="panel-options">
                        Topic: <span :style="{ color: session.details.session_color != '' ? session.details.session_color : '#000'}">#{{session.details.topic}}</span>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="col-md-9">
                        <h4>Details</h4>
                        <div class="col-md-6">
                            <p><b>Time</b> : {{session.details.time}} </p>
                            <p><b>Duration</b> : {{session.details.duration}} </p>
                            <p><b>Audience</b> : {{session.details.session_audience}} </p>
                            <p><b>Room</b> : {{session.details.room}} </p>
                        </div>
                        <div class="col-md-6">
                            <h6>Description</h6>
                            <p>
                                {{session.details.description}}
                            </p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <h4>Speakers</h4>
                        <div :class="['author',session.details.speaker_id.length <=1? '':'author-multi']">
                            <span v-for="spk in session.details.speaker_id" :key='spk'> &nbsp;
                            <div v-for="speaker in speakers" :key="speaker.id" v-if="spk == speaker.details.id">
                                <img width='65' class='img-circle' :src="speaker.details.photoUrl != '' ? speaker.details.photoUrl : 'assets/img/schedule/speaker1.jpg'" alt="Speaker"/>
                                <span> <br>
                                    Name: {{speaker.details.name}} <br>
                                    Twitter: <a class="twitter" target="_blank" :href="'https://twitter.com/'+speaker.details.twitterHandle"><i class="fa fa-twitter"></i>{{speaker.details.twitterHandle}}</a>
                                </span>
                            </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div class="col-md-12">
        <div class="content-box-large">
  				<div class="panel-heading">
					<div class="panel-title">Session Feedback</div>
				</div>
  				<div class="panel-body">

  					<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="example">
						<thead>
							<tr>
								<th>#</th>
								<th>Feedback</th>
							</tr>
						</thead>
						<tbody v-if='feedbacks.length > 0'>
							<tr v-for="(feed, index) in feedbacks" :key="index.id" class="odd gradeX">
								<td>{{index + 1}}</td>
                                <td>
                                    {{feed.details.session_feedback}}
                                </td>
							</tr>
						</tbody>
                        <tbody v-else>
                                <td><p>No Feedback yet</p></td>
                                <td></td>
                            </tbody>
					</table>
  				</div>
  			</div>
    </div>
  </div>
</template>
<script>
export default {
    mounted(){
        var id = this.$route.params.id
        var day = this.$route.params.day
        // console.log(this.$route.params)
        this.$store.commit("updateSession",{id,day});
        this.$store.commit("updateSessionFeedback",{id,day});
        this.$store.dispatch('getSpeakers');
    },
    computed: {
        session() {
          return this.$store.state.session;
        },
        speakers(){
            return this.$store.state.speakers
        },
        feedbacks(){
            return this.$store.state.sessionReviews
        },
    }
}
</script>

