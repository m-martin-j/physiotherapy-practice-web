# Website

This website is based on the Serif theme (credit: https://github.com/zerostaticthemes/jekyll-serif-theme).

It employs [Bootstrap](https://getbootstrap.com/) v5.3.3


## Pages
* If the the head title of the page shall correspond to `site.title`, use `title: SITE.TITLE` in the front matter of a page. (Function maintained in [_layouts/default.html](_layouts/default.html))

### Home Page
* Intro image
  * If it is changed, tweaking in [_sass/components/_intro-image.scss](_sass/components/_intro-image.scss) might become necessary.
  * It could look nice, if it is very white on the left, as the text and the call box could be placed overlapping.

### Informationen
* Source
  * Markdown/Content: [_pages/infos.md](_pages/infos.md)
  * Layout: [_layouts/infos.html](_layouts/infos.html)
* Component A-Z list as Bootstrap Accordion
  * Style from [_sass/components/_patient-info.scss](_sass/components/_patient-info.scss)
  * Data from [_data/infos.yml](_data/infos.yml)
  * Sorting via `title`
  * `content` rendered as p
  * `bullets` separated via `$`


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
