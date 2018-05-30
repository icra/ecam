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
      box-shadow: 1px 1px 1px 1px rgba(0,0,0,.1);
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
  &mdash;
  <?php write('#Energy consumption Summary (Overview)')?>
</h1>
<h4>
  <?php write('#assessment_period')?>:
  <b>
    <span id=Days></span> <?php write("#days")?>
    (<span id=Years></span> <?php write("#years")?>)
    <script>
      document.querySelector('h4 span#Days').innerHTML=format(Global.General.Days());
      document.querySelector('h4 span#Years').innerHTML=format(Global.General.Years());
    </script>
  </b>
</h4>

<!--content-->
<div style=width:66%;>
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
  <div id=tables>
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
        <tr><th rowspan=9 style="font-weight:bold;background:#2b6488;">
          <?php write('#TOTAL ENERGY CONSUMED')?>
        <br><br><span field=TotalNRG><?php write('#Loading')?>...</span>

        <th rowspan=3 style="background:#00aff1">
          <a href="edit.php?level=Water" style=color:white>
            <?php write('#Water')?>
            (<span id=ws_serv_pop>0</span> <?php write("#people")?>)
            <script>document.querySelector('#ws_serv_pop').innerHTML=format(Global.Water.ws_serv_pop)</script>
          </a>
          <br><br><span field=ws_nrg_cons><?php write('#Loading')?>...</span>
        </th>

          <!--wsa-->
          <td><img src=img/waterAbs.png> <a href='edit.php?level=Water&sublevel=Abstraction'><?php write('#Abstraction')?></a>
            <td field=wsa_nrg_cons onmouseenter=fillSourcesSubstages(this,event) level=Water sublevel=Abstraction><?php write('#Loading')?>...
          <!--wst-->
          <tr><td><img src=img/waterTre.png> <a href='edit.php?level=Water&sublevel=Treatment'><?php write('#Treatment')?></a>
            <td field=wst_nrg_cons onmouseenter=fillSourcesSubstages(this,event) level=Water sublevel=Treatment><?php write('#Loading')?>...
          <!--wsd-->
          <tr><td><img src=img/waterDis.png> <a href='edit.php?level=Water&sublevel=Distribution'><?php write('#Distribution')?></a>
            <td field=wsd_nrg_cons onmouseenter=fillSourcesSubstages(this,event) level=Water sublevel=Distribution><?php write('#Loading')?>...
          </tr>
        <tr>

        <th rowspan=3 class=red>
          <a href="edit.php?level=Waste" style=color:white>
            <?php write('#Waste')?>
            (<span id=ww_serv_pop>0</span> <?php write("#people")?>)
            <script>document.querySelector('#ww_serv_pop').innerHTML=format(Global.Waste.ww_serv_pop())</script>
          </a>
          <br><br><span field=ww_nrg_cons><?php write('#Loading')?>...</span>
        </th>

          <!--wwc-->
          <td><img src=img/wasteCol.png> <a href='edit.php?level=Waste&sublevel=Collection'><?php write('#Collection')?></a>
            <td field=wwc_nrg_cons onmouseenter=fillSourcesSubstages(this,event) level=Waste sublevel=Collection><?php write('#Loading')?>...

          <!--wwt-->
          <tr><td><img src=img/wasteTre.png> <a href='edit.php?level=Waste&sublevel=Treatment'><?php write('#Treatment')?> </a>
            <td field=wwt_nrg_cons onmouseenter=fillSourcesSubstages(this,event) level=Waste sublevel=Treatment><?php write('#Loading')?>...

          <!--wwd-->
          <tr><td><img src=img/wasteDis.png> <a href='edit.php?level=Waste&sublevel=Discharge'><?php write('#Discharge')?> </a>
            <td field=wwd_nrg_cons onmouseenter=fillSourcesSubstages(this,event) level=Waste sublevel=Discharge><?php write('#Loading')?>...
        </tr>
      </table>
    </div>

    <style>
      @keyframes blink { from {background-color: white;} to {background-color: orange;} }
      table#sources .critic {
        color:black;
        font-weight:bold;
        animation:blink 3s ease 0.5s infinite alternate;
      }
      #sources a {color:black;font-weight:bold}
      table#sources td[field][value].critic:before {
        content:'\26a0 ';
        float:left;
        color:red;
      }
      table#sources{
        margin:10px 0;
        width:95%;
      }
      table#sources td {padding:1.2em 0.5em;}
      table#sources td[field] {text-align:right}
      table#sources img {vertical-align:middle;width:30px;margin-right:10px}
    </style>
  </div>

  <!--graph: right tab-->
  <div id=graph style=display:none><?php write('#Loading')?>...</div>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
<script>google.charts.load('current',{'packages':['corechart','gauge','bar']});</script>

<!--caption div for substages energy consumption -->
<div id=container_detailed style=display:nnone>
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
