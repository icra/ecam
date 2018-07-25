<?php
  /**summary.php: for inputs or outputs */
  if(!isset($_GET['type'])){
    die('Error. type not specified<br>Try: <a href=summary.php?type=input>Inputs</a> or <a href=summary.php?type=output>Outputs</a> or <a href=summary.php?type=ccvv>calculated variables</a>');
  }
  
  //variable type chosen: input / output / ccvv
  $type=$_GET['type'];

  //check correct $type value
  if($type!="input" && $type!="output" && $type!="ccvv") {
    die('Error. type must be "input", "output" or "ccvv"');
  }

  //if ccvv (calculated variables, create a boolean $ccvv)
  if($type=="ccvv"){
    $type="output";
    $ccvv=true;
  }else{
    $ccvv=false;
  }
?>
<!doctype html><html><head>
  <?php include'imports.php'?>
  <script>
    function init(){
      updateLevel1();
      updateLevel2();
      updateCounts();
      updateResult();
    }

    function updateLevel1(){
      var t=document.querySelector("[level='1']")
      while(t.rows.length>1)t.deleteRow(-1)
      //level1 only
      Structure.filter(stage=>{return !stage.sublevel}).forEach(stage=>{
        t.innerHTML+=tableRows(Global[stage.level],translate(stage.level), stage.alias, "edit.php?level="+stage.level)
      });
      if(t.rows.length<2) t.insertRow(-1).insertCell(-1).innerHTML="<?php write('#summary_no_active_stages')?>";
    }

    function updateLevel2(){
      var t=document.querySelector("[level='2']");
      while(t.rows.length>1)t.deleteRow(-1);
      //level2 only
      Structure.filter(stage=>{return stage.sublevel}).forEach(stage=>{
        t.innerHTML+=tableRows(Global[stage.level][stage.sublevel], translate(stage.level)+"/"+translate(stage.sublevel), stage.alias, "edit.php?level="+stage.level+"&sublevel="+stage.sublevel);
      });
      if(t.rows.length<2) t.insertRow(-1).insertCell(-1).innerHTML="<?php write('#summary_no_active_stages')?>";
    }

    function updateCounts(){
      for(family in Global.Configuration.ActiveStages) {
        var count=document.querySelectorAll("[family='"+family+"']").length;
        if(count!=0)document.querySelector("[count='"+family+"']").innerHTML = count;
      }
    }

    //** Create rows and columns for a table with specified object
    function tableRows(object,name,family,href){
      //make link or not depending on active 
      if(Global.Configuration.ActiveStages[family]==0){return "";}

      //color
      var color = Structure.find(stage=>stage.alias==family.substring(0,5)).color;

      //return string
      var ret="<tr><td id="+family+" colspan=4 style='background:#ccc;font-weight:bold'>";
      ret+="<a href="+href+" style='color:"+color+"'>"+name+":</a> "

      //create a input/output count for the stage
      ret+="<span count="+family+">0</span> <?php echo $type?>s"

      //fill rows
      for(var variable in object) {
        //only go over type specified
        <?php
          switch($type) {
            case "input":$typeof="number";break;
            case "output":$typeof="function";break;
          }
        ?>
        if(typeof(object[variable])!="<?php echo $typeof?>"){continue;}

        <?php 
          //Skip calculated variables depending on $ccvv
          if($type=="output") {
            if($ccvv) echo "if(variable.search('^c_')==-1){continue;}";
            else      echo "if(variable.search('^c_')!=-1){continue;}";
          }
        ?>

        var description=translate(variable+'_descr');
        var unit = Info[variable] ? (Global.Configuration.Units[variable] || Info[variable].unit) : "<span style=color:#ccc>no unit</a>"
        var multiplier = Units.multiplier(variable);
        ret+="<tr field='"+variable+"' family='"+family+"'>"+
          "<td style='font-weight:bold'><a style='color:"+color+"' href=variable.php?id="+variable+">"+variable+"</a>"+
          "<td>"+description+
          "<td style=text-align:right>"+format(object[variable]<?php if($type=="output"){echo "()";}?>/multiplier)+
          "<td>"+unit
      }
      return ret;
    }
  </script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--><?php include"linear.php"?>
<!--TITLE--><h1><?php write('#Summary')?> (<?php echo $type?>s)</h1>
<!--STAGES--><?php include"activeStages.php"?>

<!--AVAILABLE INPUTS-->
<div id=main style=margin-bottom:3em>
  <style> #main *:not(h4) {text-align:left}</style>

  <!--description--><h4>
    <?php 
      write('#All active');
      echo " ".ucfirst($type."s");
    ?>
    <span>
      <?php
        $otherType = $type=="input" ? "output" : "input";
        echo "<a href=summary.php?type=$otherType>";
        write('#See');
        echo " $otherType"."s</a>"
      ?>
    </span>
    &mdash;
    <a href=substages.php>
      <?php write('#See Substages overview')?>
    </a>
  </h4>

  <!--level 1 fields-->
  <div class="inline" style="font-size:11px;max-width:49%;padding:0">
    <div style=text-align:center>
      <?php write('#ghg_assessment')?>
    </div>
    <table level=1></table>
  </div>

  <!--level 2 fields-->
  <div class="inline" style="font-size:11px;max-width:49%;padding:0">
    <div style=text-align:center>
      <?php write('#energy_performance')?>
    </div>
    <table level=2></table>
  </div>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
