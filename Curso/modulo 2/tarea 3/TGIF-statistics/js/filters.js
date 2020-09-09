let members=[...data.results[0].members];
 let table 
 if (document.getElementById('senate-data')) {
table= document.getElementById('senate-data');
}else if (document.getElementById('house-data')) {
 table= document.getElementById('house-data');
}
 
 document.querySelectorAll("input[name=Party]").forEach(e=> e.addEventListener("change",createTable));
 document.querySelector("#selectOption").addEventListener("change",createTable);


    let statesOptions= [];

    for (let i = 0; i < members.length; i++) {
            if (!statesOptions.includes(members[i].state)) {
                statesOptions.push(members[i].state);
            }        
        }        
    statesOptions.sort();
    let select= document.getElementById('selectOption');
    
    for (let i = 0; i < statesOptions.length; i++) {
          let option=document.createElement('option');
          option.innerText=statesOptions[i];
          option.setAttribute("value",statesOptions[i]);
          select.appendChild(option);
    }

 createTable();

 function createTable() {
    table.innerHTML=" "

    let tbody= document.createElement('tbody');
    let thead= document.createElement('thead');
    let tr =document.createElement('tr');

    let th1=document.createElement('th');
    th1.innerText="Full Name";

    let th2=document.createElement('th');
    th2.innerText="Party Affilication";

    let th3=document.createElement('th');
                                                                                                                                                                                                                                                                                                        th3.innerText="State";

    let th4=document.createElement('th');
    th4.innerText="Years in Office";

    let th5=document.createElement('th');
    th5.innerText="% of Votes w/ Party";

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);

    thead.appendChild(tr);


    let checkedBoxes= Array.from(document.querySelectorAll("input[name=Party]:checked")).map(e => e.value);
    let selectState= document.querySelector("#selectOption").value;  
    for (let i = 0; i < members.length; i++) { 
    
        if (checkedBoxes.includes(members[i].party)&& (selectState== members[i].state || selectState=="All")   ){

            let tr= document.createElement('tr');
            let td1=document.createElement('td');
            let td2=document.createElement('td');
            let td3=document.createElement('td');
            let td4=document.createElement('td');
            let td5=document.createElement('td');
           
            let a=document.createElement('a');
            let url=`${members[i].url}`;

            a.setAttribute("href",url);
            a.setAttribute("target","_blank");
            let nombre= members[i].first_name+' '+(members[i].middle_name ||' ')+' '+members[i].last_name;
            a.innerHTML=nombre;

            td1.appendChild(a);
            td2.innerText=members[i].party;
            td3.innerText=members[i].state;
            td4.innerText=members[i].seniority;
            td5.innerText=members[i].votes_with_party_pct+"%";

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tbody.appendChild(tr);
             
                }    
    }
    table.appendChild(thead)
    table.appendChild(tbody);
 }


