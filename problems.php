<?php /*about.php: information about the ecam tool*/?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		#problems table{display:inline-block;vertical-align:top;margin:0.5em}
		#problems tr:hover {background:lightcoral}
	</style>
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
	</script>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--><?php include'linear.php'?>
<!--TITLE--><h1>Automatic finding of potential sources of Problems (debug mode)</h1>

<div id=problems>
	<table>
		<tr><td colspan=3 style=font-weight:bold>Problem 1: NOT USED INPUTS in any formula
		<tr><th>Code<th>Name<th>Stage
		<script>
			['Water','Waste'].forEach(function(level)
			{
				var unused=getUnused(Global[level])
				unused.forEach(function(field)
				{
					var color=field.search('ww')==-1 ? "" : "#bf5050";
					try{
						document.write("<tr><td><a style=color:"+color+" href=variable.php?id="+field+">"+field+"</a><td>"+Info[field].description)
						document.write("<td>"+locateVariable(field).toString())
					}
					catch(e)
					{
						document.write("<tr><td colspan=3>"+field)
					}
				});
			});
			document.write("<tr><td colspan=3 style=text-align:center><i>End of table</i>");
		</script>
	</table>

	<table>
		<tr><td style=font-weight:bold>Problem 2: NOT USED DESCRIPTIONS
		<tr><th>Code
		<script>
			//find unused definitions in Info
			function getInfoUnused()
			{
				var uu=[];
				for(var field in Info)
				{
					if(locateVariable(field)==false)
						uu.push(field);
				}
				return uu;
			}

			var uu=getInfoUnused();
			if(uu.length==0)
			{
				document.write("<tr><td style=background:lightgreen><i>All descriptions used</i>")
			}
			else
				uu.forEach(function(field)
				{
					document.write("<tr><td>"+field)
				})
		</script>
	</table>

	<table>
		<tr><td style=font-weight:bold>Problem 3: INEXISTING CODES IN QUESTIONS
		<tr><th>Code
		<script>
			(function()
			{
				var inex = [];
				//go over questions
				for(var question in Questions)
				{
					for(var i in Questions[question])
					{
						var field = Questions[question][i]
						if(locateVariable(field)==false)
							inex.push(field)
					}
				}
				return inex;
			})().forEach(function(code)
			{
				document.write("<tr><td>"+code);
			})
		</script>
	</table>

	<table>
		<tr><td style=font-weight:bold>Problem 3: INEXISTING QUESTIONS IN CFG
		<tr><th>Code
		<script>
			(function()
			{
				var inex = []

				for(var question in Questions)
				{
					if(typeof(Questions[question])=='function')
						continue
					if(Global.Configuration["Yes/No"].hasOwnProperty(question))
						continue
					else
						inex.push(question)
				}
				return inex;
			})().forEach(function(question)
			{
				document.write("<tr><td>"+question)
			})
		</script>
	</table>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
