<!doctype html><html><head>
  <?php include'imports.php'?>
  <script>
    function init(){
      calculateGHG();
      findCriticGHG();
      addDetailedListeners();
      Caption.listeners();
      updateResult();
      //check checkboxes for "toggle_display_sum_sta()" (because in firefox remain checked)
      (function(){
        var cbs=document.querySelectorAll('#sources input[type=checkbox][name]');
        cbs.forEach(cb=>{
          toggle_display_sum_sta(cb);
        });
      })();
    }

    function calculateGHG() {
      //kg, kg per year, or kg per serviced population
      var divisor=(function() {
        var ret=1;//return value
        var select=document.querySelector('#ghg_divisor');
        switch(select.value) {
          case 'years':
            ret=Global.General.Years();
            break;
          case 'serv_pop':
            ret=function(code) {
              var ye=Global.General.Years();
              var ws=ye*Global.Water.ws_serv_pop;
              var ww=ye*Global.Waste.ww_serv_pop();
              var To=ye*(ws+ww);
              switch(code.substring(0,2)) {
                case "ws": return ws; break;
                case "ww": return ww; break;
                case "To": return To; break;
                default:   return ye; break;
              }
            };
            break;
          default:
            break;
        }
        return ret;
      })();

      //check if checkboxes for substages are checked
      var wsa=document.querySelector('#sources input[type=checkbox][name=wsa_KPI_GHG]').checked;
      var wst=document.querySelector('#sources input[type=checkbox][name=wst_KPI_GHG]').checked;
      var wsd=document.querySelector('#sources input[type=checkbox][name=wsd_KPI_GHG]').checked;
      var wwc=document.querySelector('#sources input[type=checkbox][name=wwc_KPI_GHG]').checked;
      var wwt=document.querySelector('#sources input[type=checkbox][name=wwt_KPI_GHG]').checked;
      var wwd=document.querySelector('#sources input[type=checkbox][name=wwd_KPI_GHG]').checked;
      var fsc=document.querySelector('#sources input[type=checkbox][name=fsc_KPI_GHG]').checked;
      var fst=document.querySelector('#sources input[type=checkbox][name=fst_KPI_GHG]').checked;
      var fsr=document.querySelector('#sources input[type=checkbox][name=fsr_KPI_GHG]').checked;

      //stage value fields
      var fields=document.querySelectorAll('#sources [field], #outside td[field]');
      for(var i=0;i<fields.length;i++){
        var element=fields[i];
        var code=element.getAttribute('field');
        var divisor_value = typeof(divisor)=="function" ? divisor(code) : divisor;

        if(code=='TotalGHG'){
          var value=calculate_emissions(wsa,wst,wsd,wwc,wwt,wwd,fsc,fst,fsr);
        }else if(code=='ws_KPI_GHG'){
          var value=calculate_emissions_Water(wsa,wst,wsd);
        }else if(code=='ww_KPI_GHG'){
          var value=calculate_emissions_Waste(wwc,wwt,wwd);
        }else if(code=='fs_KPI_GHG'){
          var value=calculate_emissions_Faecl(fsc,fst,fsr);
        }else{
          var loc=locateVariable(code);
          var value = loc.sublevel ? (Global[loc.level][loc.sublevel][code]()) : (Global[loc.level][code]());
        }

        value/=divisor_value;

        // ensure only display "NA" at GHG Emissions Summary tab - improv #2
        if(code=='TotalGHG' && document.querySelector('#ghg_divisor').value=='serv_pop'){
          element.innerHTML="NA";
        }else{
          var color=value?"":"#ccc";
          element.innerHTML="<span style=color:"+color+">"+format(value)+"</span>";
        }
        element.setAttribute('value',value);
      }

      //substage value fields
      var fields=document.querySelectorAll('#sources [substage_sum]');
      for(var i=0;i<fields.length;i++) {
        var element=fields[i];
        var code=element.getAttribute('substage_sum');
        var divisor_value=typeof(divisor)=="function"?divisor(code):divisor;
        var loc=locateVariable(code);
        var value=Substages[loc.level][loc.sublevel].map(ss=>ss[code]()).reduce((pr,cu)=>(pr+cu),0);
        value/=divisor_value;
        element.style.fontStyle='italic';
        element.innerHTML=format(value);
        element.setAttribute('value',value);
      }
    }

    function findCriticGHG() {
      var max=0;
      var critic=false;
      var fields=document.querySelectorAll('#sources td[field], #outside td[field]'); //only sublevels, not l1 nor total
      for(var i=0;i<fields.length;i++) {
        var td=fields[i];
        var value=parseFloat(td.getAttribute('value'));
        if(value>max) {
          max=value;
          critic=td.getAttribute('field');
        }
      }
      if(!critic)return;
      //console.log(critic);

      var el=document.querySelector("td[field="+critic+"]");
      var cap=translate("This is the highest GHG emission of your system");
      el.classList.add('critic');
      el.setAttribute('title',cap);

      var sibling=el.parentNode.querySelector('td[substage_sum]');
      if(sibling){
        sibling.classList.add('critic');
        sibling.setAttribute('title',cap);
      }
    }

    function addDetailedListeners() {
      var tds=document.querySelectorAll("td[field][level][sublevel], td[substage_sum]");
      for(var i=0;i<tds.length;i++) {
        tds[i].onmousemove=function(event) {
          var con=document.querySelector('#container_detailed');
          con.style.display='';
          con.style.left=(event.clientX+35)+"px";
          con.style.top=(event.clientY-50)+"px";
        }
      }
    }

    //fill table of detailed ghg sources
    function fillSources(td,ev) {
      //fill table
      var lvl=td.getAttribute('level');
      var sub=td.getAttribute('sublevel');
      var fie=td.getAttribute('field');
      var obj=Global[lvl][sub];
      var t=document.querySelector('table#detailed');
      document.querySelector('#detailed_title').innerHTML=translate('Detailed GHG sources');
      while(t.rows.length>0)t.deleteRow(-1);
      if(!obj[fie]()){
        var newRow=t.insertRow(-1);
        newRow.insertCell(-1).innerHTML="<small>~<?php write('#No emissions') ?></small>";
      }
      for(var field in obj) {
        if(field.search('_KPI_GHG_')+1) {
          var value = obj[field]();
          if(!value){continue}
          var newRow=t.insertRow(-1);
          newRow.insertCell(-1).innerHTML=translate(field+"_descr");
          var newCell=newRow.insertCell(-1)
          newCell.style.textAlign='right'
          newCell.innerHTML=format(value);
        }
      }
      //hide table
      td.onmouseout=function(){document.querySelector('#container_detailed').style.display='none'};
    }

    //fill table of emissions per substages
    function fillSourcesSubstages(td,ev) {
      //fill table
      var fie=td.getAttribute('substage_sum');
      var loc=locateVariable(fie);
      var lvl=loc.level;
      var sub=loc.sublevel;
      var obj=Substages[lvl][sub];
      var t=document.querySelector('table#detailed');
      document.querySelector('#detailed_title').innerHTML=translate('Substage GHG emissions')||"Substage GHG emissions";
      while(t.rows.length>0)t.deleteRow(-1);
      //go over substages
      obj.forEach(substage=>{
        var newRow=t.insertRow(-1);
        newRow.insertCell(-1).innerHTML=substage.name;
        var newCell=newRow.insertCell(-1);
        newCell.style.textAlign='right';
        newCell.innerHTML=format(substage[fie]());
      });

      //substages total
      var newRow=t.insertRow(-1);
      newRow.insertCell(-1).innerHTML="<b><?php write('#Substages total')?></b>";
      var newCell=newRow.insertCell(-1);
      newCell.style.textAlign='right';
      newCell.innerHTML="<b>"+format(obj.map(s=>s[fie]()).reduce((p,c)=>(p+c),0))+"</b>";

      //hide table
      td.onmouseout=function(){document.querySelector('#container_detailed').style.display='none'};
    }
  </script>
  <?php
    function drawCheckbox($sublevel){ ?>
      <div style=float:right;text-align:center><small>
        <label>
          <input type=checkbox onclick=toggle_display_sum_sta(this) name="<?php echo $sublevel?>" caption="<?php write('#View substage values')?>">
        </label>
      </small></div>
      <?php
    }
  ?>
  <script>
    function toggle_display_sum_sta(checkbox){
      var code=checkbox.name;
      var td_sta = document.querySelector('#sources td[field='+code+']');
      var td_sum = document.querySelector('#sources td[substage_sum='+code+']');

      if(checkbox.checked){
        td_sta.style.display='none';
        td_sum.style.display='';
      }else{
        td_sta.style.display='';
        td_sum.style.display='none';
      }

      calculateGHG();
    }
  </script>

</head><body onload=init()><center>
  <?php include'sidebar.php'?>
  <?php include'navbar.php'?>
  <?php include'linear.php'?>
  <?php include'caption.php'?>
  <!--title-->
  <h1>
    <span id=Name></span>
    <script>
      document.querySelector('h1 span#Name').innerHTML=Global.General.Name;
    </script>
    &mdash;
    <?php write("#GHG Emissions Summary (Overview)")?>
  </h1>
  <h4>
    <?php write("#assessment_period")?>
    <b>
      <span id=Days></span> <?php write("#days")?>
      (<span id=Years></span> <?php write("#years")?>)
      <script>
        document.querySelector('h4 span#Days').innerHTML=format(Global.General.Days());
        document.querySelector('h4 span#Years').innerHTML=format(Global.General.Years());
      </script>
    </b>
  </h4>
  <h4><?php write("#move_the_mouse")?></h4>
</center>

<!--'title like' div detailed sources-->
<div id=container_detailed style=display:none>
  <div><b id=detailed_title></b></div>
  <table id=detailed></table>
  <style>
    div#container_detailed {
      position:fixed;
      font-size:11px;
      font-family:monospace;
      z-index:998;
      background:white;
      padding:0.3em 0.5em;
      box-shadow: 1px 1px 1px 1px rgba(0,0,0,.1);
      border:1px solid #ccc;
      text-align:left;
    }
  </style>
</div>

<!--content-->
<div style="width:66%;margin:auto">
  <!--tab buttons-->
  <div class=tab_buttons id=ghg_summary_tabs>
    <button class=left onclick="tabs_show_tables()" disabled>
      <?php write("#Tables")?>
    </button>
    <button class=right onclick="tabs_show_graphs()">
      <?php write("#Charts")?>
    </button>
    <script>
      function tabs_show_graphs(){
        document.getElementById('tables').style.display='none'
        document.getElementById('graphs_container').style.display=''
        Graphs.graph4(false,'graph_1');
        Graphs.graph1(false,'graph_2');
        document.querySelector('#ghg_summary_tabs button.right').setAttribute('disabled',true)
        document.querySelector('#ghg_summary_tabs button.left').removeAttribute('disabled')
      }
      function tabs_show_tables(){
        document.getElementById('tables').style.display=''
        document.getElementById('graphs_container').style.display='none'
        document.querySelector('#ghg_summary_tabs button.right').removeAttribute('disabled')
        document.querySelector('#ghg_summary_tabs button.left').setAttribute('disabled',true)
      }
    </script>
  </div>

  <!--tables: left tab-->
  <div id=tables>
    <!--sources of ghg-->
    <div>
      <div>
        <table id=sources>
          <tr><td colspan=4 style=text-align:center>
            <?php write("#GHG emissions")?>
            <!--select divisor-->
            <select id=ghg_divisor onchange=init()>
              <option value=none>Kg CO2 eq / <?php write('#Assessment_period')?>
              <option value=years>Kg CO2 eq / <?php write("#year")?>
              <option value=serv_pop>Kg CO2 eq / <?php write("#year")?> / <?php write("#ws_serv_pop_descr")?>
            </select>
            <!--legend-->
            <span style=float:right>
              <span class=circle style=background:orange></span>
              <?php write("#highest emission")?>
            </span>
          <tr><th rowspan=10 style="font-weight:bold;background:#2b6488;color:white">
            <a href="variable.php?id=TotalGHG" style=color:white>
              <?php write('#TOTAL GHG')?>
            </a>
            <br><br><span field=TotalGHG>
            <?php write("#Loading")?>...
          </span>

          <!--WATER-->
          <th rowspan=3 style="background:#00aff1">
            <div>
              <a href="edit.php?level=Water" style=color:white>
                <?php write("#Water")?>
                (<span id=ws_serv_pop>0</span> <?php write("#people")?>)
                <script>document.querySelector('#ws_serv_pop').innerHTML=format(Global.Water.ws_serv_pop)</script>
              </a>
            </div>
            <div field=ws_KPI_GHG>0</div>
          </th>
            <!--wsa-->
            <td><img src=img/waterAbs.png> <a href='edit.php?level=Water&sublevel=Abstraction'><?php write('#Abstraction')?></a>
              <?php drawCheckbox('wsa_KPI_GHG')?>
              <td field=wsa_KPI_GHG level=Water sublevel=Abstraction onmouseenter=fillSources(this,event)> <?php write('#Loading')?>...
              <td substage_sum=wsa_KPI_GHG style=display:none onmouseenter=fillSourcesSubstages(this,event)> <?php write('#Loading')?>...
            </tr>

            <!--wst-->
            <tr><td><img src=img/waterTre.png> <a href='edit.php?level=Water&sublevel=Treatment'><?php write('#Treatment')?></a>
              <?php drawCheckbox('wst_KPI_GHG')?>
              <td field=wst_KPI_GHG level=Water sublevel=Treatment onmouseenter=fillSources(this,event)><?php write('#Loading')?>...
              <td substage_sum=wst_KPI_GHG style=display:none onmouseenter=fillSourcesSubstages(this,event)> <?php write('#Loading')?>...
            </tr>

            <!--wsd-->
            <tr><td><img src=img/waterDis.png> <a href='edit.php?level=Water&sublevel=Distribution'><?php write('#Distribution')?></a>
              <?php drawCheckbox('wsd_KPI_GHG')?>
              <td field=wsd_KPI_GHG level=Water sublevel=Distribution onmouseenter=fillSources(this,event)><?php write('#Loading')?>...
              <td substage_sum=wsd_KPI_GHG style=display:none onmouseenter=fillSourcesSubstages(this,event)> <?php write('#Loading')?>...
            <tr>

          <!--WASTE-->
          <th rowspan=3 class=red>
            <div>
              <a href="edit.php?level=Waste" style=color:white>
                <?php write("#Waste")?>
                (<span id=ww_serv_pop>0</span> <?php write("#people")?>)
                <script>document.querySelector('#ww_serv_pop').innerHTML=format(Global.Waste.ww_serv_pop())</script>
              </a>
              <div field=ww_KPI_GHG>0</div>
            </div><br><br>

            <!--untreated ww emissions-->
            <div style="
              font-size:smaller;
              padding:1em;
            ">
              <div>
                <a href="variable.php?id=ww_KPI_GHG_unt" style=color:white>
                  <?php write('#ww_KPI_GHG_unt_descr')?>
                </a>
              </div>
              <div field=ww_KPI_GHG_unt></div>
            </div>
          </th>
            <!--wwc-->
            <td><img src=img/wasteCol.png>
              <a href='edit.php?level=Waste&sublevel=Collection'><?php write('#Collection')?></a>
              <?php drawCheckbox('wwc_KPI_GHG')?>
              <td field=wwc_KPI_GHG level=Waste sublevel=Collection onmouseenter=fillSources(this,event)><?php write('#Loading')?>...
              <td substage_sum=wwc_KPI_GHG style=display:none onmouseenter=fillSourcesSubstages(this,event)> <?php write('#Loading')?>...
            </td>
            <!--wwt-->
            <tr><td><img src=img/wasteTre.png> <a href='edit.php?level=Waste&sublevel=Treatment'><?php write('#Treatment')?></a>
              <?php drawCheckbox('wwt_KPI_GHG')?>
              <td field=wwt_KPI_GHG level=Waste sublevel=Treatment onmouseenter=fillSources(this,event)><?php write('#Loading')?>...
              <td substage_sum=wwt_KPI_GHG style=display:none onmouseenter=fillSourcesSubstages(this,event)> <?php write('#Loading')?>...
            </tr>
            <!--wwd-->
            <tr><td><img src=img/wasteDis.png> <a href='edit.php?level=Waste&sublevel=Discharge'><?php write('#Discharge')?></a>
              <?php drawCheckbox('wwd_KPI_GHG')?>
              <td field=wwd_KPI_GHG level=Waste sublevel=Discharge onmouseenter=fillSources(this,event)><?php write('#Loading')?>...
              <td substage_sum=wwd_KPI_GHG style=display:none onmouseenter=fillSourcesSubstages(this,event)> <?php write('#Loading')?>...
            </tr>

          <!--FSM-->
          <th rowspan=4 style="background:green">
            <div>
              <a href="edit.php?level=Faecl" style=color:white>
                <?php write("#Faecl")?>
              </a>
            </div>
            <div field=fs_KPI_GHG>0</div>
          </th>
            <?php
              function drawL2stage($alias, $level, $sublevel, $emission){
                echo "
                  <td><img src=img/$alias.png> <a href='edit.php?level=$level&sublevel=$sublevel'>
                ";
                write("#$sublevel");
                echo "</a>";
                drawCheckbox("$emission");
                echo "
                    <td field=$emission level=$level sublevel=$sublevel onmouseenter=fillSources(this,event)>    Loading...
                    <td substage_sum=$emission style=display:none onmouseenter=fillSourcesSubstages(this,event)> Loading...
                  </tr>
                ";
              }
              drawL2stage('faeclCon', 'Faecl', 'Containment', 'fsc_KPI_GHG');
              drawL2stage('faeclTre', 'Faecl', 'Treatment',   'fst_KPI_GHG');
              drawL2stage('faeclReu', 'Faecl', 'Reuse',       'fsr_KPI_GHG');
            ?>
        </table>
      </div>

      <style>
        @keyframes blink { from {background-color: white;} to {background-color: orange;} }
        table .critic {
          color:black;
          cursor:help;
          font-weight:bold;
          animation:blink 3s ease 0.5s infinite alternate;
        }
        #sources a {color:black;font-weight:bold}
        table td[field][value].critic:before {
          content:'\26a0 ';
          float:left;
          color:red;
        }
        table#sources{
          margin:10px 0;
          width:95%;
          box-shadow: 1px 1px 1px 1px rgba(0,0,0,.1);
        }
        #sources td {padding:1.2em 0.5em;}
        #sources td[field],
        #sources td[substage_sum] {text-align:right}
        #sources img {vertical-align:middle;width:30px;margin-right:8px}
        #sources td.ss {text-align:center;cursor:pointer} /*substages counter*/
        #sources td[field][level][sublevel]{cursor:help;}
        #sources td[field][level][sublevel]:hover{background:rgba(64,83,109,0.2);transition:all 0.5s}
      </style>
    </div>

    <!--emissions outside boundaries-->
    <div>
      <table id=outside style="width:95%;margin:1.5em 0">
        <tr>
          <th rowspan=2 style=background:purple>
            <?php write("#GHG emissions")?>
            <br>
            <?php write("#outside utility boundaries")?>
            <br>
            (kg CO<sub>2</sub> eq)
          </th>
          <td>
            <a href=variable.php?id=ww_SL_ghg_unc><?php write("#ww_SL_ghg_unc_descr")?></a>
          <td field=ww_SL_ghg_unc></td>
        </tr>
        <tr>
          <td>
            <a href=variable.php?id=ww_SL_ghg_ons><?php write("#ww_SL_ghg_ons_descr")?></a>
          <td field=ww_SL_ghg_ons></td>
        </tr>
      </table>
      <b><small><?php write('#Note: the emissions above have not been added in the totals presented in the GHG emissions summary')?></small></b>
      <script>
        document.querySelector('td[field=ww_SL_ghg_unc]').innerHTML=format(Global.Waste.ww_SL_ghg_unc());
        document.querySelector('td[field=ww_SL_ghg_ons]').innerHTML=format(Global.Waste.ww_SL_ghg_unc());
      </script>
      <style>
        table#outside td[field] {text-align:right}
      </style>
    </div>

    <!--emissions avoided-->
    <div>
      <table id=avoided style="width:95%;margin:1.5em 0">
        <tr>
          <th rowspan style=background:green>
            <a href="variable.php?id=ww_GHG_avoided" style=color:white>
              <?php write("#ww_GHG_avoided_descr")?>
            </a>
            <br><br>
            <span field='ww_GHG_avoided'>0</span> <small>kg CO<sub>2</sub> eq</small> / <?php write("#assessment period")?>
            <script>
              document.querySelector('span[field=ww_GHG_avoided]').innerHTML=format(Global.Waste.ww_GHG_avoided());
            </script>
          </th>
        </tr>
      </table>
      <b><small><?php write('#Note: the emissions above have not been subtracted in the totals presented in the GHG emissions summary')?></small></b>
      <style>
        table#avoided td[field] {text-align:right}
      </style>
      <script>
        (function(){
          //populate table "avoided"
          var t=document.querySelector('table#avoided');
          var GHG_avoided=[
            'wwt_SL_GHG_avoided',
            'wwt_wr_C_seq_slu',
            'wwd_wr_GHG_avo_d',
            'wwd_SL_ghg_non',
            'wwd_wr_GHG_avo',
            'fsr_ghg_avoided_reuse',
          ];
          t.querySelector('th[rowspan]').rowSpan=GHG_avoided.length+1;
          GHG_avoided.forEach(field=>{
            var newRow=t.insertRow(-1);
            var newCell=newRow.insertCell(-1);
            newCell.innerHTML=(function(){
              var name=translate(field+'_descr').replace(/^GHG emissions avoided/,'');
              if(field.search("fsr")==0){name+=" (FSM)"}
              var rv= "<a href='variable.php?id="+field+"'>"+name+"</a>";
              return rv;
            })();
            var newCell=newRow.insertCell(-1);
            newCell.setAttribute('field',field);
            newCell.innerHTML=format(getVariable(field));
          });
        })();
      </script>
    </div>
  </div>

  <!--graph 1: right tab-->
  <div id=graphs_container style=display:none>
    <div id=graph_1><?php write('#Loading')?>...</div>
    <div style="border-top:1px solid #ccc"></div>
    <div id=graph_2><?php write('#Loading')?>...</div>
  </div>
  <style>
    #graphs_container table {
      margin:auto;
    }
  </style>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
<script>google.charts.load('current',{'packages':['corechart','gauge','bar']});</script>

<script>
  //copy all stage functions inside substages
  Structure
    .filter(s=>!s.sublevel)
    .map(s=>s.level)
    .forEach(level=>{
      Object.keys(Global[level]).forEach(sublevel=>{
        var stage=Global[level][sublevel];
        Object.keys(stage)
          .filter(key=>typeof(stage[key])=="function")
          .forEach(key=>{
            Substages[level][sublevel]
            .forEach(substage=>{
              substage[key]=Global[level][sublevel][key];
            });
          });
      });
    });
</script>

<div style=margin-bottom:8em></div>
