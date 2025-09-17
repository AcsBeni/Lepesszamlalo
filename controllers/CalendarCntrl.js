let callevents=[]


async function getCalendardata(){
    try {
        const res = await fetch(`${Server}/steps/user/${loggeduser.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await res.json();
        
        
        result.forEach(item => {
            let event = {
                title:"Lépés: "+ item.steps  ,
                start: item.date,
                allDay: true
            };
            callevents.push(event);
        });

        
       
    } catch (error) {
        console.error('Error fetching chart data:', error);
    }



}
function initcalendar(){
    var calendarEl = document.getElementById('calendar');
    
    var calendar = new FullCalendar.Calendar(calendarEl, {
        
      initialView: 'timeGridFourDay',
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev.today,next',
        center: 'title',
        right: 'timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear' 
      },
      locale: 'hu',
      events: callevents
       
      
    });
    
    calendar.render();
}