<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		#info td:nth-child(n+2) {
			text-align:right;
		}
		#info td:nth-child(5) {
			text-align:left;
		}
		#info tr.selected {
			background:yellow;
		}
	</style>
</head><body><center>
<?php 
	include'sidebar.php';
	include'navbar.php';
	include'linear.php';
?>
<h1><?php write('#gwp_title')?></h1>

<table id=info> 
	<tr><th colspan=5><?php write('#gwp_title_table')?>
	<tr>
		<th><?php write('#Report')?>
		<th>CO<sub>2</sub> (CO<sub>2</sub> <?php write('#equivalents')?>
		<th>CH<sub>4</sub> (CO<sub>2</sub> <?php write('#equivalents')?>
		<th>N<sub>2</sub>O (CO<sub>2</sub> <?php write('#equivalents')?>)
		<th><?php write('#Comments')?>
</table>

<script>
	(function() {
		var table=document.querySelector('#info');
		GWP_reports.forEach((rep,i)=>{
			var newRow=table.insertRow(-1);
			if(i==Global.Configuration.Selected.gwp_reports_index)
			{
				newRow.classList.add('selected');
				newRow.title="Current selected IPCC Assessment Report";
			}
			newRow.insertCell(-1).innerHTML="<b>"+rep.report+"</b>";
			newRow.insertCell(-1).innerHTML=1;
			newRow.insertCell(-1).innerHTML=rep.ct_ch4_eq;
			newRow.insertCell(-1).innerHTML=rep.ct_n2o_eq;
			newRow.insertCell(-1).innerHTML="<small>"+rep.comment+"</small>";
		});
	})();
</script>
