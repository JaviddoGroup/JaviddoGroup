document.addEventListener('DOMContentLoaded', () => {
    // Инициализация карты Leaflet
    const map = L.map('map').setView([55.751244, 37.618423], 10); // Центр карты (Москва)

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

        const marker = L.marker(coords).addTo(map)
            .bindPopup(name);
        markers[branchId] = marker;

        branch.addEventListener('click', () => {
            showBranchDetails(branchId, name, details, coords, imgSrc);
        });

        branch.addEventListener('mouseover', () => {
            highlightBranchOnMap(branchId);
        });

        branch.addEventListener('mouseout', () => {
            resetMapHighlight();
        });
    });

    function showBranchDetails(branchId, name, details, coords, imgSrc) {
        branchName.textContent = name;
        branchDetails.textContent = details;
        branchImg.src = imgSrc;
        branchImg.style.display = 'block';
        zoomToBranch(coords);
    }

    function highlightBranchOnMap(branchId) {
        if (markers[branchId]) {
            markers[branchId].openPopup();
        }
    }

    function resetMapHighlight() {
        for (const marker of Object.values(markers)) {
            marker.closePopup();
        }
    }

    function zoomToBranch(coords) {
        map.setView(coords, 15);
    }
});
