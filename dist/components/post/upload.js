const uploadButton = document.getElementById('create-post-button');
const contentinput = document.getElementById('textarea-input');

uploadButton.addEventListener('click', async function (e) {
    const uploadedImage = document.getElementById('uploaded-image');
    if (!uploadedImage || !uploadedImage.attributes.src) {
        toastr.warning("Selecteaza o imagine inainte de a posta");
        return;
    }

    const imageData = uploadedImage.attributes.src.value;
    uploadButton.style.display = 'none';

    try {
        // Upload the image
        const uploadResponse = await fetch('http://localhost:5000/cdn/upload', {
            method: 'POST',
            body: JSON.stringify({
                imgdata: imageData
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!uploadResponse.ok) {
            throw new Error('Failed to upload image');
        }

        const imageDataResponse = await uploadResponse.json();
        console.log('Image uploaded:', imageDataResponse);

        // Create a post
        const postResponse = await fetch('http://localhost:5000/api/posts/create', {
            method: 'POST',
            body: JSON.stringify({
                tval: 1,
                filename: imageDataResponse.filename,
                content: contentinput.value
            }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!postResponse.ok) {
            throw new Error('Failed to create post');
        }

        toastr.success("Success");
        setTimeout(() => {
            window.location.href = '/profile';
        }, 1000); // Redirect after 1 second
    } catch (error) {
        console.error('Error:', error);
        toastr.error("A aparut o eroare in timpul postarii");
        uploadButton.style.display = 'block';
    }
});
