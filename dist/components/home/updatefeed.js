{
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  if (!getCookie('user_access_tkn')) {
    window.location.href = "/auth#register"
  }

  fetch('http://localhost:5000/api/user/get/' + getCookie('username'), {
    credentials: 'include'
  }).then(async function (data) {
    data = await data.json()
    document.getElementById('user-profile-pic').attributes.src.value = 'http://localhost:5000/cdn/' + data.profilepic;
  })

  let msgInput = document.getElementById('message-input');

  document.getElementById('send-button').addEventListener('click', function (e) {
    if (msgInput.value.length < 3) {
      toastr.warning("It must be more than 3 letters")
      return;
    }
    fetch('http://localhost:5000/api/user/setfeed', {
      method: 'POST',
      body: JSON.stringify(
        {
          value: msgInput.value
        }
      ),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async function (data) {
      if (data.ok) {
        toastr.error("Ti-ai modificat starea cu success!")
      } else toastr.error("Unexpected error when updating feed");
    })
  })

}


toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
