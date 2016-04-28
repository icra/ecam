<!--navbar.php: menu of sections at the top of each page-->

<div id=navbar>
	<img src=img/IWA-logo.png style="margin:0.6em;margin-left:7.5em;margin-right:13em;width:75px;cursor:pointer" onclick=window.location='index.php'>
	<a href=index.php>ECAM — Energy performance and Carbon emissions Assessment and Monitoring Tool</a>
	<span id=burger onclick="event.stopPropagation();Sidebar.toggle()">&#9776;</span>
</div>

<style>
	#navbar {
		text-align:left;
		background:#00aff1;
		color:white;
		padding:0em 0em 0em 0em;
		font-size:16px;
	}
	#navbar div {margin:0 0 0;display:inline-block;vertical-align:middle}
	#navbar a {color:white;}
	#navbar a:hover {text-decoration:none;}
	#navbar img{vertical-align:middle}

	#navbar #burger 
	{
		color:white;
		position:absolute;
		right:0;
		padding:0.2em 0.5em 0 0;
		font-size:30px;
		cursor:pointer;
	}
</style>
