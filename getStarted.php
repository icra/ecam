<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web Tool</title>
	<link rel=stylesheet href="css.css">
	<style>
		th{vertical-align:middle}
		th,td{padding:1em}
		input,textarea{padding:0.5em}
	</style>
	<script src=dataModel/global.js></script>
	<script src=js/cookies.js></script>
	<script src=js/updateGlobalFromCookies.js></script>
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
<!--LOAD SAVE CLEAR--><?php include"loadSaveClear.php"?>
<!--TITLE--><h2>Get Started</h2>
<!--SUBTITLE--><h4>Edit General Data of your system</h4>
<!--FORM--><table id=form style="text-align:left;box-shadow:0 9px 5px -5px rgba(0,0,0,0.3);"></table>
<!--NEXT--> <div style=margin:1em> <button>Next</button> </div>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
