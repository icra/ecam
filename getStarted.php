<?php /*
  first page for inserting general information about the new system
*/?>

<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init(){
			Sidebar.update();
      document.querySelector('#getStarted #Name').select();
		}
	</script>
</head><body onload="init()"><center>

<?php /*includes (to be removed in ecam v3)*/
  include'sidebar.php';     //sidebar
  include'navbar.php';      //navbar
  include'currentJSON.php'; //current json
?>

<!--vue template (ecam v3)-->
<div id=getStarted>
  <h1>
    {{translate('getStarted_subtitle')}}
  </h1>
  <table>
    <tr>
      <th>{{translate('getStarted_table_name')}}
      <td><input
        id=Name
        v-model="Global.General.Name"
        @change="updateResult()"
      >
    </tr>
    <tr>
      <th>{{translate('getStarted_table_start')}}
      <td><input type=date
        v-model="Global.General.AssessmentPeriodStart"
        @change="updateResult()"
      >
    </tr>
    <tr>
      <th>{{translate('getStarted_table_end')}}
      <td><input type=date
        v-model="Global.General.AssessmentPeriodEnd"
        @change="updateResult()"
      >
    </tr>
    <tr>
      <th>{{translate('getStarted_table_period')}}
      <td>{{Global.General.Days()}} {{translate('days')}}
    </tr>
    <tr>
      <th>{{translate('currency')}}
      <td>
        <span style="color:black;font-weight:bold">{{Global.General.Currency}}</span><br>
        <?php write('#configuration_new_currency')?>:
        <input
          v-model="Global.General.Currency"
          size=3 maxlength=3 placeholder="ccc"
          @change="updateResult()"
        >
      </td>
    </tr>
    <tr>
      <th>{{translate('getStarted_table_comments')}}
      <td>
        <textarea
          v-model="Global.General.Comments"
          :placeholder="translate('getStarted_max_200')"
          rows=5 cols=50 maxlength=200
          @change="updateResult()"
        ></textarea>
    </tr>
  </table>

  <!--PREV&NEXT-->
  <div style=margin:1em>
    <button class="button prev"
      onclick="event.stopPropagation();window.location='index.php'">
      {{translate('previous')}}
    </button>
    <button class="button next"
      onclick="event.stopPropagation();window.location='configuration.php'">
      {{translate('next')}}
    </button>
  </div>
</div>

<!--css (ecam v3)-->
<style>
  #getStarted th{
    text-align:left;
    vertical-align:middle
  }
  #getStarted th,
  #getStarted td{
    padding:1em
  }
  #getStarted input,
  #getStarted textarea{
    padding:0.5em
  }
</style>

<!--vue model (ecam v3)-->
<script>
  let getStarted = new Vue({
    el:"#getStarted",
    data:{
      Global,
    },
    methods:{
      translate,
      updateResult,
    },
  });
</script>
