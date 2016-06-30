<!--navbar.php: menu of sections at the top of each page-->

<style>
	#navbar {
		text-align:left;
		background:#00aff1;
		color:white;
		font-size:16px;
		border-bottom:1px solid #ccc;
		padding:0.5em 1em 0.5em 5em;
	}
	#navbar a {color:white;}
	#navbar a:hover {text-decoration:none}
	#navbar img{vertical-align:middle}

	#navbar #burger 
	{
		color:white;
		position:absolute;
		left:27px;
		top:2px;
		font-size:30px;
		cursor:pointer;
	}
	#navbar #burger:hover {color:#666}
</style>

<div id=navbar>
	<!--menu symbol--><span id=burger onclick="event.stopPropagation();Sidebar.toggle()">&#9776;</span>

	<a href=index.php>
		<span style=font-size:30px;margin-right:35px;>ECAM</span>
		<?php write('#navbar_title')?></a>

	<!--language selection--><?php include'language.php'?>
</div>
