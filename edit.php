<?php
  if(!isset($_GET['level'])){die("ERROR: stage not specified");}
  /**
    * Inputs:
    *  - $level:     mandatory {"Water","Waste"}
    *  - $sublevel:  optional. If set, enables level 3 {"Abstraction","Treatment","Distribution",[...]}
    */
  $level=$_GET['level'];
  $sublevel=isset($_GET['sublevel']) ? $_GET['sublevel'] : false;

  //if the user tries to go to "General" (i.e. from variable.php?id=Days) send him to "configuration.php"
  if($level=="General"){header("Location: configuration.php");}
?>
<!doctype html><html><head>
  <?php include'imports.php'?>
  <style>
    body{background:#f5ecce}
    h1{
      background:white;
      border:none;
      box-shadow:0 1px 2px rgba(0,0,0,.5);
      line-height:2.1em;
      text-align:left;
    }
  </style>

  <style>
    /*TAGS*/
    .advanced {
      float:right;
      color:rgba(0,0,0,0.85);
      font-size:10px;
      background:#fafafa;
      margin-left:1px;
      border-radius:0.5em;
      box-shadow:0 1px 2px rgba(0,0,0,.1);
      padding:0.3em;
    }
    .advanced.SM { /*sludge management*/
      float:left;
    }
    .advanced.ghg {background:#bca;}
    .advanced.nrg {background:yellow;}
    .advanced.sl  {background:white;}

    div.card .number {
      border-radius:0.3em;
      background:#fff;
      padding:0.1em 0.5em;
    }

    .variableCode a {color:white}
    .variableCode {
      font-family:monospace;
      background:#00adef;
      text-align:left;
      font-size:11px;
      color:white;
    }
    .variableCode.output {background:#c9ab98}

    td.input {
      width:70px;
      padding:0 0.2em;
      text-align:right;
      color:#666;
      cursor:cell;
      line-height:1em;
    }
    td.input input {width:95%;border:none;text-align:right;margin:0;padding:0 0.2em;height:24px}
    tr:not([hl=yes]) td.input {background-color:#eee;}
    tr:not([hl=yes]) td.CV {background-color:white}

    td.input.CV {text-align:right;cursor:default}

    table#substages { margin:0.2em 0 0.2em 0.2em; }
    table#substages tr:first-child td {border-top:none;border-left:none}

    table#outputs th:not(.tableHeader) {background:#c9ab98}
    table#outputs th:nth-child(n+2) {text-align:right}
    table#outputs td:nth-child(n+2) {text-align:right}

    table#nrgOutputs th:not(.tableHeader) {background:#c9ab98}
    table#nrgOutputs th:nth-child(2) {text-align:right}
    table#nrgOutputs td:nth-child(2) {text-align:right}
    table#nrgOutputs table#inputs table#outputs {
    }

    th.tableHeader {
      background:white;
      color:#666;
      font-size:15px;
      padding:0.7em 0 0.2em 0;
      font-weight:normal;
      border:none;
      text-align:left;
    }
    div.substageMenu{
      padding:0.1em;
      border:2px solid #ccc;
      background:#00aff1;
      position:absolute;
      box-shadow: 5px 5px 5px #888;
      z-index:1000;
    }
    input.substageMenu{
      padding:0.5em;
      outline:none;
      font-size:20px;
    }

    table#inputs    th.variableCode.isCV {background:#999;}
    table#substages td.variableCode.isCV {background:#999;}

    /*useful for development*/
    span.not_used_input {
      float:right;
      background:red;
      border-radius:0.2em;
      padding:0.1em 0.5em;
      box-shadow: 1px 1px 1px #888;
    }
    span.not_used_input:before{
      content:"not used";
    }
  </style>

  <style>
    <?php
      function getL1color(){
        global $level;
        if($level=="Waste") 
          echo "#d71d24";
        else                
          echo "#00aff1";
      }
    ?>
    table#inputs th:not(.tableHeader),
    table#substages th,
    table#substages td.variableCode {
      background:<?php getL1color()?>;
    }

    h1 a:not([id]),
    #outputs a,#outputs a:visited,
    #nrgOutputs a,#nrgOutputs a:visited{
      color:<?php getL1color()?> !important;
    }

    table#substages td.variableCode.output {background:#c9ab98}
  </style>

  <script>
    <?php
      //establish the stage pointers we are going to be focused
      if($sublevel) {
        echo "
          var CurrentLevel = Global['$level']['$sublevel'];
          var substages = Substages['$level']['$sublevel'];
        ";
      }else{
        echo "var CurrentLevel = Global['$level'];";
        echo "var substages = false;";
      }
    ?>
    /** Update all */
    function init() {
      //performance measure
      //console.time('init');

      Caption.hide();
      if(typeof(level2)!="undefined"){ level2.updateInputs() }
      updateOutputs();
      updateNrgOutputs();
      if(typeof(level3)!="undefined") { level3.updateSubstagesTable(); }
      Exceptions.apply();
      try{drawCharts()}
      catch(e){console.log(e)}
      updateResult();
      Caption.listeners();

      //performance end
      //console.timeEnd('init');
    }

    /** Redisplay table id=outputs (level2)*/
    function updateOutputs() {
      //console.time('updateOutputs');

      var t=document.getElementById('outputs');
      while(t.rows.length>2){t.deleteRow(-1)}

      Object.keys(CurrentLevel)
        .filter(key=>{return typeof(CurrentLevel[key])=="function"}) //only outputs
        .filter(key=>{return key.search("_KPI_GHG")+1})              //only GHG
        .filter(key=>{return Level3.list.indexOf(key)==-1})          //only L2
        .filter(key=>{return !Questions.isHidden(key)})              //only not hidden
        .forEach(field=>{
          //new row
          var newCell,newRow=t.insertRow(-1);
          newRow.setAttribute('field',field);

          var formula=CurrentLevel[field].toString();
          var prettyFormula=Formulas.prettify(formula);
          newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
          newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');

          //compute value
          var value=CurrentLevel[field]()/Units.multiplier(field);

          /*description and code*/
          newCell=newRow.insertCell(-1);
          newCell.setAttribute('caption',translate(field+"_expla"));
          newCell.innerHTML=(function(){
            var description=translate(field+"_descr")||translate(field);
            var code="<a style=font-size:10px href=variable.php?id="+field+">"+field+"</a>";
            return description+"<br>("+code+")";
          })();

          /*value*/
          newCell=newRow.insertCell(-1);
          newCell.setAttribute('caption',prettyFormula);
          newCell.innerHTML=(function() {
            return format(value);
          })();

          /*value per things*/
          newCell=newRow.insertCell(-1)
          //the first cell will be the value divided by Years
          newCell.innerHTML=(function() {
            return format(value/Global.General.Years());
          })();

          /*Normalization*/
          (function() {
            var level    = '<?php echo $level?>';
            var sublevel = '<?php if($sublevel) echo $sublevel; else echo 'false' ?>';
            //value per resident population
            //value per serviced population
            //value per water volume
            ['reside','servic','volume'].forEach(function(category) {
              var newCell=newRow.insertCell(-1);

              //determine the field to be highlighted
              var hlfield = (sublevel=='false' || category=='reside' || category=='servic') ? Normalization[level][category] : Normalization[level][sublevel][category];
              newCell.setAttribute('onmouseover',"Formulas.hlField('"+hlfield+"',1)")
              newCell.setAttribute('onmouseout',"Formulas.hlField('"+hlfield+"',0)")
              newCell.innerHTML=(function() {
                var norm=Normalization.normalize(category,field,level,sublevel);
                return format(norm);
              })();
            });
          })();
      });

      //if the table is empty, add a warning
      if(t.rows.length<3) {
        var newCell=t.insertRow(-1).insertCell(-1)
        newCell.colSpan=6;
        newCell.innerHTML="<span style=color:#999>~All outputs inactive</span>";
      }

      //bottom line with the color of W/WW
      var newRow=t.insertRow(-1);
      var newTh=document.createElement('th');
      newRow.appendChild(newTh);
      newTh.setAttribute('colspan',7)
      newTh.style.borderBottom='none';
      newTh.style.borderTop='none';

      //console.timeEnd('updateOutputs');
    }

    //Redisplay NRG and SL outputs (level2)
    function updateNrgOutputs() {
      //console.time('updateNrgOutputs');
      var t=document.getElementById('nrgOutputs');
      while(t.rows.length>2){t.deleteRow(-1);}

      Object.keys(CurrentLevel)
        .filter(key=>{return typeof(CurrentLevel[key])=="function"}) //only outputs
        .filter(key=>{return key.search(/^c_/)==-1})                 //only non CV
        .filter(key=>{return key.search("_KPI_GHG")==-1})            //only non-emissions
        .filter(key=>{return Level3.list.indexOf(key)==-1})          //only L2 (non L3)
        .filter(key=>{return !Questions.isHidden(key)})              //only not hidden
        .forEach(field=>{
          var newCell,newRow=t.insertRow(-1);
          newRow.setAttribute('field',field);

          var formula=CurrentLevel[field].toString();
          var prettyFormula=Formulas.prettify(formula);
          newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
          newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');

          //compute the output value
          var value=CurrentLevel[field]()/Units.multiplier(field);

          /*description*/
          newCell=newRow.insertCell(-1);
          newCell.setAttribute('caption',translate(field+"_expla"));
          newCell.innerHTML=(function() {
            var description = translate(field+"_descr")||translate(field);
            var color = field.search(/^ww/)==0 ? "#d71d24" : "";
            var code = "<a style='font-size:10px;color:"+color+"' href=variable.php?id="+field+">"+field+"</a>";
            //var nrg="<span class='advanced nrg' caption='Energy performance'>NRG</span>";
            var nrg="";
            return description+"<br>("+code+")"+nrg;
          })();

          /*value*/
          newCell=newRow.insertCell(-1)
          newCell.setAttribute('caption',prettyFormula);
          newCell.innerHTML=(function() {
            return format(value);
          })();

          /*unit*/
          newCell=newRow.insertCell(-1)
          newCell.innerHTML=(function() {
            if(!Info[field]) return "no unit";
            if(Info[field].magnitude=="Currency") return Global.General.Currency;
            return Info[field].unit;
          })();
      });

      //if the table is empty, add a warning
      if(t.rows.length<3) {
        var newCell=t.insertRow(-1).insertCell(-1)
        newCell.colSpan=3
        newCell.innerHTML="<span style=color:#999>~No outputs here</span>";
      }

      //bottom line with the color of W/WW
      var newRow=t.insertRow(-1);
      var newTh=document.createElement('th');
      newTh.setAttribute('colspan',6)
      newTh.style.borderBottom='none';
      newTh.style.borderTop='none';
      newRow.appendChild(newTh);

      //end
      //console.timeEnd('updateNrgOutputs');
    }

    //depending on stage, draw different charts
    function drawCharts() {
      //console.time('drawcharts');
      //draw chart if selected
      var button=document.querySelector("div.buttonsGraph button.active");
      if(!button){
        //console.timeEnd('drawcharts');
        return;
      }
      if(button.classList.contains('active')){
        button.classList.remove('active');
        button.onclick();
      }
      //console.timeEnd('drawcharts');
    }

    //function for "View Graphs" buttons
    function toggleDivs(event,btn,id1,id2) {
      event.stopPropagation();
      var div1=document.querySelector(id1);
      var div2=document.querySelector(id2);
      //change btn text
      btn.classList.toggle('active');
      if(btn.classList.contains('active')) {
        btn.innerHTML="<?php write('#VIEW TABLE')?>";
      }else{
        btn.innerHTML="<?php write('#VIEW GRAPH')?>";
      }
      //invert the display property
      if(div1.style.display=='none') {
        div1.style.display='';
        div2.style.display='none';
      }else{
        div1.style.display='none';
        div2.style.display='';
      }
      init();
    }

    //update the value of a question
    function setQuestion(question,newValue) {
      if(newValue){
        Global.Configuration['Yes/No'][question]=1;
        Expanded[question]=1;//start by showing the new variables
      }
      else //if(confirm("WARNING! Inputs from this question will be reseted to zero. Continue?"))
        Global.Configuration['Yes/No'][question]=0;

      //reset variables if checked=false
      if(!newValue){
        Questions.resetValues(question,CurrentLevel);
      }
      init();
    }
  </script>

  <script>
    //generate cookies for div.card folding
    //called after divs are clicked
    function fold(card) {
      card.classList.toggle('folded');
      if(card.classList.contains('folded')) {
        setCookie("Folded_"+card.id,1);
      }
      else {
        removeCookie("Folded_"+card.id);
      }
    }
  </script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>
<!--caption--><?php include'caption.php'?>

<!--TITLE-->
<?php
  //navigable title
  switch($level) {
    case "Water":
    case "Waste":  $titleLevel=$lang_json["#$level"];break;
    default:       $titleLevel=$level;break;
  }
  if($sublevel) {
    $titleSublevel="<span style='font-size:26px'>".$lang_json["#$sublevel"]."</span>";
  }
  /*separator*/
  $sep="<span style=color:black>&rsaquo;</span>";
  $title=$sublevel
    ?
    "<a href='edit.php?level=$level'>$titleLevel</a> $sep <span style='color:black'>$titleSublevel</span>"
    :
    "<span style='color:black;font-size:26px'>$titleLevel</span>";
?>

<!--navigable title-->
<h1><a href=sources.php id=Global_General_Name></a>
  <script>document.querySelector('#Global_General_Name').innerHTML=Global.General.Name</script>
  <?php echo "$sep $title"?>
  <!--See description (link to iwa web)-->
  <?php
    if($sublevel) {
      ?>
      <span style=line-height:10px>
        <?php
          $iwaLink='http://www.iwa-network.org/water-climate-energy-solutions/public/catalogue/';
          if($level=="Water" && $sublevel=="Abstraction")      {$alias="waterAbs"; $iwaLink.='stage/water_abstraction';}
          elseif($level=="Water" && $sublevel=="Treatment")    {$alias="waterTre"; $iwaLink.='stage/water_treatment';}
          elseif($level=="Water" && $sublevel=="Distribution") {$alias="waterDis"; $iwaLink.='stage/water_distribution';}
          elseif($level=="Waste" && $sublevel=="Collection")   {$alias="wasteCol"; $iwaLink.='stage/wastewater_collection';}
          elseif($level=="Waste" && $sublevel=="Treatment")    {$alias="wasteTre"; $iwaLink.='stage/wastewater_treatment';}
          elseif($level=="Waste" && $sublevel=="Discharge")    {$alias="wasteDis"; $iwaLink.='stage/wastewater_discharge';}
        ?>
        <a target=_blank href="<?php echo $iwaLink?>">
          <img style=width:27px;margin-left:10px title="More info" src='img/<?php echo "$alias.png"?>'>
        </a>
      </span>
      <?php
    }
  ?>

  <!--btns fold all div.cards-->
  <?php if($sublevel)
    {
      ?>
      <div id=btn_all_container class=inline style="position:absolute;right:40%">
        <style>
          #btn_all_container a {
            border:1px solid #bbb;
            font-size:11px;
            font-family:monospace;
            padding:0.2em 0.5em;
            border-radius:0.3em;
            color:rgba(0,0,0,0.55);
            background:#f5f5f5;
            box-shadow: 0 1px 2px rgba(0,0,0,.1);
            text-decoration:none;
          }
          #btn_all_container a:hover {
            color:rgba(0,0,0,0.85);
          }
        </style>
        <a id=btn_all_expand href=# style="margin-right:0.1em;"
          onclick="
            var divs=document.querySelectorAll('div.card');
            for(var i=0;i<divs.length;i++){divs[i].classList.remove('folded')}
          "
          ><?php write("#Expand all")?>
        </a>
        <a id=btn_all_fold href=# style=""
          onclick="
            var divs=document.querySelectorAll('div.card');
            for(var i=0;i<divs.length;i++){divs[i].classList.add('folded')}
          "
          ><?php write("#Fold all")?>
        </a>
      </div>
      <?php
    }
  ?>

  <!--Tips-->
  <span style="font-size:12px;color:#666;float:right">
    <div style="padding:0.5em;cursor:pointer" onclick="document.querySelector('#tip').innerHTML=Tips.random()">
      <b><?php write('#Tip')?></b> &rarr;
      <i id=tip></i> &emsp; &#9654;
      <script>document.querySelector('#tip').innerHTML=Tips.random()</script>
    </div>
  </span>
</h1>
</center>

<!--main container-->
<div id=main>
  <!--level2 container-->
  <?php $folded=isset($_COOKIE['Folded_level2_container'])?"folded":"";?>
  <div id=level2_container class="card <?php echo $folded?>">
    <!--level 2 menu-->
    <div class=menu onclick=fold(this.parentNode)>
      <button></button>
      <b>Inputs &amp; Outputs</b> &mdash;
      <?php write('#assessment_period')?>
      <b class=number id=Global_General_Days></b>
      <script>document.querySelector('#Global_General_Days').innerHTML=format(Global.General.Days())</script>
      <?php write('#days')?>
      <?php
        //population
        if($level!="Energy") {
          echo " | ";

          //serviced population
          $serv_pop = $level=="Water" ? "ws_serv_pop" : "ww_serv_pop";
          write("#$serv_pop"."_descr");
          $value = $level=="Water" ? "Global.Water.ws_serv_pop" : "Global.Waste.ww_serv_pop()";
          echo "
            <b class=number id=Global_level_serv_pop></b> |
            <script>document.querySelector('#Global_level_serv_pop').innerHTML=format($value)</script>
          ";

          //connected population (only for wastewater)
          if($level=="Waste"){
            write('#ww_conn_pop_descr');
            echo "
              <b class=number id=Global_level_conn_pop></b> |
              <script>document.querySelector('#Global_level_conn_pop').innerHTML=format(Global.Waste.ww_conn_pop())</script>
            ";
          }

          //resident population
          $resi_pop = $level=="Water" ? "ws_resi_pop" : "ww_resi_pop";
          write("#$resi_pop"."_descr");
          echo "
            <b class=number id=Global_level_resi_pop></b>
            <script>
              document.querySelector('#Global_level_resi_pop').innerHTML=format(Global.$level.$resi_pop);
            </script>
          ";
        }
      ?>
      <!--button toggle outputs/graph display-->
      <button
        class=btn_toggle
        onclick="event.stopPropagation();this.parentNode.parentNode.classList.remove('folded');toggleDivs(event,this,'#graph_container','#outputs_container')"
      >
      <?php write('#VIEW GRAPH')?>
      </button>
    </div>

    <!--level2-->
    <div style=padding:0.5em>
      <!--inputs level2-->
      <div class=inline style="width:44%;margin-left:0.2em;">
        <?php include'level2.php'?>
      </div>

      <!--outputs level2-->
      <div id=outputs_container class=inline style="width:54%;">

        <!--level2 GHG outputs-->
        <table id=outputs style="width:100%;background:#f6f6f6;">
          <tr><th colspan=7 class=tableHeader>
            <?php write('#OUTPUTS')?> &mdash;
            <?php write('#GHG emissions')?>
          <tr>
            <th><?php write('#Origin')?>
            <th>kg CO<sub>2</sub><br><?php write('#whole period')?>
            <th>kg CO<sub>2</sub><br>per <?php write('#year')?>
            <th>kg CO<sub>2</sub><br>per <?php write('#year')?><br>per inhab
            <th>kg CO<sub>2</sub><br>per <?php write('#year')?><br>per serv.pop
            <th>kg CO<sub>2</sub><br>per m<sup>3</sup>
          <tr><td style=color:#ccc colspan=6>
            <?php write('#Loading')?>...
        </table>

        <!--level2 outputs: NRG and SL-->
        <table id=nrgOutputs style="width:100%;background:#f6f6f6;">
          <tr><th colspan=4 class=tableHeader>
            <?php write('#OUTPUTS')?> &mdash;
            <?php write('#Energy performance and Service Level indicators')?>
          <tr>
            <th><?php write('#edit_description')?>
            <th><?php write('#edit_current_value')?>
            <th><?php write('#edit_unit')?>
          <tr><td style=color:#ccc colspan=3>
            <?php write('#Loading')?>...
        </table>
      </div>

      <!--GRAPHS-->
      <div id=graph_container class=inline style="width:54%;display:none;border:0px solid #ccc">
        <!--choose graph type buttons-->
        <?php include'buttonsGraphType.php'?>
        <!--actual graph-->
        <div id=graph>Click a graph to display</div>
        <style>
          #graph div.options{padding:1em}
          #graph {text-align:center}
          #graph table {margin:auto}
        </style>
      </div>
    </div>
  </div>

  <!--level3-->
  <?php if($sublevel){include'level3.php';} ?>
</div>

<div style=margin-top:5em></div>
</html>

<!--CURRENT JSON--><?php include'currentJSON.php'?>

<script>
  /** If no substages (will happen at the first time. Create one empty substage*/
  (function() {
    if(substages.length==0) {
      substages.push(new level3.Substage()); //create a substage
      //do not modify the first substage's inputs
    }
  })();
</script>

<script>
  //load charts
  google.charts.load('current',{'packages':['corechart','bar']});
</script>

<style>
  table td select[magnitude=Option] {
    font-size:smaller;
  }
</style>
