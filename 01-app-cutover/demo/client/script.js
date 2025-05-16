const resultDiv = document.getElementById('result');
let counter = 0;

// Replace this URL with your actual API endpoint
const apiUrl = 'https://api.example.com/endpoint';

function fetchApiData() {
    
    // fetch(apiUrl)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.text(); // Assuming the API returns a plain text response
    //     })
    //     .then(data => {
    //         resultDiv.textContent = data; // Display the returned string
    //     })
    //     .catch(error => {
    //         console.error('There was a problem with the fetch operation:', error);
    //         resultDiv.textContent = 'Error fetching data';
    //     });

    resultDiv.textContent = "Hello World " + counter++;
}

// Call the API every 2 seconds
setInterval(fetchApiData, 2000);

// Initial call to display data immediately
fetchApiData();
