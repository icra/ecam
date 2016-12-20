<!--navbar.php: menu of sections at the top of each page-->

<style>
	#navbar {
		text-align:left;
		color:white;
		font-size:16px;
		padding:0.5em 1em 0.5em 5em;
		box-shadow: 0 1px 2px rgba(0,0,0,.1);

		background:#00aff1;
		background: linear-gradient(to right, rgba(0,175,241,1) 0%, rgb(215,29,36) 61%, rgba(0,175,241,1) 100%);
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
		<span style=font-size:30px;margin-right:35px;font-weight:bold>ECAM</span>
		<?php write('#navbar_title')?>
	</a>

	<span style=position:absolute;font-size:14px;right:10%;top:18px>
		<a href=problems.php>Debugging utility</a>
	</span>

	<!--language selection--><?php include'language.php'?>
</div>
