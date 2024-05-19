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


document.addEventListener("DOMContentLoaded", async function () {
    const notificationsContainer = document.querySelector("#notifications-container");
    const notificationsPerPage = 5;
    let currentPage = 1;
    let allNotifications = [];


    let elementId = -1;
    function renderNotification(notification) {
        const { username, displayname, profilepic, joindate } = notification;
        elementId++;
        return `
            <div id=${"notif" + elementId} class="flex flex-col xs:flex-row space-y-2 justify-between items-start md:items-center border-b border-b-text border-opacity-20 pb-4">
                <div class="flex items-center justify-between xs:justify-normal flex-wrap space-x-2 px-4">
                    <a class="py-2 flex justify-center items-center" href="/profile" id="user-profile">
                        <div class="w-12 h-12 overflow-hidden rounded-full">
                            <img src="${'http://localhost:5000/cdn/' + profilepic || 'http://localhost:5000/cdn/cat.png'}" alt=""
                                class="object-cover w-full h-full" id="user-profile-pic">
                        </div>
                    </a>
                    <div class="flex flex-col items-start flex-wrap">
                        <div class="flex items-center space-x-2" id="user-name">
                            <span class="font-headings">${displayname}</span>
                            <span class="text-text text-opacity-20 text-sm">${new Date(joindate).toLocaleTimeString()}</span>
                        </div>
                        <div class="text-text text-opacity-20" id="notification-text">${username} sent you a friend request</div>
                    </div>
                </div>
                <div class="flex space-x-2 items-center px-4">
                    <button class="px-4 py-2 bg-gray hover:bg-lightgray transition-all duration-300 rounded-md">
                        Decline
                    </button>
                    <button id=${"accbtn" + elementId} data-usn=${username} class="px-4 py-2 bg-accent hover:bg-secondary transition-all duration-300 rounded-md">
                        Accept
                    </button>
                </div>
            </div>
        `;
    }

    function renderNotifications(startIndex, endIndex) {
        const notificationsHTML = allNotifications.slice(startIndex, endIndex).map(renderNotification).join('');
        notificationsContainer.insertAdjacentHTML('beforeend', notificationsHTML);
        document.getElementById("accbtn" + elementId).addEventListener('click', async function () {
            const uploadResponse = await fetch('http://localhost:5000/api/friends/add', {
                method: 'POST',
                body: JSON.stringify({
                    targetUser: document.getElementById("accbtn" + elementId).dataset.usn
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (uploadResponse.ok) {
                document.getElementById("notif" + elementId).remove();
                toastr.success("Success")
                window.location.href = window.location.href;
            } else {
                toastr.error("Eroare")
            }
        })
    }

    async function fetchNotifications() {
        try {
            const response = await fetch('http://localhost:5000/api/friends/getrequests', {
                credentials: 'include'
            });
            allNotifications = await response.json();
            renderNotifications(0, notificationsPerPage);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }

    function loadNextPage() {
        const startIndex = (currentPage - 1) * notificationsPerPage;
        const endIndex = startIndex + notificationsPerPage;
        if (startIndex < allNotifications.length) {
            renderNotifications(startIndex, endIndex);
            currentPage++;
        }
    }

    await fetchNotifications();

    window.addEventListener('scroll', function () {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            loadNextPage();
        }
    });
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
}