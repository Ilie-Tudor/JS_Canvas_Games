window.onload = function(){
let navigation = document.getElementById("navElementWrapper");
let button = document.getElementById("navBarButton");
let icon = document.getElementById("buttonIcon");

button.addEventListener("click", function(){
    if(navigation.classList.contains("non-active")){
        navigation.classList.replace("non-active","active");
        icon.src="../General_Icons/angle-double-left-solid.svg";
    }
    else{
        navigation.classList.replace("active","non-active");
        icon.src="../General_Icons/bars-solid.svg";
    }
});
}