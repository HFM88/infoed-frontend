const searchInput = document.querySelector(".searchInput");
const resultsContainer = document.querySelector(".resultsContainer");

let resultIndex = -1;

const addResult = (entryObject) => {
  resultIndex++;
  if (entryObject.profilepic === "") {
    entryObject.profilepic = "http://localhost:5000/cdn/cat.png";
  } else {
    entryObject.profilepic = "http://localhost:5000/cdn/" + entryObject.profilepic;
  }
  const image = `<img src="${entryObject.profilepic}" class="object-cover w-full h-full">`;

  const friendButton = `
    <button id="frbtn-${resultIndex}" class="py-2 px-4 bg-accent rounded-md text-sm z-[100] cursor-pointer">
      Add friend
    </button>`;

  const profileStructure = `
    <div class="w-full h-10 flex justify-between items-center gap-x-6 text-text" href="${"/profile?n=" + entryObject.username}">
      <a class="flex items-center space-x-2" href="${"/profile?n=" + entryObject.username}">
        <span class="w-12 h-12 overflow-hidden rounded-full">${image}</span>
        <div class="flex flex-col">
          <p class="font-medium text-md">${entryObject.displayname}</p>
          <p class="text-text text-opacity-40 text-sm">${"@" + entryObject.username}</p>
        </div>
      </a>
      ${entryObject.isFriends ? "" : friendButton}
    </div>`;

  resultsContainer.insertAdjacentHTML("afterbegin", profileStructure);

  if (!entryObject.isFriends) {
    document.getElementById(`frbtn-${resultIndex}`).addEventListener('click', async function () {
      this.style.display = "none";
      let res = await fetch('http://localhost:5000/api/friends/add', {
        method: 'POST',
        body: JSON.stringify({
          targetUser: entryObject.username
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res);
      if (res.ok) {
        toastr.success("Sent");
        setTimeout(() => {
          window.location.href = window.location.href;
        }, 1000);
      } else {
        toastr.error("Error");
      }
    });
  }
};

searchInput.addEventListener("input", async (e) => {
  const inputValue = e.target.value.toLowerCase().trim();

  let result = await fetch('http://localhost:5000/api/user/search/' + inputValue);
  result = await result.json();

  const filterResults = result.filter((eachData) => {
    return (
      eachData.username &&
      eachData.displayname.toLowerCase().includes(inputValue)
    );
  });

  if (inputValue.length) {
    resultsContainer.classList.replace("hidden", "flex");
    resultsContainer.innerHTML = "";
    if (filterResults.length !== 0) {
      resultIndex = -1;
      filterResults.forEach(async (eachFilteredObject) => {
        let resultIsFriend = await fetch('http://localhost:5000/api/user/get/' + eachFilteredObject.username, {
          credentials: 'include',
        });
        resultIsFriend = await resultIsFriend.json();
        console.log(resultIsFriend.isFriends);

        eachFilteredObject.isFriends = resultIsFriend.isFriends || false;
        addResult(eachFilteredObject);
      });
    } else {
      resultsContainer.innerHTML = `<a class="w-full h-10 flex justify-between items-center gap-x-2 text-text text-opacity-40" href="">Search for "${inputValue}"</a>`;
    }
  } else {
    resultsContainer.classList.replace("flex", "hidden");
  }
});

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
};
