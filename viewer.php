<!doctype html><html><head>
<?php include'imports.php'?>
<script>
	function createTree(obj,name,destiny)
	{
		//initial conditions
		obj=obj||Global
		name=name||"Global"
		destiny=destiny||document.querySelector('ul#root')

		//empty root ul
		if(name=="Global") destiny.innerHTML=""

		//container <li>
		var li = document.createElement('li')
		destiny.appendChild(li)

		//header
		var label = document.createElement('label')
		li.appendChild(label)
		label.innerHTML=name
		label.classList.add('object')

		//new <ul>
		var ul = document.createElement('ul');
		li.appendChild(ul);

		//click action
		label.onclick=function(){this.classList.toggle('active');ul.classList.toggle('invisible')}

		for(var field in obj)
		{
			//services
			if(typeof(obj[field])=="object")
			{
				createTree(obj[field],field,ul)
			}
			//normal fields inside services
			else
			{
				//new li
				li = document.createElement('li')
				ul.appendChild(li)
				//new label
				label = document.createElement('label')
				li.appendChild(label)
				label.title=translate(field+"_descr")
				label.innerHTML="<b>"+field+"</b>: "
				if(typeof(obj[field])=="function")
				{
					li.innerHTML+=Formulas.prettify(obj[field].toString())
					li.classList.add('function')
				}
				else
					li.innerHTML+=obj[field]
			}
		}
	}

	function init() 
	{ 
		createTree()
		updateResult() 
	} 
</script>
<style>
	ul {list-style:circle}
	div.card {background:none}
	.function {color:blue}
	.object {color:white;font-size:16px;font-weight:bold;color:#bf5050}
	li {
		border:1px solid transparent;
		border-radius:0.3em;
		padding:0.1em;
		background:#bce3f8;
		font-family:monospace;
		transition:all 0.2s;
	}
	li:hover {
		border:1px solid #ccc;
		background:white;
		cursor:default;
	}
	#legend { padding:0.5em 4em; text-align:center; }
	#legend div {
		width:20px;
		height:20px;
		border-radius:0.3em;
	}
</style>
</head><body onload=init() style=background:#bce3f8><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--navbar--> <?php include'navbar.php'?>
<!--menu--> <?php include'linear.php'?>

<!--title-->
<h1>Data structure viewer - All data structures in ECAM</h1></center>

<!--legend-->
<div id=legend>
	<span style=color:#666>Legend</span> &rarr;
	<div class=inline style=background:#bf5050></div> Category
	<div class=inline style=background:black></div>   Input
	<div class=inline style=background:blue></div>    Equation
</div>

<!--main structure: Global-->
<div class=inline style=max-width:75%>
	<h2>Main data structure: Global</h2>
	<ul id=root></ul>
</div>

<!--other data structures-->
<div class=inline style=max-width:20%>
	<h2>Other data structures</h2>
	<ul><?php
		//see all files in the "dataModel" folder
		$files=scandir("dataModel");
		forEach($files as $file)
		{
			if(!is_dir("dataModel/$file")) 
				echo "<li><a href='dataModel/$file'>$file</a>";
		}
	?>
	</ul>
</div>
<!--JSON-->   <?php include'currentJSON.php'?>
