const boxes = document.querySelectorAll('.box');
const boxActiveImages = document.querySelectorAll('.background-image');

boxes.forEach((box, index) => {
    box.addEventListener('mouseover', () => {
        boxActiveImages.forEach((image) => {
            image.classList.remove('box-active');
            image.classList.add('box-inactive');
        });
        boxActiveImages[index].classList.remove('box-inactive');
        boxActiveImages[index].classList.add('box-active');
    });
});


