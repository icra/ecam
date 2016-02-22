
<?php /*questions.php: information about questions*/?>
<!doctype html><html><head>
	<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1>About additional questions</h1>

<table>
	<tr><th>Question<th>Related variables that are hidden if answer is no<th>Related questions hidden if answer is no
	<script>
		for(var question in Questions)
		{
			if(typeof(Questions[question])=="function")continue;
			//question
			document.write("<tr><td>"+question+"?")
			//related variables
			document.write("<td>")
			for(var i in Questions[question])
			{
				var code = Questions[question][i];
				var link;
				if(Info[code]==undefined)
					link = "<span title='not found' style=color:red>"+code+"</span>, "
				else
					link = "<a title='"+Info[code].description+"' href=variable.php?id="+code+">"+code+"</a>, "
					
				document.write(link)
			}
			var q="";

			if(question=="Are you producing biogas")q="Are you valorizing biogas?";

			document.write("<td>"+q);
		}
	</script>
</table>

<!--FOOTER--><?php include'footer.php'?>
