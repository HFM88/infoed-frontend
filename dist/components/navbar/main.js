{
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }

  const navloginbut = document.getElementById("login-nav-button");
  const navuserprofile = document.getElementById("user-profile");
  const navuserprofileimg = navuserprofile.querySelector("img");
  const navusermessages = document.getElementById("user-messages");
  const logoutbutton = document.getElementById("logout-button")

  logoutbutton.addEventListener('click', async function (e) {
    e.preventDefault();
    const cookies = document.cookie.split(";");

    await fetch('http://localhost:5000/api/user/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    window.location.href = "/auth";
  })

  const usracctkn = getCookie("user_access_tkn");
  if (usracctkn) {
    navloginbut.style.display = "none";
    fetch("http://localhost:5000/api/user/get/" + getCookie("username")).then(
      function (res) {
        res.json().then(function (data) {
          if (data["profilepic"] == "") {
            navuserprofileimg.setAttribute(
              "src",
              "http://localhost:5000/cdn/cat.png"
            );
          } else {
            navuserprofileimg.setAttribute(
              "src",
              "http://localhost:5000/cdn/" + data['profilepic']
            );
          }
        });
      }
    );
  } else {
    navuserprofile.style.display = "none";
    navusermessages.style.display = "none";
    logoutbutton.style.display = "none"
  }
}
