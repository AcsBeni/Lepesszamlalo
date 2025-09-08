let lightmodeBtn = document.querySelector("#lightmodeBtn")
let darkmodeBtn = document.querySelector("#darkmodeBtn")

let theme = 'light';

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
loadTheme();

