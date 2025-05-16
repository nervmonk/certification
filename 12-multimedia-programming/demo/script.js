const uploadButton = document.getElementById('uploadButton');
const fileInput = document.getElementById('fileInput');
const mediaContainer = document.getElementById('mediaContainer');

const minioEndpoint = ''; // e.g., 'http://localhost:9000'
const bucketName = ''; // e.g., 'mybucket'
const accessKey = '';
const secretKey = '';

const minioClient = new Minio.Client({
    endPoint: minioEndpoint,
    port: 9000,
    useSSL: false,
    accessKey: accessKey,
    secretKey: secretKey
});

uploadButton.addEventListener('click', () => {
    const files = fileInput.files;
    for (const element of files) {
        const file = element;
        const fileName = file.name;

        minioClient.fPutObject(bucketName, fileName, file.path, (err, etag) => {
            if (err) {
                return console.log(err);
            }
            console.log(`Uploaded ${fileName} successfully.`);
            displayMedia(fileName);
        });
    }
});

function displayMedia(fileName) {
    const mediaItem = document.createElement('div');
    mediaItem.classList.add('media-item');

    const mediaUrl = `${minioEndpoint}/${bucketName}/${fileName}`;
    if (fileName.endsWith('.mp4') || fileName.endsWith('.webm')) {
        const video = document.createElement('video');
        video.src = mediaUrl;
        video.controls = true;
        mediaItem.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = mediaUrl;
        img.alt = fileName;
        img.style.maxWidth = '100%';
        mediaItem.appendChild(img);
    }

    mediaContainer.appendChild(mediaItem);
}
