document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.getElementById('dropdownMenuButton');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const selectedBranch = document.getElementById('selected-branch');
    const contactDetails = document.getElementById('contact-details');
    const contactItems = document.querySelectorAll('.contact-item');
    const arrowIcon = document.querySelector('.arrow-icon');

    // Показать данные для Китая по умолчанию
    contactDetails.classList.add('visible');
    document.querySelector('.contact-item[data-branch="china"]').classList.add('visible');

    dropdownToggle.addEventListener('click', function () {
        dropdownMenu.classList.toggle('show');
        arrowIcon.classList.toggle('rotate');
    });

    document.addEventListener('click', function (event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
            arrowIcon.classList.remove('rotate');
        }
    });

    dropdownMenu.addEventListener('click', function (event) {
        if (event.target.closest('.dropdown-item')) {
            const branch = event.target.closest('.dropdown-item').getAttribute('data-value');
            const branchText = event.target.closest('.dropdown-item').innerText.trim();
            selectedBranch.textContent = branchText;
            dropdownMenu.classList.remove('show');
            arrowIcon.classList.remove('rotate');

            contactItems.forEach(item => {
                if (item.getAttribute('data-branch') === branch) {
                    item.classList.add('visible');
                } else {
                    item.classList.remove('visible');
                }
            });

            contactDetails.classList.add('visible');
        }
    });
});