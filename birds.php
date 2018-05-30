<!doctype html><html><head>
  <?php include'imports.php'?>
  <script>
    function init(){
      //console.log('init');
      BEV.updateDefaults(); //update input values
      BEV.defaultQuestions(); //update question values
      //update default treatment type and sludge disposal method
      document.querySelector('#sludge_estimation').value=Global.Configuration.Selected.sludge_estimation_method;
      document.querySelector('#main_treatment_type').value=Global.Waste.Treatment.wwt_type_tre;
      drawCharts();
      updateResult();
      Caption.listeners();
    }

    function drawCharts(){
      //   ".graph(withTable,container)"
      Graphs.ghg_by_source(false,'graph1');
      Graphs.graph2(false,'graph2');
      //   ".graph(container)"
      Graphs.ws_cost('graph3');
      Graphs.ww_cost('graph4');
      //   ".gauge(container, value,                        header,                            unit,      lowerLimit, upperLimit)"
      Graphs.gauge('graph5', Global.Water.ws_SL_serv_pop(), translate("ws_SL_serv_pop_descr"), undefined, 0, 100);
      Graphs.gauge('graph6', Global.Waste.ww_SL_serv_pop(), translate("ww_SL_serv_pop_descr"), undefined, 0, 100);

      //GHG emissions per year per person
      (function(){
        var years=Global.General.Years();

        //water
        var ws_serv=Global.Water.ws_serv_pop;
        Graphs.gauge('graph7', Global.Water.ws_KPI_GHG()/years/ws_serv,
          translate("ws_KPI_GHG_descr"),
          "<br>"+Info.ws_KPI_GHG.unit+"/year/serv.pop.",
          0, 200); //with units and limits (lower limit and upper limit)

        //wastewater
        var ww_serv=Global.Waste.ww_serv_pop();
        Graphs.gauge('graph8', Global.Waste.ww_KPI_GHG()/years/ww_serv,
          translate("ww_KPI_GHG_descr"),
          "<br>"+Info.ww_KPI_GHG.unit+"/year/serv.pop.",
          0, 200); //with unit and limits (lower limit and upper limit)
      })();
    }
  </script>

  <!--BEV namespace (birds eye view old name)-->
  <script>
    var BEV={}; //'Birds Eye View' namespace
    //update input values fx
    BEV.update=function(obj,field,newValue) {
      if(obj[field]===undefined){alert('field '+field+' undefined');return;}
      //newValue may be a string from input.value, it should be a float
      newValue=parseFloat(newValue);
      obj[field]=newValue;
    }

    //update a value
    BEV.updateField=function(input){
      //get info from the input element
      var field = input.id;
      //replace commmas for copy paste easyness
      var value = parseFloat(input.value);
      value*=Units.multiplier(field);
      //if value is not a number, set to zero
      if(isNaN(value))value=0;
      //get location
      var loc=locateVariable(field);
      //update
      if(loc.sublevel){
        this.update(Global[loc.level][loc.sublevel],field,value);
      }else{
        this.update(Global[loc.level],field,value);
      }
      init();
    }

    //Display default values from the table
    BEV.updateDefaults=function(){
      var inputs = document.querySelectorAll('#inputs input');
      for(var i=0;i<inputs.length;i++){
        var input = inputs[i];
        var field = input.id;
        if(field=='')continue;
        //set the longer description in the input <td> element
        input.parentNode.parentNode.childNodes[0].title=translate(field+'_expla');
        //get the value stored
        var value=getVariable(field);
        value/=Units.multiplier(field);
        //set the value to the input element
        input.value=format(value);
        //console.log(field,value);
      }
    }

    //producing biogas and valorizing biogas default values
    BEV.defaultQuestions=function() {
      //valorizing biogas
      var val=Global.Configuration["Yes/No"].wwt_valorizing_biogas;
      //producing biogas
      var pro=Global.Configuration["Yes/No"].wwt_producing_biogas;
      //gui elements
      var input_pro_y=document.querySelector('input[name=wwt_producing_biogas][value="1"]');
      var input_pro_n=document.querySelector('input[name=wwt_producing_biogas][value="0"]');
      var input_val_y=document.querySelector('input[name=wwt_valorizing_biogas][value="1"]');
      var input_val_n=document.querySelector('input[name=wwt_valorizing_biogas][value="0"]');
      if(pro){
        input_pro_y.checked=true;   //you are producing biogas
        input_val_y.disabled=false; //enable val
        input_val_n.disabled=false; //enable val
      }else{
        input_pro_n.checked=true;   //you are not producing biogas
        input_val_n.checked=true;   //you are not valorizing biogas
        input_val_y.disabled=true;  //disable valorizing
        input_val_n.disabled=true;  //disable valorizing
        Global.Configuration["Yes/No"].wwt_valorizing_biogas=0;
      }
      if(val && pro){
        input_val_y.checked=true; //you are valorizing biogas
      }
    }

    //update the value of the filter
    BEV.updateQuestion=function(code,newValue){
      Global.Configuration['Yes/No'][code]=newValue;
      init();
    }

    //"fake" input that updates an output
    BEV.updateOutput=function(input) {
      var field=input.id;
      var value=parseFloat(input.value)*Units.multiplier(field);
      //spred the value among the stages
      //get L1 name: "Water" or "Waste"
      var L1=locateVariable(field).level;
      if(L1=="Water"){
        //count active stages
        var wsa=Global.Configuration.ActiveStages.waterAbs;
        var wst=Global.Configuration.ActiveStages.waterTre;
        var wsd=Global.Configuration.ActiveStages.waterDis;
        var n=wsa+wst+wsd;
        if(n==0){
          console.warn("Warning: no Water stages active, all goes to Abstraction");
          //all energy goes to abstraction
          Global.Water.Abstraction[field.replace("ws_","wsa_")]=value;
          init();
          return;
        }
        Global.Water.Abstraction [field.replace("ws_","wsa_")]=wsa*value/n;
        Global.Water.Treatment   [field.replace("ws_","wst_")]=wst*value/n;
        Global.Water.Distribution[field.replace("ws_","wsd_")]=wsd*value/n;
      }else if(L1=="Waste"){
        //count active stages
        var wwc=Global.Configuration.ActiveStages.wasteCol;
        var wwt=Global.Configuration.ActiveStages.wasteTre;
        var wwd=Global.Configuration.ActiveStages.wasteDis;
        var n=wwc+wwt+wwd;
        if(n==0){
          console.warn("Warning: no Wastewater stages active, all goes to Collection");
          //all energy goes to collection
          Global.Waste.Collection[field.replace("ww_","wwc_")]=value;
          init();
          return;
        }
        Global.Waste.Collection[field.replace("ww_","wwc_")]=wwc*value/n;
        Global.Waste.Treatment [field.replace("ww_","wwt_")]=wwt*value/n;
        Global.Waste.Discharge [field.replace("ww_","wwd_")]=wwd*value/n;
      }
      init();
    }
  </script>
  <style>
    body{background:#F5ECCE}
    h1{
      background:white;
      border:none;
      box-shadow:0 1px 2px rgba(0,0,0,.5);
      line-height:2.1em;
      text-align:left;
    }

    /*
      legend colors for graphs
    */
    span.circle{display:none}
    span.circle{float:right}

    #inputs th, #inputs td {text-align:left;}
    #inputs th, #inputs td {border-left:none;border-right:none}
    #inputs td.input,
    #inputs td.output {
      width:70px;
      border:1px solid #aaa;
      color:#666;
      background:#eee;
      padding:0 !important;
    }
    #inputs input[id] {
      background:inherit;
      border:none;
      text-align:right;
      cursor: cell;
      line-height:1em;
      width:95%;
      height:24px;
      display:block;
    }
    #inputs input:focus {
      background:white;
    }
    #inputs tr.hidden {display:none}

    /*indication "level not active"*/
    #inputs tr[indic]{text-align:center;color:#999;background:#eee}
  </style>
</head><body onload="init()"><center>
  <?php include'sidebar.php'?>
  <?php include'navbar.php'?>
  <?php include'linear.php'?>
  <?php include'caption.php'?>
</center>

<!--title-->
<h1>
  <div>
    <?php write('#quick_assessment')?> &mdash;
    <?php write('#initial_estimation_description')?>
  </div>
</h1>

<!--context variables-->
<div class=flex
style="font-size:smaller;color:#666;justify-content:space-between;padding:0.5em 2em;background:#fafafa;box-shadow: 0 1px 2px rgba(0,0,0,.5);">
  <!--assessment period-->
  <div>
    <a href=variable.php?id=Days><?php write('#assessment_period')?></a>:
    <span id=Global_General_Days></span> <?php write('#days')?>
    <script>
      document.querySelector("#Global_General_Days").innerHTML=format(Global.General.Days());
    </script>
  </div>

  <!--conv_co2_kwh-->
  <div>
    <a href=variable.php?id=conv_kwh_co2><?php write('#conversion_factor')?></a>:
    <span id=conv_kwh_co2></span> kg CO<sub>2</sub>/kWh
    <script>
      (function(){
        var val=Global.General.conv_kwh_co2;
        var str=val==0?"<span style='padding:0 0.5em;background:red;cursor:help' caption='<?php write('#birds_warning_conv_factor')?>'>"+format(val)+" &#9888;</span>":format(val);
        document.querySelector('#conv_kwh_co2').innerHTML=str;
      })();
    </script>
  </div>

  <!--prot_cont-->
  <div>
    <a href=variable.php?id=prot_con><?php write('#Annual_protein_consumption')?></a>:
    <span id=prot_con></span> kg/person/year
    <script>
      (function(){
        var val=Global.General.prot_con;
        var str=val==0?"<span style='padding:0 0.5em;background:red;cursor:help' caption='warning: value is zero'>"+format(val)+" &#9888;</span>":format(val);
        document.querySelector('#prot_con').innerHTML=str;
      })();
    </script>
  </div>

  <!--bod_pday-->
  <div>
    <a href=variable.php?id=bod_pday><?php write('#bod_pday_descr')?></a>:
    <span id=bod_pday></span> kg/person/day
    <script>
      (function(){
        var val=Global.General.bod_pday;
        var str=val==0?"<span style='padding:0 0.5em;background:red;cursor:help' caption='warning: value is zero'>"+format(val)+" &#9888;</span>":format(val);
        document.querySelector('#bod_pday').innerHTML=str;
      })();
    </script>
  </div>
</div>

<!--main container-->
<div class=flex>
  <!--inputs container (left)-->
  <div style="width:33%">
    <!--table container-->
    <div class="card"><?php cardMenu($lang_json['#inputs'].' &mdash; '.$lang_json['#enter_values'])?>
      <!--inputs-->
      <table id=inputs style="width:100%">
        <!--Water supply-->
        <tr><th colspan=3 style="background:#0aaff1">
          <div class=flex style="justify-content:space-between">
            <div>
              <img src=img/water.png width=25 style="line-height:4em;vertical-align:middle"><?php write('#Water')?>
            </div>
            <!--water population-->
            <div>
              <img src=img/inhabitants.png width=25 caption="Water supply population" style=vertical-align:middle>
              <b caption="<?php write('#ws_serv_pop_descr')?>" id=ws_serv_pop onclick=window.location='inhabitants.php'>0</b> /
              <b caption="<?php write('#ws_resi_pop_descr')?>" id=ws_resi_pop onclick=window.location='inhabitants.php'>0</b>
              <script>
                document.querySelector('#ws_serv_pop').innerHTML=format(Global.Water.ws_serv_pop);
                document.querySelector('#ws_resi_pop').innerHTML=format(Global.Water.ws_resi_pop);
              </script>
            </div>
          </div>
          <!--water inputs-->
          <tr stage=water class=hidden><td style=width:40%><?php write('#ws_nrg_cons_descr')?><td class=output><input id='ws_nrg_cons' value=0> <td class=unit>
          <tr stage=water class=hidden><td><?php write('#vol_fuel')?>                         <td class=output><input id='ws_vol_fuel' value=0> <td class=unit>
          <tr stage=water class=hidden><td><?php write('#wsd_vol_dist_descr')?><td class=input><input id='wsd_vol_dist' value=0>                <td class=unit>
          <tr stage=water class=hidden><td><?php write('#birds_ws_run_cost')?> <td class=input><input id='ws_run_cost'  value=0>                <td class=unit>
          <tr stage=water class=hidden><td><?php write('#birds_ws_nrg_cost')?> <td class=input><input id='ws_nrg_cost'  value=0>                <td class=unit>
          <tr indic=water class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>
        </tr>
        <!--Wastewater-->
        <tr><th colspan=3 style=background:#d71d24>
          <div class=flex style="justify-content:space-between">
            <div>
              <img src=img/waste.png width=25 style="line-height:4em;vertical-align:middle"> <?php write('#Waste')?>
            </div>
            <!--wastewater population-->
            <div>
              <img src=img/inhabitants.png width=25 caption="Wastewater population" style="vertical-align:middle">
              <b caption="<?php write('#ww_serv_pop_descr')?>" id=ww_serv_pop onclick=window.location='inhabitants.php'>0</b> /
              <b caption="<?php write('#ww_conn_pop_descr')?>" id=ww_conn_pop onclick=window.location='inhabitants.php'>0</b> /
              <b caption="<?php write('#ww_resi_pop_descr')?>" id=ww_resi_pop onclick=window.location='inhabitants.php'>0</b>
              <script>
                document.querySelector('#ww_serv_pop').innerHTML=format(Global.Waste.ww_serv_pop());
                document.querySelector('#ww_conn_pop').innerHTML=format(Global.Waste.ww_conn_pop());
                document.querySelector('#ww_resi_pop').innerHTML=format(Global.Waste.ww_resi_pop);
              </script>
            </div>
          </div>
          <!--wastewater inputs-->
          <tr indic=waste class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>
          <tr stage=waste class=hidden><td><?php write('#ww_nrg_cons_descr') ?><td class=output><input id='ww_nrg_cons' value=0><td class=unit>
          <tr stage=waste class=hidden><td><?php write('#vol_fuel')?>          <td class=output><input id='ww_vol_fuel' value=0><td class=unit>
          <tr stage=waste class=hidden><td><?php write('#wwt_vol_trea_descr')?><td class=input> <input id='wwt_vol_trea'value=0><td class=unit>
          <tr stage=waste class=hidden><td><?php write('#wwd_vol_disc_descr')?><td class=input> <input id='wwd_vol_disc'value=0><td class=unit>
          <tr stage=waste class=hidden><td><?php write('#birds_ww_n2o_effl')?> <td class=input> <input id='wwd_n2o_effl'value=0><td class=unit>
          <tr stage=waste class=hidden><td><?php write('#birds_ww_run_cost')?> <td class=input> <input id='ww_run_cost' value=0><td class=unit>
          <tr stage=waste class=hidden><td><?php write('#birds_ww_nrg_cost')?> <td class=input> <input id='ww_nrg_cost' value=0><td class=unit>
          <!--biogas-->
          <?php include'biogas_birds.php'?>
          <!--treatment type-->
          <tr stage=waste class=hidden>
            <td colspan=3>
              <?php write('#select_main_treatment_type')?>
              <br>
              <?php include'treatment_birds.php'?>
            </td>
          </tr>
          <!--sludge management-->
          <tr stage=waste class=hidden>
            <td colspan=3>
              <?php write('#select_sludge_disposal_method')?>
              <br>
              <?php include'sludge_birds.php'?>
            </td>
          </tr>
        </tr>
      </table>

      <!--reset all Treatment estimations-->
      <div style="padding:0.5em 1em;display:none">
        <button onclick="resetTierB()" disabled>Reset all Tier B values (TBD)</button>
        <script>
          //TODO issue #94
          function resetTierB(){
            init();
          }
        </script>
      </div>
    </div>

    <!--prev next btns container-->
    <div style="margin:0.5em 1em;text-align:center">
      <script>
        //find first available stage to start entering data
        function nextPage(event) {
          if(event)event.stopPropagation();
          //go to first active substage
          var location;
          if(Global.Configuration.ActiveStages.waterAbs)
            location = "edit.php?level=Water&sublevel=Abstraction";
          else if(Global.Configuration.ActiveStages.waterTre)
            location = "edit.php?level=Water&sublevel=Treatment";
          else if(Global.Configuration.ActiveStages.waterDis)
            location = "edit.php?level=Water&sublevel=Distribution";
          else if(Global.Configuration.ActiveStages.wasteCol)
            location = "edit.php?level=Waste&sublevel=Collection";
          else if(Global.Configuration.ActiveStages.wasteTre)
            location = "edit.php?level=Waste&sublevel=Treatment";
          else if(Global.Configuration.ActiveStages.wasteDis)
            location = "edit.php?level=Waste&sublevel=Discharge";
          else if(Global.Configuration.ActiveStages.water)
            location = "edit.php?level=Water";
          else if(Global.Configuration.ActiveStages.waste)
            location = "edit.php?level=Waste";
          else {
            alert("<?php write('#configuration_active_stages_error')?>");
            return;
          }
          window.location=location;
        }
      </script>
      <button class="button prev" onclick="window.location='inhabitants.php'"><?php write('#previous')?></button><!--
      --><button class="button next" onclick=nextPage(event)><?php write('#next')?></button>
    </div>
  </div>

  <!--graphs container-->
  <div class=card style="width:66%">
    <?php cardMenu($lang_json['#figures'])?>
    <div id=graphs>
      <style>
        #graphs table{margin:auto !important;margin-bottom:0.5em !important}
        #graphs div div {text-align:center;position:relative}
        #graphs div.options {text-align:center;padding:1em}
        #graphs div[graph] {
          display:inline-block;
          text-align:center;
          vertical-align:top;
          width:50%;
          margin-left:-5px;
          margin-bottom:-1px;
          border:1px solid #ddd;
          padding:0;
        }
        #graphs div.tab_buttons,
        #graphs div.tab_buttons button {
          font-size:smaller;
        }
      </style>

      <div style=text-align:center>
        <div graph id=graph1><?php write('#loading')?></div>
        <div graph id=graph2><?php write('#loading')?></div>
        <!---->
        <div graph id=graph3><?php write('#loading')?></div>
        <div graph id=graph4><?php write('#loading')?></div>
        <div graph id=graph5><?php write('#loading')?></div>
        <div graph id=graph6><?php write('#loading')?></div>
        <!---->
        <div graph id=graph7><?php write('#loading')?></div>
        <div graph id=graph8><?php write('#loading')?></div>
        <!---->
        <div style="width:98%;padding:1em 0;margin-bottom:1em;border:none">
          <?php write('#for_further_details_go_to_detailed')?>
          <b>
            <?php write('#energy_performance')?>
          </b> (<a href=#>&uarr;</a>)
        </div>
        <div style="text-align:left;padding-left:10px">
          <?php write('#see_also')?>:
          <ul>
            <li> <a href='estimations.php'><?php write('#summary_of_estimations_at_this_level')?></a> </li>
            <li> <a href='non_revenue_water.php'><?php write('#about_nrw')?></a> </li>
            <li> <a href='authorized_consumption.php'><?php write('#about_auc')?></a> </li>
            <li> <a href='fuelInfo.php'><?php write('#about_fuel')?></a> </li>
            <li> <a href=sankey.php><?php write('#sankey_diagram')?></a>
          </ul>
        </div>
        <script>
          (function(){
            //hide inactive graphs
            if(Global.Configuration.ActiveStages.water==0) {
              document.querySelector("#graph3").style.display="none"
              document.querySelector("#graph5").style.display="none"
              document.querySelector("#graph7").style.display="none"
              document.querySelector("#graph8").style.display="none"
            }
            if(Global.Configuration.ActiveStages.waste==0) {
              document.querySelector("#graph4").style.display="none"
              document.querySelector("#graph6").style.display="none"
            }
          })();
        </script>
      </div>
    </div>
  </div>
</div>

<?php include'currentJSON.php'?>
<script>
  if(google){google.charts.load('current',{'packages':['corechart','gauge','bar']});}
</script>
</html>

<!--populate page-->
<script>
  //add listeners to all input elements
  (function(){
    var inputs=document.querySelectorAll("#inputs input[id]:not([type=radio])");
    for(var i=0;i<inputs.length;i++) {
      var input=inputs[i];
      input.addEventListener('focus',function(){
        this.value=getVariable(this.id)/Units.multiplier(this.id);
        this.select();
      });
      if(input.parentNode.classList.contains('input')){
        input.addEventListener('change',function(){BEV.updateField(this)});
      }else if(input.parentNode.classList.contains('output')){
        input.addEventListener('change',function(){BEV.updateOutput(this)});
      }
    }
  })();
</script>

<!--add lock symbol for inputs that are outputs-->
<script>
  //look for td.outputs and add class 'locked'
  (function(){
    var tds=document.querySelectorAll('#inputs td.output');
    tds.forEach(td=>{
      //find the input element inside the cell
      var input=td.querySelector('input[id]')
      if(!input)return;
      //find the level it belongs
      var level = locateVariable(input.id).level;
      //if substages>1, lock the cell
      Object.keys(Substages[level]).forEach(sublevel=>{
        //count substages
        var n=Substages[level][sublevel].length;
        //console.log("Substages",level,sublevel,n);
        var sum=getVariable(input.id);
        if(n && sum>0){
          td.classList.add('locked');
          input.disabled=true;
          td.parentNode.setAttribute('caption','Since you have entered more detailed data in Tier B stages, you cannot modify this input.<br>Now it displays the sum of its related '+translate(level)+' stage\'s inputs. If you still want to modify it, please set its related inputs to 0');
        }
      });
    });
  })();
</script>
<style>
  #inputs td.output.locked { background:#fff; }
  #inputs td.output.locked + td:before { content:"\1f512"; }
  #inputs td.output.locked input { cursor:default; }
</style>

<script>
  //write units
  (function(){
    var inputs=document.querySelectorAll('#inputs tr[stage] td input[id]');
    inputs.forEach(input=>{
      var td_unit=input.parentNode.nextSibling;
      var field=input.id;
      var currentUnit=Info[field].magnitude=='Currency' ? Global.General.Currency : Info[field].unit;
      currentUnit=currentUnit.replace('m3','m<sup>3</sup>');
      td_unit.innerHTML=currentUnit;
    });
  })();
</script>

<!--only show active water/wastewater inputs-->
<script>
  (function(){
    ['water','waste'].forEach(function(stage){
      if(Global.Configuration.ActiveStages[stage]==1) {
        //show all rows with stage=stage
        var rows=document.querySelectorAll('#inputs tr[stage='+stage+']');
        for(var i=0;i<rows.length;rows[i++].classList.remove('hidden')){}
      }else{
        //show "Stage not active"
        document.querySelector('table#inputs tr[indic='+stage+']').classList.remove('hidden');
      }
    });

    //hide fuel if its filter is not active
    if(Global.General.anyFuelEngines==0){
      ['ws_vol_fuel','ww_vol_fuel'].forEach(function(field){
        document.querySelector('#inputs tr[stage] input[id='+field+']').parentNode.parentNode.classList.add('hidden');
      });
    }
  })();
</script>

