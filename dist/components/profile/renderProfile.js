function addImagesToGrid(data) {
    const gridContainer = document.querySelector('#posts-container');

    data.forEach(objj => {
        const imageLink = document.createElement('a');
        imageLink.classList.add('w-full', 'h-[400px]', 'overflow-hidden');

        const image = document.createElement('img');
        image.src = 'http://localhost:5000/cdn/' + objj.filename + '.png';
        image.alt = 'Image';
        image.classList.add('w-full', 'h-full', 'rounded-md', 'object-cover');

        imageLink.appendChild(image);
        gridContainer.appendChild(imageLink);
    });
}


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

// Example object with image URLs
document.addEventListener('DOMContentLoaded', async function () {
    let r = await fetch('http://localhost:5000/api/posts/get/' + (urlParams.get('n') ? urlParams.get('n') : getCookie('username')));
    if (r.ok) {
        r = await r.json();
        console.log(r);
    }
    addImagesToGrid(r);
})


