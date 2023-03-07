# [ECAM](https://climatesmartwater.org/ecam)
Current version: v3.

ECAM is a free and open source web application. Water and wastewater utility
operators can assess their greenhouse gas emissions and energy consumption.

- Perfect for climate reporting needs
- Overview of system-wide greenhouse gas emissions
- IPCC-2019 compliant

ECAM is developed by
[ICRA](https://icra.cat),
[IWA](https://www.iwa-network.org) and
[GIZ](https://www.giz.de/) under the
[WaCCliM project](https://climatesmartwater.org/), and Cobalt Water.

## License
ECAM is licensed under a Creative Commons Attribution-ShareAlike 4.0
International License. [LICENSE](LICENSE)

## Code
ECAM is a serverless single-page-application (SPA) written in entirely in Javascript, HTML
and CSS. It uses VueJS to render the user interface.

## Tutorial videos
https://www.youtube.com/playlist?list=PL6u1Pjpf8O0Ymz7bLlOCkLTJWHyPReOxP

## Dependencies
All these libraries are automatically loaded when the tool is opened in the
browser:
- Vue.js v2.6.11 (https://vuejs.org/)
- Chart.js v3.7.1 (https://www.chartjs.org/)
- Code-prettify v2015-12-04 (https://cdn.jsdelivr.net/gh/google/code-prettify@master/)
- D3.js v3 (https://d3js.org/)
- ExcelJS v4.2.1 (https://github.com/exceljs/exceljs)
- FileSaver v1.2.2 (https://github.com/eligrey/FileSaver.js)

## Using ecam online
To use ecam, just go to [climatesmartwater.org/ecam](https://climatesmartwater.org/ecam)

## Using ecam offline
Ecam can be also used offline. You need download this package and place it
inside a folder from a web server software, for example: apache, nginx, xampp,
etc.

## Guide for deployment in a server (or offline usage) using [Apache HTTP Server](http://httpd.apache.org/)
1. Install Apache HTTP Server.
2. Download this repository
3. Move the repository to "/var/www/html/ecam".
   note: the equivalent "/var/www/html" folder for XAMPP is usually in "C:\XAMPP\htdocs" (in Windows)
4. Open your browser and go to "http://localhost/ecam"
