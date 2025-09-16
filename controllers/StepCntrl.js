
let steps = [];
let selectedindex = -1;
let selecteddate= [];

function setDate(){
    let today = new Date().toISOString().split('T')[0];
   
    let dateField = document.querySelector("#dateField")
    dateField.setAttribute("max", today)
    dateField.value = today;
}


async function add(){
    let date = document.querySelector("#dateField").value;
    let stepsfield = document.querySelector("#stepsField").value;

    if(date =="" || stepsfield=="" || stepsfield<=0){
        alertkezeles("Kérem írja be az adatokat", "alert-danger");
        return;
    }
    
    // az adott napra van már lépés adat akkor update
    let idx = steps.findIndex(s => s.date === date && s.userid === loggeduser.id);
    //új adat
    
    if(idx == -1){
        
       //ha nincs akkor új adat
        try {
            let res = await fetch(`${Server}/steps`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    date: date,
                    steps: stepsfield,
                    userid: loggeduser.id
                    
                })
            
            });
            
            let data = await res.json();
            if(res.status==200){
                alertkezeles("Sikeres adatmentés" || data.msg, "alert-success");
                await getStepdates();
                Rendersteps();

            }
            else{
                alertkezeles(data.message, "alert-danger");
            }
        }
         catch (error) {
            alertkezeles("Hiba történt az adatok mentése során!", "alert-danger");
            
        }
    }
    else
    {
        //ha van akkor update
        try {
            let res = await fetch(`${Server}/steps/${steps[idx].id}`, {
                
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    date: date,
                    steps: stepsfield,
                    userid: loggeduser.id
                    
                })
            
            });
           
            
            alertkezeles("Sikeres adatmentés" || data.msg, "alert-success");
            await getStepdates();
            Rendersteps();
        }
        catch (error) {
            alertkezeles(error, "alert-danger");
            console.log(error);
        }
    }
    
}
async function update(){
    
    let date = document.querySelector("#dateField").value;
    let stepsfield = document.querySelector("#stepsField").value;

    if(date =="" || stepsfield=="" || stepsfield<=0){
        alertkezeles("Kérem írja be az adatokat", "alert-danger");
        return;
    }
    if(selecteddate != date){
        let idx = steps.findIndex(s => s.date === date && s.userid === loggeduser.id);
        if(idx != -1){
            alertkezeles("Az adott napra már van lépés adat!", "alert-danger");
            if(confirm("Szeretné módosítani a meglévő adatot?")){
                document.querySelector("#dateField").value = steps[idx].date;
                document.querySelector("#stepsField").value = steps[idx].steps;
                selectedindex = steps[idx].id;
                selecteddate = steps[idx].date;
                updateevent();
                
            }
            
        }
        else{
            try {
                let res = await fetch(`${Server}/steps/${selectedindex}`, {

                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        date: date,
                        steps: stepsfield,
                        userid: loggeduser.id

                    })

                });
               
                alertkezeles("Sikeres adatmentés" || data.msg, "alert-success");
                await getStepdates();
                Rendersteps();
               
            }
            catch (error) {
                alertkezeles(error, "alert-danger");
                console.log(error);
            }
            
        }
    }
    

    
    
    
    //update
    

   
    let idx = steps.findIndex(s => s.date === date && s.userid === loggeduser.id);
    try {
        let res = await fetch(`${Server}/steps/${steps[idx].id}`, {
            
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date: date,
                steps: stepsfield,
                userid: loggeduser.id
                
            })
        
        });
       
        document.querySelector("#Addbtn").classList.remove("hide");
        document.querySelector('#Updatebtn').classList.add("hide");
        document.querySelector('#Delbtn').classList.add("hide");
        document.querySelector('#Cancelbtn').classList.add("hide");
        alertkezeles("Sikeres adatmentés" || data.msg, "alert-success");
        await getStepdates();
        Rendersteps();
        
    }
    catch (error) {
        alertkezeles(error, "alert-danger");
        console.log(error);
    }
    
}
async function del(){
   
    if(selectedindex != -1){
        if(confirm("Biztosan törli a lépés adatot?")){
            Deleteing(selectedindex); 
            selectedindex = -1;
            document.querySelector("#dateField").value = "";
            document.querySelector("#stepsField").value = "";
            cancel();
        }
    }
    else{
        alertkezeles("Nincs kijelölve lépés adat!", "alert-warning");
    }
    

}
function cancel(){
    document.querySelector("#Addbtn").classList.remove("hide");
    document.querySelector('#Updatebtn').classList.add("hide");
    document.querySelector('#Delbtn').classList.add("hide");
    document.querySelector('#Cancelbtn').classList.add("hide");
    document.querySelector("#dateField").value = "";
    document.querySelector("#stepsField").value = "";
    selectedindex = -1;
    selecteddate = [];
   
}
async function getStepdates(){
    try {
        let res = await fetch(`${Server}/steps/user/${loggeduser.id}`);
        steps= await res.json();
        steps = steps.sort((a,b) => new Date(b.date) - new Date(a.date));
       
        
    } catch (error) {
        
        alertkezeles("Hiba történt az adatok lekérése során!", "alert-danger");
    }
}
async function Rendersteps(){
    let tbody = document.querySelector("tbody");
    let sum = document.querySelector("#sum");
    tbody.innerHTML = "";
    sum.innerHTML = "0";

    steps.forEach((step, index) => {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");

        let editBtn = document.createElement("button");
        let delBtn = document.createElement("button");
        editBtn.classList.add("btn", "btn-sm", "btn-warning", "me-2");
        editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
        delBtn.classList.add("btn", "btn-sm", "btn-danger");
        delBtn.innerHTML = '<i class="bi bi-trash"></i>';   
        delBtn.addEventListener("click", async () => {
            if(confirm("Biztosan törli a lépés adatot?")){
               Deleteing(step.id); 
               
            }
        });
        editBtn.addEventListener("click", () => {
            document.querySelector("#dateField").value = step.date;
            document.querySelector("#stepsField").value = step.steps;
            selectedindex = step.id;
            selecteddate = step.date;
            updateevent();
        });
                
        td1.innerHTML = (index+1) + '.';
        td2.innerHTML = step.date;
        td3.innerHTML = step.steps;
        td4.appendChild(editBtn);
        td4.appendChild(delBtn);

        td3.classList.add("text-end");
        td4.classList.add("text-end");

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tbody.appendChild(tr);
        sum.innerHTML = parseInt(sum.innerHTML) + parseInt(step.steps);
    });
}
function updateevent(){
    document.querySelector("#Addbtn").classList.add("hide");
    document.querySelector('#Updatebtn').classList.remove("hide");
    document.querySelector('#Delbtn').classList.remove("hide");
    document.querySelector('#Cancelbtn').classList.remove("hide");
    
}
async function Deleteing(id){
    fetch(`${Server}/steps/${id}`, {
        method: "DELETE"
    }).then(res => {
        if (res.ok) {
            alertkezeles("Sikeres törlés!", "alert-success");
            getStepdates().then(() => Rendersteps());
        } else {
            alertkezeles("Hiba történt a törlés során!", "alert-danger");
        }
    });
}

function togglemode (){
}