<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		//count all variables (inputs and outputs)
		function countVariables(obj)
		{
			var n=0;
			for(var field in obj)
			{
				var type=typeof(obj[field]);
				switch(type)
				{
					case 'number':
					case 'function':
						n++
						break;
					case 'object':
						n+=countVariables(obj[field])
						break;
				}
			}
			return n;
		}
		function findInexisting(obj)
		{
			(function()
			{
				var inex=[];
				if(obj instanceof Array)
				{
					for(var i in obj)
					{
						if(locateVariable(obj[i])==false) inex.push(obj[i]);
					}
				}
				else if(typeof(obj)=="object")
				{
					for(var field in obj)
					{
						if(locateVariable(field)==false) inex.push(field);
					}
				}
				else return []

				if(inex.length==0)
				{
					document.write("<tr><td style=background:lightgreen><i>All OK</i>")
				}
				return inex;
			})().forEach(function(field)
			{
				document.write("<tr><td style=background:red>"+field);
			});
		}
	</script>
	<style>
		div#main table {
			display:inline-block;
			vertical-align:top;
			margin:2px 1px;
		}
	</style>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>
<!--title--><h1>Tasks and problem finder (debug mode)</h1></center>
<div id=main style=margin-bottom:3em>
	<!--problems-->
	<div class=inline style="max-width:60%;border:1px solid #ccc;padding:0.5em;margin:2px">
		<h3 style=padding-left:2px>Problems found</h3>

		<!--questions-->
		<div class=inline style="width:20%">
			<table><tr><th>questions.js 
				<script>
					for(var q in Questions)
					{
						if(typeof(Questions[q])=="function") continue;
						document.write("<tr><td><b>"+q+"</b>")
						findInexisting(Questions[q])
					}
				</script>
			</table>
		</div>

		<!--rest of data structures-->
		<div class=inline style="width:75%">
			<table><tr><th>Inputs not used
				<script>
					//get unused inputs
					function getUnused(obj)
					{
						var unused=[];
						for(var field in obj)
						{
							var type = typeof(obj[field]);
							switch(type)
							{
								case 'number':
									var n=Formulas.outputsPerInput(field).length;
									if(n==0) unused.push(field);
									break;
								case 'function':
									if(field.search(/^c_/)==0)
									{
										var n=Formulas.outputsPerInput(field).length;
										if(n==0) unused.push(field);
									}
									break;
								case 'object':
									unused=unused.concat(getUnused(obj[field]));
									break;
							}
						}
						return unused;
					}

					['Water','Waste','Energy'].forEach(function(level)
					{
						var unused=getUnused(Global[level])
						unused.forEach(function(field)
						{
							var color=field.search('ww')==-1 ? "" : "#bf5050";
							try{
								document.write("<tr><td>");
								document.write("<a title='"+translate(field+"_descr")+"' style=color:"+color+" href=variable.php?id="+field+">"+field+"</a>");
							}
							catch(e)
							{
								document.write("<tr><td colspan=3>"+field+" need to be removed. Reset chaché")
							}
						});
					});
				</script>
			</table>

			<table><tr><th>Info object
				<script>findInexisting(Info)</script>
			</table>

			<table><tr><th>Benchmarking (RefValues)
				<script>findInexisting(RefValues)</script>
			</table>

			<table><tr><th>averagedVariables.js
				<script>findInexisting(Averaged.list)</script>
			</table>

			<table><tr><th>level2only.js
				<script>findInexisting(Level2only.list)</script>
			</table>

			<table><tr><th>level2Warnings.js
				<script>findInexisting(Level2Warnings)</script>
			</table>

			<table><tr><th>level3variables.js
				<script>findInexisting(Level3.list)</script>
			</table>
		</div>
	</div>

	<!--to do-->
	<div id=tasks class=inline style="max-width:35%;border:1px solid #ccc;padding:0.5em;margin:2px">
		<style> #tasks ul {padding-left:1em}</style>
		<h3>Tasks TO DO / Issues / Bugs / Requests</h3>
		<script src="todo.js"></script>
		<ul>
			<li><b>BACK-END</b><ul><script>TODO.list(TODO.Back)</script></ul>
			<li><b>FRONT-END</b><ul><script>TODO.list(TODO.Front)</script></ul>
		</ul>
	</div>
</div>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
