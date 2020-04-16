<?php /*constants.php: information about constants*/?>
<!doctype html><html><head>
  <?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--><?php include"linear.php"?>
<!--TITLE--><h1><?php write('#constants')?></h1>

<!--constants-->
<div id=main style=margin-bottom:3em;font-family:monospace>
  <table id=constants>
    <tr><th><?php write('#Code')?>
    <th><?php write('#Value')?>
    <th><?php write('#Description')?>
    <th><?php write('#Unit')?>
  </table>
  <script>
    (function(){
      var t=document.querySelector('#constants');
      Object.keys(Cts).forEach(ct=>{
        var newRow=t.insertRow(-1);
        newRow.insertCell(-1).innerHTML="<td><a href=constant.php?id="+ct+">"+ct+"</a>";
        newRow.insertCell(-1).innerHTML="<td align=right title='"+Cts[ct].value+"'>"+format(Cts[ct].value);
        newRow.insertCell(-1).innerHTML="<td><small>"+Cts[ct].descr+"</small>";
        newRow.insertCell(-1).innerHTML="<td>"+Cts[ct].unit;
      });
    })();
  </script>
</div>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
