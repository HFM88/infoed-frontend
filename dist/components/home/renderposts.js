function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index between 0 and i (inclusive)
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements array[i] and array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.addEventListener("DOMContentLoaded", async function () {
    const postsContainer = document.querySelector("#posts-container");
    const postsPerPage = 5;
    let currentPage = 1;

    let allPosts = [];
    let r = await fetch('http://localhost:5000/api/friends/get/', {
        credentials: 'include'
    })
    if (r.ok) {
        let friends = await r.json();
        for (const friend of friends) {
            r = await fetch('http://localhost:5000/api/posts/get/' + friend.username)
            if (r.ok) {
                let posts = await r.json();
                for (const p of posts) {
                    allPosts.push({ ...p, ...friend });
                }
            }
        }
    }

    allPosts = shuffleArray(allPosts);

    renderNextPage();


    function renderPosts(startIndex, endIndex) {
        const postsHTML = allPosts.slice(startIndex, endIndex).map(postObject => {
            const {
                username,
                profilepic,
                timestamp,
                content,
                filename,
                likes,
                comments,
                date
            } = postObject;

            return `
                <div class="flex flex-col space-y-2 pb-4 bg-gray p-4 rounded-md">
                <div class="flex items-center space-x-4 justify-start">
                    <a class="py-2 flex justify-center items-center" href=${'/profile?n=' + username} id="user-profile">
                        <div class="w-12 h-12 overflow-hidden rounded-full">
                            <img src="${profilepic ? 'http://localhost:5000/cdn/' + profilepic : 'http://localhost:5000/cdn/cat.png'}" alt="" class="object-cover w-full h-full" id="user-profile-pic">
                        </div>
                    </a>

                    <div class="flex items-start flex-col">
                        <p class="font-headings">${username}</p>
                        <p class="text-sm text-text opacity-40">${new Date(date).toLocaleTimeString()}</p>
                    </div>
                </div>

                <div class="text-text">
                    <p>${content}</p>
                </div>

                <container class="w-full h-auto max-h-[300px] overflow-hidden pt-4" id="upload-container">
                    <img src="${"http://localhost:5000/cdn/" + filename + ".png"}" alt="" class="object-cover h-full w-full rounded-md" id="post-image">
                </container>

                <div class="flex w-full justify-between items-center py-2 select-none">
                    <div class="flex items-center space-x-1">
                        <div class="flex items-center space-x-2 text-text text-opacity-40 hover:text-opacity-100 transition-all duration-300">
                            <span class="flex items-center space-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                                <p class="text-sm">${likes}</p>
                            </span>
                        </div>
                        <div class="flex items-center space-x-2 text-text text-opacity-40 hover:text-opacity-100 transition-all duration-300">
                            <span class="flex items-center space-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                                </svg>
                                <p class="text-sm">${Math.floor(Math.random() + 1)}</p>
                            </span>
                        </div>
                    </div>
                    <a class="text-text text-opacity-40 hover:text-opacity-100 transition-all duration-300" href="" id="user-messages">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </a>
                </div>
            </div>
            `;
        }).join('');

        return postsHTML;
    }


    function renderNextPage() {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;

        if (startIndex < allPosts.length) {
            postsContainer.insertAdjacentHTML('beforeend', renderPosts(startIndex, endIndex));
            currentPage++;
        }
    }




    window.addEventListener('scroll', function () {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            renderNextPage();
        }
    });
});
