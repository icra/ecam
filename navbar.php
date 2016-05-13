<!--navbar.php: menu of sections at the top of each page-->

<style>
	#navbar {
		text-align:left;
		background:#00aff1;
		color:white;
		padding:0em 0em 0em 0em;
		font-size:16px;
		border-bottom:1px solid #ccc;
	}
	#navbar a {color:white;}
	#navbar a:hover {text-decoration:none;}
	#navbar img{vertical-align:middle}

	#navbar #burger 
	{
		color:white;
		position:absolute;
		left:0;
		padding:0.2em 0.5em 0 1em;
		font-size:30px;
		cursor:pointer;
	}
	#navbar #burger:hover {color:#666}
</style>

<div id=navbar>
	<!--menu symbol--><span id=burger onclick="event.stopPropagation();Sidebar.toggle()">&#9776;</span>

	<img src=img/IWA-logo.png style="margin:0.6em;margin-left:4.5em;margin-right:4em;width:75px;cursor:pointer" onclick=window.location='index.php'>

	<a href=index.php>ECAM — <?php write('#navbar_title')?></a>

	<!--language selection--><?php include'language.php'?>
</div>
