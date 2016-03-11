
<!--LINEAR DIAGRAM: file inside edit.php, level3.php and stages.php-->
<div id=linearDiagram>
	<div>
		<span style="color:#666">Quick assessment</span>
			<img class=l1 stage=birds src=img/birds.png onclick=window.location="birds.php"            title="Quick assessment">

		<!--vertbar--><span style="line-height:3em;border-left:1px solid #666;margin:0 1em 0 1em"></span>
		<span style="color:#666"> GHG assessment </span>
			<img class=l1 stage=water src=img/water.png onclick=window.location="edit.php?level=Water" title="Water supply"> 
			<img class=l1 stage=waste src=img/waste.png onclick=window.location="edit.php?level=Waste" title="Wastewater"> 

		<!--vertbar--><span style="line-height:3em;border-left:1px solid #666;margin:0 1em 0 1em"></span>
		<span style="color:#666"> Energy performance </span>
			<img class=l2 stage=waterAbs src=img/waterAbs.png onclick=window.location="edit.php?level=Water&sublevel=Abstraction"  title="Abstraction (Energy performance)" >
			<img class=l2 stage=waterTre src=img/waterTre.png onclick=window.location="edit.php?level=Water&sublevel=Treatment"    title="Treatment (Energy performance)">
			<img class=l2 stage=waterDis src=img/waterDis.png onclick=window.location="edit.php?level=Water&sublevel=Distribution" title="Distribution (Energy performance)">
			<img class=l2 stage=wasteCol src=img/wasteCol.png onclick=window.location="edit.php?level=Waste&sublevel=Collection"   title="Collection (Energy performance)">
			<img class=l2 stage=wasteTre src=img/wasteTre.png onclick=window.location="edit.php?level=Waste&sublevel=Treatment"    title="Treatment (Energy performance)">
			<img class=l2 stage=wasteDis src=img/wasteDis.png onclick=window.location="edit.php?level=Waste&sublevel=Discharge"    title="Discharge (Energy performance)">

			<img class=l2 stage=waterGen src=img/waterGen.png onclick=window.location="edit.php?level=Water&sublevel=General"      title="Water supply (Energy performance)"> 
			<img class=l2 stage=wasteGen src=img/wasteGen.png onclick=window.location="edit.php?level=Waste&sublevel=General"      title="Wastewater (Energy performance)"> 
		<hr id=line>
	</div>
</div>

<style>
	div#linearDiagram {background:#f6f6f6;margin:0 0 5px 0;border-bottom:1px solid #ccc;padding:0.4em 0 0.4em 0}
	div#linearDiagram img {position:relative;z-index:2;cursor:pointer;margin:0 0.2em 0 0.2em;vertical-align:middle;padding:0} /*icons inside buttons to navigate to Level2*/
	div#linearDiagram img.l1 {width:43px;} 
	div#linearDiagram img.l2 {width:33px;}
	div#linearDiagram img{border-radius:90%;border:4px solid transparent}
	div#linearDiagram img.selected{border:4px solid lightgreen}
	div#linearDiagram img:not(.inactive):hover {border:4px solid #d7bfaf}
	div#linearDiagram #line {background-color:#aaa;position:relative; transform:translateY(-26px) translateX(238px);z-index:1;width:250px;}
</style>

<script>
	<?php
		// highlight current stage
		// only if currently we are in edit.php or level3.php
		if(strpos($_SERVER['PHP_SELF'],"edit.php") || strpos($_SERVER['PHP_SELF'],"level3.php") )
		{ 
			?>
			(function()
			{
				
				//we need to find level and sublevel to create a stage name i.e. "waterAbs"
				var level    = '<?php echo $level?>';
				var sublevel = '<?php echo $sublevel?>';
				var stage;
				switch(level)
				{
					case "Water":
						switch(sublevel)
						{
							case "General":stage="waterGen";break;
							case "Abstraction":stage="waterAbs";break;
							case "Treatment":stage="waterTre";break;
							case "Distribution":stage="waterDis";break;
							default:stage="water";break;
						}
						break;
					case "Waste":
						switch(sublevel)
						{
							case "General":stage="wasteGen";break;
							case "Collection":stage="wasteCol";break;
							case "Treatment":stage="wasteTre";break;
							case "Discharge":stage="wasteDis";break;
							default:stage="waste";break;
						}
						break;
					default: 
						stage=false;
						break;
				}
				if(stage)
				{ 
					document.querySelector('img[stage='+stage+']').classList.add('selected')
				}
			})();
			<?php 
		}
		//hl birds if we are in birds eye view
		if(strpos($_SERVER['PHP_SELF'],"birds.php"))
		{
			?>
			document.querySelector('img[stage=birds]').classList.add('selected');
			<?php
		}
	?>

	//go over images to deactivate inactives
	(function()
	{
		var collection=document.querySelectorAll("#linearDiagram img[stage]");
		for(var i=0;i<collection.length;i++)
		{
			var stage = collection[i].getAttribute('stage');
			if(stage=="birds")continue;
			var isActive = Global.Configuration['Active Stages'][stage];
			if(!isActive)
			{
				collection[i].src="img/"+stage+"-off.png";
				collection[i].classList.add('inactive');
				collection[i].onclick="";
				collection[i].style.cursor="default";
				collection[i].title+=" (inactive)";
			}
		}
	})();
</script>
