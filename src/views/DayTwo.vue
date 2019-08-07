<template>
    <div class="home">
    <div class="col-md-12">
        <div class="content-box-large">
  				<div class="panel-heading">
					<div class="panel-title">Day 2 Sessions</div>
				</div>
  				<div class="panel-body">
  					<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="example">
						<thead>
							<tr>
								<th>#</th>
								<th>Title</th>
								<th>Type</th>
								<th>Speaker(s)</th>
								<th>Time</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="day in dayTwo" :key="day.id" class="odd gradeX">
                                <td>{{day.details.id }}</td>
								<td :style="{ color: day.details.session_color != '' ? day.details.session_color : '#000'}">{{day.details.title}}</td>
								<td>{{day.details.type}}</td>
								<td>
                                    <span v-for="(spk,key) in day.details.speaker_id" :key='key'>
                                    <span v-for="speaker in speakers" :key="speaker.id" v-if="spk == speaker.details.id" >{{speaker.details.name}} 
                                        <span v-if="key+1 != day.details.speaker_id.length">, </span>
                                    </span>
                                </span>
                                </td>
								<td>{{day.details.time}} </td>
								<td class="center">
                                    <a :href="'/schedule/'+day.details.id+'/'+day.details.day_number" class="btn btn-primary btn-xs"><i class="glyphicon glyphicon-eye-open"> View</i></a>
                                </td>
							</tr>
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
        this.$store.dispatch("getDayTwo");
        this.$store.dispatch('getSpeakers');
    },
    computed: {
        dayTwo() {
          return this.$store.state.dayTwo;
        },
        speakers(){
            return this.$store.state.speakers
        },
    }
}
</script>

