// $(document).ready(function() {
//     var cardContainer = $('.divProducts1');
//     var cardWidth = $('.cardProduct').outerWidth(true);
//     var cardsToShow = 2;
//     var scrollAmount = cardWidth * cardsToShow;
  
      
//       $(window).on('resize', function() {
//         if ($(window).width() < 780) {
//           cardsToShow = 2;
//           scrollAmount = (cardWidth + 30) * cardsToShow;
//       } else {
//           cardsToShow = 4;
//           scrollAmount = (cardWidth + 17) * cardsToShow;
//           cardContainer.css('transform', '');
//       }
//       }).resize();
  
//       $('.next-btn').click(function() {
//       cardContainer.animate({ scrollLeft: '+=' + scrollAmount }, 'slow');
//       });
  
//       $('.prev-btn').click(function() {
//       cardContainer.animate({ scrollLeft: '-=' + scrollAmount }, 'slow');
//       });
//   });

document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.querySelector('.prev-btn1');
  const nextBtn = document.querySelector('.next-btn1');
  const productContainer = document.querySelector('.product-container');

  let scrollAmount = 0;
  const productWidth = 400; // Adjust this value as per your product card width
  const visibleProducts = 3;
  const totalProducts = document.querySelectorAll('.cardProduct1').length;
  const totalGroups = Math.ceil(totalProducts / visibleProducts);

  nextBtn.addEventListener('click', () => {
      scrollAmount += (productWidth+15) * (visibleProducts);
      productContainer.style.transform = `translateX(-${scrollAmount}px)`;

      if (scrollAmount >= (totalGroups - 1) * productWidth * visibleProducts) {
          nextBtn.disabled = true;
      }

      prevBtn.disabled = false;
  });

  prevBtn.addEventListener('click', () => {
      scrollAmount -= (productWidth+15) * visibleProducts;
      productContainer.style.transform = `translateX(-${scrollAmount}px)`;

      if (scrollAmount === 0) {
          prevBtn.disabled = true;
      }

      nextBtn.disabled = false;
  });
});

  
