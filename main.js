const accessKey = 'aK2MTMIZAzXB7bNLTdM0Ndo6PUertd2gxE5i27F03qQ'; // استبدل بمفتاح الوصول الخاص بك
const carouselInner = document.querySelector('.carousel-inner');
const gallery = document.getElementById('gallery');
const pagination = document.getElementById('pagination');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const downloadButton = document.getElementById('downloadButton');

let currentPage = 1; // الصفحة الحالية

async function fetchImages(page = 1) {
  try {
    const response = await fetch(`https://api.unsplash.com/photos?page=${page}&per_page=30&client_id=${"aK2MTMIZAzXB7bNLTdM0Ndo6PUertd2gxE5i27F03qQ"}`);
    
    const images = await response.json();
    updateCarousel(images.slice(0, 3));
    updateGallery(images.slice(3));
    updatePagination(page);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function updateCarousel(images) {
  carouselInner.innerHTML = images
    .map((image, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img src="${image.urls.regular}" class="d-block w-100" alt="${image.alt_description}" style="height: 400px; object-fit: cover;">
      </div>
    `)
    .join('');
}

function updateGallery(images) {
  gallery.innerHTML = images
    .map(image => `
      <div onclick="openModal('${image.urls.full}', '${image.links.download}')">
        <img src="${image.urls.small}" alt="${image.alt_description}" style="width: 100%; height: auto; border-radius: 8px;">
      </div>
    `)
    .join('');
}

function updatePagination(currentPage) {
  pagination.innerHTML = `
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" onclick="fetchImages(${currentPage - 1})">Previous</a>
    </li>
    <li class="page-item"><a class="page-link" href="#" onclick="fetchImages(${currentPage})">${currentPage}</a></li>
    <li class="page-item"><a class="page-link" href="#" onclick="fetchImages(${currentPage + 1})">${currentPage + 1}</a></li>
    <li class="page-item">
      <a class="page-link" href="#" onclick="fetchImages(${currentPage + 1})">Next</a>
    </li>
  `;
}

function openModal(imageUrl, downloadUrl) {
  modal.style.display = 'flex';
  modalImage.src = imageUrl;
  downloadButton.onclick = () => downloadImage(downloadUrl);
}

function closeModal() {
  modal.style.display = 'none';
}

function downloadImage(url) {
  const a = document.createElement('a');
  a.href = url;
  a.download = '';
  a.click();
}

// تحميل الصور عند فتح الصفحة
fetchImages();
