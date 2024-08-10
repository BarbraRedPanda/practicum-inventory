let dataArray = []
document.addEventListener("DOMContentLoaded", function() {
  fetch('./catalogue.csv')
    .then(response => response.text())  // Get the response as text
    .then(csvText => {
      // Step 2: Parse the CSV text into a JavaScript array
      const rows = csvText.split('\n');  // Split by newlines to get rows
      // Step 3: Convert each row into an array of values
      dataArray = rows.map(row => row.split(','));  // Split each row by commas
      
      let parent = document.querySelector(".grid");
      let i = 0;
      dataArray.forEach(itemData => {
        console.log('hi');
        let parent = document.querySelector(".grid");
        let item = document.createElement("div");
        item.id= i;
        item.classList.add("items", i, "nb-esque");
        parent.appendChild(item);

        let title = document.createElement("h3");
        item.appendChild(title);
        title.classList.add("titles", i, "nb-esque");
        title.textContent = itemData[0];

        let description = document.createElement("p");
        item.appendChild(description);
        description.classList.add("descriptions");
        description.textContent = itemData[1];

        let quantity = document.createElement("p");
        item.appendChild(quantity);
        quantity.classList.add("quantities");
        quantity.textContent = "Quantity: " + itemData[2]; 

        item.addEventListener('click', () => openModal(itemData)); // Pass index of item

        i++;
      });

    })
    .catch(error => console.error('Error fetching the CSV file:', error));

  console.log(dataArray);
  const modal = document.getElementById("itemModal");
  const span = document.getElementsByClassName("close")[0];

  function openModal(itemData) {
      const imageContainer = document.querySelector('.modal-images');

      document.querySelector('.modal-title').textContent = itemData[0];
      document.querySelector('.modal-description').textContent = itemData[1];
      document.querySelector('.modal-quantity').textContent = `Quantity: ${itemData[2]}`;
      

      imageContainer.innerHTML = ''; // Clear existing images
      /*let imgArray = images.split('|'); // Assuming images are separated by '|'
      imgArray.forEach(imgSrc => {
          let img = document.createElement('img');
          img.src = imgSrc; // Use your image source
          imageContainer.appendChild(img);
      });*/



      modal.style.display = "block";
  }

  // Close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
});