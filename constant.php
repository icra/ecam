<?php
  if(!isset($_GET['id'])) die("Constant not defined");
  $id=$_GET['id']; //constant code
?>
<!doctype html><html><head>
  <?php include'imports.php'?>
  <script>
    /* Global variable "id" */
    var id="<?php echo $id?>";
  </script>
</head><body><center>
<?php
  include'sidebar.php';
  include'navbar.php';
  include'linear.php';
?>
<h1>
  <a href=constants.php>All constants</a> &rsaquo;
  <span style=color:black>Constant</span>
</h1>

<!--description-->
<div id=descr></div>
<script>document.querySelector('#descr').innerHTML=Cts[id].descr</script>

<!--value and unit-->
<div style="padding:2em 0">
  <div id=value_and_unit></div>
  <script>
    (function(){
      var el=document.querySelector('#value_and_unit');
      el.innerHTML="";
      el.innerHTML+=id+" = ";
      el.innerHTML+="<span style=font-size:42px;color:black>"+Cts[id].value+" </span>";
      el.innerHTML+=Cts[id].unit;
    })();
  </script>
</div>

<!--separation--><div style="border:1px solid #ccc;margin:0.5em 0"></div>

<!--constant used in-->
<div style="margin:1em 0"> This constant is used in the following equations </div>
<table id=used_in></table>
<script>
  (function(){
    var t=document.querySelector('#used_in');
    var outputs=Formulas.outputsPerInput(id);
    outputs.forEach(function(equation,i){
      var newRow=t.insertRow(-1);
      newRow.outerHTML="<tr><td>"+(i+1)+".<td><a href=variable.php?id="+equation+">"+equation+"</a>"+
        "<td>"+translate(equation+"_descr");
    });
    if(outputs.length==0){
      var newRow=t.insertRow(-1);
      newRow.outerHTML="<tr><td style=color:#666>~Constant not used. Consider removing it";
    }
  })();
</script>
