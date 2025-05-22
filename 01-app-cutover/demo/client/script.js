const resultDiv = document.getElementById("result");
let counter = 0;

const apiUrl = "http://localhost/";

function fetchApiData() {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      resultDiv.textContent = data + " " + counter++;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      resultDiv.textContent = "Error fetching data";
    });

  //   resultDiv.textContent = "Hello World " + counter++;
}

setInterval(fetchApiData, 2000);

fetchApiData();
