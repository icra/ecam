<!--inside configuration.php-->

<!--select assessment report-->
<fieldset>
  <legend>
    <?php write('#select_gwp_source')?>
    <!--select gwp report which defines gwp values-->
    <select id=select_gwp></select>
    <script>
      (function(){
        //fill 'select_gwp' with options
        var select=document.querySelector('#select_gwp');
        GWP_reports.forEach((rep,i)=>{
          var option=document.createElement('option');
          option.value=i;
          option.innerHTML=rep.report;
          if(i==Global.Configuration.Selected.gwp_reports_index){
            option.selected=true;
          }
          select.appendChild(option);
        });
        //add onchange listener
        select.addEventListener('change',function(){
          var index=this.value;
          if(index=="false")return;
          index=parseInt(index);
          Global.Configuration.Selected.gwp_reports_index=index;
          Cts.ct_ch4_eq.value=GWP_reports[index].ct_ch4_eq;
          Cts.ct_n2o_eq.value=GWP_reports[index].ct_n2o_eq;
          init();
        });
      })();

      //view
      function showGWPconstants(){
        document.querySelector('#ct_ch4_eq').innerHTML=Cts.ct_ch4_eq.value;
        document.querySelector('#ct_n2o_eq').innerHTML=Cts.ct_n2o_eq.value;
      }
    </script>

    <a href=gwp_table.php>Info</a>
  </legend>

  <!--description of gwp values-->
  <div style="padding:0.5em 0">
    <?php write('#gwp_values_relative_to')?>
  </div>

  <!--actual gwp values-->
  <table id=gwp_inputs>
    <tr>
      <td><?php write('#carbon_dioxide')?> (CO<sub>2</sub>)
      <td align=right>1
      <td>CO<sub>2</sub> <?php write('#equivalents')?>
    <tr>
      <td><?php write('#methane')?> (CH<sub>4</sub>)
      <td align=right><span id=ct_ch4_eq>loading...</span>
      <td>CO<sub>2</sub> <?php write('#equivalents')?>
    <tr>
      <td><?php write('#nitrouns_oxide')?> (N<sub>2</sub>O)
      <td align=right><span id=ct_n2o_eq>loading...</span>
      <td>CO<sub>2</sub> <?php write('#equivalents')?>
  </table>
</fieldset>
