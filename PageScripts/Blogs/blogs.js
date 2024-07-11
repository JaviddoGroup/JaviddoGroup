document.addEventListener('DOMContentLoaded', () => {
    const blogs = document.querySelectorAll('.blog');
    const searchInput = document.getElementById('search');
    const bookmarkFilter = document.getElementById('bookmarkFilter');
    let currentPage = 1;
    const blogsPerPage = 12;

    // Загрузка состояния закладок из localStorage при загрузке страницы
    loadBookmarksState();

    // Обновление видимых блогов
    function updateVisibleBlogs() {
        const query = searchInput.value.toLowerCase();
        const showBookmarks = bookmarkFilter.classList.contains('active');

        blogs.forEach(blog => {
            const title = blog.querySelector('h2').textContent.toLowerCase();
            const isBookmarked = blog.querySelector('.bookmark-icon').classList.contains('active');
            const matchesSearch = title.includes(query);
            const shouldShow = (!showBookmarks || isBookmarked) && matchesSearch;

            blog.dataset.shouldShow = shouldShow ? 'true' : 'false';
        });

        updatePagination();
    }

    // Поиск блогов
    searchInput.addEventListener('input', updateVisibleBlogs);

    // Фильтр закладок
    bookmarkFilter.addEventListener('click', () => {
        bookmarkFilter.classList.toggle('active');
        updateVisibleBlogs();
    });

    // Пагинация
    function updatePagination() {
        const visibleBlogs = Array.from(blogs).filter(blog => blog.dataset.shouldShow === 'true');
        const totalBlogs = visibleBlogs.length;
        const totalPages = Math.ceil(totalBlogs / blogsPerPage);

        if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        document.getElementById('page-number').textContent = `${currentPage} / ${totalPages}`;

        blogs.forEach(blog => {
            blog.style.display = 'none';
        });

        visibleBlogs.forEach((blog, index) => {
            if (index >= (currentPage - 1) * blogsPerPage && index < currentPage * blogsPerPage) {
                blog.style.display = '';
            }
        });

        document.getElementById('prev-page').disabled = (currentPage === 1);
        document.getElementById('next-page').disabled = (currentPage === totalPages);
    }

    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        const visibleBlogs = Array.from(blogs).filter(blog => blog.dataset.shouldShow === 'true');
        const totalBlogs = visibleBlogs.length;
        const totalPages = Math.ceil(totalBlogs / blogsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });

    // Всплывающие окна
    blogs.forEach(blog => {
        const popup = blog.querySelector('.blog-popup');
        const closeBtn = popup.querySelector('.close');
        const bookmarkIcon = blog.querySelector('.bookmark-icon');

        blog.addEventListener('click', () => {
            popup.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener('click', (event) => {
            popup.style.display = 'none';
            document.body.style.overflow = '';
            event.stopPropagation();
        });

        window.addEventListener('click', (event) => {
            if (event.target == popup) {
                popup.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

        bookmarkIcon.addEventListener('click', (event) => {
            bookmarkIcon.classList.toggle('active');
            saveBookmarksState(); // Сохраняем состояние закладок при изменении
            event.stopPropagation();
        });
    });

    // Функция загрузки состояния закладок из localStorage
    function loadBookmarksState() {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarks.forEach(blogId => {
            const blog = document.querySelector(`.blog[data-id="${blogId}"]`);
            if (blog) {
                blog.querySelector('.bookmark-icon').classList.add('active');
            }
        });
    }

    // Функция сохранения состояния закладок в localStorage
    function saveBookmarksState() {
        const bookmarks = [];
        blogs.forEach(blog => {
            const blogId = blog.dataset.id;
            if (blog.querySelector('.bookmark-icon').classList.contains('active')) {
                bookmarks.push(blogId);
            }
        });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Инициализация видимых блогов и пагинации
    updateVisibleBlogs();
});






function copyText(iconNumber) {
    let textToCopy = '';
    switch (iconNumber) {
        case 1:
            textToCopy = 'Текст для иконки 1';
            break;
        case 2:
            textToCopy = 'Текст для иконки 2';
            break;
        case 3:
            textToCopy = 'Текст для иконки 3';
            break;
        case 4:
            textToCopy = 'Текст для иконки 4';
            break;
        case 5:
            textToCopy = 'Текст для иконки 5';
            break;
        case 6:
            textToCopy = 'Текст для иконки 6';
            break;
        case 7:
            textToCopy = 'Текст для иконки 1';
            break;
        case 8:
            textToCopy = 'Текст для иконки 2';
            break;
        case 9:
            textToCopy = 'Текст для иконки 3';
            break;
        case 10:
            textToCopy = 'Текст для иконки 4';
            break;
        case 11:
            textToCopy = 'Текст для иконки 5';
            break;
        case 12:
            textToCopy = 'Текст для иконки 6';
            break;
        case 13:
            textToCopy = 'Текст для иконки 1';
            break;
        case 14:
            textToCopy = 'Текст для иконки 2';
            break;
        case 15:
            textToCopy = 'Текст для иконки 3';
            break;
        case 15:
            textToCopy = 'Текст для иконки 15';
            break;
        case 16:
            textToCopy = 'Текст для иконки 5';
            break;
        case 17:
            textToCopy = 'Текст для иконки 6';
            break;
        case 18:
            textToCopy = 'Текст для иконки 1';
            break;
        case 19:
            textToCopy = 'Текст для иконки 2';
            break;
        case 20:
            textToCopy = 'Текст для иконки 3';
            break;
        case 21:
            textToCopy = 'Текст для иконки 4';
            break;
        case 22:
            textToCopy = 'Текст для иконки 5';
            break;
        case 23:
            textToCopy = 'Текст для иконки 6';
            break;
        case 24:
            textToCopy = 'Текст для иконки 1';
            break;
        case 25:
            textToCopy = 'Текст для иконки 2';
            break;
        case 26:
            textToCopy = 'Текст для иконки 3';
            break;
        case 27:
            textToCopy = 'Текст для иконки 4';
            break;
        case 28:
            textToCopy = 'Текст для иконки 5';
            break;
        case 29:
            textToCopy = 'Текст для иконки 6';
            break;
        case 30:
            textToCopy = 'Текст для иконки 1';
            break;
        case 31:
            textToCopy = 'Текст для иконки 2';
            break;
        case 32:
            textToCopy = 'Текст для иконки 3';
            break;
        case 33:
            textToCopy = 'Текст для иконки 4';
            break;
        case 34:
            textToCopy = 'Текст для иконки 5';
            break;
        case 35:
            textToCopy = 'Текст для иконки 6';
            break;
        case 36:
            textToCopy = 'Текст для иконки 6';
            break;
        default:
            textToCopy = 'По умолчанию текст';

    }

    // Копируем текст в буфер обмена
    const copyTextarea = document.getElementById('copyTextarea');
    copyTextarea.value = textToCopy;
    copyTextarea.select();
    document.execCommand('copy');
}


