
//const passwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let alertBox = document.querySelector(".alert")

async function registration(){
    let Namefield = document.querySelector("#Namefield")
    let Emailfield = document.querySelector("#emailField")
    let PasswordField = document.querySelector("#passwdField")
    let ConfirmPasswordField = document.querySelector("#confirmpasswdField")
   
   
    /*await fetch('http://localhost:3000/users')
    .then(res =>  res.json())
    .then(data => {
        console.log(data)
    })*/
    if(!Namefield.value || !Emailfield.value || !PasswordField.value || !ConfirmPasswordField.value){
        alertkezeles("Minden mező kitöltése kötelező!", "alert-warning")
        return;
    }
    if(PasswordField.value != ConfirmPasswordField.value){
        alertkezeles("A jelszavak nem egyeznek!", "alert-warning")
        return;
    }
    /*if(!passwdRegExp.test(PasswordField.value)){
        alert("A jelszó nem biztosnságos!")
        return;
    }*/
    if(!emailRegExp.test(Emailfield.value)){
        alertkezeles("Érvénytelen email cím!", "alert-warning")
        return;
    }
    
    try {
        const res = await fetch(`${Server}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: Namefield.value,
                email: Emailfield.value,
                password: PasswordField.value
                
            })
           
        });
        //console.log('Status:', res.status);
        const data = await res.json();
        //console.log(data)
        
        if(res.status === 200){
           alertkezeles(data.msg,"alert-success")
           Namefield.value = "";
           Emailfield.value = "";
           PasswordField.value = "";
           ConfirmPasswordField.value = "";
          
           return;
        }
        alertkezeles(data.msg, "alert-danger")
    } 
    catch (error) {
        console.log('Error:', error);
    }
    
    
    
       
       
    
  
}
async function logout(){
    sessionStorage.removeItem("loggeduser");
    await getloggeduser();
    
    
}
async function login(){

    let Emailfield = document.querySelector("#emailField")
    let PasswordField = document.querySelector("#passwdField")
    if(!Emailfield.value || !PasswordField.value){
        alertkezeles("Minden mező kitöltése kötelező!", "alert-warning")
        return;
    }
    if(!emailRegExp.test(Emailfield.value)){
        alertkezeles("Érvénytelen email cím!", "alert-warning")
        return;
    }
    let user = {};
   
    try {
        const res = await fetch(`${Server}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: Emailfield.value,
                password: PasswordField.value
            })
        });
        user = await res.json();
        if(user.id){
            loggeduser = user;
        }
        if(!loggeduser){
            alertkezeles("Hibás email cím vagy jelszó!", "alert-danger")
            return;
            
        }
        if(!loggeduser){
            alertkezeles("Hibás email cím vagy jelszó!", "alert-danger")
            return;
        }
        
    
        sessionStorage.setItem("loggeduser", JSON.stringify(loggeduser));
        Emailfield.value = "";
        PasswordField.value = "";
        await getloggeduser();
        alertkezeles("Sikeres bejelentkezés!", "alert-success")
        
        
    } catch (error) {
        console.log('Error:', error);
    }
   
    
}
function getProfile(){

}
function updateProfile(){
    
}
function updatePassword(){

}
function alertkezeles(Adottszoveg, tipus){
    
    
    alertBox.classList.remove("alert-danger","alert-warning","alert-success");
    alertBox.classList.remove("hide");
    alertBox.classList.remove("fade-out");
    alertBox.innerHTML = `${Adottszoveg}`;
    alertBox.classList.add(tipus);
    setTimeout(() => {
        alertBox.classList.add("fade-out");
        setTimeout(() => {
            alertBox.classList.add("hide");
        }, 500);
    }, 3000);
}