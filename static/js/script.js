var toggleButton = document.getElementById("navtoggle");
var x = document.querySelector(".navlist");

toggleButton.addEventListener("click", () => {
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.like_button').forEach(button => {
        button.addEventListener('click', function() {
            const reviewId = this.dataset.reviewId;
            console.log("Review ID:", reviewId);  // Ensure the ID is being captured
            fetch(`/review/${reviewId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Find the <i> element within the button and update its class and the text
                    const icon = this.querySelector('i');
                    icon.className = 'lni lni-heart-fill';
                    icon.style.color = 'pink';
                    this.textContent = ` ${data.new_likes}`;
                    this.prepend(icon);
                } else {
                    console.error('Failed to update likes due to server error.');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    });
});

document.querySelectorAll('.star-rating label').forEach(label => {
    label.addEventListener('click', function () {
        let ratingSelect = document.getElementById('rating');
        ratingSelect.value = this.getAttribute('data-value');
        ratingSelect.dispatchEvent(new Event('change'));
    });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('static/js/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }, err => {
            console.log('ServiceWorker registration failed: ', err);
        }).catch(err => {
            console.log(err);
        });
    });
  } else {
    console.log('Service workers are not supported (Firefox Private Browsing).');
  }

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('searchForm');
    const warningDiv = document.getElementById('searchWarning'); // Get the warning container

    form.addEventListener('submit', function(event) {
        const searchInput = document.getElementById('searchQuery').value;
        if (!searchInput.trim()) {  // Trim whitespace and check if the input is empty
            event.preventDefault(); // Prevent the form from submitting

            // Update the warning message
            warningDiv.innerHTML = "<label>Please enter a meaningful search query.</label>";
            warningDiv.style.color = 'red'; // Set the color of the message to red
            warningDiv.style.visibility = 'visible'; // Make sure the message is visible
        } else {
            warningDiv.innerHTML = ""; // Clear any previous warning message if the input is valid
        }
    });
});
