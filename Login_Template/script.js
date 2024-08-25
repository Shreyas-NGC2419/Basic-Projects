const themebtn = document.getElementById("themeswitch");
    let darkmode = localStorage.getItem("darkmode");

    if (darkmode === "active") enableDarkMode(); //To save user preference for some time

    themebtn.addEventListener("click", () => {
        darkmode = localStorage.getItem("darkmode")
        darkmode !== "active" ? enableDarkMode() : disableDarkMode();
    })

    function enableDarkMode() {
        document.body.classList.add("darkmode");
        localStorage.setItem("darkmode", "active");
    }
    function disableDarkMode() {
        document.body.classList.remove("darkmode");
        localStorage.setItem("darkmode", null);
    }
