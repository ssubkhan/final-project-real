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
            lightbox.setAttribute('aria-hidden', 'false');
            lightboxImage.focus(); // Focus on the lightbox image for accessibility
        });
    });

    // Close lightbox when a close button is clicked
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.lightbox').style.display = 'none'; // Hide the parent lightbox
            btn.closest('.lightbox').setAttribute('aria-hidden', 'true');
        });
    });

    // Handle bio lightbox functionality
    const bioButtons = document.querySelectorAll('.bio-button'); // Select all bio buttons
    const bioLightbox = document.getElementById('bioLightbox'); // Bio lightbox container
    const lightboxBioContent = document.getElementById('lightboxBioContent'); // Content area in bio lightbox
    const closeBioLightboxButton = document.getElementById('closeBioLightbox'); // Close button for bio lightbox

    // Open bio lightbox when a bio button is clicked
    bioButtons.forEach(button => {
        button.addEventListener('click', () => {
            const bioId = button.getAttribute('data-bio'); // Get the ID of the bio content
            const bioContent = document.getElementById(bioId).innerHTML; // Fetch the bio content
            lightboxBioContent.innerHTML = bioContent; // Inject bio content into the lightbox
            bioLightbox.style.display = 'block'; // Show the bio lightbox
            bioLightbox.setAttribute('aria-hidden', 'false');
            closeBioLightboxButton.focus(); // Focus on the close button for accessibility
        });
    });

    // Close the bio lightbox when clicking outside the content or on the close button
    bioLightbox.addEventListener('click', (event) => {
        if (event.target === bioLightbox || event.target === closeBioLightboxButton) {
            bioLightbox.style.display = 'none'; // Hide the bio lightbox
            bioLightbox.setAttribute('aria-hidden', 'true');
        }
    });

    // Handle keyboard navigation for the lightbox // use escape key to hop out
    function handleKeydown(event, lightboxElement) {
        if (event.key === 'Escape') {
            lightboxElement.style.display = 'none'; // Hide the lightbox
            lightboxElement.setAttribute('aria-hidden', 'true');
        }
    }

    document.addEventListener('keydown', (event) => {
        if (lightbox.style.display === 'block') {
            handleKeydown(event, lightbox);
        } else if (bioLightbox.style.display === 'block') {
            handleKeydown(event, bioLightbox);
        }
    });

    // Trap focus inside the lightbox
    function trapFocus(event, lightboxElement) {
        const focusableElements = lightboxElement.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        if (event.key === 'Tab') {
            if (event.shiftKey) {
                // Shift+Tab: If on the first element, cycle to the last element
                if (document.activeElement === firstFocusableElement) {
                    event.preventDefault();
                    lastFocusableElement.focus();
                }
            } else {
                // Tab: If on the last element, cycle to the first element
                if (document.activeElement === lastFocusableElement) {
                    event.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }
    }

    document.addEventListener('keydown', (event) => {
        if (lightbox.style.display === 'block') {
            trapFocus(event, lightbox);
        } else if (bioLightbox.style.display === 'block') {
            trapFocus(event, bioLightbox);
        }
    });

    // Check profile size and adjust bio visibility
    function checkProfileSize() {
        const profiles = document.querySelectorAll('.profile'); // Select all profiles

        profiles.forEach(profile => {
            const bioButton = profile.querySelector('.bio-button');
            const bio = profile.querySelector('.bio');

            const maxProfileWidth = 900; // Maximum width threshold

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

// Function to toggle high contrast mode
function toggleHighContrast() {
    const body = document.body;
    const toggleButton = document.getElementById('high-contrast-toggle');

    // Toggle the 'high-contrast' class on the body element
    body.classList.toggle('high-contrast');

    // Change button text based on the mode
    if (body.classList.contains('high-contrast')) {
        toggleButton.textContent = 'Disable High Contrast Mode';
    } else {
        toggleButton.textContent = 'Enable High Contrast Mode';
    }
}

