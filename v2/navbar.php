<!--navbar.php: top bar: logo + lang selection-->
<div id="navbar">
  <!--menu symbol-->
  <div id=burger onclick="event.stopPropagation();sidebar.visible^=1">
    &#9776;
  </div>

  <!--logo-->
  <div id=logo_container>
    <a href=index.php class=flex tabindex=-1>
      <div><b id=logo >ECAM</b></div>
      <div><?php write('#navbar_title')?></div>
    </a>
  </div>

  <!--version-->
  <div>
    <?php include'version.php'?>
  </div>

  <!--language-->
	<div>
		<?php include'language.php'?>
	</div>
</div>

<style>
  #navbar {
    color:white;
    font-size:15px;
    padding:0.5em 0.5em 0.5em 0.5em;
    box-shadow:0 1px 2px rgba(0,0,0,.5);
    background:#2b6488;
    display:grid;
    grid-template-columns:35px 85% 5% 5%
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
    text-align:left;
  }
  #navbar #burger:hover{color:#666}
  #navbar #logo_container {
    text-align:left;
  }
  #navbar #logo {
    font-size:30px;
    line-height:9%;
    margin:5px 8px;
  }
</style>
