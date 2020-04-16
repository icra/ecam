<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>
<!--title--><h1>
	<?php write('#About non revenue water')?>
</h1>

<h3>
	<?php write('#Water injected to distribution')?>
</h3>

<!--non revenue water image-->
<div>
  <?php
    if(file_exists("img/nrw/nrw-$lang.png")){
      echo "
        <img src='img/nrw/nrw-$lang.png'></img>
      ";
    }else{
      ?>
      <img src="img/nrw/nrw-en.png"></img>
      <?php
    }
  ?>
</div>

<p>
<code>
Lambert, A. O. y Hirner, W., Losses from Water Supply Systems: Standard Terminology and
Recommended Performance Measures. International Water Association, 2000.
</code>
</p>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
