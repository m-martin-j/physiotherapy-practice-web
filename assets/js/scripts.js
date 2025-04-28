---
---
{}

var windowLoaded = false;  // NOTE: currently unused
window.onload = function() {
  windowLoaded = true;
}

document.addEventListener('DOMContentLoaded', function () {
  launchAnnouncementModal();
  launchCookieConsent();
  checkCookieConsent();
});



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

const defaultObsOptions = {
  rootMargin: '0% 0% 0% 0%',
  threshold: 1.0
  //https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
};
const getObsOptionsForElement = (el) => {
  const customMargin = el.getAttribute('data-root-margin');
  const customThreshold = el.getAttribute('data-threshold');
  return {
    rootMargin: customMargin || defaultObsOptions.rootMargin,
    threshold: customThreshold ? parseFloat(customThreshold) : defaultObsOptions.threshold
  };
};

document.querySelectorAll('[data-inviewport]').forEach(el => {
  const obsOptions = getObsOptionsForElement(el);
  const observer = new IntersectionObserver(handleIntersectionOnce, obsOptions);
  observer.observe(el);
});

// announcementModal
function launchAnnouncementModal() {
  const startDate = new Date("{{ site.data.announcement-modal.start_date }}");
  const endDate = new Date("{{ site.data.announcement-modal.end_date }}");
  const today = new Date();
  const todayStr = today.toDateString();

  const modalVersion = startDate.toDateString().replace(/ /g, "_");
  const modalShownKey = `announcementModalSeen-${modalVersion}`;
  const lastShownDate = localStorage.getItem(modalShownKey);

  if (
    today >= startDate && today <= endDate &&
    lastShownDate !== todayStr
  ) {
    const announcementModal = new bootstrap.Modal(document.getElementById('announcementModal'));
    announcementModal.show();

    // Set the modal to be shown only once per day
    document.getElementById('announcementModal').addEventListener('hidden.bs.modal', function () {
      localStorage.setItem(modalShownKey, todayStr);
    });
  }
}

// cookies
function createCookie(name, value, days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  createCookie(name, "", -1);
}

function launchCookieConsent() {
  if (readCookie('cookie-consent') === 'full' || readCookie('cookie-consent') === 'necessary-only') {
    return;
  } else {
    showCookieConsentBanner();
  }
}
function showCookieConsentBanner() {
  let cookieConsentBanner = document.getElementById('cookie-consent-banner');
  cookieConsentBanner.classList.remove('hidden');
  cookieConsentBanner.removeAttribute('aria-hidden');
  document.getElementById('cookie-consent-banner-backdrop').classList.remove('hidden');

  document.getElementById('cookie-consent-accept').addEventListener("click", function() {
    createCookie('cookie-consent', 'full', 31);
    hideCookieConsentBanner();
    location.reload();
  });
  document.getElementById('cookie-consent-limited').addEventListener("click", function() {
    createCookie('cookie-consent', 'necessary-only', 31);
    hideCookieConsentBanner();
    location.reload();
  });
}
function hideCookieConsentBanner() {
  let cookieConsentBanner = document.getElementById('cookie-consent-banner');
  cookieConsentBanner.classList.add('hidden');
  cookieConsentBanner.setAttribute('aria-hidden', 'true');
  let cookieConsentBannerBackdrop = document.getElementById('cookie-consent-banner-backdrop');
  cookieConsentBannerBackdrop.classList.add('hidden');
  cookieConsentBannerBackdrop.setAttribute('aria-hidden', 'true');
}

// cookie consent for embedding third-party content
function checkCookieConsent() {  // checks if the cookie consent is given for certain HTML elements
  relevant_elements = document.querySelectorAll('[data-cookie-consent]');
  if (relevant_elements.length === 0) {
    return;
  }

  let consent_given_full = readCookie('cookie-consent') === 'full';

  for (let i = 0; i < relevant_elements.length; i++) {
    let element = relevant_elements[i];
    let consentName = element.getAttribute('data-cookie-consent');

    if (consent_given_full  // embed the element
        || readCookie('cookie-consent-' + consentName) === 'true') {
      if (typeof window[consentName] === 'function') {
        window[consentName]();
      }
    } else {  // show the consent add button for belated consent
      let consentAdd = document.querySelector('[data-cookie-consent-add="' + consentName + '"]');
      if (consentAdd) {
        consentAdd.classList.remove('hidden');
        consentAdd.removeAttribute('aria-hidden');
        let consentAddButton = consentAdd.querySelector('.cookie-consent-add-button');
        consentAddButton.addEventListener('click', function () {
          createCookie('cookie-consent-' + consentName, 'true', 31);
          location.reload();
        });
      } else {
        console.warn('No consent add element found for: ', consentName);
      }
    }
  }
}

// embed Google Maps
function embedGoogleMaps() {
  let gmapscont = document.getElementById('google-maps-container');
  gmapscont.innerHTML = `
      <iframe src="{{ site.data.third-party.google_maps.embed }}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
  gmapscont.classList.remove('hidden');
}
