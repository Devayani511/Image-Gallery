// all imp HTML elements  selected
const galleryImages = document.querySelectorAll('.gallery-img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0; 

// 1. Image box
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex'; 
        lightboxImg.src = img.src;      
        currentIndex = index;         
    });
});

// 2. 'X' (Close) 
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// 3. lightbox
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// 4. (Next Button)
function showNextImage() {
    currentIndex++;
   
    if (currentIndex >= galleryImages.length) {
        currentIndex = 0;
    }
    lightboxImg.src = galleryImages[currentIndex].src;
}

// 5. (Previous Button)
function showPrevImage() {
    currentIndex--;
   
    if (currentIndex < 0) {
        currentIndex = galleryImages.length - 1;
    }
    lightboxImg.src = galleryImages[currentIndex].src;
}


nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    showPrevImage();
});

// 6.(Arrow Keys) and Escape key use navigation 
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'Escape') lightbox.style.display = 'none';
    }
});

// Select the download button
const downloadBtn = document.querySelector('.download-btn');

// Add click event listener to the button
downloadBtn.addEventListener('click', () => {
    // Get the image source URL from data-src attribute
    const imageSrc = downloadBtn.getAttribute('data-src');
    
    // Fetch the image as a blob to force direct download in Laptop/PC
    fetch(imageSrc)
        .then(response => response.blob())
        .then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = blobUrl;
            a.download = `Gallery_Image_${Date.now()}.jpg`; // Unique file name
            document.body.appendChild(a);
            a.click(); // Trigger click to download
            window.URL.revokeObjectURL(blobUrl);
            document.body.removeChild(a); // Clean up
        })
        .catch(() => {
            // Fallback method if fetch fails due to cross-origin security
            const a = document.createElement('a');
            a.href = imageSrc;
            a.download = 'download.jpg';
            a.target = '_blank';
            a.click();
        });
});