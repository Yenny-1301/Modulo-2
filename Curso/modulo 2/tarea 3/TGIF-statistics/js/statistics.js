let members=[...data.results[0].members]
let  statistics={
	democrats:members.filter(member=>member.party=="D"),
	republicans:members.filter(member=>member.party=="R"),
	independents:members.filter(member=>member.party=="ID"),
	leastLoyal:loyaltyOrEngaged(members,"votes_with_party_pct",true),
	mostLoyal:loyaltyOrEngaged(members,"votes_with_party_pct",false),
	leastEngaged:loyaltyOrEngaged(members,"missed_votes_pct",false),
	mostEngaged:loyaltyOrEngaged(members,"missed_votes_pct",true),
}

function avg(array,key){
	let sum=0;
	array.forEach(member=> sum+=member[key]);
	let average=sum/array.length || 0;
	return  average.toFixed(1)+"%";
}
let table
document.getElementById('at-a-glance-attendance')?table=document.getElementById('at-a-glance-attendance'):table=document.getElementById('at-a-glance-loyalty');
document.getElementById('at-a-glance-attendance')?createAtGlance("missed_votes_pct"):createAtGlance("votes_with_party_pct");


function createAtGlance(key) {
	let thead=document.createElement('thead');
	let tr=document.createElement('tr');
	let th1=document.createElement('th');
	let th2=document.createElement('th');
	let th3=document.createElement('th');
	th1.innerText="Party";
	th2.innerText="No. of Rep";
	th3.innerText=`${document.getElementById('at-a-glance-attendance')? "% of Missed Votes" : "% of Votes w/Party"}`;
	tr.appendChild(th1);
	tr.appendChild(th2);
	tr.appendChild(th3);
	thead.appendChild(tr);
	thead.classList.add('bg-light');
	table.appendChild(thead);

	let tbody= document.createElement('tbody');

	function createRow(party,NoRep,avg) {
		row=[party,NoRep,avg];
		let tr = document.createElement('tr');

		for (var i = 0; i < row.length; i++) {
		let td= document.createElement('td');
		td.innerText=row[i];
		tr.appendChild(td);
		}

		tbody.appendChild(tr);
	}
	createRow("Democrat",statistics.democrats.length,avg(statistics.democrats,key))
	createRow("Republicans",statistics.republicans.length,avg(statistics.republicans,key))
	createRow("independents",statistics.independents.length,avg(statistics.independents,key))
	createRow("Total",members.length,avg(members,key))
	table.appendChild(tbody);
}

function loyaltyOrEngaged (array,key,isAscendent){

	let Percent= Math.round(array.length/10);
	let sorted=isAscendent? [...array].sort((A,B)=>A[key]-B[key]) :[...array].sort((A,B)=>B[key]-A[key]); 
	let result=sorted.slice(0,Percent);
	let i=result.length;
	while(i<sorted.length && sorted[i][key]== result[result.length-1]){
		result.push(sorted[i])
		i++
	} 
	 return result

}
 
  const isLoyalty=document.getElementById('loyalty');

function createMostLeastTable(mostLeast){
	let table=document.getElementById(mostLeast);
	let thead=document.createElement('thead');
	let tr=document.createElement('tr');
	let th1=document.createElement('th');
	let th2=document.createElement('th');
	let th3=document.createElement('th');
	th1.innerText="Name";
	th2.innerText=`${isLoyalty? "No. Party Votes" : "No. Missed Votes"}`;
	th3.innerText=`${isLoyalty? "% Party Votes" : "% Missed Votes"}`;
	tr.appendChild(th1);
	tr.appendChild(th2);
	tr.appendChild(th3);
	thead.appendChild(tr);
	thead.classList.add('bg-light');
	

	let tbody=document.createElement('tbody');
	let key =isLoyalty? mostLeast+ "Loyal": mostLeast +"Engaged";
	
	statistics[key].forEach(member=>{
		tbody.innerHTML+=`<tr>
		${member.url ? `<td><a target="_blank" href=${member.url}>${member.first_name}${member.middle_name || " "} ${member.last_name}</a></td>`
		:
						`<td>${member.first_name}${member.middle_name || " "} ${member.last_name}</td>`}
		<td>${isLoyalty ? Math.round(member.total_votes* member.votes_with_party_pct/100) : member.missed_votes}</td>
		<td>${isLoyalty ? member.votes_with_party_pct : member.missed_votes_pct}%</td>

		</tr>`
	})
	table.appendChild(thead);
	table.appendChild(tbody);
}
 
createMostLeastTable("most");
createMostLeastTable("least"); 
