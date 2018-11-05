<!doctype html><html><head>
  <?php include'imports.php'?>
  <script>
    var Configuration={}; //namespace

    /** Enable or disable stage <input type=checkbox id=id>*/
    Configuration.activate=function(alias){
      //hide warning "all inactive"
      document.querySelector("#inactive_warning").classList.remove('visible');

      //checkbox element clicked
      var checkbox=document.getElementById(alias);

      //update Active Stages
      Global.Configuration.ActiveStages[alias]=checkbox.checked ? 1 : 0;

      //reset all variables to zero if not checked
      if(!checkbox.checked){
        var stage=Structure.find(s=>s.alias==alias);
        if(stage.sublevel){
          this.reset(Global[stage.level][stage.sublevel]);
          Substages[stage.level][stage.sublevel]=[];
        }else{
          this.reset(Global[stage.level]);
          //reset also level2 for substages
          Structure.filter(s=>s.sublevel && s.level==stage.level).forEach(s=>{
            Substages[s.level][s.sublevel]=[];
          });
        }
      }

      //if a level 1 is deactivated, deactivate the corresponding level 2 ones
      if(
        Structure
          .filter(s=>!s.sublevel)
          .map(s=>s.alias)
          .indexOf(alias)>-1 && !checkbox.checked
      ){
        var elements=document.querySelectorAll("table#selectStage input[class="+alias+"]")
        for(var i=0;i<elements.length;i++) {
          var alias=elements[i].id;
          elements[i].checked=false;
          this.activate(alias);
        }
      }

      //if a level 2 stage is activated, activate L1 if not active
      if(
        Structure
          .filter(s=>s.sublevel)
          .map(s=>s.alias)
          .indexOf(alias) >-1 && checkbox.checked
        ){
          var l1=checkbox.getAttribute('class');
          document.getElementById(l1).checked=true;
          this.activate(l1);
        }

      init();
    }

    /** Set all elements inside an object to 0 */
    Configuration.reset=function(obj) {
      for(var field in obj) {
        if(typeof(obj[field])=="number") obj[field]=0;
      }
      updateResult();
    }

    /** set visuals depending on Global.Configuration.ActiveStages */
    Configuration.activateLevels=function() {
      for(var stage in Global.Configuration.ActiveStages) {
        if(stage=="")continue;
        if(Global.Configuration.ActiveStages[stage]==1) {
          /**set checked*/document.getElementById(stage).checked=true;;
          /**color*/document.querySelector('table#selectStage td[stage='+stage+']').style.backgroundColor='lightgreen';
        } else if(Global.Configuration.ActiveStages[stage]==0) {
          /**set checked*/document.getElementById(stage).checked=false;
          /**color*/document.querySelector('table#selectStage td[stage='+stage+']').style.backgroundColor='';
        }
      }
    }

    Configuration.defaults=function(){
      //default country
      document.querySelector('#country').value=Global.General.Country;

      var variables=document.querySelectorAll('table#general_inputs input[id]');
      for(var i=0;i<variables.length;i++) {
        var id=variables[i].id;
        var loc=locateVariable(id);
        var obj = loc.sublevel ? Global[loc.level][loc.sublevel] : Global[loc.level];
        //update value
        variables[i].value=obj[id]
      }

      //default anyFuelEngines
      if(Global.General.anyFuelEngines){
        document.querySelector("input[name=anyFuelEngines][value='1']").checked=true;
      }
    }
  </script>

  <script>
    function init() {
      Sidebar.update();
      Configuration.activateLevels();
      Configuration.defaults();
      //update linear diagram when clicking configuration
      (function(){
        Object.keys(Global.Configuration.ActiveStages).forEach(function(stage){
          var img=document.querySelector('#linearDiagram img[stage='+stage+']')
          if(!img)return;//for level 1 stages
          if(Global.Configuration.ActiveStages[stage]){
            img.src="img/"+stage+".png";
            img.classList.remove('inactive');
          }else{
            img.src="img/"+stage+"-off.png";
            img.classList.add('inactive');
          }
        })
      })();
      Caption.listeners();
      showGWPconstants();
      updateResult();
    }

    //update a field
    function update(obj,field,newValue) {
      newValue=parseFloat(newValue);
      if(isNaN(newValue))newValue=0;
      obj[field]=newValue;
      init();
    }
  </script>

  <style> h4{margin-bottom:1em} </style>
</head><body onload=init()><center>
<?php
  include'sidebar.php';
  include'navbar.php';
  include'linear.php';
  include'caption.php';
?>
<!--title--><h1><?php write('#configuration')?></h1>

<!--main container-->
<div id=main style=margin-top:1em>

<!--top container-->
<div class=flex style=justify-content:center>
  <!--table activate stages in the left-->
  <div style="max-width:50%">
    <!--subtitle--><h4 style=margin:0;margin-bottom:1em><?php write('#configuration_subtitle')?></h4>
    <!--stages-->
    <div>
      <table id=selectStage>
        <style>
          #selectStage { box-shadow:inset 0 2px 4px rgba(0,0,0,.15),0 1px 2px rgba(0,0,0,.05); }
          #selectStage img{width:40px;vertical-align:middle}
          #selectStage th{width:240px;}
          #selectStage td{text-align:left;padding:0}
          #selectStage label{cursor:pointer;display:block;height:100%;width:100%;padding:8px}
          #selectStage input[type=checkbox]{vertical-align:middle;}
        </style>
        <tr>
          <th><?php write('#quick_assessment')?>
          <th><?php write('#energy_performance')?>
          <?php
            function printL1stage($alias,$name,$rowspan) {
              echo "<tr>
                <td rowspan=$rowspan stage=$alias>
                <label>
                  <input type=checkbox id=$alias onchange=Configuration.activate(this.id)>
                  <img src=img/$alias.png>
                  <span>$name</span>
                </label>";
            }
            function printL2stage($class,$alias,$name,$newRow) {
              if($newRow){echo "<tr>";}
              echo "<td stage=$alias>
                <label>
                  <input type=checkbox id=$alias class=$class onchange=Configuration.activate(this.id)>
                  <img src=img/$alias.png>
                  <span>$name</span>
                </label>";
            }
            printL1stage("water",           translate('#Water'),        3);
            printL2stage("water","waterAbs",translate("#Abstraction"),  false);
            printL2stage("water","waterTre",translate("#Treatment"),    true);
            printL2stage("water","waterDis",translate("#Distribution"), true);
            printL1stage("waste",           translate('#Waste'),        3);
            printL2stage("waste","wasteCol",translate("#Collection"),   false);
            printL2stage("waste","wasteTre",translate("#Treatment"),    true);
            printL2stage("waste","wasteDis",translate("#Discharge"),    true);
            printL1stage("faecl",           translate('#Faecl'),        3);
            printL2stage("faecl","faeclCon",translate('#Containment'),  false);
            printL2stage("faecl","faeclTre",translate('#Treatment'),    true);
            printL2stage("faecl","faeclReu",translate('#Reuse'),        true);
          ?>
      </table>
    </div>

    <!--btn activate all-->
    <div>
      <button class=button onclick="activateAllStages(event)"><?php write('#configuration_activate_all')?></button>
      <script>
        function activateAllStages(event){
          event.stopPropagation();
          Object.keys(Global.Configuration.ActiveStages)
          .forEach(stage=>{
            var checkbox=document.querySelector("table#selectStage #"+stage).checked=true;
            Configuration.activate(stage);
          });
        }
      </script>
    </div>
  </div>

  <!--container for other questions in the right-->
  <div style="max-width:45%;padding:0em 1em 1em 1em">
    <style>
      #main fieldset{margin:0 0 1.4em 0;padding:0.9em;border:1px solid #aaa}
    </style>

    <!--select country-->
    <fieldset>
      <legend><?php write('#select_country')?>
        <select id=country>
          <option value="false">--select--</option>
        </select>
        <script>
          (function(){
            var select=document.querySelector('select#country');
            select.addEventListener('change',function(){
              var country=this.value;
              if(country=="false") return;
              Global.General.Country=country;
              Global.Configuration.Selected.prot_con=country;
              ['conv_kwh_co2','prot_con','bod_pday','bod_pday_fs'].forEach(function(code) {
                var input=document.querySelector("table#general_inputs input#"+code)
                if(code=="bod_pday_fs"){ code="bod_pday"; } //put the same value in faecal sludge as normal bod per day
                input.value=Countries[country][code];
                input.onchange();
              });
              init();
            });
            Object.keys(Countries).forEach(country=>{
              var option=document.createElement('option');
              option.value=country;
              option.innerHTML=country;
              select.appendChild(option);
            });
          })();
        </script>
        <a href=countries.php>Info</a>
      </legend>

      <table id=general_inputs>
        <tr>
          <td><?php write('#conv_kwh_co2_descr')?>
          <td><input id=conv_kwh_co2 onchange="update(Global.General,this.id,this.value)">
          <td>kg<sub>CO<sub>2</sub></sub>/kWh
        <tr>
          <td><?php write('#prot_con_descr')?>
          <td><input id=prot_con onchange="update(Global.General,this.id,this.value)">
          <td>kg/<?php write('#person')?>/<?php write('#year')?>
        <tr>
          <td><?php write('#bod_pday_descr')?>
          <td><input id=bod_pday onchange="update(Global.General,this.id,this.value)">
          <td>g/<?php write('#person')?>/<?php write('#day')?>
        <tr>
          <td><?php write('#bod_pday_fs_descr')?>
          <td><input id=bod_pday_fs onchange="update(Global.General,this.id,this.value)">
          <td>g/<?php write('#person')?>/<?php write('#day')?>
      </table>
    </fieldset>

    <!--fuel engines in any stage-->
    <fieldset>
      <legend><?php write('#do_you_have_engines')?></legend>
      <label> <?php write('#no')?>  <input type=radio name=anyFuelEngines value=0 onclick=answerAnyFuelEngines(this) checked></label> &emsp;
      <label> <?php write('#yes')?> <input type=radio name=anyFuelEngines value=1 onclick=answerAnyFuelEngines(this)></label>
    </fieldset>

    <script>
      function answerAnyFuelEngines(el){
        var value=parseInt(el.value);
        update(Global.General, el.name, value);
        Global.Configuration['Yes/No'].wsa_engines=value;
        Global.Configuration['Yes/No'].wst_engines=value;
        Global.Configuration['Yes/No'].wsd_engines=value;
        Global.Configuration['Yes/No'].wwc_engines=value;
        Global.Configuration['Yes/No'].wwt_engines=value;
        Global.Configuration['Yes/No'].wwd_engines=value;
        Global.Configuration['Yes/No'].fst_engines=value;
        if(!value){
          //reset stage values
          Global.Water.Abstraction.wsa_vol_fuel=0;
          Global.Water.Treatment.wst_vol_fuel=0;
          Global.Water.Distribution.wsd_vol_fuel=0;
          Global.Waste.Collection.wwc_vol_fuel=0;
          Global.Waste.Treatment.wwt_vol_fuel=0;
          Global.Waste.Discharge.wwd_vol_fuel=0;
          Global.Faecl.Treatment.fst_vol_fuel=0;
          //reset substage values
          Substages.Water.Abstraction.forEach(s=>{s.wsa_vol_fuel=0;});
          Substages.Water.Treatment.forEach(s=>{s.wst_vol_fuel=0;});
          Substages.Water.Distribution.forEach(s=>{s.wsd_vol_fuel=0;});
          Substages.Waste.Collection.forEach(s=>{s.wwc_vol_fuel=0;});
          Substages.Waste.Treatment.forEach(s=>{s.wwt_vol_fuel=0;});
          Substages.Waste.Discharge.forEach(s=>{s.wwd_vol_fuel=0;});
          Substages.Faecl.Treatment.forEach(s=>{s.fst_vol_fuel=0;});
        }
        updateResult();
      }
    </script>

    <!--global warming potential-->
    <?php include'gwp.php'?>
  </div>
</div class=flex>

<!--bottom container prev & next buttons-->
<div style=margin:1em>
  <button class="button prev" onclick="event.stopPropagation();window.location='getStarted.php'"><?php write('#previous')?></button><!--
  --><button class="button next" onclick="event.stopPropagation();window.location='inhabitants.php'"><?php write('#next')?></button>

  <div id=inactive_warning>
    <b><?php write('#configuration_active_stages_error')?></b>
  </div>
  <style>
    #inactive_warning {
      background:red;
      transition:all 1s;
      display:none;
    }
    #inactive_warning.visible {
      display:block;
    }
  </style>
</div>

</div id=main>

<!--json--><?php include'currentJSON.php'?>
