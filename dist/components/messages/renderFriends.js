{

    function renderComponent(data, container) {
        const templat = `<a  href=${"/messages?u=" + data.username}
        class="flex items-center space-x-2 hover:bg-gray px-4 py-2 transition-all duration-200 ease-in-out select-none">
        <div class="w-16 h-16 overflow-hidden">
            <img src=${"http://localhost:5000/cdn/" + data.profilepic}
                alt="" class="h-full w-full rounded-full object-cover shadow-md"
                id="user-profile-pic" />
        </div>
        <div class="flex flex-col items-start">
            <p class="font-headings text-text">${data.displayname}</p>
            <p class="text-text text-opacity-40 text-sm text-left flex items-end space-x-2">${"@" + data.username}</span>
            </p>
        </div>
        </a>`

        container.insertAdjacentHTML('afterEnd', templat);
    }

    document.addEventListener('DOMContentLoaded', async function () {
        let container = document.getElementById('friends-container')
        let r = await fetch('http://localhost:5000/api/friends/get', { credentials: 'include' })
        if (r.ok) r = await r.json();
        for (const friend of r) {
            renderComponent(friend, container)
        }
    });

   

}