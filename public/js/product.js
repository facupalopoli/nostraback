function selectSize(button) {
    
    var buttons = document.getElementsByClassName("size-btn");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("selected");
    }
  
    
    button.classList.add("selected");
}



$(document).ready(function() {
    var counterValue = 1;

    $('.minus-btn').click(function() {
      if (counterValue > 1) {
        counterValue--;
        $('.counter-value').text(counterValue);
      }
    });

    $('.plus-btn').click(function() {
      counterValue++;
      $('.counter-value').text(counterValue);
    });
  });




$(document).ready(function() {
  var cardContainer = $('.divProducts');
  var cardWidth = $('.cardProduct').outerWidth(true);
  var cardsToShow = 2;
  var scrollAmount = cardWidth * cardsToShow;

    
    $(window).on('resize', function() {
      if ($(window).width() < 780) {
        cardsToShow = 2;
        scrollAmount = (cardWidth + 30) * cardsToShow;
    } else {
        cardsToShow = 4;
        scrollAmount = (cardWidth + 17) * cardsToShow;
        cardContainer.css('transform', '');
    }
    }).resize();

    $('.next-btn').click(function() {
    cardContainer.animate({ scrollLeft: '+=' + scrollAmount }, 'slow');
    });

    $('.prev-btn').click(function() {
    cardContainer.animate({ scrollLeft: '-=' + scrollAmount }, 'slow');
    });
});




document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  menuToggle.addEventListener('click', function() {
    menu.classList.toggle('active');
    
  });

});

document.addEventListener('DOMContentLoaded', function() {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(function(dropdown) {
    const trigger = dropdown.querySelector('a');
    const menu = dropdown.querySelector('.dropdown-menu');

    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      dropdowns.forEach(function(dropdown) {
        dropdown.classList.remove('active');
        
      });
      dropdown.classList.add('active');
    });

    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  });
});


