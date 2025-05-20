const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const mediaModal = document.getElementById('mediaModal');
const modalImage = document.getElementById('modalImage');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.getElementById('closeModal');

// Fetching list
const fetchFileList = async () => {
    const response = await fetch('http://localhost:3000/files');
    const files = await response.json();
    fileList.innerHTML = '';
    files.forEach(file => {
        const li = document.createElement('li');
        li.textContent = file;
        li.onclick = () => openMedia(file);
        fileList.appendChild(li);
    });
};

// Upload file
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    console.log(formData);
    

    await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
    });

    fileInput.value = '';
    fetchFileList();
});

// Open the media
const openMedia = (fileName) => {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
        modalImage.src = `http://localhost:3000/download/${fileName}`;
        modalImage.style.display = 'block';
        modalVideo.style.display = 'none';
    } else if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
        modalVideo.src = `http://localhost:3000/download/${fileName}`;
        modalVideo.style.display = 'block';
        modalImage.style.display = 'none';
    }
    mediaModal.style.display = 'block';
};

// Close modal when the user clicks on <span> (x)
closeModal.onclick = () => {
    mediaModal.style.display = 'none';
    modalImage.style.display = 'none';
    modalVideo.style.display = 'none';
};

// Fetch the file list on page load
fetchFileList();
