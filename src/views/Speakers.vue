<template>
    <div class="home">
    <div class="col-md-12">
        <div class="content-box-large">
  				<div class="panel-heading">
					<div class="panel-title">Speakers</div>
				</div>
  				<div class="panel-body">
  					<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="example">
						<thead>
							<tr>
								<th>#</th>
								<th>Img</th>
								<th>Name</th>
								<th>Bio</th>
								<th>Company</th>
								<th>Twitter</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="speaker in speakers" :key="speaker.id" class="odd gradeX">
								<td>{{speaker.details.id + 1}}</td>
                                <td>
                                    <img class=" imaged img-circle" width="35"  :src="[speaker.details.photoUrl != '' ? speaker.details.photoUrl : 'https://aquaproductsinc.com/wp-content/uploads/2019/02/person.png']" alt="speaker"/>
                                </td>
								<td>{{speaker.details.name}}</td>
                                <td>{{speaker.details.bio != '' ? speaker.details.bio : 'We don\'t know you'}}</td>
                                <td>{{speaker.details.company != '' ? speaker.details.company : 'Android254'}}</td>
                                <td>
                                    <a class="twitter" target="_blank" :href="'https://twitter.com/'+speaker.details.twitterHandle"><i class="fa fa-twitter"></i>{{speaker.details.twitterHandle}}</a>
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
        this.$store.dispatch('getSpeakers');
    },
    computed: {
        speakers(){
            return this.$store.state.speakers
        },
    }
}
</script>

