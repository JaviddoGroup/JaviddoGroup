document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.category');
    const searchInput = document.getElementById('search');
    const newsContainer = document.getElementById('news-container');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    let currentPage = 1;
    const newsPerPage = 9;
    let filteredNewsItems = []; // Array to store filtered news items

    const filterNews = () => {
        const activeCategory = document.querySelector('.category.active').getAttribute('data-category');
        const searchQuery = searchInput.value.toLowerCase();

        // Reset filtered news items
        filteredNewsItems = [];

        const allNewsItems = document.querySelectorAll('.news-item');

        allNewsItems.forEach(item => {
            const categoryText = item.getAttribute('data-category');
            const titleText = item.querySelector('.title').textContent.toLowerCase();
            const matchesCategory = activeCategory === 'all' || categoryText === activeCategory;
            const matchesSearch = titleText.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                filteredNewsItems.push(item);
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        const totalPages = Math.ceil(filteredNewsItems.length / newsPerPage);

        pageInfo.textContent = `${currentPage}/${totalPages}`;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;

        // Show only items for the current page
        showCurrentPageItems();
    };

    const showCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * newsPerPage;
        const endIndex = startIndex + newsPerPage;

        filteredNewsItems.forEach((item, index) => {
            if (index >= startIndex && index < endIndex) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    };

    categories.forEach(category => {
        category.addEventListener('click', () => {
            categories.forEach(cat => cat.classList.remove('active'));
            category.classList.add('active');
            currentPage = 1;
            filterNews();
        });
    });

    searchInput.addEventListener('input', () => {
        currentPage = 1;
        filterNews();
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            pageInfo.textContent = `${currentPage}/${Math.ceil(filteredNewsItems.length / newsPerPage)}`;
            showCurrentPageItems();
            updatePaginationButtons();
        }
    });

    nextPageButton.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredNewsItems.length / newsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            pageInfo.textContent = `${currentPage}/${totalPages}`;
            showCurrentPageItems();
            updatePaginationButtons();
        }
    });

    // Function to update pagination buttons state
    const updatePaginationButtons = () => {
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === Math.ceil(filteredNewsItems.length / newsPerPage);
    };

    // Initial filter and display
    filterNews();
});
