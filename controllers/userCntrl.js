
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
        const res = await fetch('http://localhost:3000/users', {
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
function logout(){

}
function login(){
    
}
function getProfile(){

}
function updateProfile(){
    
}
function updatePassword(){

}
function alertkezeles(Adottszoveg, tipus){
    
    
    
    alertBox.classList.add(tipus);
    alertBox.classList.remove("hide");
    alertBox.classList.remove("fade-out");
    alertBox.innerHTML = `${Adottszoveg}`;
    setTimeout(() => {
        alertBox.classList.add("fade-out");
        setTimeout(() => {
            alertBox.classList.add("hide");
        }, 500);
    }, 3000);
}