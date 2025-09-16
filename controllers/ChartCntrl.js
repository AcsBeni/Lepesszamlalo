let chart = null;
let labels = [];
let data = [];

async function getchartdata(){
    //lekérdezzük az adatokat a szerverről
    /*try {
        let res = await fetch(`${Server}/steps/user/${loggeduser.id}`);
        steps= await res.json();
        steps = steps.sort((a,b) => new Date(b.date) - new Date(a.date));
       
        
    } catch (error) {
        
        alertkezeles("Hiba történt az adatok lekérése során!", "alert-danger");
    }*/
}

function initChart() {
    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [10, 20, 30, 40, 50, 60, 70],
            datasets: [{
            label: 'My First dataset',
            
            data: [0, 10, 5, 2, 20, 30, 45],
            }]
            
        },
         options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Lépésszámok'
      }

    }
    }
    }
    );
}

