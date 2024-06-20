document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.policy-block');

    blocks.forEach(block => {
        block.addEventListener('mouseover', () => {
            block.style.transition = 'transform 0.5s, background 0.5s, color 0.5s';
            block.style.transform = 'translateY(-10px)';
            block.style.background = '#FC6E27';
            block.style.color = '#fff';
        });

        block.addEventListener('mouseout', () => {
            block.style.transition = 'transform 0.5s, background 0.5s, color 0.5s';
            block.style.transform = 'translateY(0)';
            block.style.background = '#fff';
            block.style.color = '#000';
        });
    });
});
