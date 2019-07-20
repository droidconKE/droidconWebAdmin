<template>
    <div class="home">
    <div class="col-md-12">
        <div class="content-box-large">
  				<div class="panel-heading">
					<div class="panel-title">Agenda</div>
				</div>
  				<div class="panel-body">
  					<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered" id="example">
						<thead>
							<tr>
								<th>#</th>
								<th>Icon</th>
								<th>Title</th>
								<th>Time</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="agenda in agendas" :key="agenda.id" class="odd gradeX">
								<td :style="{ backgroundColor: agenda.details.background_color }">{{agenda.details.id + 1}}</td>
                                <td :style="{ backgroundColor: agenda.details.background_color }">
                                    <img width="35" :src="agenda.details.iconUrl" alt="Speaker"/>
                                </td>
                                <td :style="{ backgroundColor: agenda.details.background_color }">{{agenda.details.title}}</td>
                                <td :style="{ backgroundColor: agenda.details.background_color }">{{agenda.details.time}}</td>
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
        this.$store.dispatch('getAgendas');
    },
    computed: {
        agendas(){
            return this.$store.state.agendas
        },
    }
}
</script>

