<!doctype html><html><head>
  <?php include'imports.php'?>
</head><body><center>
<?php
  include'sidebar.php';
  include'navbar.php';
  include'linear.php';
?>

<div id=gwp_table>
  <h1 style="text-align:center">
    <span onclick="ecam.views.show('configuration')">{{translate('configuration')}}</span>
    &rsaquo;
    {{translate('gwp_title')}}
  </h1>

  <table style="margin:auto">
    <tr>
      <th colspan=5>{{translate('gwp_title_table')}}
    </tr>
    <tr>
      <th>{{translate('Report')}}
      <th>CO<sub>2</sub> (CO<sub>2</sub> {{translate('equivalents')}})
      <th>CH<sub>4</sub> (CO<sub>2</sub> {{translate('equivalents')}})
      <th>N<sub>2</sub>O (CO<sub>2</sub> {{translate('equivalents')}})
      <th>{{translate('Comments')}}
    </tr>
    <tr v-for="rep,i in GWP_reports" :class="Global.Configuration.Selected.gwp_reports_index==i ? 'selected':''">
      <td><b>{{rep.report}}</b>
      <td class=number>1
      <td class=number>{{rep.ct_ch4_eq}}
      <td class=number>{{rep.ct_n2o_eq}}
      <td><small>{{rep.comment}}</small>
    </tr>
  </table>
</div>

<script>
  let gwp_table = new Vue({
    el:"#gwp_table",
    data:{
      visible:true,
      Global,
      GWP_reports,
    },
    methods:{
      translate,
    }
  });
</script>

<style>
  #gwp_table td.number{
    text-align:right;
  }
  #gwp_table tr.selected {
    background:yellow;
  }
</style>
