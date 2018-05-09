<!doctype html><html><head>
  <?php include'imports.php'?>
  <script>
    function init() {
      calculateGHG();
      findCriticGHG();
      Caption.listeners();
      updateResult();

      //onclick listeners for substage counters: link to substages.php
      var tds=document.querySelectorAll('td.ss');
      for(var i=0;i<tds.length;i++){
        tds[i].onclick=function(){window.location='substages.php'}
      }
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

      //CO2
      element.classList.add('critic');
      element.setAttribute('cap',translate("This is the highest Energy consumption of your system"));

      //substages number
      element.previousSibling.classList.add('critic');
      element.previousSibling.setAttribute('caption',element.getAttribute('cap'));

      //name
      element.previousSibling.previousSibling.classList.add('critic');
      element.previousSibling.previousSibling.setAttribute('caption',element.getAttribute('cap'));
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
  <script>document.write(Global.General.Name)</script>
  &mdash;
  <?php write('#Energy consumption Summary (Overview)')?>
</h1>
<h4>
  <?php write('#assessment_period')?>:
  <b>
    <script>document.write(format(Global.General.Days()))</script> <?php write('#days')?>
    (<script>document.write(format(Global.General.Years()))</script> <?php write('#years')?>)
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
            <option value=none>kWh
            <option value=years>kWh / <?php write('#year')?>
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
            (<script>
            document.write(Global.Water.ws_serv_pop)
            </script> <?php write('#people')?>)
          </a>
          <br><br><span field=ws_nrg_cons><?php write('#Loading')?>...</span>
        </th>
          <!--wsa-->
          <td><img src=img/waterAbs.png> <a href='edit.php?level=Water&sublevel=Abstraction'><?php write('#Abstraction')?></a>
            <td caption="<?php write('#Number of substages')?>" class=ss><script>document.write(Substages.Water.Abstraction.length)</script>
            <td field=wsa_nrg_cons level=Water sublevel=Abstraction><?php write('#Loading')?>...
          <!--wst-->
          <tr><td><img src=img/waterTre.png> <a href='edit.php?level=Water&sublevel=Treatment'><?php write('#Treatment')?></a>
            <td caption="<?php write('#Number of substages')?>" class=ss><script>document.write(Substages.Water.Treatment.length)</script>
            <td field=wst_nrg_cons level=Water sublevel=Treatment><?php write('#Loading')?>...
          <!--wsd-->
          <tr><td><img src=img/waterDis.png> <a href='edit.php?level=Water&sublevel=Distribution'><?php write('#Distribution')?></a>
            <td caption="<?php write('#Number of substages')?>" class=ss><script>document.write(Substages.Water.Distribution.length)</script>
            <td field=wsd_nrg_cons level=Water sublevel=Distribution><?php write('#Loading')?>...
          </tr>
        <tr>

        <th rowspan=3 class=red>
          <a href="edit.php?level=Waste" style=color:white>
            <?php write('#Waste')?>
            (<script>
            document.write(Global.Waste.ww_serv_pop())
            </script> <?php write('#people')?>)
          </a>
          <br><br><span field=ww_nrg_cons><?php write('#Loading')?>...</span>
        </th>

          <!--wwc-->
          <td><img src=img/wasteCol.png> <a href='edit.php?level=Waste&sublevel=Collection'><?php write('#Collection')?></a>
            <td caption="<?php write('#Number of substages')?>" class=ss><script>document.write(Substages.Waste.Collection.length)</script>
            <td field=wwc_nrg_cons level=Waste sublevel=Collection><?php write('#Loading')?>...

          <!--wwt-->
          <tr><td><img src=img/wasteTre.png> <a href='edit.php?level=Waste&sublevel=Treatment'><?php write('#Treatment')?> </a>
            <td caption="<?php write('#Number of substages')?>" class=ss><script>document.write(Substages.Waste.Treatment.length)</script>
            <td field=wwt_nrg_cons level=Waste sublevel=Treatment><?php write('#Loading')?>...

          <!--wwd-->
          <tr><td><img src=img/wasteDis.png> <a href='edit.php?level=Waste&sublevel=Discharge'><?php write('#Discharge')?> </a>
            <td caption="<?php write('#Number of substages')?>" class=ss><script>document.write(Substages.Waste.Discharge.length)</script>
            <td field=wwd_nrg_cons level=Waste sublevel=Discharge><?php write('#Loading')?>...
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
<script>
  google.charts.load('current',{'packages':['corechart','gauge','bar']});
</script>
