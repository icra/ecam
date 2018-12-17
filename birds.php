<!doctype html><html><head>
  <?php include'imports.php'?>
  <script>
    function init(){
      //populate options for Options and Questions
      (function(){
        //1. populate inputs magnitude==Option
        document.querySelectorAll('#inputs td.option select[id]').forEach(select=>{
          if(select.childNodes.length==0){
            Object.keys(Tables[select.id]).forEach(key=>{
              var option=document.createElement('option');
              select.appendChild(option);
              option.innerHTML=translate(key);
              option.value=Tables[select.id][key].value;
            });
          }
          select.value=getVariable(select.id);
        });
        document.querySelectorAll('#inputs td.option select[id]').forEach(select=>{
          if(select.childNodes.length==0){
            Object.keys(Tables[select.id]).forEach(key=>{
              var option=document.createElement('option');
              select.appendChild(option);
              option.innerHTML=translate(key);
              option.value=Tables[select.id][key].value;
            });
          }
          select.value=getVariable(select.id);
        });
      })();

      //Display current values in the DOM
      document.querySelectorAll('#inputs input[id]:not([type=radio])').forEach(input=>{
        var field=input.id;
        if(field=='')return;
        //set the longer description in the input <td> element
        input.parentNode.parentNode.childNodes[0].title=translate(field+'_expla');
        //get the value stored
        var value=getVariable(field)/Units.multiplier(field);
        input.value=format(value);
      });

      //set the GUI values for filters (biogas) and options (flooding)
      (function() {
        //WWT
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
        //FST
          //valorizing biogas
          var val=Global.Configuration["Yes/No"].fst_valorizing_biogas;
          //producing biogas
          var pro=Global.Configuration["Yes/No"].fst_producing_biogas;
          //gui elements
          var input_pro_y=document.querySelector('input[name=fst_producing_biogas][value="1"]');
          var input_pro_n=document.querySelector('input[name=fst_producing_biogas][value="0"]');
          var input_val_y=document.querySelector('input[name=fst_valorizing_biogas][value="1"]');
          var input_val_n=document.querySelector('input[name=fst_valorizing_biogas][value="0"]');
          if(pro){
            input_pro_y.checked=true;   //you are producing biogas
            input_val_y.disabled=false; //enable val
            input_val_n.disabled=false; //enable val
          }else{
            input_pro_n.checked=true;  //you are not producing biogas
            input_val_n.checked=true;  //you are not valorizing biogas
            input_val_y.disabled=true; //disable valorizing
            input_val_n.disabled=true; //disable valorizing
          }
          if(val && pro){
            input_val_y.checked=true; //you are valorizing biogas
          }
        //fsc_flooding
          var val=Global.Faecl.Containment.fsc_flooding;
          document.querySelector('input[name=fsc_flooding][value="1"]').checked=val?true:false;
      })();

      //update default treatment type and sludge disposal method
      document.querySelector('#sludge_estimation').value=Global.Configuration.Selected.sludge_estimation_method;
      document.querySelector('#main_treatment_type').value=Global.Waste.Treatment.wwt_type_tre;

      drawCharts();
      updateResult();
      Caption.listeners();
    }

    function drawCharts(){
      //get current graph selected in graph1
      (function(){
        var current_graph=document.querySelector('#graph1').getAttribute('current_graph') || 'ghg_by_source';
        Graphs[current_graph](false,'graph1');
      })();
      Graphs.graph2(false,'graph2');
      Graphs.ws_cost('graph3');
      Graphs.ww_cost('graph4');
      //gauges of GHG emissions per year per person
      (function(){
        var years=Global.General.Years();

        //water
        var ws_serv=Global.Water.ws_serv_pop;
        Graphs.gauge('graph5', Global.Water.ws_SL_serv_pop(), translate("ws_SL_serv_pop_descr"), undefined, 0, 100);
        Graphs.gauge('graph6', Global.Water.ws_KPI_GHG()/years/ws_serv,
          translate("ws_KPI_GHG_descr"),
          "<br>"+Info.ws_KPI_GHG.unit+"/"+translate('year')+"/"+translate('serv.pop.'),
          0, 200); //with units and limits (lower limit and upper limit)

        //waste
        var ww_serv=Global.Waste.ww_serv_pop();
        Graphs.gauge('graph7', Global.Waste.ww_SL_serv_pop(), translate("ww_SL_serv_pop_descr"), undefined, 0, 100);
        Graphs.gauge('graph8', Global.Waste.ww_KPI_GHG()/years/ww_serv,
          translate("ww_KPI_GHG_descr"),
          "<br>"+Info.ww_KPI_GHG.unit+"/"+translate('year')+"/"+translate('serv.pop.'),
          0, 200); //with unit and limits (lower limit and upper limit)

        //faecl
        var fs_serv=Global.Faecl.fs_onsi_pop;
        Graphs.gauge('graph9',  Global.Faecl.fs_SL_serv_pop(), translate("fs_SL_serv_pop_descr"), undefined, 0, 100);
        Graphs.gauge('graph10', Global.Faecl.fs_KPI_GHG()/years/fs_serv,
          translate("fs_KPI_GHG_descr"),
          "<br>"+Info.fs_KPI_GHG.unit+"/"+translate('year')+"/"+translate('serv.pop.'),
          0, 200); //with unit and limits (lower limit and upper limit)
      })();
    }
  </script>

  <!--BEV namespace (birds eye view old name)-->
  <script>
    var BEV={}; //'Birds Eye View' namespace

    //backend update a variable
    BEV.updateField=function(input){
      //get info from the input element
      var field = input.id;
      //replace commmas for copy paste easyness
      var value = parseFloat(input.value);
      //if value is not a number, set to zero
      if(isNaN(value))value=0;
      //multiplier
      value*=Units.multiplier(field);
      //get location
      var loc=locateVariable(field);
      //update
      if(loc.sublevel){
        Global[loc.level][loc.sublevel][field]=value;
      }else{
        Global[loc.level][field]=value;
      }
      init();
    }

    //backend update a filter (yes/no)
    BEV.updateQuestion=function(code,newValue){
      Global.Configuration['Yes/No'][code]=newValue;
      init();
    }

    //backend split the value entered among the inputs in stages
    BEV.updateOutput=function(input) {
      var field=input.id;
      var value=parseFloat(input.value)*Units.multiplier(field);
      //spred the value among the stages
      //get L1 name: "Water" or "Waste"
      var L1=locateVariable(field).level;
      //the following code block can be improved using "Structure.filter()"
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
      }else if(L1=="Faecl"){
        //count active stages
        var fsc=Global.Configuration.ActiveStages.faeclCon;
        var fst=Global.Configuration.ActiveStages.faeclTre;
        var fsr=Global.Configuration.ActiveStages.faeclReu;
        var n=fsc+fst+fsr;
        if(n==0){
          console.warn("Warning: no FSM stages active, all goes to Containment");
          //all energy goes to collection
          Global.Faecl.Containment[field.replace("fs_","fsc_")]=value;
          init();
          return;
        }
        Global.Faecl.Containment[field.replace("fs_","fsc_")]=fsc*value/n;
        Global.Faecl.Treatment  [field.replace("fs_","fst_")]=fst*value/n;
        Global.Faecl.Reuse      [field.replace("fs_","fsr_")]=fsr*value/n;
      }
      init();
    }
  </script>

  <script>
    //Expanded: object for folding stages
    var Expanded=Global.Configuration.Expanded;
    function toggleStageVisibility(stage) {
      var btn=document.querySelector('#inputs span[expanded][stage='+stage+']');
      if(!btn)return;

      var currentState=Expanded[stage];

      //toggle html attribute
      if(currentState){btn.setAttribute('expanded','0')}
      else            {btn.setAttribute('expanded','1')}

      //modify "Expanded" object
      if(currentState){Expanded[stage]=0}
      else            {Expanded[stage]=1}
      updateResult();//update cookies

      //hide or show fields
      var newDisplay=currentState?'none':'';
      document.querySelectorAll('#inputs tr[stage='+stage+']').forEach(tr=>{
        tr.style.display=newDisplay;
      });
    }
  </script>
  <style>
    span[expanded]{float:left;transition:transform 0.15s;}
    span[expanded='0']{transform:rotate(-90deg);}
  </style>

  <style>
    body{background:#F5ECCE}

    h1{
      background:white;
      border:none;
      box-shadow:0 1px 2px rgba(0,0,0,.5);
      line-height:2.1em;
      text-align:left;
    }

    /* legend colors for graphs */
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
    #inputs input[id]:not([type=radio]) {
      background:inherit;
      border:none;
      text-align:right;
      cursor: cell;
      line-height:1em;
      width:95%;
      height:24px;
      display:block;
    }
    #inputs input[id]:not([type=radio]):focus {
      background:white;
    }
    #inputs tr.hidden {display:none}

    /*indication "level not active"*/
    #inputs tr[indic]{text-align:center;color:#999;background:#eee;font-size:smaller;}

    #inputs select{
      display:block;
      font-size:smaller;
    }
  </style>
</head><body onload="init()"><center>
  <?php include'sidebar.php'?>
  <?php include'navbar.php'?>
  <?php include'linear.php'?>
  <?php include'caption.php'?>
</center>

<!--title--><h1>
  <?php write('#quick_assessment')?> &mdash;
  <?php write('#initial_estimation_description')?>
</h1>

<!--context info-->
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
    <span id=conv_kwh_co2></span> kg CO<sub>2</sub>eq/kWh
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
    <span id=prot_con></span> kg/<?php write('#person')?>/<?php write('#year')?>
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
    <span id=bod_pday></span> kg/<?php write('#person')?>/<?php write('#day')?>
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
    <div class="card"><?php cardMenu(translate('#inputs').' &mdash; '.translate('#enter_values'))?>
      <!--inputs-->
      <table id=inputs style="width:100%">
        <!--Water-->
        <tr><th colspan=3 style="background:#0aaff1">
          <div class=flex style="justify-content:space-between">
            <div onclick=toggleStageVisibility('water') style=width:50%>
              <span expanded=1 stage=water>▼</span>
              <img src=img/water.png width=25 style="line-height:4em;vertical-align:middle"><?php write('#Water')?>
            </div>
            <!--water population-->
            <div>
              <b caption="<?php write('#ws_serv_pop_descr')?>" id=ws_serv_pop onclick=window.location='inhabitants.php'>0</b> /
              <b caption="<?php write('#ws_resi_pop_descr')?>" id=ws_resi_pop onclick=window.location='inhabitants.php'>0</b>
              <img src=img/inhabitants.png width=25 caption="Water supply population" style=vertical-align:middle>
              <script>
                document.querySelector('#ws_serv_pop').innerHTML=format(Global.Water.ws_serv_pop);
                document.querySelector('#ws_resi_pop').innerHTML=format(Global.Water.ws_resi_pop);
              </script>
            </div>
          </div>
          <!--water inputs-->
          <tr stage=water class=hidden><td><?php write('#ws_nrg_cons_descr')?> <td class=output><input id='ws_nrg_cons' value=0><td class=unit>
          <tr stage=water class=hidden><td><?php write('#vol_fuel')?>          <td class=output><input id='ws_vol_fuel' value=0><td class=unit>
          <tr stage=water class=hidden><td><?php write('#wsd_vol_dist_descr')?><td class=input><input id='wsd_vol_dist' value=0><td class=unit>
          <tr stage=water class=hidden><td><?php write('#birds_ws_run_cost')?> <td class=input><input id='ws_run_cost'  value=0><td class=unit>
          <tr stage=water class=hidden><td><?php write('#birds_ws_nrg_cost')?> <td class=input><input id='ws_nrg_cost'  value=0><td class=unit>
          <tr indic=water class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>
        </tr>

        <!--Waste-->
        <tr><th colspan=3 style=background:#d71d24>
          <div class=flex style="justify-content:space-between">
            <div onclick=toggleStageVisibility('waste') style=width:50%>
              <span expanded=1 stage=waste>▼</span>
              <img src=img/waste.png width=25 style="line-height:4em;vertical-align:middle"> <?php write('#Waste')?>
            </div>
            <!--wastewater population-->
            <div>
              <b caption="<?php write('#ww_serv_pop_descr')?>" id=ww_serv_pop onclick=window.location='inhabitants.php'>0</b> /
              <b caption="<?php write('#ww_conn_pop_descr')?>" id=ww_conn_pop onclick=window.location='inhabitants.php'>0</b> /
              <b caption="<?php write('#ww_resi_pop_descr')?>" id=ww_resi_pop onclick=window.location='inhabitants.php'>0</b>
              <img src=img/inhabitants.png width=25 caption="Wastewater population" style="vertical-align:middle">
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

        <!--FSM-->
        <tr><th colspan=3 style=background:green>
          <div class=flex style="justify-content:space-between">
            <div onclick=toggleStageVisibility('faecl') style=width:50%>
              <span expanded=1 stage=faecl>▼</span>
              <img src=img/faecl.png width=25 style="line-height:4em;vertical-align:middle"> <?php write('#Faecl')?>
            </div>
            <!--fsm population-->
            <div>
              <b caption="<?php write('#fs_onsi_pop_descr')?>" id=fs_onsi_pop onclick=window.location='inhabitants.php'>0</b> /
              <b caption="<?php write('#fs_resi_pop_descr')?>" id=fs_resi_pop onclick=window.location='inhabitants.php'>0</b>
              <img src=img/inhabitants.png width=25 caption="FSM population" style="vertical-align:middle">
              <script>
                document.querySelector('#fs_onsi_pop').innerHTML=format(Global.Faecl.fs_onsi_pop);
                document.querySelector('#fs_resi_pop').innerHTML=format(Global.Faecl.fs_resi_pop);
              </script>
            </div>
          </div>

          <!--fsc numeric inputs-->
          <tr indic=faecl class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>
          <tr stage=faecl class=hidden><td><?php write('#fs_nrg_cons_descr') ?><td class=output><input id='fs_nrg_cons' value=0><td class=unit>
          <tr stage=faecl class=hidden><td><?php write('#fs_vol_trck_descr')?> <td class=output><input id='fs_vol_trck' value=0><td class=unit>
          <tr stage=faecl class=hidden><td><?php write('#fsc_cont_emp_descr')?><td class=input><input id='fsc_cont_emp' value=0><td class=unit>

          <!--fsc,fst,fsr dropdowns-->
          <tr stage=faecl class=hidden><td><?php write('#fsc_flooding_descr')?><td colspan=2>
            <label><?php write('#no')?> <input name=fsc_flooding id=fsc_flooding type=radio value=0 checked></label>
            <label><?php write('#yes')?><input name=fsc_flooding id=fsc_flooding type=radio value=1></label>
          <tr stage=faecl class=hidden><td class=option colspan=3><?php write('#fsc_type_tre_descr')?><select id='fsc_type_tre'></select>
          <tr stage=faecl class=hidden><td class=option colspan=3><?php write('#fst_type_tre_descr')?><select id='fst_type_tre'></select>
          <tr stage=faecl class=hidden><td class=option colspan=3><?php write('#fsr_type_tre_descr')?><select id='fsr_type_tre'></select>
          <tr stage=faecl class=hidden><td class=option colspan=3><?php write('#fsr_fslu_typ_descr')?><select id='fsr_fslu_typ'></select>

          <!--fst biogas-->
          <tr stage=faecl class=hidden><td><?php write('#fst_producing_biogas')?>?<td class=question colspan=2>
            <label><?php write('#no')?> <input name=fst_producing_biogas type=radio value=0 checked></label>
            <label><?php write('#yes')?><input name=fst_producing_biogas type=radio value=1> </label>
          <tr stage=faecl class=hidden><td><?php write('#fst_valorizing_biogas')?>?<td class=question colspan=2>
            <label><?php write('#no')?> <input name=fst_valorizing_biogas type=radio value=0 checked></label>
            <label><?php write('#yes')?><input name=fst_valorizing_biogas type=radio value=1></label>
          </tr>
        </tr>

        <!--estimations for FSM-->
        <script src=fsm_tierA.js></script>
      </table>
    </div>

    <!--prev next btns container-->
    <div style="margin:0.5em 1em;text-align:center">
      <script>
        //find first available stage to start entering data
        function nextPage(event) {
          if(event)event.stopPropagation();
          //go to first active substage
          var location;
          if(Global.Configuration.ActiveStages.waterAbs)      location = "edit.php?level=Water&sublevel=Abstraction";
          else if(Global.Configuration.ActiveStages.waterTre) location = "edit.php?level=Water&sublevel=Treatment";
          else if(Global.Configuration.ActiveStages.waterDis) location = "edit.php?level=Water&sublevel=Distribution";
          else if(Global.Configuration.ActiveStages.wasteCol) location = "edit.php?level=Waste&sublevel=Collection";
          else if(Global.Configuration.ActiveStages.wasteTre) location = "edit.php?level=Waste&sublevel=Treatment";
          else if(Global.Configuration.ActiveStages.wasteDis) location = "edit.php?level=Waste&sublevel=Discharge";
          else if(Global.Configuration.ActiveStages.faeclCon) location = "edit.php?level=Faecl&sublevel=Containment";
          else if(Global.Configuration.ActiveStages.faeclTre) location = "edit.php?level=Faecl&sublevel=Treatment";
          else if(Global.Configuration.ActiveStages.faeclReu) location = "edit.php?level=Faecl&sublevel=Reuse";
          else if(Global.Configuration.ActiveStages.water) location = "edit.php?level=Water";
          else if(Global.Configuration.ActiveStages.waste) location = "edit.php?level=Waste";
          else if(Global.Configuration.ActiveStages.faecl) location = "edit.php?level=Faecl";
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

    <!--reset tier b-->
    <div style="padding:0.5em 1em;">
      <div class=flex style="justify-content:center;width:70%;margin:auto">
        <div>
          <button id=resetTierB onclick="resetTierB()">
            <?php write("#Reset Tier A estimations and Tier B stage values") ?>
          </button>
          <script>
            //issue #94
            function resetTierB(){
              var TierA=[
                //population
                  'ws_resi_pop',
                  'ws_serv_pop',
                  'ww_resi_pop',
                  'wwc_conn_pop',
                  'wwt_serv_pop',
                  'fs_resi_pop',
                  'fs_onsi_pop',
                //nrg_cost
                  'ws_nrg_cost',
                  'ws_run_cost',
                  'ww_nrg_cost',
                  'ww_run_cost',
                //energy consumed
                  'wsa_nrg_cons',
                  'wst_nrg_cons',
                  'wsd_nrg_cons',
                  'wwc_nrg_cons',
                  'wwt_nrg_cons',
                  'wwd_nrg_cons',
                  'fsc_nrg_cons',
                  'fst_nrg_cons',
                  'fsr_nrg_cons',
                //fuel from engines consumed
                  'wsa_vol_fuel',
                  'wst_vol_fuel',
                  'wsd_vol_fuel',
                  'wwc_vol_fuel',
                  'wwt_vol_fuel',
                  'wwd_vol_fuel',
                  'fst_vol_fuel',
                  'fsr_vol_fuel',
                //fuel from trucks
                  'fsc_vol_trck',
                  'fst_vol_trck',
                  'fsr_vol_trck',
                //water injected to distribution
                  'wsd_vol_dist',
                //running costs
                  'ws_run_cost',
                  'ws_nrg_cost',
                  'ww_run_cost',
                  'ww_nrg_cost',
                //volume of treated wastewater
                  'wwt_vol_trea',
                //volume of discharged wastewater
                  'wwd_vol_disc',
                  'wwd_n2o_effl',
                  'fsc_cont_emp', //fsm containments emptied
                  'fsc_flooding', //fsc flooding option
              ];

              //set to zero the inputs NOT in tier A
              Structure
                .map(stage=>{return stage.sublevel ? Global[stage.level][stage.sublevel] : Global[stage.level]})
                .forEach(stage=>{
                  Object.keys(stage)
                    .filter(key=>{return typeof(stage[key])=='number'})
                    .filter(key=>{return TierA.indexOf(key)==-1}) //only set to zero the ones not in tier A
                    .forEach(key=>{
                      stage[key]=0;
                  });
                });
                
              //wwt biogas set to "No" (includes wwt_valorizing_biogas)
              document.querySelector('input[name=wwt_producing_biogas][type=radio][value="0"]').dispatchEvent(new CustomEvent('click'));
              //sludge disposal method set to 'None'
              Global.Configuration.Selected.sludge_estimation_method="0";
              document.querySelector('#sludge_estimation').value=0;
              //fst biogas set to "No" (includes fst_valorizing_biogas)
              document.querySelector('input[name=fst_producing_biogas][type=radio][value="0"]').dispatchEvent(new CustomEvent('click'));
              init();
            }
          </script>
          <style>
            button#resetTierB {
              padding:1em 1.6em;
              border-radius:4px;
              width:100%;
            }
          </style>
        </div>

        <!--help-->
        <div class="card folded">
          <?php cardMenu("More info on reset button")?>
          <div style=padding:2px>
            The reset button does several things:<br>
            <ol>
              <li>Sets the tier B values to 0, except the tier A ones.
              <li>Sets "Are you producing biogas?" to "No".
              <li>Sets "Are you valorizing biogas?" to "No".
              <li>Sets "Select main treatment tye" to "None".
              <li>Sets "Select sludge disposal method" to "None".
              <li>Sets the 4 options for Faecal Sludge Management to default (Containment type, treatment type, disposal type and type of faecal sludge).
            </ol>

            All the inputs that have estimations are set to zero:<br>
            <ul>
              <li>
                Wastewater estimations set to 0:
                <ul>
                  <li>Biogas produced = 0
                  <li>Percentage of methane in biogas = 0
                  <li>Biogas valorised = 0
                  <li>Biogas flared = 0
                  <li>Influent BOD load = 0
                  <li>Effluent BOD load = 0
                  <li>BOD removed as sludge = 0
                  <li>CH4 emission factor = 0
                  <li>Sludge produced in WWTPs = 0
                  <li>Dry weight in sludge produced = 0
                  <li>Sludge composted = 0
                  <li>Sludge incinerated = 0
                  <li>Sludge sent to land application = 0
                  <li>Sludge sent to landfilling = 0
                  <li>Sludge stockpiled = 0
                  <li>Fluidized Bed Reactor Temperature = 0
                </ul>
              </li>
              <li>
                Faecal sludge management estimations set to 0:
                <ul>
                  <li>Influent BOD load = 0
                  <li>CH4 emission factor = 0
                  <li>Faecal sludge density = 0
                  <li>Volume of faecal sludge emptied = 0
                  <li>BOD concentration of faecal sludge = 0
                  <li>BOD removed as faecal sludge = 0
                  <li>Effluent BOD load = 0
                  <li>BOD removed with excess sludge = 0
                  <li>Biogas produced = 0
                  <li>Biogas valorized = 0
                  <li>Biogas flared = 0
                  <li>Methane in Biogas = 0
                  <li>Dry weight sent to landfill = 0
                  <li>Dry weight sent to land application = 0
                  <li>Volume of faecal sludge dumped = 0
                </ul>
              </li>
            </ul>

            Then, the estimations will be recalculated again refilling the input fields and the options.<br>
            Note that this button does not affect the possible substages that the user may have created previously.
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--graphs container-->
  <div class=card style="width:66%"><?php cardMenu(translate('#figures'))?>
    <div id=graphs>
      <style>
        #graphs table{margin:auto !important;margin-bottom:0.5em !important}
        #graphs div div {text-align:center;position:relative}
        #graphs div.options {text-align:center;padding:1em}
        #graphs div[graph] {
          vertical-align:top;
          width:50%;
          border-bottom:1px solid #ddd;
          padding:0;
          box-sizing:border-box;
        }
        #graphs div[graph][left] {
          border-right:1px solid #ddd;
        }
        #graphs div.tab_buttons,
        #graphs div.tab_buttons button {
          font-size:smaller;
        }
      </style>
      <div class=flex>
        <div graph id=graph1 left><?php write('#loading')?></div> <!--ghg emissions-->
        <div graph id=graph2><?php write('#loading')?></div> <!--nrg consumption-->
        <div graph id=graph3 left><?php write('#loading')?></div> <!--ws costs-->
        <div graph id=graph4><?php write('#loading')?></div> <!--ww costs-->
        <div graph id=graph5 left><?php write('#loading')?></div> <!--ws serv-->
        <div graph id=graph6><?php write('#loading')?></div> <!--ws ghg-->
        <div graph id=graph7 left><?php write('#loading')?></div> <!--ww serv-->
        <div graph id=graph8><?php write('#loading')?></div> <!--ww ghg-->
        <div graph id=graph9 left><?php write('#loading')?> </div><!--fs serv-->
        <div graph id=graph10><?php write('#loading')?></div><!--fs ghg-->
      </div>

      <div style="width:98%;padding:1em 0;margin-bottom:1em;border:none;text-align:center">
        <?php write('#for_further_details_go_to_detailed')?>
        <b><?php write('#energy_performance')?></b> (<a href=#>&uarr;</a>)
      </div>
      <div style="text-align:left;padding-left:10px">
        <?php write('#see_also')?>:
        <ul>
          <li><a href=estimations.php><?php write('#summary_of_estimations_at_this_level')?></a> </li>
          <li><a href=non_revenue_water.php><?php write('#about_nrw')?></a> </li>
          <li><a href=fuelInfo.php><?php write('#about_fuel')?></a> </li>
          <li><a href=sankey.php><?php write('#sankey_diagram')?></a>
          <li><a href=abbreviations.php><?php write("#Abbreviations")?></a>
        </ul>
      </div>
      <script>
        //hide inactive graphs
        if(Global.Configuration.ActiveStages.water==0) {
          document.querySelector("#graph3").style.display="none";
          document.querySelector("#graph5").style.display="none";
          document.querySelector("#graph6").style.display="none";
        }
        if(Global.Configuration.ActiveStages.waste==0) {
          document.querySelector("#graph4").style.display="none";
          document.querySelector("#graph7").style.display="none";
          document.querySelector("#graph8").style.display="none";
        }
        if(Global.Configuration.ActiveStages.faecl==0) {
          document.querySelector("#graph9").style.display="none";
          document.querySelector("#graph10").style.display="none";
        }
      </script>
    </div>
  </div>
</div>

<?php include'currentJSON.php'?>
<script>if(google){google.charts.load('current',{'packages':['corechart','gauge','bar']});}</script>
</html>

<!--add onchange listeners for <inputs> and <selects> magnitude==Option-->
<script>
  document.querySelectorAll("#inputs input[id]:not([type=radio])").forEach(input=>{
    input.addEventListener('focus',function(){
      this.value=getVariable(this.id)/Units.multiplier(this.id);
      this.select();
    });
    if(input.parentNode.classList.contains('input')){
      input.addEventListener('change',function(){BEV.updateField(this)});
    }else if(input.parentNode.classList.contains('output')){
      input.addEventListener('change',function(){BEV.updateOutput(this)});
    }
    input.addEventListener('keypress',function(e){
      if(e.key=='Enter')this.blur();
    });
  });
  document.querySelectorAll("#inputs td.option select[id]").forEach(select=>{
    select.addEventListener('change',function(){BEV.updateField(this)});
  });
</script>

<!--add lock symbol for inputs that are outputs-->
  <script>
    document.querySelectorAll('#inputs td.output').forEach(td=>{
      //find the input element inside the cell
      var input=td.querySelector('input[id]')
      if(!input)return;
      //find the level it belongs
      var level=locateVariable(input.id).level;
      //if substages>1, lock the cell
      Object.keys(Substages[level]).forEach(sublevel=>{
        //count substages
        var n=Substages[level][sublevel].length;
        var sum=getVariable(input.id);
        if(n && sum>0){
          td.classList.add('locked');
          input.disabled=true;
          td.parentNode.setAttribute('caption',
            'Since you have entered more detailed data in Tier B stages, you cannot modify this input.'+
            '<br>Now it displays the sum of its related '+translate(level)+' stage\'s inputs.'+
            '<br>If you still want to modify it, please set its related inputs to 0 in Tier B'
          );
        }
      });
    });
  </script>
  <style>
    #inputs td.output.locked {background:#fff; }
    #inputs td.output.locked + td:before { content:"\1f512"; }
    #inputs td.output.locked input { cursor:default; }
  </style>
<!--/add lock symbol for inputs that are outputs-->

<!--write units next to the inputs-->
<script>
  document.querySelectorAll('#inputs tr[stage] td input[id]').forEach(input=>{
    var td_unit=input.parentNode.nextSibling;
    var field=input.id;
    var currentUnit=Info[field].magnitude=='Currency' ? Global.General.Currency : Info[field].unit;
    currentUnit=currentUnit.replace('m3','m<sup>3</sup>');
    td_unit.innerHTML=currentUnit;
  });
</script>

<!--hide inactive inputs-->
<script>
  (function(){
    //Expanded is 1 by default, change this 
    Structure.filter(s=>!s.sublevel).forEach(s=>{
      if(!Expanded[s.alias]){
        document.querySelectorAll('#inputs tr[stage='+s.alias+']').forEach(tr=>{
          tr.style.display='none';
        });
        document.querySelector('#inputs span[expanded][stage='+s.alias+']').setAttribute('expanded',0);
      }
    });

    //Active stages
    Structure.filter(s=>!s.sublevel).map(s=>s.alias).forEach(function(stage){
      if(Global.Configuration.ActiveStages[stage]==1) {
        var rows=document.querySelectorAll('#inputs tr[stage='+stage+']');
        for(var i=0;i<rows.length;rows[i++].classList.remove('hidden')){}
      }else{
        document.querySelector('table#inputs tr[indic='+stage+']').classList.remove('hidden');
      }
    });

    //volume of fuel engines hidden if its filter is not active
    if(Global.General.anyFuelEngines==0){
      ['ws_vol_fuel','ww_vol_fuel'].forEach(function(field){
        document.querySelector('#inputs tr[stage] input[id='+field+']').parentNode.parentNode.classList.add('hidden');
      });
    }
  })();
</script>

<div style=margin-bottom:8em></div>
