<!--navbar.php: top bar: logo + lang selection-->
<style>
	div#navbar {
		color:white;
		font-size:15px;
		padding:0.5em 8em 0.5em 5em;
		box-shadow:0 1px 2px rgba(0,0,0,.5);
		background:#2b6488;
		display:flex;
		flex-wrap:wrap;
		justify-content:space-between;
	}
	#navbar > div{
		padding:13px 5px 5px 5px;/*values adjusted for the sidebar*/
	}
	#navbar a{color:white;}
	#navbar a:hover{text-decoration:none}
	#navbar img{vertical-align:middle}
	#navbar #burger {
		color:white;
		cursor:pointer;
		font-size:30px;
		line-height:28%;
	}
	#navbar #burger:hover{color:#666}
	#navbar #logo {
		font-size:30px;
		line-height:9%;
		margin:5px 10px 5px 20px;
	}
</style>

<div id="navbar">
	<div class=flex>
		<!--burger symbol-->
		<div id=burger onclick="event.stopPropagation();Sidebar.toggle()">
			&#9776;
		</div>
		<!--logo-->
		<div>
			<a href=index.php>
				<b id=logo >ECAM</b>
				<?php write('#navbar_title')?>
			</a>
		</div>
	</div>
	<div class=flex>
		<!--language selection-->
		<?php include'language.php'?>
	</div>
</div>
