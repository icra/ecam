# [ECAM](https://wacclim.org/ecam)
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
[WaCCliM project](https://wacclim.org/), and Cobalt Water.

## License
ECAM is licensed under a Creative Commons Attribution-ShareAlike 4.0
International License. [LICENSE](LICENSE)

## Code
ECAM is a single page application (SPA) written in entirely in Javascript, HTML
and CSS. It uses VueJS to render the user interface.

## Using ecam online
To use ecam, just go to [wacclim.org/ecam](https://wacclim.org/ecam)

## Using ecam offline
Ecam can be also used offline. You need download this package and place it
inside a folder from a web server software, for example: apache, nginx, xampp,
etc.

## Example of offline configuration using [Apache HTTP Server](http://httpd.apache.org/)
1. download this repository
2. move the repository to "/var/www/html/ecam"
3. open your browser and go to "http://localhost/ecam"

note: the equivalent "/var/www/html" folder for XAMPP is "C:\XAMPP\htdocs" (in MS Windows)
