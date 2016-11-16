<!doctype html><html><head>
	<?php include'imports.php'?>
	<script> function init() { updateResult() } </script>
</head><body onload=init() style=background:#bce3f8>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include"navbar.php"?>
<!--main-->
<div id=main> 
	<div id=content>
		<style>
			#content *:not(button){margin:0;padding:0;padding-top:0.7em;padding-bottom:0.7em}
			#content {
				padding:0 25em 0 10em;
				text-align:left;
			}
		</style>

		<!--TITLE--><h1 style="text-align:left;font-size:30px;"><b>ECAM</b> <?php write("#index_web_tool")?>
			<span style=color:#bf5050>Development version (towards v2.0)</span>
		</h1>

		<!--DEVELOPMENT-->
		<div id=commits style="padding:0"> 
			<button onclick="document.querySelector('#commits').style.display='none'">Hide</button>
			<b>Development log &mdash; All code commits (
				<?php 
					$n=shell_exec("git log --oneline|wc -l");
					echo "$n";
				?>
				): </b>
			<div style="height:150px;overflow-y:auto;padding:0">
			<table>
				<style>
					#commits table * {padding:0;font-family:monospace;font-size:11px}
				</style>
			<?php 
				//show git commit hash code
				$command="git log --pretty=format:'<tr><td><b>%h</b><td>%ad<td>%s'";
				exec($command,$lines);
				foreach($lines as $line)
				{
					$line=preg_replace("/\+0[0-2]00/",'',$line); //hide GMT zone +1 +2, etc stuff
					echo $line;
				}
			?>
			</table>
			</div>
		</div>

		<!--DESCRIPTION--><div style="color:#58595b;font-size:18px;text-align:left">
			<?php write('#index_description')?>
		</div>

		<!--FIRST TIME?-->
		<h4 style=font-size:18px;color:#58595b>
			<?php write('#index_first_time_using')?>
			<a href=about.php><?php write('#about')?></a>.
		</h4>

		<!--MENU--><div style="padding:1em 0"><?php include'menu.php'?></div>

		<!--picture-->
		<div style="padding:0;text-align:center">
			<img src=svg/diagram.svg style=width:70%>
		</div>

		<!--other info-->
		<ul>
			<li><b><?php write('#index_chrome_warning')?></b>
			<li><?php write('#index_latest_update');echo ": ".date("F d Y, H:i:s",filemtime("index.php"))?>.
				<a target=_blank href="https://github.com/holalluis/ecam">GitHub</a>
		</ul>
	</div>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--LOGOS--> <div style=background:white;text-align:center> <!--giz--><img src=img/giz.png> </div>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
