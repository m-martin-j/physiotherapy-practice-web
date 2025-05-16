# Website

Copyright (c) 2024-2025 Martin Trat.


## Pages
* The `role` attribute is currently only used for page `services`. It enables identifying a page to be included as parent page in breadcrumbs.

### Home Page
* Intro image
  * If it is changed, tweaking in [_sass/components/_intro-image.scss](_sass/components/_intro-image.scss) might become necessary.
  * It could look nice, if it is very white on the left, as the text and the call box could be placed overlapping.

### Informationen
* Source
  * Markdown/Content: [_pages/infos.md](_pages/infos.md)
  * Layout: [_layouts/infos.html](_layouts/infos.html)
  * Data from [_data/infos.yml](_data/infos.yml) - used in accordion

### Leistungen
* Source
  * Markdown/Content: files in folder [_services](_services)
  * Layout overview: [_layouts/services.html](_layouts/services.html)
  * Layout individual service page: [_layouts/service.html](_layouts/service.html)
* breadcrumbs
  * the divider is set in [_sass/_bootstrap-variables.scss](_sass/_bootstrap-variables.scss)
  * Layout: [_sass/components/_breadcrumb.scss](_sass/components/_breadcrumb.scss)
* frontmatter attributes
  * `voucher`: if set to true, the service is displayed separately from other services on the service overview page; currently, it is not displayed on the landing page; only the first page with `voucher` set to true is processed --> only one page should be assigned this attribute with value true - others will not be shown!
  * `show_call_button`: if set to true, a call button will be displayed on the bottom of the page.
  * `call_button_text`: if set, the button default text is replaced.
  * `call_button_purpose`: if set to `"voucher_request"`, the user is redirected to the contact form on the contact page with the reason Gutschein being pre-selected via a query parameter. If not set, the button takes the user to the contact page without page anchors or query parameters.

### About
(Über Carmen)
* Team info
  * Source
    * Markdown: [_pages/about.md](_pages/about.md), [_team](_team)
    * Layout: [_layouts/about.html](_layouts/about.html)
    * Media: [images/team](images/team)
  * Team member container (suitable for a team of 2 or more persons) - currently hidden (see Layout)
    * Reads from member Markdown files
    * Style with highlight personnel: Set `promoted: true` in member Markdown file
    * `_config.yml`: Output of the `_team` folder must be enabled:
      ```yml
      team:
        output: true
      ```
* Practice info


## Menu
* Data: [_data/menus.yml](_data/menus.yml)
* Layout: [_includes/main-menu.html](_includes/main-menu.html), [_includes/main-menu-mobile.html](_includes/main-menu-mobile.html)
  * if a data element has `online_appointment_btn: true`, it is rendered as a button and a click opens a new tab
  * if a data element has `external: true`, a click opens a new tab
* SCSS: [_sass/components/_main-menu.scss](_sass/components/_main-menu.scss), [_sass/components/_main-menu-mobile.scss](_sass/components/_main-menu-mobile.scss)
  * variable `$switch-menu-mobile-desktop-breakpoint` defined in [assets/css/style.scss](assets/css/style.scss) controls the breakpoint, on which mobile is replaced by desktop menu
  * using `color.scale($primary, $alpha: VALUE%);` instead of `opacity: VALUE;` enables children to override transparency
* JavaScript: [assets/js/scripts.js](assets/js/scripts.js) sections `mobile menu` and `shrinking the header on scroll`


## Footer/Sub-Footer
### Footer
TBD

### Sub-Footer
#### Socials
* Source
  * Data: Data is included based on [_data/social.json](_data/social.json); expected fields per item are:
    ```json
    "name": "<name of the social element>",
    "link": "<link to the social element's web presence/URI>",
    "image": "images/social/<image file, svg preferred>"
    ```
    * special case: If the `"name"` value equals to `"E-Mail"`, no further json fields are evaluated. Further data is read from [_data/contact.yml](_data/contact.yml).
  * Layout: [_includes/social.html](_includes/social.html)


## Announcement Modal
* Source
  * HTML: [_layouts/default.html](_layouts/default.html) - before `</body>`
  * SCSS: [_sass/components/_modal.scss](_sass/components/_modal.scss)
  * JavaScript [assets/js/scripts.js](assets/js/scripts.js) - see comment `announcementModal`
  * Data: [_data/announcement-modal.yml](_data/announcement-modal.yml)
* Activation
  * Date-based: By setting `start_date` and `end_date` in above-referred data file.
  * It is shown to visitors once per day, using local storage.
* Content
  * via above-referred data file.

## Accordion
* Listing as Bootstrap Accordion
  * SCSS: [_sass/components/_accordion.scss](_sass/components/_accordion.scss)
  * HTML: [_includes/details-accordion.html](_includes/details-accordion.html)
  * Functionality (pass as arguments to `{%include details-accordion.html ... %}`)
    * `id` needs to be provided to make it unique
    * `sort_elements`: Sorting by data `title` if true
    * `uncollapse_first`: Uncollapsing first if true
  * Data
    * `title` shown in header of element
    * `content` rendered as p of element
    * `bullets` is an array of bullet point strings (if bullets provided, `content` is optional)
    * `link` needs attributes `external` set to true|false, `url` set to url|absolute path to internal file, `text` set to the url's text. Its attribute `url_anchor` is optional and is, it set, appended to urls.


## Style
### Fonts
* This project uses Arial as base font (Helvetica only if the user happens to have it installed) and self-hosted Quicksand as heading font.
* For using variable fonts (such as Quicksand), see e.g. [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide).
* Source
  * pre-load font in HTML: [_layouts/default.html](_layouts/default.html)
  * process font in scss: [_sass/components/_fonts.scss](_sass/components/_fonts.scss)
  * set font-family-related variable in scss: [assets/css/style.scss](assets/css/style.scss)

### Animations
* fly-in
  * Source
    * SCSS: [_sass/components/_animation.scss](_sass/components/_animation.scss) - `@keyframes flyIn`, `data-inviewport`
    * JavaScript: [assets/js/scripts.js](assets/js/scripts.js)
    * example HTML: [_layouts/about.html](_layouts/about.html)
  * Usage:
    * globally, any CSS class can use the flyIn animation keyframes
    * The style variable `--fly-in-start-x` can be optionally overwritten. E.g. negative percentage values to fly in from the left.
    * Optionally, html elements can be assigned the `data-inviewport` attribute. Then, the animation will only be activated once it is visible in the viewport via JavaScript.
      * Additionally, the HTML attributes `data-root-margin` and `data-threshold` can optionally be set to control options passed to the IntersectionObserver (deviating from default values).
      * Additionally, the HTML attribute `data-insuccession` can optionally be set (with arbitrary value) to apply the keyframes on the children with delay and increasing horizontal displacement one after another


## Cookies
* Data
  * validity duration: [_config.yml](_config.yml) - `cookies.expiry_days`
* JavaScript: [assets/js/scripts.js](assets/js/scripts.js) - section `cookies`
  * Logic:
    * If an HTML element is assigned the attribute `data-cookie-consent`, the embedding of third-party code is prevented until the user's cookie consent is verified (function `checkCookieConsent`). The value of this attribute needs to correspond to the name of a function in the scripts file. If appropriate consent is given, this function will embed necessary elements.
    * If an HTML element is ADDITIONALLY assigned the attribute `data-cookie-consent-necessary`, only necessary consent needs to be given by the user (for functional necessities of the website). If this attribute is not assigned, a consent add button for delayed user consent is shown.
* HTML
  * consent banner: [_includes/cookie-consent-banner.html](_includes/cookie-consent-banner.html)
  * consent add button: [_includes/cookie-consent-add-button.html](_includes/cookie-consent-add-button.html)


## Third-Party Integrations
### Contact Form
* HTML: [_includes/contact-form.html](_includes/contact-form.html)
* JavaScript: [assets/js/scripts.js](assets/js/scripts.js) - section `contact form` and `embed Google ReCAPTCHA`
* Data: [_data/third-party.yml](_data/third-party.yml)

### Google Maps
* JavaScript: [assets/js/scripts.js](assets/js/scripts.js) - section `embed Google Maps`
* Data: [_data/third-party.yml](_data/third-party.yml)


## Development
* Dependencies: ruby with gems, jekyll, bundler (https://jekyllrb.com/docs/installation/)
* Launch website serving
  ```sh
  bundle exec jekyll serve --baseurl "/"  # optionally add --verbose
  ```
* Update gems (e.g. to match the dependencies on the build system)
  ```sh
  bundle update
  ```
* bots: a curated list for [robots.xml](robots.xml) to prevent scraping for AI training purposes: https://neil-clarke.com/block-the-bots-that-feed-ai-models-by-scraping-your-website/


## Problems
* Encountered sticky header to flow out to top on scroll down, horizontally non-centered main-menu-mobile --> solved by applying `overflow: hidden` on `.intro` ([_sass/components/_intro.scss](_sass/components/_intro.scss))


## Understanding Jekyll
### Assets
* CSS and SASS/SCSS (https://jekyllrb.com/docs/step-by-step/07-assets/)
  1. Necessary files: /assets/css/<STYLE_SHEET_FILE_NAME>.scss (or .css)
  1. Imports in the .scss file are typically searched in the _sass folder on root level
  1. Jekyll builds the file /assets/css/<STYLE_SHEET_FILE_NAME>.scss to a _site/assets/css/<STYLE_SHEET_FILE_NAME>.css file
  1. An html (index) file needs to link the built css file with the correct name using `<link href="{{ '/assets/css/<STYLE_SHEET_FILE_NAME>.css' | relative_url }}" rel="stylesheet">` in the header

## Usage
* Jekyll
  ```sh
  bundle exec jekyll serve --baseurl "/"
  ```
* Jekyll with SSL encryption for development
  * Create an SSL crt and key and move them into folder `custom_cert`
  * Serve
    ```sh
    bundle exec jekyll serve --baseurl "/" --ssl-key custom_cert/localhost.key --ssl-cert custom_cert/localhost.crt
    ```


## Hosting
### Apache
#### Redirect
* http to https: This is achieved via a `.htaccess` file, placed inside the web root directory (e.g. `/var/www/your_domain/.htaccess` or at parent locations - see also the documentation of [Apache.org](https://httpd.apache.org/docs/trunk/howto/htaccess.html#when)), with the following content:
  ```
  RewriteEngine On
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]
  ```

## Acknowledgments
This website is based on the Serif theme (credit: https://github.com/zerostaticthemes/jekyll-serif-theme, [license](licenses/jekyll-serif-theme)).

It employs the following software:
* [Bootstrap](https://getbootstrap.com/) v5.3.5 ([license](licenses/bootstrap))
* Quicksand font ([license](licenses/Quicksand))
