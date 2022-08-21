var isDarkTheme = false;

var darkSwitch = document.getElementById("darkbutton");
window.addEventListener("load", function () {
  if (darkSwitch) {
    initTheme();
    darkSwitch.addEventListener("click", function () {
      changeTheme();
    });
  }
});

function initTheme() {
  var currentyTheme = localStorage.getItem("darkSwitch");

  if(currentyTheme === null){
    localStorage.setItem("darkSwitch", "light")
  }
  else{
    isDarkTheme = currentyTheme !== null && currentyTheme === "dark";
    isDarkTheme ? document.body.setAttribute("data-theme", "dark") : document.body.removeAttribute("data-theme");
  }
}

function changeTheme() {
  if (!isDarkTheme) {
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("darkSwitch", "dark");
  } else {
    document.body.removeAttribute("data-theme");
    localStorage.removeItem("darkSwitch");
  }
  isDarkTheme = !isDarkTheme;
}
