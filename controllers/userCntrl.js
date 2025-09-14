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
    let profilename = document.querySelector("#NewNamefield");
    let profileemail = document.querySelector("#NewemailField");

    let user = typeof loggeduser !== "undefined" && loggeduser ? loggeduser : null;
    if (!user) {
        const stored = sessionStorage.getItem("loggeduser");
        if (stored) user = JSON.parse(stored);
    }

    if (user) {
        profilename.value = user.name || "";
        profileemail.value = user.email || "";
    } else {
        profilename.value = "";
        profileemail.value = "";
        alertkezeles("Nincs bejelentkezett felhasználó!", "alert-warning");
    }
}
async function updateProfile(){
    let profilename = document.querySelector("#NewNamefield")
    let profileemail = document.querySelector("#NewemailField")
    if(!profilename.value || !profileemail.value){
        alertkezeles("Kérem töltse ki a fenti két mezőt!", "alert-warning")
        return;
    }
    if(!emailRegExp.test(profileemail.value)){
        alertkezeles("Érvénytelen email cím!", "alert-warning")
        return;
    }
    let user = {};
   
    try {
        const res = await fetch(`${Server}/users/profile/${loggeduser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: profileemail.value,
                name: profilename.value
            })
        });
        user = await res.json();
        if(res.status !== 200) {
            alertkezeles(user.msg || "Hiba történt!", "alert-danger");
            return;
        }
        if(user.user && user.user.id){
            loggeduser = user.user;
        }
        sessionStorage.setItem("loggeduser", JSON.stringify(loggeduser));
        alertkezeles("Sikeres Adatmódosítás!", "alert-success")
    } catch (error) {
        console.log('Error:', error);
    }
}
async function updatePassword(){
    let oldpassfield = document.querySelector("#oldpasswdField")
    let newpassfield = document.querySelector("#newpasswdField")
    let confirmpassfield = document.querySelector("#newconfpasswdField")
    let emailfield = document.querySelector("#NewemailField")
    let profilename = document.querySelector("#NewNamefield")
    if(!oldpassfield.value || !newpassfield.value || !confirmpassfield.value || !emailfield.value || !profilename.value){
        alertkezeles("Minden mező kitöltése kötelező!", "alert-warning")
        return;
    }
    if(newpassfield.value != confirmpassfield.value){
        alertkezeles("Az új jelszavak nem egyeznek!", "alert-warning")
        return;
    }

    let user = {};

    try {
       const res = await fetch(`${Server}/users/passmod/${loggeduser.id}`, {
           method: 'PATCH',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               oldpass: oldpassfield.value,      // <-- add old password
               newpass: newpassfield.value       // <-- add new password
           })
       });
       user = await res.json();
       if(res.status !== 200) {
           alertkezeles(user.msg || "Hiba történt!", "alert-danger");
           return;
       }
       if(user.id){
           loggeduser = user;
       }
       sessionStorage.setItem("loggeduser", JSON.stringify(loggeduser));
       alertkezeles("Sikeres Adatmódosítás!", "alert-success")
   } catch (error) {
       console.log('Error:', error);
   }

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