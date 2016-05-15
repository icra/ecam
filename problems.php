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
		<tr><th>Code<th>Stage
		<script>
			['Water','Waste'].forEach(function(level)
			{
				var unused=getUnused(Global[level])
				unused.forEach(function(field)
				{
					var color=field.search('ww')==-1 ? "" : "#bf5050";
					try{
						document.write("<tr><td>");
						document.write("<a title='"+Info[field].description+"' style=color:"+color+" href=variable.php?id="+field+">"+field+"</a>");
						document.write("<td>"+locateVariable(field).toString());
					}
					catch(e)
					{
						document.write("<tr><td colspan=3>"+field+" need to be removed. Reset chaché")
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

	<table id=problem3>
		<tr><td style=font-weight:bold>Problem 3: INEXISTING VARIABLES IN BENCHMARKING
		<tr><th>Code
		<script>
			(function()
			{
				var inex=[];
				for(var field in RefValues)
				{
					if(field=="isInside")continue; //function to locate
					if(locateVariable(field)==false) inex.push(field);
				}
				return inex;
			})().forEach(function(field)
			{
				document.write("<tr><td>"+field);
			});
		</script>
	</table>
	<script>
		(function()
		{
			var t=document.querySelector('#problem3');
			if(t.rows.length==2)
			{
				var newCell=t.insertRow(-1).insertCell(-1);
				newCell.innerHTML="<i>All variables exist</i>"
				newCell.style.background='lightgreen'
			}
		})();
	</script>
</div>

<!--FOOTER--><?php include'footer.php'?>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
