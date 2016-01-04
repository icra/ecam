<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<?php include'imports.php'?>
	<style>
		th{vertical-align:middle}
		th,td{padding:1em}
		input,textarea{padding:0.5em}
	</style>
	<script>
		/** Create a row for a field in Global.General */
		function tableRow(field,input,type)
		{
			input = input || "input"
			type = type || "text"
			var onchange="onchange=\"updateField('"+field+"',this.value)\""
			var ret="<tr><th>"+field+"<td>"
			if(input=="textarea")
				ret+="<textarea rows=5 cols=50 "+onchange+">"+Global.General[field]+"</textarea>"
			else
				ret+="<input type='"+type+"' value='"+Global.General[field]+"' "+onchange+">"
			return ret
		}
		function updateField(field,newValue)
		{
			Global.General[field]=newValue
			init()
		}
		function updateForm()
		{
			var t = document.getElementById('form')
			while(t.rows.length>0)t.deleteRow(-1)
			t.innerHTML+=tableRow("Name")
			t.innerHTML+=tableRow("Location")
			t.innerHTML+=tableRow("Assessment Period Start",'input','date')
			t.innerHTML+=tableRow("Assessment Period End",'input','date')
			t.innerHTML+="<tr><th>Assessment Period<td>"+Global.General.Days()+" days"
			t.innerHTML+=tableRow("Comments",'textarea','date')
		}
		function init()
		{
			updateForm()
			updateResult()
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>Get started</h1>
<!--SUBTITLE--><h4>General data of your system. You can edit this information later.</h4>
<!--FORM--><table id=form style="text-align:left;"></table>
<!--NEXT--><div style=margin:1em><button class="button next" onclick=window.location='configuration.php'>Next</button></div>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
