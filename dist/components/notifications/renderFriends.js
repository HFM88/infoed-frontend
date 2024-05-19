document.addEventListener("DOMContentLoaded", async function () {
    const notificationsContainer = document.querySelector("#friends-container");
    const notificationsPerPage = 5;
    let currentPage = 1;
    let allNotifications = [];


    function renderNotification(notification) {
        const { username, displayname, profilepic, joindate } = notification;
        return `
            <div class="flex flex-col xs:flex-row space-y-2 justify-between items-start md:items-center border-b border-b-text border-opacity-20 pb-4">
                <div class="flex items-center justify-between xs:justify-normal flex-wrap space-x-2 px-4">
                    <a class="py-2 flex justify-center items-center" href=${"/profile?n=" + username} id="user-profile">
                        <div class="w-12 h-12 overflow-hidden rounded-full">
                            <img src="${'http://localhost:5000/cdn/' + profilepic || 'http://localhost:5000/cdn/cat.png'}" alt=""
                                class="object-cover w-full h-full" id="user-profile-pic">
                        </div>
                    </a>
                    <div class="flex flex-col items-start flex-wrap">
                        <div class="flex items-center space-x-2" id="user-name">
                            <span class="font-headings">${displayname}</span>
                        </div>
                        <div class="text-text text-opacity-20" id="notification-text">${username} este prietenul tau</div>
                    </div>
                </div>
               
            </div>
        `;
    }

    function renderNotifications(startIndex, endIndex) {
        const notificationsHTML = allNotifications.slice(startIndex, endIndex).map(renderNotification).join('');
        notificationsContainer.insertAdjacentHTML('beforeend', notificationsHTML);
        document.getElementById("accbtn" + elementId).addEventListener('click', async function () {
            const uploadResponse = await fetch('http://localhost:5000/api/friends/get', {
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
                toastr.success("Ok")
            } else {
                toastr.error("Cacat")
            }
        })
    }

    async function fetchNotifications() {
        try {
            const response = await fetch('http://localhost:5000/api/friends/get', {
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