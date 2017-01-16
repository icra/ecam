<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		i.advanced{color:#999}
	</style>
	<script>
		function init() 
		{
			var t=document.querySelector('#questions');
			for(var question in Questions)
			{
				if(typeof(Questions[question])=="function")continue;

				var newRow=t.insertRow(-1);
				newRow.insertCell(-1).innerHTML="#"+question;
				newRow.insertCell(-1).innerHTML=translate(question)+"?";
				newRow.insertCell(-1).innerHTML=(function() {
					var links=[];
					for(var i in Questions[question].variables) {
						var code = Questions[question].variables[i];
						var isL3 = Level3.list.indexOf(code)>-1 ? "<i class=advanced>(advanced)</i>" : "";
						var link;
						if(Info[code]==undefined)
						{
							links.push("<span title='not found' style=color:red>"+code+"</span>");
						}
						else
						{
							links.push("<a title='"+translate(code+'_descr')+"' href=variable.php?id="+code+">"+code+" "+isL3+"</a><br>");
						}
					}
					return links.join('');
				})();

				newRow.insertCell(-1).innerHTML=(function() {
					var links=[];
					for(var i in Questions[question].otherQuestions)
					{
						var code = Questions[question].otherQuestions[i];
						links.push("<a title='"+translate(code)+"'>"+code+"</a>");
					}
					return links.join()
				})();
			}
		}
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--TITLE--><h1><?php write('#questions_about')?></h1>

<div id=main>
	<!--questions and variables hidden-->
	<table id=questions style=margin-bottom:3em>
		<tr>
			<th>Code
			<th><?php write('#questions_question')?>
			<th><?php write('#questions_variables_hidden')?>
			<th>Questions hidden if NO
	</table>
</div>
