const Apptitle = "Lépésszámláló app";
const Author = "13.a Szoftverfejlesztő";
const Company = "Bajai SZC Türr István Technikum";
const Server = "http://localhost:3000";

let title = document.querySelector("#title")
let author = document.querySelector("#Author")
let company = document.querySelector("#Company")
let lightmodeBtn = document.querySelector("#lightmodeBtn")
let darkmodeBtn = document.querySelector("#darkmodeBtn")

title.innerHTML = Apptitle
author.innerHTML = Author
company.innerHTML = Company

let mainmenu = document.querySelector(".mainmenu");
let usermenu = document.querySelector(".usermenu");

let main = document.querySelector("main");
let theme = 'light';
let loggeduser =null;

lightmodeBtn.addEventListener("click",() =>{
    setTheme("light");
    saveTheme("light");
});
darkmodeBtn.addEventListener("click",()=>{
    setTheme("dark");
    saveTheme("dark");
});
function loadTheme(){
    theme = "light"
    if (localStorage.getItem("SCTheme")) {
        theme = localStorage.getItem("SCTheme");
    }
    setTheme(theme)
}

function saveTheme(theme){
    localStorage.setItem('SCTheme', theme)
}
function setTheme(theme){
    document.documentElement.setAttribute('data-bs-theme', theme);
    setThemeBtn(theme)
}
function setThemeBtn(theme){
    if (theme=='light') {
        lightmodeBtn.classList.add("hide");
        darkmodeBtn.classList.remove("hide");
    }
    else{
        lightmodeBtn.classList.remove("hide");
        darkmodeBtn.classList.add("hide");
    }
}

async function render(view){
    main.innerHTML = await(await fetch(`views/${view}.html`)).text();
    switch(view){
        case 'profile':
            getProfile();
            break;
    }
}

async function getloggeduser(){
    if(sessionStorage.getItem("loggeduser")){
        loggeduser = JSON.parse(sessionStorage.getItem("loggeduser"));  
        mainmenu.classList.add("hide");
        usermenu.classList.remove("hide");
        await render('main')
    }
    else{
        loggeduser=null;
        mainmenu.classList.remove("hide");
        usermenu.classList.add("hide");
        await render('login')
    }
        
   // return loggeduser
}


loadTheme();
getloggeduser();


