
//const passwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
        alert("Nem adott meg minden mezőt!")
        return;
    }
    if(PasswordField.value != ConfirmPasswordField.value){
        alert("A jelszavak nem egyeznek!")
        return;
    }
    /*if(!passwdRegExp.test(PasswordField.value)){
        alert("A jelszó nem biztosnságos!")
        return;
    }*/
    if(!emailRegExp.test(Emailfield.value)){
        alert("Nem megfelelő email cím!")
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
        alert(data.msg);
        if(res.status === 200){
           Namefield.value = "";
           Emailfield.value = "";
           PasswordField.value = "";
           ConfirmPasswordField.value = "";
        }
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
