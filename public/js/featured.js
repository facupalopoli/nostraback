

  
document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.querySelector('.prev-btn1');
    const nextBtn = document.querySelector('.next-btn1');
    const productContainer = document.querySelector('.product-container');

    let scrollAmount = 0;
    const desktopProductWidth = 400; // Adjust this value as per your product card width in desktop view
    const tabletProductWidth = 300; // Adjust this value as per your product card width in tablet view
    const phoneProductWidth = 215; // Adjust this value as per your product card width in phone view
    const gap = 15; // Adjust this value to match the gap between product cards
    let visibleProducts = 3; // Initial value for desktop view

    function updateVisibleProducts() {
        if (window.innerWidth >= 1024) {
            visibleProducts = 3; // Desktop view
        } else if (window.innerWidth >= 768) {
            visibleProducts = 2; // Tablet view
        } else {
            visibleProducts = 1; // Phone view
        }
    }

    function updateScrollAmount() {
        let productWidth;

        if (visibleProducts === 3) {
            productWidth = desktopProductWidth;
        } else if (visibleProducts === 2) {
            productWidth = tabletProductWidth;
        } else {
            productWidth = phoneProductWidth;
        }

        const totalWidth = productWidth * visibleProducts + gap * (visibleProducts + 1);
        scrollAmount = Math.min(scrollAmount, (totalGroups + 1) * totalWidth);
        productContainer.style.transform = `translateX(-${scrollAmount}px)`;
    }

    function updateButtons() {
        prevBtn.disabled = scrollAmount <= 0;
        nextBtn.disabled = scrollAmount >= (totalGroups + 1 ) * (desktopProductWidth + gap);
    }

    function handleResize() {
        updateVisibleProducts();
        updateScrollAmount();
        updateButtons();
    }

    const totalProducts = document.querySelectorAll('.cardProduct1').length;
    const totalGroups = Math.ceil(totalProducts / visibleProducts);

    window.addEventListener('resize', () => {
        handleResize();
    });

    nextBtn.addEventListener('click', () => {
        let productWidth;

        if (visibleProducts === 3) {
            productWidth = desktopProductWidth;
        } else if (visibleProducts === 2) {
            productWidth = tabletProductWidth;
        } else {
            productWidth = phoneProductWidth;
        }

        scrollAmount += (productWidth + gap) * visibleProducts;
        updateScrollAmount();
        updateButtons();
    });

    prevBtn.addEventListener('click', () => {
        let productWidth;

        if (visibleProducts === 3) {
            productWidth = desktopProductWidth;
        } else if (visibleProducts === 2) {
            productWidth = tabletProductWidth;
        } else {
            productWidth = phoneProductWidth;
        }

        scrollAmount -= (productWidth + gap) * visibleProducts;
        updateScrollAmount();
        updateButtons();
    });

    handleResize();
});
