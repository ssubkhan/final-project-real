document.addEventListener('DOMContentLoaded', () => {
    // Handle image lightbox functionality
    const profileImages = document.querySelectorAll('.profile a'); // Select all profile image links
    const lightbox = document.getElementById('lightbox1'); // Image lightbox container
    const lightboxImage = lightbox.querySelector('img'); // Image element inside the lightbox
    const closeBtns = document.querySelectorAll('.close-btn'); // Close buttons for all lightboxes

    // Open image lightbox when a profile image is clicked
    profileImages.forEach(imageLink => {
        imageLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            const imgSrc = imageLink.querySelector('img').src; // Get the source of the clicked image
            lightboxImage.src = imgSrc; // Update the lightbox image source
            lightbox.style.display = 'block'; // Show the lightbox
        });
    });

    // Close lightbox when a close button is clicked
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.lightbox').style.display = 'none'; // Hide the parent lightbox
        });
    });

    // Handle bio lightbox functionality
    const bioButtons = document.querySelectorAll('.bio-button'); // Select all bio buttons
    const bioLightbox = document.getElementById('bioLightbox'); // Bio lightbox container
    const lightboxBioContent = document.getElementById('lightboxBioContent'); // Content area in bio lightbox

    // Open bio lightbox when a bio button is clicked
    bioButtons.forEach(button => {
        button.addEventListener('click', () => {
            const bioId = button.getAttribute('data-bio'); // Get the ID of the bio content
            const bioContent = document.getElementById(bioId).innerHTML; // Fetch the bio content
            lightboxBioContent.innerHTML = bioContent; // Inject bio content into the lightbox
            bioLightbox.style.display = 'block'; // Show the bio lightbox
        });
    });

    // Close the bio lightbox when clicking outside the content or on the close button
    bioLightbox.addEventListener('click', (event) => {
        if (event.target === bioLightbox || event.target === document.getElementById('closeBioLightbox')) {
            bioLightbox.style.display = 'none'; // Hide the bio lightbox
        }
    });

    // Check profile size and adjust bio visibility
    function checkProfileSize() {
        const profiles = document.querySelectorAll('.profile'); // Select all profiles

        profiles.forEach(profile => {
            const bioButton = profile.querySelector('.bio-button');
            const bio = profile.querySelector('.bio');

            const maxProfileWidth = 600; // Maximum width threshold

            if (profile.offsetWidth < maxProfileWidth) {
                bio.style.display = "none"; // Hide bio content
                bioButton.style.display = "inline-block"; // Show button
            } else {
                bio.style.display = "block"; // Show bio content
                bioButton.style.display = "none"; // Hide button
            }
        });
    }

    // Call checkProfileSize on page load and resize
    window.onload = checkProfileSize;
    window.onresize = checkProfileSize;
});
