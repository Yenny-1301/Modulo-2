const app= new Vue({
	el:"#app",
	data:{
		api:"https://api.propublica.org/congress/v1/113/senate/members.json",
		i:{headers:{"X-API-Key":"cBmV3a8yZ4WsCVDLZmmTsPksTFKrLO4bwrqtt200"}},
		members:[],
		party:["D","R","ID"],
		states:[],
		stateSelected:"All",
	},
	methods:{
		options:function(){
			for (let  i= 0; i <this.members.length ; i++) {
				if (!this.states.includes(this.members[i].state)) {
					this.states.push(this.members[i].state)
				}	
			}
			return [...this.states].sort()	
		},	
	},
	computed:{
		filtered:function(){
		return this.members.filter(member=> this.party.includes(member.party) && (this.stateSelected==member.state || this.stateSelected=="All"))
		},
	},
	created: function(){
		fetch(this.api,this.i).
		then(res=>res.json()).
		then(json=>this.members=json.results[0].members).
		catch(error=>console.log("Se produjo un error"+ error))
	}
})






