<!--LINEAR DIAGRAM: file inside edit.php, level3.php and stages.php-->

<div id=linearDiagram>
	<div>
		<img class=l1 stage=water    src=img/water.png    onclick=window.location="edit.php?level=Water"                       title="WATER SUPPLY (L1)"> 
		<img class=l2 stage=waterAbs src=img/waterAbs.png onclick=window.location="edit.php?level=Water&sublevel=Abstraction"  title="Abstraction (L2)" >
		<img class=l2 stage=waterTre src=img/waterTre.png onclick=window.location="edit.php?level=Water&sublevel=Treatment"    title="Treatment (L2)">
		<img class=l2 stage=waterDis src=img/waterDis.png onclick=window.location="edit.php?level=Water&sublevel=Distribution" title="Distribution (L2)">
		<img class=l1 stage=waste    src=img/waste.png    onclick=window.location="edit.php?level=Waste"                       title="WASTEWATER (L1)"> 
		<img class=l2 stage=wasteCol src=img/wasteCol.png onclick=window.location="edit.php?level=Waste&sublevel=Collection"   title="Collection (L2)">
		<img class=l2 stage=wasteTre src=img/wasteTre.png onclick=window.location="edit.php?level=Waste&sublevel=Treatment"    title="Treatment (L2)">
		<img class=l2 stage=wasteDis src=img/wasteDis.png onclick=window.location="edit.php?level=Waste&sublevel=Discharge"    title="Discharge (L2)">
	</div>

	<div>
		<img class="energy l2" stage=waterGen src=img/waterGen.png onclick=window.location="edit.php?level=Water&sublevel=General" 	   title="Energy (L2)">
		<img class="energy l2" stage=wasteGen src=img/wasteGen.png onclick=window.location="edit.php?level=Waste&sublevel=General"      title="Energy (L2)">
	</div>

	<hr id=linearDiagramLine>
	<hr id=ws>
	<hr id=ww>
</div>

<style>
	/* linear diagram images */
	#linearDiagram img {cursor:pointer;margin:0 0.8em 0 0.8em;vertical-align:middle;padding:0} /*icons inside buttons to navigate to Level2*/
	#linearDiagram img.l1 {width:50px;} 
	#linearDiagram img.l2 {width:30px;}
	#linearDiagram img.energy {margin:0 8.5em 0 9em;}
	#linearDiagram img{border-radius:50%;border:2px solid transparent}
	#linearDiagram img.selected{border:2px solid}
	#linearDiagram img:hover {border:2px solid black}

	#linearDiagramLine {position:relative; transform:translateY(-60px);z-index:-1;width:450px;}
	#ws{position:relative; transform:translate(-13.5em,-3em) rotate(20deg);z-index:-1;width:8em;}
	#ww{position:relative; transform:translate(6.5em,-3em) rotate(20deg);z-index:-1;width:8em;}
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
	?>

	//go over images to deactivate inactives
	(function()
	{
		var collection = document.querySelectorAll("#linearDiagram img[stage]")
		for(var i=0;i<collection.length;i++)
		{
			var stage = collection[i].getAttribute('stage');
			var isActive = Global.Configuration['Active Stages'][stage]
			if(!isActive)
			{
				collection[i].src="img/"+stage+"-off.png";
				collection[i].onclick="";
				collection[i].style.cursor="default"
				collection[i].title+=" (INACTIVE)"
			}
		}
	})();
</script>
