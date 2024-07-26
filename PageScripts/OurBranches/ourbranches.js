document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([29.3277438, 120.1020622], 17); // Центр карты (Москва)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const branches = document.querySelectorAll('.branch');
    const branchName = document.getElementById('branch-name');
    const branchDetails = document.getElementById('branch-details');
    const branchImg = document.getElementById('branch-img');

    const markers = {};

    branches.forEach(branch => {
        const branchId = branch.getAttribute('data-id');
        const name = branch.querySelector('h3').textContent;
        const details = branch.querySelector('.details').textContent;
        const coords = branch.querySelector('.coords').textContent.split(',').map(Number);
        const imgSrc = branch.querySelector('.img').getAttribute('src');
        const email = branch.querySelector('.email a').textContent;
        const phone = branch.querySelector('.phone a').textContent;

        const marker = L.marker(coords).addTo(map)
            .bindPopup(name)
            .on('click', () => {
                showBranchDetails(name, details, imgSrc, coords, email, phone);
            });

        markers[branchId] = marker;

        branch.addEventListener('click', () => {
            showBranchDetails(name, details, imgSrc, coords, email, phone);
        });
    });

    function showBranchDetails(name, details, imgSrc, coords, email, phone) {
        branchName.textContent = name;
        branchDetails.innerHTML = `<strong>Email:</strong> <a href="mailto:${email}">${email}</a><br><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a><br>${details}`;
        branchImg.src = imgSrc;
        branchImg.style.display = 'block';
        zoomToBranch(coords);
    }

    function zoomToBranch(coords) {
        map.setView(coords, 17);
    }
});




document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.branches-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    // Для поддержки мыши
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1; // Скорость прокрутки
        slider.scrollLeft = scrollLeft - walk;
    });

    // Для поддержки сенсорных устройств
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchend', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 1; // Скорость прокрутки
        slider.scrollLeft = scrollLeft - walk;
    });
});




