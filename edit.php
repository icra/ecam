<?php
  if(!isset($_GET['level'])){die("ERROR: stage not specified");}
  /**
    * Inputs:
    *  - $level:     mandatory {"Water","Waste","Faecl"}
    *  - $sublevel:  optional. If set, enables level 3 {"Abstraction","Treatment","Distribution",...}
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
      padding:0.1em 0.2em;
      text-align:center;
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
        switch($level){
          case "Water": echo "#00aff1"; break;
          case "Waste": echo "#d71d24"; break;
          case "Faecl": echo "green"; break;
        }
      }
    ?>
    table#inputs th:not(.tableHeader),
    table#substages th,
    table#substages td.variableCode {
      background:<?php getL1color()?>;
    }

    h1 a:not([id]),
    #inputs a,#inputs a:visited,
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
    /* Update all */
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
      Sidebar.updateMemory(true);
      Caption.listeners();
      updateResult();
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
          newCell.innerHTML=(function(){
            var color=value?"":"#ccc";
            return "<span style=color:"+color+">"+format(value)+"</span>";
          })();

          /*Normalization*/
          (function(){
            var level    = '<?php echo $level?>';
            var sublevel = '<?php if($sublevel) echo $sublevel; else echo 'false' ?>';

            //in FSM only divide by year and fs_onsi_pop
            if(level=='Faecl'){
              var newCell=newRow.insertCell(-1);

              //calculate normalized value
              var norm=Normalization.normalize('servic',field,level,sublevel); //value
              norm/=Global.General.Years();

              //inner html
              newCell.innerHTML=(function(){
                if(norm==Infinity || isNaN(norm))
                  return "N/A";
                else{
                  var color=norm?"":"#ccc";
                  return "<span style=color:"+color+">"+format(norm)+"</span>";
                }
              })();
              return;
            }

            //value per serviced population
            //value per water volume
            ['servic','volume'].forEach(function(category) {
              var newCell=newRow.insertCell(-1);

              //determine the field to be highlighted
              var hlfield = (sublevel=='false' || category=='reside' || category=='servic') ? Normalization[level][category] : Normalization[level][sublevel][category];

              //calculate normalized value
              var norm=Normalization.normalize(category,field,level,sublevel); //value
              if(category!='volume'){
                norm/=Global.General.Years();
              }

              /**
                * EXCEPTION HERE FOR WWD DISCHARGE REUSE (WARNING TODO)
              */
              if(field=='wwd_KPI_GHG_tre_n2o' && category=='volume'){
                hlfield='wwd_vol_disc';
                norm=value/CurrentLevel[hlfield];
              }
              if(field=='wwd_KPI_GHG_trck' && category=='volume'){
                hlfield='wwd_vol_nonp';
                norm=value/CurrentLevel[hlfield];
              }

              //hl related variables
              newCell.setAttribute('onmouseover',"Formulas.hlField('"+hlfield+"',1)");
              newCell.setAttribute('onmouseout',"Formulas.hlField('"+hlfield+"',0)");

              //inner html
              newCell.innerHTML=(function(){
                if(category=='volume' && (norm==Infinity || isNaN(norm)) ){
                  return "N/A";
                }else{
                  var color=norm?"":"#ccc";
                  return "<span style=color:"+color+">"+format(norm)+"</span>";
                }
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
            var color=value?"":"#ccc";
            return "<span style=color:"+color+">"+format(value)+"</span>";
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

    //show and hide divs with "View Graphs" buttons
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
<?php include 'sidebar.php'?>
<?php include 'navbar.php' ?>
<?php include 'linear.php' ?>
<?php include 'caption.php'?>

<!--title-->
<?php
  //navigable title
  switch($level) {
    case "Water":
    case "Waste": 
    case "Faecl": $titleLevel=translate("#$level"); break;
    default:      $titleLevel=$level; break;
  }
  if($sublevel) {
    $titleSublevel="<span style='font-size:26px'>".translate("#$sublevel")."</span>";
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
<h1 class=flex style=justify-content:space-between>
  <div>
    <a href=sources.php id=Global_General_Name></a>
    <script>document.querySelector('#Global_General_Name').innerHTML=Global.General.Name</script>
    <?php echo "$sep $title"?>

    <!--See description (link to iwa web)-->
    <?php
      if(false && $sublevel){
        ?>
        <span style=line-height:10px>
          <?php
            $iwaLink='http://www.iwa-network.org/water-climate-energy-solutions/public/catalogue/';
            if    ($level=="Water" && $sublevel=="Abstraction"  ){$alias="waterAbs"; $iwaLink.='stage/water_abstraction';}
            elseif($level=="Water" && $sublevel=="Treatment"    ){$alias="waterTre"; $iwaLink.='stage/water_treatment';}
            elseif($level=="Water" && $sublevel=="Distribution" ){$alias="waterDis"; $iwaLink.='stage/water_distribution';}
            elseif($level=="Waste" && $sublevel=="Collection"   ){$alias="wasteCol"; $iwaLink.='stage/wastewater_collection';}
            elseif($level=="Waste" && $sublevel=="Treatment"    ){$alias="wasteTre"; $iwaLink.='stage/wastewater_treatment';}
            elseif($level=="Waste" && $sublevel=="Discharge"    ){$alias="wasteDis"; $iwaLink.='stage/wastewater_discharge';}
            elseif($level=="Faecl" && $sublevel=="Containment"  ){$alias="faeclCon"; $iwaLink.='';}
            elseif($level=="Faecl" && $sublevel=="Treatment"    ){$alias="faeclTre"; $iwaLink.='';}
            elseif($level=="Faecl" && $sublevel=="Reuse"        ){$alias="faeclReu"; $iwaLink.='';}
          ?>
          <a target=_blank href="<?php echo $iwaLink?>">
            <img style=width:27px;margin-left:10px title="More info" src='img/<?php echo "$alias.png"?>'>
          </a>
        </span>
        <?php
      }
    ?>
  </div>

  <!--btns fold all div.cards-->
  <?php if(false && $sublevel) { //disabled
    ?>
    <div id=btn_all_container>
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
  <div style="font-size:12px;color:#666;">
    <div style="padding:0.5em;line-height:1.5em" onclick="document.querySelector('#tip').innerHTML=Tips.random()">
      <svg style="vertical-align:text-bottom" viewBox="0 0 12 16" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"></path></svg>
      <strong><?php write('#Tip')?>!</strong>
      <i id=tip></i> &emsp; &#9654;
      <script>document.querySelector('#tip').innerHTML=Tips.random()</script>
    </div>
  </div>
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
      <span><?php write("#Inputs & Outputs")?></span>

      <!--button VIEW GRPHS show graphs-->
      <button
        class=btn_toggle
        onclick="
          event.stopPropagation();
          this.parentNode.parentNode.classList.remove('folded');
          toggleDivs(event,this,'#graph_container','#outputs_container');
        "
      >
      <?php write('#VIEW GRAPH')?>
      </button>
    </div>

    <!--util info-->
    <?php
      if($level=='Water' || $level=='Waste' || $level=='Faecl'){
        ?>
        <div class="flex" style="padding:0.2em 2em;justify-content:space-between;font-family:monospace;font-size:smaller;background:#fafafa">
          <!--assessment period-->
          <div>
            <a href=getStarted.php><?php write('#assessment_period')?></a>:
            <b class=number id=Global_General_Days></b>
            <?php write('#days')?>
            <script>
              (function(){
                var value=Global.General.Days();
                var el=document.querySelector('#Global_General_Days');
                el.innerHTML=format(value);
                el.style.background=value?"":"red";
              })();
            </script>
          </div>
          <!--resident population-->
          <?php
            echo "<div>";

            $resi_pop = ["Water"=>"ws","Waste"=>"ww","Faecl"=>"fs"][$level]."_resi_pop";

            echo "<a href=inhabitants.php>";
            write("#$resi_pop"."_descr");
            echo "</a>";
            echo ":
              <b class=number id=Global_level_resi_pop></b>
              <script>
                (function(){
                  var value=Global.$level.$resi_pop;
                  var el=document.querySelector('#Global_level_resi_pop');
                  el.innerHTML=format(value);
                  el.style.background=value?'':'red';
                })();
              </script>
            ";
            echo "</div>";
          ?>
          <!--connected population only ww-->
          <?php
            if($level=="Waste"){
              echo "<div>";
              echo "<a href=inhabitants.php>";
              write('#ww_conn_pop_descr');
              echo "</a>";
              echo ":
                <b class=number id=Global_level_conn_pop></b>
                <script>
                  (function(){
                    var value=Global.Waste.Collection.wwc_conn_pop;
                    var el=document.querySelector('#Global_level_conn_pop');
                    el.innerHTML=format(value);
                    el.style.background=value?'':'red';
                  })();
                </script>
              ";
              echo "</div>";
            }
          ?>
          <!--serviced population-->
          <?php
            echo "<div>";
            $serv_pop = ["Water"=>"ws_serv_pop","Waste"=>"ww_serv_pop","Faecl"=>"fs_onsi_pop"][$level];

            echo "<a href=inhabitants.php>";
            write("#$serv_pop"."_descr");
            echo "</a>";
            $value = "Global.$level.".["Water"=>"ws_serv_pop","Waste"=>"ww_serv_pop()","Faecl"=>"fs_onsi_pop"][$level];
            echo ":
              <b class=number id=Global_level_serv_pop></b>
              <script>
                (function(){
                  var value=$value;
                  var el=document.querySelector('#Global_level_serv_pop');
                  el.innerHTML=format(value);
                  el.style.background=value?'':'red';
                })();
              </script>
            ";
            echo "</div>";
          ?>
          <!--kwh to co2 conversion-->
          <div>
            <a href=configuration.php><?php write('#conv_kwh_co2_descr')?></a>:
            <b class=number id=conv_kwh_co2_value></b>
            <span class=number id=conv_kwh_co2_unit></span>
            <script>
              //value
              (function(){
                var value=Global.General.conv_kwh_co2;
                var el=document.querySelector('#conv_kwh_co2_value');
                el.innerHTML=format(value);
                el.style.background=value?"":"red";
              })();
              //unit
              document.querySelector('#conv_kwh_co2_unit').innerHTML=Info['conv_kwh_co2'].unit;
            </script>
          </div>
        </div>
        <?php
      }
    ?>

    <!--level2-->
    <div class=flex style="padding:1px 0 0.2em 0.2em">
      <!--inputs level2-->
      <div style="min-width:40%;margin-right:5px;">
        <?php include'level2.php'?>
      </div>

      <!--outputs level2-->
      <div style="width:50%">
        <div id=outputs_container>
          <!--level2 GHG outputs-->
          <table id=outputs style="width:100%;">
            <tr><th colspan=7 class=tableHeader>
              <?php write('#OUTPUTS')?> &mdash;
              <?php write('#GHG emissions')?>
            <tr>
              <th><?php write('#Origin')?>
              <th>kg CO<sub>2</sub>eq<br><?php write('#assessment period')?>

              <?php
                if($level=='Water'||$level=='Waste'){
                  ?>
                    <th>kg CO<sub>2</sub>eq<br>per <?php write('#year')?> <br>per <?php write('#serv.pop.')?>
                    <th>kg CO<sub>2</sub>eq<br>per m<sup>3</sup>
                  <?php
                }
                if($level=='Faecl'){
                  ?>
                    <th>kg CO<sub>2</sub>eq<br>per <?php write('#year')?> <br>per <?php write('#serv.pop.')?>
                  <?php
                }
              ?>
            <tr><td style=color:#ccc colspan=6>
              <?php write('#Loading')?>...
          </table>

          <!--level2 outputs: NRG and SL-->
          <table id=nrgOutputs style="width:100%;">
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
        <div id=graph_container style="display:none;border:0px solid #ccc">
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
  </div>

  <!--level3-->
  <?php if($sublevel){include'level3.php';} ?>

  <!--include links to level2 stages-->
  <?php
    if(!$sublevel){ ?>
      <div class="card" id=links-to-l2>
        <?php cardMenu(translate('#Tier B - Detailed assessment'))?>
      </div>
      <script>
        (function(){
          var div=document.querySelector('#links-to-l2');
          var l2stages=Object.keys(CurrentLevel).filter(key=>{return typeof(CurrentLevel[key])=='object'});
          l2stages.forEach(stage=>{
            var link=document.createElement('h1');
            link.style.textAlign='center';
            div.appendChild(link);
            link.innerHTML="<a href=edit.php?level=<?php echo $level?>&sublevel="+stage+">"+translate(stage)+"</a>";
          });
        })();
      </script>
    <?php }
  ?>

  <!--previous and next buttons-->
  <?php
    if($sublevel){?>
      <div style=text-align:center>
           <button class="button prev" onclick="nextPage(event,1)"><?php write('#previous')?></button><!--
        --><button class="button next" onclick="nextPage(event,0)"><?php write('#next')?></button>
        <script>
          //find first available stage to start entering data
          function nextPage(event,reverse){
            reverse=reverse||false;
            if(event)event.stopPropagation();

            //find next stages
            var locs=[];
            Structure.filter(stage=>{
              return stage.sublevel && Global.Configuration.ActiveStages[stage.alias];
            }).forEach(stage=>{
              locs.push("edit.php?level="+stage.level+"&sublevel="+stage.sublevel);
            });

            //reverse for previous button
            if(reverse)locs=locs.reverse();

            //cut the array by this stage
            locs=locs.slice(1+locs.indexOf("edit.php?level=<?php echo $level?>&sublevel=<?php echo $sublevel?>"));

            //console.log(locs);
            if(locs.length){ 
              window.location=locs[0];
            }else{
              if(reverse){
                window.location="birds.php";
              }else{
                window.location="sources.php";
              }
            }
          }
        </script>
      </div>
    <?php }
  ?>
</div>
<div style=margin-top:5em></div>
</html>

<!--CURRENT JSON--><?php include'currentJSON.php'?>

<script>
  /** if no substages (will happen only the first time): create empty substage*/
  (function() {
    if(substages.length==0) {
      substages.push(new level3.Substage());
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
