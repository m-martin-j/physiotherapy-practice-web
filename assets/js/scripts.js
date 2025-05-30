---
---
{}

// constants
const cookieName = 'mvp-cookie-consent';
const recaptchaActivated = {{ site.data.third-party.google_recaptcha.activated }};
const announcementData = {{ site.data.announcements | jsonify }};

var windowLoaded = false;  // NOTE: currently unused
window.onload = function() {
  windowLoaded = true;
}

document.addEventListener('DOMContentLoaded', function () {
  launchAnnouncementModal();
  launchCookieConsent();
  checkCookieConsent();
  manageContactForm();
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
function getCurrentAnnouncement(today) {
  for (const ann of announcementData.modal) {
     // start_date and end_date are inclusive, daylight saving time is not accounted for
    const start = new Date(`${ann.start_date}T00:00:00+01:00`);
    const end = new Date(`${ann.end_date}T23:59:59.999+01:00`);
    if (today >= start && today <= end) {
      return ann;
    }
  }
  return null;
}
function launchAnnouncementModal() {
  const today = new Date();
  const todayStr = today.toDateString();

  const localStorageKey = 'mvp-announcementModalSeen';
  const lastShownDate = localStorage.getItem(localStorageKey);

  if (lastShownDate == todayStr) {
    return;
  } else {
    const ann = getCurrentAnnouncement(today);
    if (!ann) {  // no announcement for today
      localStorage.setItem(localStorageKey, todayStr);  // set announcement as seen anyway
      return;
    } else {
      const announcementModal = document.getElementById('announcementModal');
      const announcementModal_BS = new bootstrap.Modal(announcementModal);
      const modalTitle = announcementModal.querySelector('.modal-title');
      modalTitle.innerHTML = ann.title;
      const modalBody = announcementModal.querySelector('.modal-body');

      if (ann.vacation) {
        const vacationStartDate = new Date(ann.vacation.start_date);
        const vacationEndDate = new Date(ann.vacation.end_date);
        let vacationText = document.createElement('p');
        vacationText.innerHTML = `<strong>Wann:</strong> vom <strong>${vacationStartDate.toLocaleDateString('de-DE')}</strong> bis zum <strong>${vacationEndDate.toLocaleDateString('de-DE')}</strong>`;
        modalBody.appendChild(vacationText);
      }

      let content = document.createElement('div')
      content.innerHTML = ann.body;
      modalBody.appendChild(content);

      announcementModal_BS.show();

      document.getElementById('announcementModal').addEventListener('hidden.bs.modal', function () {
        localStorage.setItem(localStorageKey, todayStr);
      });
    }
  }
}

// cookies
function createCookie(name, value, days={{ site.cookies.expiry_days }}) {
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
function eraseAllButNecessaryCookie() {
  document.cookie.split(";").forEach(function(cookie) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
    if (name && name !== cookieName) {
      eraseCookie(name);
    }
  });
}

function launchCookieConsent() {
  if (readCookie(cookieName) === 'full' || readCookie(cookieName) === 'necessary-only') {
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
    createCookie(cookieName, 'full');
    hideCookieConsentBanner();
    location.reload();
  });
  document.getElementById('cookie-consent-limited').addEventListener("click", function() {
    createCookie(cookieName, 'necessary-only');
    eraseAllButNecessaryCookie();
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

  let consent_given_necessary = readCookie(cookieName) === 'necessary-only';
  let consent_given_full = readCookie(cookieName) === 'full';

  for (let i = 0; i < relevant_elements.length; i++) {
    let element = relevant_elements[i];
    let consentName = element.getAttribute('data-cookie-consent');
    let elementNecessary = element.getAttribute('data-cookie-consent-necessary');

    if (// embed the element
        consent_given_full  // full consent given
        || readCookie(cookieName + '-' + consentName) === 'true'  // consent given for this element
        || (elementNecessary && consent_given_necessary)  // necessary consent given and this element is necessary
      ) {
        // NOTE: without at least one of the above conditions being true, no element is embedded
        //  This satisfies the requirements of the GDPR
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
          createCookie(cookieName + '-' + consentName, 'true');
          location.reload();
        });
      } else {
        if (elementNecessary) {
          return;  // no consent add button for necessary elements
        }
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

// embed Google ReCAPTCHA
function embedReCAPTCHA() {
  const script = document.createElement('script');
  script.src = `{{ site.data.third-party.google_recaptcha.external }}{{ site.data.third-party.google_recaptcha.site_key }}`;
  script.defer = true;
  document.body.appendChild(script);
}

function evaluateGoogleReCAPTCHA(form) {
  // requiring the html input element "g-recaptcha-response" to be present in the form
  // TODO: or just create it in this function?
  grecaptcha.enterprise.ready(async () => {
    const token = await grecaptcha.enterprise
      .execute('{{ site.data.third-party.google_recaptcha.site_key }}', {action: 'submit'})
      .catch((error) => {
        console.error('Error executing reCAPTCHA:', error);
        return false;
      });
    if (token) {
      const recaptchaResponse = form.querySelector('input[name="g-recaptcha-response"]');
      recaptchaResponse.value = token;
      return true;
    } else {
      console.error('No reCAPTCHA token received');
      return false;
    }
  });
}

// contact form
function manageContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) {
    return;
  }

  // post submission, only show the success message
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('form-submit') === 'success') {
    replaceContactFormWithSuccess(form);
    return;
  }

  const reasonGutschein = form.querySelector('#Reason_Gutschein');
  const reasonGenerelleAnfrage = form.querySelector('#Reason_Generelle_Anfrage');
  const gutscheinwertDiv = form.querySelector('#Gutscheinwert__div');
  const gutscheinwertInput = form.querySelector('#Gutscheinwert');

  function toggleGutscheinwertDiv() {
    if (reasonGutschein.checked) {
      gutscheinwertDiv.classList.remove('hidden');
      gutscheinwertInput.setAttribute('required', 'required');
    } else {
      gutscheinwertDiv.classList.add('hidden');
      gutscheinwertInput.removeAttribute('required');
    }
  }

  reasonGutschein.addEventListener('change', toggleGutscheinwertDiv);
  reasonGenerelleAnfrage.addEventListener('change', toggleGutscheinwertDiv);

  if (urlParams.get('reason') === 'gutschein') {
    reasonGutschein.checked = true;
    toggleGutscheinwertDiv();
  }

  form.addEventListener('submit', function(event) {
    if (!form.checkValidity()) {  // not valid
      event.preventDefault();
      event.stopPropagation();
    }
    else {  // valid -> send the form
      event.preventDefault();
      const submitButton = form.querySelector('input[type="submit"]');
      submitButton.setAttribute('disabled', '');
      submitButton.value = 'Senden...';

      if (!recaptchaActivated) {
        form.submit();
      }

      else {
        let spamValid = evaluateGoogleReCAPTCHA(form);
        if (spamValid) {
          form.submit();
        } else {
          console.error('Spam validation failed');
          replaceContactFormWithError(form);
        }
      }
    }

    form.classList.add('was-validated');
  })
}
function hideContactForm(form) {
  form.classList.add('hidden');
  form.setAttribute('aria-hidden', 'true');
}
function replaceContactFormWithSuccess(form) {
  hideContactForm(form);

  const successMessage = document.createElement('div');
  successMessage.classList.add('alert', 'alert-primary', 'text-center');
  successMessage.setAttribute('role', 'alert');
  successMessage.innerHTML = `
    <strong>Vielen Dank für Ihre Nachricht!</strong>
    <br>
    Wir werden uns umgehend bei Ihnen melden.
  `;
  form.parentNode.insertBefore(successMessage, form);

}
function replaceContactFormWithError(form) {
  hideContactForm(form);

  const errorMessage = document.createElement('div');
  errorMessage.classList.add('alert', 'alert-danger', 'text-center');
  errorMessage.setAttribute('role', 'alert');
  errorMessage.innerHTML = `
    <p>Es gab einen Fehler bei der Übermittlung des Formulars. Bitte versuchen Sie es später erneut.</p>
  `;
  form.parentNode.insertBefore(errorMessage, form);
}
