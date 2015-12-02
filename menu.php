<script>
	/** Clear all user inputted data */
	function newSystem()
	{
		if(confirm("Changes will be lost. Continue?"))
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
<div>
	<button class="button add" onclick=newSystem()>New</button>
	<input type=file id=loadfile accept=".json" onchange="loadFile(event)" style=display:none>
	<button class="button edit" onclick=document.getElementById('loadfile').click()>Load</button> 
	<button class="button save" onclick=saveToFile()>Save</button>
</div>

<!--STYLES FOR THE BUTTONS-->
<style>
	.button
	{        
		display: inline-block;
		white-space: nowrap;
		background-color: #ddd;
		background-image: -webkit-gradient(linear, left top, left bottom, from(#eee), to(#ccc));
		background-image: -webkit-linear-gradient(top, #eee, #ccc);
		background-image: -moz-linear-gradient(top, #eee, #ccc);
		background-image: -ms-linear-gradient(top, #eee, #ccc);
		background-image: -o-linear-gradient(top, #eee, #ccc);
		background-image: linear-gradient(top, #eee, #ccc);
		border: 1px solid #777;
		padding: 0 1.5em;
		margin: 0.5em;
		font: bold 1em/2em Arial, Helvetica;
		text-decoration: none;
		color: #333;
		text-shadow: 0 1px 0 rgba(255,255,255,.8);
		-moz-border-radius: .2em;
		-webkit-border-radius: .2em;
		border-radius: .2em;
		-moz-box-shadow: 0 0 1px 1px rgba(255,255,255,.8) inset, 0 1px 0 rgba(0,0,0,.3);
		-webkit-box-shadow: 0 0 1px 1px rgba(255,255,255,.8) inset, 0 1px 0 rgba(0,0,0,.3);
		box-shadow: 0 0 1px 1px rgba(255,255,255,.8) inset, 0 1px 0 rgba(0,0,0,.3);
	}

	.button:hover
	{
		background-color: #eee;        
		background-image: -webkit-gradient(linear, left top, left bottom, from(#fafafa), to(#ddd));
		background-image: -webkit-linear-gradient(top, #fafafa, #ddd);
		background-image: -moz-linear-gradient(top, #fafafa, #ddd);
		background-image: -ms-linear-gradient(top, #fafafa, #ddd);
		background-image: -o-linear-gradient(top, #fafafa, #ddd);
		background-image: linear-gradient(top, #fafafa, #ddd);
	}

	.button:active
	{
		-moz-box-shadow: 0 0 4px 2px rgba(0,0,0,.3) inset;
		-webkit-box-shadow: 0 0 4px 2px rgba(0,0,0,.3) inset;
		box-shadow: 0 0 4px 2px rgba(0,0,0,.3) inset;
		position: relative;
		top: 1px;
	}

	.button:focus
	{
		outline: 0;
		background: #fafafa;
	}    

	.button:before
	{
		background: #ccc;
		background: rgba(0,0,0,.1);
		float: left;        
		width: 1em;
		text-align: center;
		font-size: 1.5em;
		margin: 0 1em 0 -1em;
		padding: 0 .2em;
		-moz-box-shadow: 1px 0 0 rgba(0,0,0,.5), 2px 0 0 rgba(255,255,255,.5);
		-webkit-box-shadow: 1px 0 0 rgba(0,0,0,.5), 2px 0 0 rgba(255,255,255,.5);
		box-shadow: 1px 0 0 rgba(0,0,0,.5), 2px 0 0 rgba(255,255,255,.5);
		-moz-border-radius: .15em 0 0 .15em;
		-webkit-border-radius: .15em 0 0 .15em;
		border-radius: .15em 0 0 .15em;     
		pointer-events: none;		
	}

	/* Buttons and inputs */

	button.button
	{ 
		cursor: pointer;
		overflow: visible; /* removes extra side spacing in IE */
	}

	/* removes extra inner spacing in Firefox */
	button::-moz-focus-inner 
	{
		border: 0;
		padding: 0;
	}

	/* If line-height can't be modified, then fix Firefox spacing with padding */
	input::-moz-focus-inner 
	{
		padding: .4em;
	}

	/* The disabled styles */
	.button[disabled], .button[disabled]:hover, .button.disabled, .button.disabled:hover 
	{
		background: #eee;
		color: #aaa;
		border-color: #aaa;
		cursor: default;
		text-shadow: none;
		position: static;
		-moz-box-shadow: none;
		-webkit-box-shadow: none;
		box-shadow: none;		
	}

	/* Hexadecimal entities for the icons */
	.add:before
	{
		content: "\271A";
	}

	.edit:before
	{
		content: "\270E";        
	}

	.delete:before
	{
		content: "\2718";        
	}

	.save:before
	{
		content: "\2714";        
	}

	.next:before
	{
		content: "\279C";
	}

	.prev:before
	{
		content: "\279C";
		transform: rotate(180deg);
		border-radius:0;
		box-shadow: -1px 0 0 0 rgba(0,0,0,.5);
	}
</style>
