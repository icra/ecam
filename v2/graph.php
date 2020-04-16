<?php
  //$g is always set because of this line
  if(!isset($_GET['g'])) die('graph not specified');

  $g=$_GET['g'];
?>
<!doctype html><html><head>
  <?php include'imports.php'?>
  <style>
    #graph{margin:3em}
    #graph div.options{margin:1em}
  </style>
  <script>
    var g ='<?php echo $g ?>';
    function init() {
      function drawChart() {
        try{Graphs[g]()}
        catch(e){
          document.querySelector('#graph').innerHTML=e;
        }
      }
      drawChart();
      updateResult();
    }

    function setg(graph) {
      g=graph;
      init();
    }
  </script>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>
<!--title--><h1><a href=development.php>Development</a> &rsaquo; Graphs</h1>

<h3>Playground zone for graphs</h3>

<!--json--><?php include'currentJSON.php'?>

<div id=main>
  <table class=inline style=width:20%>
    <tr><th>Select a graph
    <script>
      //populate the select element
      (function(){for(var graph in Graphs){
          document.write("<tr><td><a href=# onclick=setg('"+graph+"')>"+graph+"</a>")
        }
      })();
    </script>
  </table>
  <!--graph-->
  <div class=inline style=width:70%>
    <div id=graph>Loading...</div>
  </div>
</div>

<script>
  google.charts.load('current',{'packages':['corechart','sankey','gauge','bar']});
  google.charts.setOnLoadCallback(init);
</script>
