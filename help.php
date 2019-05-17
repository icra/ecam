<?php /*help.php */?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1><?php write('#help')?></h1>

<div id=main>

<!-- <p>
	This page will have resources (example json files and a user manual)
	(in development)
</p>  -->
<h4><b>ECAM v2</b></h4>
<table>
  <tr><td><a href="help_pdf/ECAM V2 FAQ_Aug2017.pdf">Frequently Asked Questions (pdf)</a></h4>
  <tr><td><a href="help_pdf/ECAM-Methodology-Guide-Jan-2019.pdf">Methodology (pdf)</a></h4>
  <tr><td><a href="help_pdf/ECAM_2.0_Manual_170822.pdf">Manual (pdf)</a></h4>
  <tr><td><a href="help_pdf/ECAMV2 Example.json" download>Example json file (json)</a></h4>
</table>

<h4><b>Screencasts</b></h4>
<a href="https://vimeopro.com/iwahq/tutorials-ecam-tool">https://vimeopro.com/iwahq/tutorials-ecam-tool</a>
<div id=screencasts>
  <style>
    #screencasts {
      margin:auto;
      width:80%;
      display:grid;
      grid-template-columns:50% 50%;
      grid-gap:0;
    }
  </style>
  <div><iframe title="vimeo-player" src="https://player.vimeo.com/video/330724306" width="640" height="480" frameborder="0" allowfullscreen></iframe></div>
  <div><iframe title="vimeo-player" src="https://player.vimeo.com/video/330724450" width="640" height="480" frameborder="0" allowfullscreen></iframe></div>
  <div><iframe title="vimeo-player" src="https://player.vimeo.com/video/330724339" width="640" height="480" frameborder="0" allowfullscreen></iframe></div>
  <div><iframe title="vimeo-player" src="https://player.vimeo.com/video/330724359" width="640" height="480" frameborder="0" allowfullscreen></iframe></div>
  <div><iframe title="vimeo-player" src="https://player.vimeo.com/video/330724378" width="640" height="480" frameborder="0" allowfullscreen></iframe></div>
  <div><iframe title="vimeo-player" src="https://player.vimeo.com/video/330724423" width="640" height="480" frameborder="0" allowfullscreen></iframe></div>
  <div><iframe title="vimeo-player" src="https://player.vimeo.com/video/330724397" width="640" height="480" frameborder="0" allowfullscreen></iframe></div>
  <div><iframe title="vimeo-player" src="https://player.vimeo.com/video/330724318" width="640" height="480" frameborder="0" allowfullscreen></iframe></div>
  <div><iframe title="vimeo-player" src="https://player.vimeo.com/video/330724275" width="640" height="480" frameborder="0" allowfullscreen></iframe></div>
</div>

</div>
<!--footer--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
