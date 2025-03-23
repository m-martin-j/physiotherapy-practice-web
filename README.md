# Website

Copyright (c) 2024-2025 Martin Trat.


## Pages
* If the the head title of the page shall correspond to `site.title`, use `title: SITE.TITLE` in the front matter of a page. (Function maintained in [_layouts/default.html](_layouts/default.html))
* The `role` attribute is currently only used for page `services`. It enables identifying a page to be included as parent page in breadcrumbs.

### Home Page
* Intro image
  * If it is changed, tweaking in [_sass/components/_intro-image.scss](_sass/components/_intro-image.scss) might become necessary.
  * It could look nice, if it is very white on the left, as the text and the call box could be placed overlapping.

### Informationen
* Source
  * Markdown/Content: [_pages/infos.md](_pages/infos.md)
  * Layout: [_layouts/infos.html](_layouts/infos.html)
* Component A-Z list as Bootstrap Accordion
  * Style from [_sass/components/_accordion.scss](_sass/components/_accordion.scss)
  * Data from [_data/infos.yml](_data/infos.yml)
  * Sorting via `title`
  * `content` rendered as p
  * `bullets` is an array of bullet point strings
  * `link` needs attributes `external` set to true|false, `url` set to url|absolute path to internal file, `text` set to the url's text

### Leistungen
* Source
  * Markdown/Content: files in folder [_services](_services)
  * Layout overview: [_layouts/services.html](_layouts/services.html)
  * Layout individual service page: [_layouts/service.html](_layouts/service.html)
* breadcrumbs
  * the divider is set in [_sass/_bootstrap-variables.scss](_sass/_bootstrap-variables.scss)
  * Layout: [_sass/components/_breadcrumb.scss](_sass/components/_breadcrumb.scss)
* frontmatter attributes
  * `voucher`: if set to true, the service is displayed separately from other services on the service overview page; currently, it is not displayed on the landing page; only the first page with `voucher` set to true is processed --> only one page should be assigned this attribute with value true - other will not be shown!
  * `show_call_button`: if set to true, a call button will be displayed on the bottom of the page.
  * `call_button_text`: if set, the button default text is replaced.

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


## Style
### Fonts
* This project uses Arial as base font (Helvetica only if the user happens to have it installed) and self-hosted Quicksand as heading font.
* For using variable fonts (such as Quicksand), see e.g. [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide).
* Source
  * pre-load font in HTML: [_layouts/default.html](_layouts/default.html)
  * process font in scss: [_sass/components/_fonts.scss](_sass/components/_fonts.scss)
  * set font-family-related variable in scss: [assets/css/style.scss](assets/css/style.scss)


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
* [Bootstrap](https://getbootstrap.com/) v5.3.3 ([license](licenses/bootstrap))
* Quicksand font ([license](licenses/Quicksand))
