<!doctype html><html><head>
  <?php include'imports.php'?>
  <script>
    function init() {
      calculateGHG();
      findCriticGHG();
      addDetailedListeners();
      Caption.listeners();
      updateResult();
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
            ret=function(firstTwoLetters) {
              var di=1;//divisor
              switch(firstTwoLetters) {
                case "ws":
                  di=Global.Water.ws_serv_pop;
                  break;
                case "ww":
                  di=Global.Waste.ww_serv_pop();
                  break;
                default:
                  break;
              }
              return di;
            };
            break;
          default:
            break;
        }
        return ret;
      })();

      var fields=document.querySelectorAll('#sources [field]');
      for(var i=0;i<fields.length;i++) {
        var element=fields[i];
        var code=element.getAttribute('field');
        var divisor_value = typeof(divisor)=="function" ? divisor(code.substring(0,2)) : divisor;
        var loc=locateVariable(code);

        //check if variable is an input or an output
        var object=loc.sublevel ? Global[loc.level][loc.sublevel][code] : Global[loc.level][code];
        var value=0;
        if(typeof(object)=="function") {
          value=loc.sublevel ?
            Global[loc.level][loc.sublevel][code]()/divisor_value
            :
            Global[loc.level][code]()/divisor_value;
        }
        else {
          value=object/divisor_value;
        }
        element.innerHTML=format(value);
        element.setAttribute('value',value);
      }
    }

    function findCriticGHG() {
      var max=0;
      var critic=false;
      var fields=document.querySelectorAll('#sources td[field]');
      for(var i=0;i<fields.length;i++) {
        var value=parseFloat(fields[i].getAttribute('value'));
        if(value>max) {
          max=value;
          critic=fields[i].getAttribute('field');
        }
      }
      if(!critic)return;
      var element=document.querySelector("#sources td[field="+critic+"]");

      //stage value
      var cap=translate("This is the highest Energy consumption of your system");
      element.classList.add('critic');
      element.setAttribute('title',cap);
    }

    function addDetailedListeners() {
      var tds=document.querySelectorAll("td[field][level][sublevel]");
      for(var i=0;i<tds.length;i++) {
        tds[i].onmousemove=function(event) {
          var con=document.querySelector('#container_detailed');
          con.style.display='';
          con.style.left=(event.clientX+35)+"px";
          con.style.top=(event.clientY-50)+"px";
        }
      }
    }

    //fill table of emissions per substages
    function fillSourcesSubstages(td,ev){
      //fill table
      var fie=td.getAttribute('field');
      var loc=locateVariable(fie);
      var lvl=loc.level;
      var sub=loc.sublevel;
      var obj=Substages[lvl][sub];
      var t=document.querySelector('table#detailed');
      document.querySelector('#detailed_title').innerHTML=translate('Substages energy consumption')||"Substages energy consumption";
      while(t.rows.length>0)t.deleteRow(-1);
      //go over substages
      obj.forEach(substage=>{
        var newRow=t.insertRow(-1);
        newRow.insertCell(-1).innerHTML=substage.name;
        var newCell=newRow.insertCell(-1);
        newCell.style.textAlign='right';
        newCell.innerHTML=format(substage[fie]);
      });
      //substages total
      var newRow=t.insertRow(-1);
      newRow.insertCell(-1).innerHTML="<b><?php write('#Substages total')?></b>";
      var newCell=newRow.insertCell(-1);
      newCell.style.textAlign='right';
      newCell.innerHTML="<b>"+format(obj.map(s=>s[fie]).reduce((p,c)=>(p+c),0))+"</b>";

      //hide table
      td.onmouseout=function(){document.querySelector('#container_detailed').style.display='none'};
    }
  </script>
  <style>
    #sources td.ss {text-align:center;cursor:pointer} /*substages counter*/
    #sources td[field][level][sublevel]{padding-right:1em}
    #sources td[field][level][sublevel]:hover{background:rgba(64,83,109,0.2);transition:all 0.5s}
    #sources {
      /*box-shadow: 1px 1px 1px 1px rgba(0,0,0,.1);*/
    }
  </style>
</head><body onload=init()><center>
  <?php
    include'sidebar.php';
    include'navbar.php';
    include'linear.php';
    include'caption.php';
  ?>
  <!--title-->
  <h1>
    <span id=Name></span>
    <script>
      document.querySelector('h1 span#Name').innerHTML=Global.General.Name;
    </script>
    &mdash; <?php write('#Energy consumption Summary (Overview)')?>
    &mdash; <?php write('#assessment_period')?>:
    <span>
      <span id=Days></span> <?php write("#days")?>
      (<span id=Years></span> <?php write("#years")?>)
      <script>
        document.querySelector('h1 span#Days').innerHTML=format(Global.General.Days());
        document.querySelector('h1 span#Years').innerHTML=format(Global.General.Years());
      </script>
    </span>
  </h1>
</center>

<!--content-->
<div>
  <!--tab buttons-->
  <div class=tab_buttons id=tabs>
    <button class=left onclick="tabs_show_tables()" disabled> <?php write('#Tables')?> </button>
    <button class=right onclick="tabs_show_graphs()"> <?php write('#Charts')?> </button>
    <script>
      function tabs_show_tables(){
        document.getElementById('tables').style.display='';
        document.getElementById('graph').style.display='none';
        document.querySelector('#tabs button.left').setAttribute('disabled',true);
        document.querySelector('#tabs button.right').removeAttribute('disabled');
      }
      function tabs_show_graphs(){
        document.getElementById('tables').style.display='none';
        document.getElementById('graph').style.display='';
        document.querySelector('#tabs button.left').removeAttribute('disabled');
        document.querySelector('#tabs button.right').setAttribute('disabled',true);
        Graphs.graph5(false,'graph');
      }
    </script>
  </div>

  <!--tables: left tab-->
  <div id=tables style="width:66%;margin:auto">
    <div>
      <table id=sources>
        <tr><td colspan=5 style=text-align:center>
          <?php write('#Energy consumption')?>
          <!--select divisor-->
          <select id=ghg_divisor onchange=init()>
            <option value=none>    kWh / <?php write('#Assessment_period')?>
            <option value=years>   kWh / <?php write('#year')?>
            <option value=serv_pop>KWh / <?php write("#ws_serv_pop_descr")?>
          </select>
          <!--legend-->
          <span style=float:right>
            <span class=circle style=background:orange></span>
            <?php write('#highest energy consumption')?>
          </span>
        </tr>

        <!--L0 Total energy consumed-->
        <tr><th rowspan=9 style="font-weight:bold;background:#2b6488;">
          <?php write('#TOTAL ENERGY CONSUMED')?><br><br>
          <span field=TotalNRG>0</span>
        </th>

        <!--L1 Water-->
        <th rowspan=3 style="background:#00aff1">
          <a href="edit.php?level=Water" style=color:white>
            <?php write('#Water')?>
            (<span id=ws_serv_pop>0</span> <?php write("#people")?>)
            <script>document.querySelector('#ws_serv_pop').innerHTML=format(Global.Water.ws_serv_pop)</script>
          </a>
          <br><br><span field=ws_nrg_cons>0</span>
          </th>
          <!--wsa-->
          <td>
            <img alias=waterAbs src=img/waterAbs.png>
            <a href='edit.php?level=Water&sublevel=Abstraction'><?php write('#Abstraction')?></a>
            <td field=wsa_nrg_cons onmouseenter=fillSourcesSubstages(this,event) level=Water sublevel=Abstraction>0
          <!--wst-->
          <tr><td>
            <img alias=waterTre src=img/waterTre.png>
            <a href='edit.php?level=Water&sublevel=Treatment'><?php write('#Treatment')?></a>
            <td field=wst_nrg_cons onmouseenter=fillSourcesSubstages(this,event) level=Water sublevel=Treatment>0
          <!--wsd-->
          <tr><td>
            <img alias=waterDis src=img/waterDis.png>
            <a href='edit.php?level=Water&sublevel=Distribution'><?php write('#Distribution')?></a>
            <td field=wsd_nrg_cons onmouseenter=fillSourcesSubstages(this,event) level=Water sublevel=Distribution>0
          </tr>
        <tr>

        <!--L1 Waste-->
        <th rowspan=3 class=red>
          <a href="edit.php?level=Waste" style=color:white>
            <?php write('#Waste')?>
            (<span id=ww_serv_pop>0</span> <?php write("#people")?>)
            <script>document.querySelector('#ww_serv_pop').innerHTML=format(Global.Waste.ww_serv_pop())</script>
          </a>
          <br><br><span field=ww_nrg_cons>0
          </th>
          <!--wwc-->
          <td>
            <img alias=wasteCol src=img/wasteCol.png>
            <a href='edit.php?level=Waste&sublevel=Collection'><?php write('#Collection')?></a>
            <td field=wwc_nrg_cons onmouseenter=fillSourcesSubstages(this,event) level=Waste sublevel=Collection>0
          <!--wwt-->
          <tr><td>
            <img alias=wasteTre src=img/wasteTre.png>
            <a href='edit.php?level=Waste&sublevel=Treatment'><?php write('#Treatment')?> </a>
            <td field=wwt_nrg_cons onmouseenter=fillSourcesSubstages(this,event) level=Waste sublevel=Treatment>0
          <!--wwd-->
          <tr><td>
            <img alias=wasteDis src=img/wasteDis.png>
            <a href='edit.php?level=Waste&sublevel=Discharge'><?php write('#Discharge')?> </a>
            <td field=wwd_nrg_cons onmouseenter=fillSourcesSubstages(this,event) level=Waste sublevel=Discharge>0
        </tr>

        <!--L1 Faecl-->
        <th rowspan=3 style="background:green">
          <a href="edit.php?level=Faecl" style=color:white>
            <?php write('#Faecl')?>
          </a><br><br>
          <span field=fs_nrg_cons>0</span>
          </th>
          <?php
            function drawL2stage($alias, $level, $sublevel, $emission){
              echo "
                <td>
                  <img alias=$alias src=img/$alias.png>
                  <a href='edit.php?level=$level&sublevel=$sublevel'>
              ";
              write("#$sublevel");
              echo "</a>";
              echo "
                <td field=$emission level=$level sublevel=$sublevel onmouseenter=fillSourcesSubstages(this,event)>0
                </tr>
              ";
            }
            drawL2stage('faeclCon', 'Faecl', 'Containment', 'fsc_nrg_cons');
            drawL2stage('faeclTre', 'Faecl', 'Treatment',   'fst_nrg_cons');
            drawL2stage('faeclReu', 'Faecl', 'Reuse',       'fsr_nrg_cons');
          ?>
        </tr>
      </table>
      <script>
        //modify the image of each stage according to "ActiveStages"
        document.querySelectorAll("#sources img[alias]").forEach(img=>{
          var alias=img.getAttribute('alias');
          if(0==Global.Configuration.ActiveStages[alias]){
            img.src="img/"+alias+"-off.png";
          }
        });
      </script>
    </div>

    <style>
      @keyframes blink { from {background-color: white;} to {background-color: orange;} }
      table#sources .critic {
        color:black;
        font-weight:bold;
        animation:blink 3s ease 0.5s infinite alternate;
      }
      table#sources td[field][value].critic:before {
        content:'\26a0 ';
        float:left;
        color:red;
      }
      table#sources{
        margin:10px 0;
        width:95%;
      }
      table#sources td {padding:0.8em 0.5em;}
      table#sources td[field] {text-align:right}
      table#sources img {vertical-align:middle;width:30px;margin-right:10px}
      #sources span[field]{font-weight:bold}
    </style>
  </div>

  <!--graph: right tab-->
  <div class=flex style=justify-content:center>
    <div id=graph style=display:none><?php write('#Loading')?>...</div>
  </div>
</div>

<!--floating div for substages-->
<div id=container_detailed style=display:none>
  <div><b id=detailed_title></b></div>
  <table id=detailed></table>
  <style>
    div#container_detailed {
      font-size:11px;
      font-family:monospace;
      position:fixed;
      z-index:1000;
      background:white;
      padding:0.3em 0.5em;
      box-shadow: 1px 1px 1px 1px rgba(0,0,0,.1);
      border:1px solid #ccc;
      text-align:left;
    }
  </style>
</div>
