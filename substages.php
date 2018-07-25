<!doctype html><html><head>
  <?php include'imports.php'?>
  <style>
    table#substages, table#substage {margin:auto}
    th[waste]{background:rgb(215,29,36)}
    td[level][sublevel] {vertical-align:top}
    td[level][sublevel] table {margin:auto}
    table#substages > tbody > tr > th {width:200px}
  </style>
  <script>
    /** Update all */
    function init() {
      displaySubstages();
      updateResult();
    }

    //create table to see all substages
    function displaySubstages() {
      var stages = document.querySelectorAll("#substages td[level][sublevel]");
      for(var i=0;i<stages.length;i++) {
        var sta=stages[i];
        var level=sta.getAttribute('level');
        var sublevel=sta.getAttribute('sublevel');
        var newTable = document.createElement('table');
        sta.appendChild(newTable);

        var pointer = Substages[level][sublevel];
        if(pointer.length==0) {
          var newCell=newTable.insertRow(-1).insertCell(-1);
          newCell.style.border='none';
          newCell.innerHTML="<i style=color:#666;font-size:12px>~"+translate('No substages')+"</i>"
        }
        for(var j=0;j<pointer.length;j++) {
          newTable.insertRow(-1).insertCell(-1).innerHTML=(function() {
            var str=""+
              (j+1)+". "+
              "<a href='substage.php?level="+level+"&sublevel="+sublevel+"&index="+j+"'>"+
              pointer[j].name+
              "</a>";
            return str;
          })()
        }
      }
    }
  </script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>
<!--caption--><?php include'caption.php'?>

<!--TITLE--><h1><?php write('#Substages overview')?></h1></center>

<!--main-->
<div>
  <table id=substages>
    <style>
      #substages th a {color:white}
    </style>
    <tr headers>
    <tr body>
  </table>
  <script>
    var headers=document.querySelector('#substages tr[headers]');
    Structure.filter(s=>s.sublevel).forEach(s=>{
      headers.appendChild((function(){
        var th=document.createElement('th');
        th.style.background=Structure.find(st=>st.level==s.level).color;
        th.innerHTML='<a href="edit.php?level='+s.level+'&sublevel='+s.sublevel+'">'+translate(s.sublevel)+'</a>';
        return th;
      })());
    });
    var body=document.querySelector('#substages tr[body]');
    Structure.filter(s=>s.sublevel).forEach(s=>{
      body.appendChild((function(){
        var td=document.createElement('td');
        td.setAttribute('level',s.level);
        td.setAttribute('sublevel',s.sublevel);
        return td;
      })());
    });
  </script>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
