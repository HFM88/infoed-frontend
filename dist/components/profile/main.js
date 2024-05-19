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

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let profileid = urlParams.get("n");
console.log(profileid)
if (profileid == null) {
  profileid = getCookie('username') || 'user';
}

console.log(profileid)

const userFriendsCount = document.getElementById("user-friends")
const userName = document.getElementById("user-name")
const userDisplayName = document.getElementById("user-display-name")
const userProfilePic = document.getElementById("user-profile-pic")
const userBio = document.getElementById("user-bio")

const primaryButton = document.getElementById("pf-btn-primary")
const secondaryButton = document.getElementById("pf-btn-secondary")

fetch(
  "http://localhost:5000/api/user/get/" + profileid || getCookie("username")
).then(function (res) {
  res.json().then(function (data) {
    userFriendsCount.innerText = data.friendscount + ' prieteni';
    userDisplayName.innerText = data.displayname;
    userName.innerText = '@' + data.username;

    console.log(data)

    if (data.username == getCookie('username')) {
      secondaryButton.innerText = "My friends"
      secondaryButton.setAttribute('href', '/notifications')

      primaryButton.innerText = "Change display name"

      document.getElementById('edit-profile-pic').addEventListener('click', function () {
        // Create an input element of type file
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.png'; // Accept only PNG files

        // Simulate a click event to open the file dialog
        input.click();

        // Event listener to handle file selection
        input.addEventListener('change', function (event) {
          const file = event.target.files[0];
          if (file) {

            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async function () {

              let r = await fetch('http://localhost:5000/cdn/upload', {
                method: 'POST',
                body: JSON.stringify({
                  imgdata: reader.result
                }),
                headers: { 'Content-Type': 'application/json' }
              })

              if (r.ok) r = await r.json(); else {
                toastr.error("A aparut o eroare")
                return;
              }

              let r_ = await fetch('http://localhost:5000/api/user/setpfp', {
                method: 'POST',
                body: JSON.stringify({
                  value: r.filename + '.png'
                }),
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
              })
              if (r_.ok) {
                toastr.success("Ti-ai schimbat poza de profil cu success")
                setTimeout(() => {
                  window.location.href = window.location.href;
                }, 1000);
              } else {
                toastr.error("A aparut o eroare")
              }
            }

          }
        });
      })
    } else {
      document.getElementById('edit-profile-pic').remove();
      primaryButton.innerText = "Add Friend"
      secondaryButton.innerText = "Message"
      secondaryButton.setAttribute('href', "/messages?u=" + data.username);
    }

    if (data.profilepic == "") {
      userProfilePic.setAttribute('src', 'http://localhost:5000/cdn/cat.png')
    } else {
      userProfilePic.setAttribute('src', 'http://localhost:5000/cdn/' + data['profilepic'])
    }

    if (data.feed != "") {
      userBio.innerText = data.feed;
    }
    else {
      userBio.innerText = "This hasnt set his bio yet."
    }
  });
});
