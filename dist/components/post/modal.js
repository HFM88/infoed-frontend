{

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
  
  }

  
}

function previewImage(event) {
  var reader = new FileReader();
  reader.onload = function () {
    var existingImage = document.getElementById("uploaded-image");
    if (existingImage) {
      // Replace existing image with new one
      existingImage.src = reader.result;
    } else {
      // Create new image element
      var output = document.createElement("img");
      output.id = "uploaded-image";
      output.src = reader.result;
      output.classList.add(
        "w-full",
        "h-full",
        "object-cover",
        "rounded-md",
        "mx-auto"
      ); // Adjust classes as needed

      var imagecontainer = document.getElementById("upload-container");
      if (imagecontainer) {
        imagecontainer.classList.remove("hidden")
        imagecontainer.appendChild(output);
      }
    }
  };
  if (event.target.files.length > 0) {
    reader.readAsDataURL(event.target.files[0]);
  } else {
    // Remove uploaded image if no file selected
    var existingImage = document.getElementById("uploaded-image");
    if (existingImage) {
      existingImage.parentNode.removeChild(existingImage);
      imagecontainer.classList.add("hidden")
    }
  }
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