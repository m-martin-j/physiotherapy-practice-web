var windowLoaded = false;
window.onload = function() {
  windowLoaded = true;
}

// mobile menu
var body = document.querySelector('body')
var menuTrigger = document.querySelector('#toggle-main-menu-mobile');
var menuContainer = document.querySelector('#main-menu-mobile');

menuTrigger.onclick = function() {
    menuContainer.classList.toggle('open');
    menuTrigger.classList.toggle('is-active')
    body.classList.toggle('lock-scroll')
}

// shrinking the header on scroll
window.onscroll = function() {
  var header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.classList.add('header-shrink');
  } else {
    header.classList.remove('header-shrink');
  }
}

// keyframes flyIn animation
const inViewport = (entry) => {
  entry.target.classList.add("is-inViewport");
};

const handleIntersectionOnce = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      inViewport(entry);
      observer.unobserve(entry.target);  // handle intersection only once
    }
  })
};

const obsOptions = {
  rootMargin: '0% 0% -20% 0%',
  threshold: 1.0
  //https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
};
const Obs = new IntersectionObserver(handleIntersectionOnce, obsOptions);

document.querySelectorAll('[data-inviewport]').forEach(el => {
  Obs.observe(el);
});
