const app= new Vue({
	el:"#app",
	data:{
		i:{headers:{"X-API-Key":"cBmV3a8yZ4WsCVDLZmmTsPksTFKrLO4bwrqtt200"}},
		members:[],
		party:["D","R","ID"],
		states:[],
		stateSelected:"All",
		statistics:{
				democrats:[],
				republicans:[],
				independents:[],
				mostLoyal:[],
				leastLoyal:[],
				mostEngaged:[],
				leastEngaged:[],
		}
		
	},
	methods:{
		api:function () {
			if (document.getElementById('senate')) {
			return "https://api.propublica.org/congress/v1/113/senate/members.json"
			}else{
			return "https://api.propublica.org/congress/v1/113/house/members.json"
			}
		}
       ,
		options:function(){
			for (let  i= 0; i <this.members.length ; i++) {
				if (!this.states.includes(this.members[i].state)) {
					this.states.push(this.members[i].state)
				}	
			}
			this.states.sort()	
		},
		getParty:function(party){
			return	this.members.filter(member=> member.party == party)
		   },
		sumPct:function(array,key){
			let sum=0;
			array.forEach(member=> sum+=member[key]);
			let average=sum/array.length || 0;
			return  average.toFixed(1)+"%";
		},
		loyaltyOrEngaged: function(array,key,isAscendent){
			let Percent= Math.round(array.length/10);
			let sorted=isAscendent? [...array].sort((A,B)=>A[key]-B[key]) :[...array].sort((A,B)=>B[key]-A[key]); 
			let result=sorted.slice(0,Percent);
			let i=result.length;
			while(i<sorted.length && sorted[i][key]== result[result.length-1]){
				result.push(sorted[i])
				i++
			} 
			 return result
		
		},
		
	},
	computed:{
		filtered:function(){
		return this.members.filter(member=> this.party.includes(member.party) && (this.stateSelected==member.state || this.stateSelected=="All"))
		},
	},
	created: function(){
		fetch(this.api(),this.i).
		then(function (res) {
			if (res.ok) {
				return res.json()
			}else{
				throw new Error(res.status)
			}
		}).
		then(json=> {
			this.members=json.results[0].members;
			this.options()
			this.statistics.democrats=this.getParty("D")
			this.statistics.republicans=this.getParty("R")
			this.statistics.independents=this.getParty("ID")
			this.statistics.mostLoyal=this.loyaltyOrEngaged(this.members,"votes_with_party_pct",false)
			this.statistics.leastLoyal=this.loyaltyOrEngaged(this.members,"votes_with_party_pct",true)
			this.statistics.leastEngaged=this.loyaltyOrEngaged(this.members,"missed_votes_pct",false)
			this.statistics.mostEngaged=this.loyaltyOrEngaged(this.members,"missed_votes_pct",true)
		}).
		catch(error=>console.log("Se produjo un error"+ error))
	}
})






