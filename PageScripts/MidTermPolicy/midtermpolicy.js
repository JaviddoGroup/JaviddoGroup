document.addEventListener('DOMContentLoaded', function () {
    const policyItems = document.querySelectorAll('.policy-item');

    policyItems.forEach(policy => {
        policy.addEventListener('mouseenter', () => {
            policy.style.transform = 'scale(1.05)';
            policy.style.transition = 'transform 0.3s ease-in-out';
        });

        policy.addEventListener('mouseleave', () => {
            policy.style.transform = 'scale(1)';
        });
    });
});
