<?php
  /*
    All substage's info
    3 Inputs: level (string), sublevel (string), index (integer)
  */
  if(!isset($_GET['index'])) die('error: index not defined');
  if(!isset($_GET['level'])) die('error: level not defined');
  if(!isset($_GET['sublevel'])) die('error: sublevel not defined');

  $level    = $_GET['level'];
  $sublevel = $_GET['sublevel'];
  $index    = $_GET['index'];
?>
<!doctype html><html><head>
  <?php include'imports.php'?>
  <script>
    <?php
      //set the substage pointer and parent stage
      echo "
        var substage = Substages['$level']['$sublevel'][$index];
        var sublevel = Global['$level']['$sublevel'];
      ";
    ?>

    /** Update all */
    function init() {
      //redisplay table
      Caption.hide();
      updateSubstage();
      Caption.listeners();
      updateResult();
    }

    //redisplay table
    function updateSubstage() {
      var t=document.querySelector('table#substage');
      while(t.rows.length>1)t.deleteRow(-1);
      Object.keys(substage).forEach(field=>{
        //skip substage name
        if(field=='name')return;

        //new row
        var newRow=t.insertRow(-1);
        newRow.setAttribute('field',field);

        //code
        newRow.insertCell(-1).innerHTML="<a href='variable.php?id="+field+"'>"+field+"</a>";

        //name
        newRow.insertCell(-1).innerHTML=translate(field+"_descr");

        /*value*/
        var newCell=newRow.insertCell(-1);

        //create input
        if(typeof(substage[field])=="number"){
          newCell.classList.add('input');

          if(Info[field]&&Info[field].magnitude=='Option'){
            newCell.appendChild((function(){
              var select=document.createElement('select');
              select.setAttribute('magnitude','Option');
              select.setAttribute('caption','General or most frequent option');
              newCell.style.textAlign='left';
              select.setAttribute('onchange','substage["'+field+'"]=parseInt(this.value);init()');
              for(var op in Tables[field]){
                var option=document.createElement('option');
                var value=parseInt(Tables[field][op].value);
                select.appendChild(option);
                option.value=value;
                option.innerHTML="("+value+") "+op;
                if(substage[field]==value){option.selected=true;}
              }
              return select;
            })());
          }else{
            newCell.appendChild((function(){
              var input=document.createElement('input');
              input.type='text';
              input.setAttribute('onblur',"updateValue('"+field+"',this.value)");
              //value converted
              var multiplier=Units.multiplier(field);
              var value=substage[field]/multiplier;
              input.value=format(value);
              input.onfocus=function(){
                input.type='number';
                this.value=value;
                this.select();
              };
              return input;
            })());
          }
        }else if(typeof(substage[field])=="function"){
          newCell.innerHTML=(function() {
            var value=substage[field]()/Units.multiplier(field);
            return format(value);
          })();
        }

        //unit for current variable
        var newCell=newRow.insertCell(-1);
        newCell.setAttribute('caption',Info[field]?Info[field].magnitude:'');
        newCell.innerHTML=(function() {
          //check if unit is entered in "Info"
          if(!Info[field]) return "undefined";
          //check if unit is currency
          if(Info[field].magnitude=="Currency") return Global.General.Currency;
          //if no magnitude, return unit string
          if(Units[Info[field].magnitude]===undefined) return Info[field].unit;

          //look for current unit
          var currentUnit = Global.Configuration.Units[field] || Info[field].unit;
          
          if(typeof substage[field]=='function')return currentUnit;

          //create a <select> for unit changing
          var str="<select onchange=Units.selectUnit('"+field+"',this.value)>";
          for(unit in Units[Info[field].magnitude]) {
            if(unit==currentUnit)
              str+="<option selected>"+unit+"</option>";
            else
              str+="<option>"+unit+"</option>";
          }
          str+="</select>"
          return str
        })();
      });
    }

    //gui
    function updateValue(field,newValue){
      newValue=parseFloat(newValue);
      if(isNaN(newValue))newValue=0;
      var multiplier=Units.multiplier(field);
      substage[field]=multiplier*newValue;
      init();
    }
  </script>
  <style>
    h1{
      text-align: left;
      line-height: 2.1em;
      border-bottom: 1px solid #ccc;
      background: white;
    }
    #substage tr td:first-child {font-family:monospace;font-size:11px}
    #substage td.input {
      width:70px;
      padding:0 0.2em;
      text-align:right;
      color:#666;
      cursor:cell;
      line-height:1em;
      background:#eee;
    }
    #substage td.input input {
      width:95%;border:none;text-align:right;margin:0;padding:0 0.2em;height:24px;
      background:#eee;
    }
    #substage td.input input:focus {
      background:white;
    }
  </style>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>
<!--caption--><?php include'caption.php'?>

<!--TITLE-->
<h1>
  <a href=sources.php><script>document.write(Global.General.Name)</script></a>
  &rsaquo;
  <?php echo "<a href='edit.php?level=$level'>$level</a>"?>
  &rsaquo;
  <?php echo "<a href='edit.php?level=$level&sublevel=$sublevel'>$sublevel</a>"?>
  &rsaquo;
  <span style=color:black;font-size:26px>
    Substage <?php echo (1+$index)?>
    &mdash; <script>document.write(substage.name)</script>
  </span>
</h1>
</center>
<!--END TITLE-->

<!--go back to overview-->
<div style=text-align:center;padding:0.5em>
  <a href="edit.php?level=<?php echo $level?>&sublevel=<?php echo $sublevel?>">
    &larr; <?php write("#$level");echo " ";write("#$sublevel")?>
  </a>
</div>

<!--subtitle-->
<h3 style=text-align:center;color:black>
  <?php write('#Substage')?>
  "<script>document.write(substage.name)</script>"
  <?php write('#summary')?>
</h3>

<!--root container-->
<div>
  <!--substage table-->
  <table id=substage style="margin:0.5em auto"> <tr>
    <th><?php write('#Variable')?>
    <th><?php write('#Name')?>
    <th><?php write('#Current value')?>
    <th><?php write('#Unit')?>
  </table>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>

<script>
  //copy all functions from parent sublevel into the substage
  (function(){
    for(var field in sublevel) {
      if(typeof(sublevel[field])!="function") continue;
      substage[field]=sublevel[field];
    }
  })();
</script>
