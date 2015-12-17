<script>
	/** Clear all user inputted data */
	function newSystem()
	{
		//simply remove cookie and default values will load
		removeCookie("GLOBAL")
		window.location="getStarted.php"
		//window.location.reload()
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
			init()
			window.location.reload()
		}
		reader.readAsText(file);
	}

	function clearSystem()
	{
		//simply remove cookie and default values will load
		removeCookie("GLOBAL")
		window.location.reload()
	}
</script>

<!--MENU-->
<div>
	<!--new-->
	<button class="button add" onclick=newSystem()>New system</button>
	<!--load-->
	<input type=file id=loadfile accept=".json" onchange="loadFile(event)" style=display:none>
	<button class="button edit" onclick=document.getElementById('loadfile').click()>Load system</button> 
	<!--save-->
	<button class="button save" onclick=saveToFile()>Save system</button>
	<!--save-->
	<button class="button delete" onclick=clearSystem()>Clear system</button>
</div>
