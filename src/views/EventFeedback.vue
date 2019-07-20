<template>
    <div class="home">
    <div class="col-md-12">
        <div class="content-box-large">
  				<div class="panel-heading">
					<div class="panel-title">Event Feedbacks</div>
				</div>
  				<div class="panel-body">
  					<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="example">
						<thead>
							<tr>
								<th>#</th>
								<th>Feedback</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(feed, index) in feedbacks" :key="index" class="odd gradeX">
								<td>{{index + 1}}</td>
                                <td>  {{feed.details.eventFeedback}} </td>
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
        this.$store.dispatch('getEventReviews');
    },
    computed: {
        feedbacks(){
            return this.$store.state.eventReviews
        },
    }
}
</script>

