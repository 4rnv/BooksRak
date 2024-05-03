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
    document.querySelectorAll('.like-button').forEach(button => {
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
                    this.textContent = `❤ ${data.new_likes}`;
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