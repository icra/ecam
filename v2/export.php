<!doctype html><html><head>
  <?php include'imports.php'?>
  <style>
    table#table{width:90%}
    table#table td {max-width:100px}
    button.button{margin:1px}
    button.l2{font-size:10px}
    table.ww th{background:#bf5050}
  </style>
  <script>
    function updateTable(obj,name) {
      //make highlight button enabled
      document.querySelector('#highlight').removeAttribute('disabled');
      document.querySelector('#createCSV').removeAttribute('disabled');

      //get the table t
      var t=document.querySelector('#table');
      t.rows[0].cells[0].innerHTML=name;

      //set the th color to red
      if([
          Global.Waste,
          Global.Waste.Collection,
          Global.Waste.Treatment,
          Global.Waste.Discharge
        ].indexOf(obj)+1
      ){
        t.classList.add('ww');
      }else{
        t.classList.remove('ww');
      }

      while(t.rows.length>2){t.deleteRow(-1);}

      for(var field in obj) {
        //type of the field
        var type=typeof(obj[field]);

        //only this object
        if(type=='object')continue;

        //new row
        var newRow=t.insertRow(-1);
        //code
        newRow.insertCell(-1).innerHTML=field;
        //name
        newRow.insertCell(-1).innerHTML=translate(field+'_descr');
        //type
        newRow.insertCell(-1).innerHTML=(function(){
          if(field.search("c_")>=0) return "Calculated variable";
          return {"number":"Input","function":"Output"}[type];
        })();

        //value
        newRow.insertCell(-1).innerHTML=(function() {
          switch(type) {
            case "number":
              return format(obj[field]);
              break;
            case "function":
              return format(obj[field]());
              break;
          }
        })();

        //formula or default value
        newRow.insertCell(-1).innerHTML=(function() {
          switch(type) {
            case "number": return "--"; break;
            case "function":
              return Formulas.prettify(obj[field].toString());
              break;
          }
        })();

        //unit
        newRow.insertCell(-1).innerHTML=Info[field].unit;
        //description
        newRow.insertCell(-1).innerHTML=translate(field+'_expla');
      }
      //bottom line with the color of W/WW
      var newRow=t.insertRow(-1);
      var newTh=document.createElement('th');
      newTh.setAttribute('colspan',7)
      newTh.style.borderBottom='none';
      newTh.style.borderTop='none';
      newRow.appendChild(newTh);
    }
    function selectText(el) {
      var body = document.body, range, sel;
      if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
          range.selectNodeContents(el);
          sel.addRange(range);
        } catch (e) {
          range.selectNode(el);
          sel.addRange(range);
        }
      } else if (body.createTextRange) {
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
      }
    }
    function createCSV() {
      //get the table "table"
      var t=document.getElementById('table');

      //string where we will write the entire file
      var str="";

      //go over the table
      for(var i=0; i<t.rows.length; i++)
      {
        for(var j=0; j<t.rows[i].cells.length; j++)
        {
          str += t.rows[i].cells[j].textContent.replace(/,/g,' ')+",";
        }
        str+='\r\n';
      }

      //generate clickable link
      var a      = document.createElement('a');
      a.href     = 'data:text/csv;charset=utf-8,' + encodeURI(str);
      a.target   = '_blank';
      a.download = 'export.csv';

      //click the link
      document.body.appendChild(a);
      a.click();
    }
    function exportAll() {
      //make highlight button enabled
      document.querySelector('#highlight').removeAttribute('disabled');
      document.querySelector('#createCSV').removeAttribute('disabled');

      //get the table t
      var t=document.querySelector('#table');
      t.rows[0].cells[0].innerHTML=translate("All stages");
      while(t.rows.length>2){t.deleteRow(-1);}

      //all stages objects
      [
        Global.Water,
        Global.Water.Abstraction,
        Global.Water.Treatment,
        Global.Water.Distribution,
        Global.Waste,
        Global.Waste.Collection,
        Global.Waste.Treatment,
        Global.Waste.Discharge,
      ].forEach( obj => {
        for(var field in obj) {
          //type of the field
          var type=typeof(obj[field]);
          //only this object
          if(type=='object')continue;
          //new row
          var newRow=t.insertRow(-1);

          //code
          newRow.insertCell(-1).innerHTML=field
          //name
          newRow.insertCell(-1).innerHTML=translate(field+'_descr');
          //type
          newRow.insertCell(-1).innerHTML=(function() {
            if(field.search("c_")>=0) return "Output (Calculated variable)";
            switch(type) {
              case "number":   return "Input"; break;
              case "function": return "Output";    break;
            }
          })();

          //value
          newRow.insertCell(-1).innerHTML=(function() {
            switch(type) {
              case "number":
                return format(obj[field]);
                break;
              case "function":
                return format(obj[field]());
                break;
            }
          })();

          //formula or default value
          newRow.insertCell(-1).innerHTML=(function() {
            switch(type) {
              case "number":return "--";break;;
              case "function":
                return Formulas.prettify(obj[field].toString());
                break;
            }
          })();

          //unit
          newRow.insertCell(-1).innerHTML=Info[field] ? Info[field].unit : "";
          //description
          newRow.insertCell(-1).innerHTML=translate(field+'_expla');
        }
      });
    }
  </script>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--> <?php include'linear.php'?>
<!--TITLE--><h1><?php write('#export_title')?></h1>
<h4>
  <?php write('#You can export individual stages to excel using this menu')?>
</h4><h4>
  <?php write('#export_explanation')?>
</h4>

<div id=main style=margin-bottom:3em>

<!--buttons to select stage-->
<div class=flex style=justify-content:center>
  <div>
    <table>
      <tr>
        <td rowspan=4>
          <button onclick="exportAll()" class=button style="font-size:18px">
            <?php write('#All stages')?>
          </button>
        </td>
        <td><?php write('#ghg_assessment')?><td><?php write('#energy_performance')?>
      <tr>
        <td>
          <button onclick="updateTable(Global.Water, '<?php write("#Water")?>')" class="button"><?php write('#Water')?></button>
        </td>
        <td>
          <button onclick="updateTable(Global.Water.Abstraction,  '<?php write('#energy_performance')?> - Abstraction')"   class="button l2"><?php write('#Abstraction')?></button>
          <button onclick="updateTable(Global.Water.Treatment,    '<?php write('#energy_performance')?> - Treatment')"     class="button l2"><?php write('#Treatment')?></button>
          <button onclick="updateTable(Global.Water.Distribution, '<?php write('#energy_performance')?> - Distribution')"  class="button l2"><?php write('#Distribution')?></button>
        </td>
      </tr>
      <tr>
        <td>
          <button onclick="updateTable(Global.Waste, '<?php write("#Waste")?>')" class="button"><?php write('#Waste')?></button>
        </td>
        <td>
          <button onclick="updateTable(Global.Waste.Collection,   '<?php write('#energy_performance')?> - <?php write('#Collection')?>')" class="button l2"><?php write('#Collection')?></button>
          <button onclick="updateTable(Global.Waste.Treatment,    '<?php write('#energy_performance')?> - <?php write('#Treatment')?>')"  class="button l2"><?php write('#Treatment')?></button>
          <button onclick="updateTable(Global.Waste.Discharge,    '<?php write('#energy_performance')?> - <?php write('#Discharge')?>')"  class="button l2"><?php write('#Discharge')?></button>
        </td>
      </tr>
    </table>
  </div>
  <div>
    <button id=highlight disabled class=button style="margin:1em;font-size:18px" onclick=selectText(document.querySelector('#table'))>
      <?php write('#export_highlight_button')?>
    </button>
    <button class=button id=createCSV disabled onclick=createCSV() style="font-size:18px">
      <?php write('#Create CSV from current table')?>
    </button>
  </div>
</div>

<!--info table-->
<table id=table style="margin-top:0.5em;width:95%">
  <tr><th colspan=7 style=font-size:18px><?php write('#export_no_stage_selected')?>
  <tr>
    <th><?php write('#export_code')?>
    <th><?php write('#export_name')?>
    <th><?php write('#export_type')?>
    <th><?php write('#Current value')?>
    <th><?php write('#Formula')?>
    <th><?php write('#export_unit')?>
    <th><?php write('#export_desc')?>
  <tr><td colspan=7 style="text-align:center;">
    <?php write('#export_click_on_a_stage')?>
</table>

</div>
