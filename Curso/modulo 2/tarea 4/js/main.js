// nombre del header: X-API-Key
// api key cBmV3a8yZ4WsCVDLZmmTsPksTFKrLO4bwrqtt200

// const app= new Vue{
// 	el:"#app",
// 	data:{
// 		members:[]
// 	}

// }

// Parte1
let lista= document.getElementById('lista');
async function getData() {
		let api="https://api.propublica.org/congress/v1/113/senate/members.json";
		let i={headers:{"X-API-Key":"cBmV3a8yZ4WsCVDLZmmTsPksTFKrLO4bwrqtt200"}};
		let promise= await fetch(api,i);
		let isOk= promise.ok ;
		let result= isOk? await promise.json(): alert(promise.status);
		// data.members=result.results[0].members;

}
getData()





