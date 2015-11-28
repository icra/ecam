<script>
	/** Clear all user inputted data */
	function newSystem()
	{
		if(confirm("WARNING. All input data will be set to default. Are you sure?"))
		{
			//simply remove cookie and default values will load
			removeCookie("GLOBAL")
			window.location.reload()
		}
	}

	/** Generate a json/text file of the Global object */
	function saveToFile()
	{
		var link=document.createElement('a')
		link.href="data:text/json;charset=utf-8,"+JSON.stringify(Global)
		link.download="data.json"
		link.click()
	}

	/** Update Global object with loaded file parsed to JSON */
	function loadFile(evt)
	{
		var file = evt.target.files[0]
		var reader = new FileReader()
		var contents
		reader.onload=function()
		{
			copyFieldsFrom(JSON.parse(reader.result),"Global")
			init() //this function is different in edit.php and getStarted.php
		}
		reader.readAsText(file);
	}
</script>

<!--LOAD AND SAVE-->
<div style=background:#eee>
	::
	<!--NEW--><button onclick=newSystem()>&#128214; New System</button>
	::
	<!--LOAD-->
	<input type=file id=loadfile accept=".json" onchange="loadFile(event)" style=display:none>
	<button><label for=loadfile>&#128194; Load</label></button> 
	::
	<!--SAVE--><button onclick=saveToFile()>&#128190; Save</button>
	::
</div>
