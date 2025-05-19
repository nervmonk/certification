const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
const mediaModal = document.getElementById('mediaModal');
const modalImage = document.getElementById('modalImage');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.getElementById('closeModal');

// Function to fetch the list of uploaded files
const fetchFileList = async () => {
    const response = await fetch('http://localhost:3000/files'); // Adjust the endpoint as needed
    const files = await response.json();
    fileList.innerHTML = '';
    files.forEach(file => {
        const li = document.createElement('li');
        li.textContent = file;
        li.onclick = () => openMedia(file);
        fileList.appendChild(li);
    });
};

// Function to handle file upload
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    console.log(formData);
    

    await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
    });

    fileInput.value = ''; // Clear the file input
    fetchFileList(); // Refresh the file list
});

// Function to open media in a modal
const openMedia = (fileName) => {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
        modalImage.src = `http://localhost:3000/download/${fileName}`; // Adjust the endpoint as needed
        modalImage.style.display = 'block';
        modalVideo.style.display = 'none';
    } else if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
        modalVideo.src = `http://localhost:3000/download/${fileName}`; // Adjust the endpoint as needed
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
