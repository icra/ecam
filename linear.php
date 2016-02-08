<!--LINEAR DIAGRAM: file inside edit.php-->

<div id=linearDiagram style=margin:0;padding:0>
	<img class=l1 stage=water    src=img/water.png    onclick=window.location="edit.php?level=Water"                       title="L1 WATER SUPPLY"> 
	<img class=l2 stage=waterGen src=img/waterGen.png onclick=window.location="edit.php?level=Water&sublevel=General" 	   title="L2 Water Energy">
	<img class=l2 stage=waterAbs src=img/waterAbs.png onclick=window.location="edit.php?level=Water&sublevel=Abstraction"  title="L2 Water Abstraction" >
	<img class=l2 stage=waterTre src=img/waterTre.png onclick=window.location="edit.php?level=Water&sublevel=Treatment"    title="L2 Water Treatment">
	<img class=l2 stage=waterDis src=img/waterDis.png onclick=window.location="edit.php?level=Water&sublevel=Distribution" title="L2 Water Distribution">
	<img class=l1 stage=waste    src=img/waste.png    onclick=window.location="edit.php?level=Waste"                       title="L1 WASTEWATER"> 
	<img class=l2 stage=wasteGen src=img/wasteGen.png onclick=window.location="edit.php?level=Waste&sublevel=General"      title="L2 Wastewater Energy">
	<img class=l2 stage=wasteCol src=img/wasteCol.png onclick=window.location="edit.php?level=Waste&sublevel=Collection"   title="L2 Wastewater Collection">
	<img class=l2 stage=wasteTre src=img/wasteTre.png onclick=window.location="edit.php?level=Waste&sublevel=Treatment"    title="L2 Wastewater Treatment">
	<img class=l2 stage=wasteDis src=img/wasteDis.png onclick=window.location="edit.php?level=Waste&sublevel=Discharge"    title="L2 Wastewater Discharge">

	<!--line behind images-->
	<style> #linearDiagramLine {position:relative; transform:translateY(-40px);z-index:-1;width:590px;} </style>
	<hr id=linearDiagramLine>
</div>

<style>
	/* linear diagram images */
	#linearDiagram img {cursor:pointer;margin:0 0.8em 0 0.8em;vertical-align:middle;padding:0} /*icons inside buttons to navigate to Level2*/
	#linearDiagram img.l1 {width:50px;} 
	#linearDiagram img.l2 {width:30px;}
	#linearDiagram img{border-radius:50%;border:2px solid transparent}
	#linearDiagram img.selected{border:2px solid}
	#linearDiagram img:hover {border:2px solid #eee}
</style>

<script>
	<?php
		if($_SERVER['PHP_SELF']!="/ecam/stages.php")
		{ ?>
			//highlight current stage
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
		<?php }
	?>

	//go over <img stage=i> to deactivate the ones inactive
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

