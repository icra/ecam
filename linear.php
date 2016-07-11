
<!--LINEAR DIAGRAM: file inside edit.php, level3.php and stages.php-->
<div id=linearDiagram>
	<!--configuration
	-->
	<div>
		<img class=l1 stage=conf src=img/dashboard.png onclick=window.location="configuration.php" title="<?php write('#configuration')?>">
		<a href=configuration.php style="color:#666"><?php write('#configuration')?></a>
	</div>

	<!--QA-->
	<div>
		<img class=l1 stage=birds src=img/birds.png onclick=window.location="birds.php" title="<?php write('#quick_assessment')?>">
		<a href=birds.php style="color:#666"><?php write('#quick_assessment')?></a>
	</div>

	<!--GHG-->
	<div>
		<img class=l1 stage=water src=img/water.png onclick=window.location="edit.php?level=Water" title="<?php write('#Water')?>"> 
		<img class=l1 stage=waste src=img/waste.png onclick=window.location="edit.php?level=Waste" title="<?php write('#Waste')?>"> 
		<span style="color:#666"><?php write('#ghg_assessment')?> </span>
	</div>

	<!--Energy-->
	<div>
		<img class=l2 stage=waterAbs src=img/waterAbs.png onclick=window.location="edit.php?level=Water&sublevel=Abstraction"  title="<?php write('#Abstraction')?>" >
		<img class=l2 stage=waterTre src=img/waterTre.png onclick=window.location="edit.php?level=Water&sublevel=Treatment"    title="<?php write('#Treatment')?>">
		<img class=l2 stage=waterDis src=img/waterDis.png onclick=window.location="edit.php?level=Water&sublevel=Distribution" title="<?php write('#Distribution')?>">
		<img class=l2 stage=wasteCol src=img/wasteCol.png onclick=window.location="edit.php?level=Waste&sublevel=Collection"   title="<?php write('#Collection')?>">
		<img class=l2 stage=wasteTre src=img/wasteTre.png onclick=window.location="edit.php?level=Waste&sublevel=Treatment"    title="<?php write('#Treatment')?>">
		<img class=l2 stage=wasteDis src=img/wasteDis.png onclick=window.location="edit.php?level=Waste&sublevel=Discharge"    title="<?php write('#Discharge')?>">
		<span style="color:#666"><?php write('#energy_performance')?> </span>
		<hr id=line>
	</div>

	<!--summary-->
	<div>
		<img class=l2 stage=energy src=img/energy.png onclick=window.location="edit.php?level=Energy" title="<?php write('#energy_summary')?>"> 
		<a href=edit.php?level=Energy style="color:#666"><?php write('#energy_summary')?></a>
	</div>

	<!--Opportunities-->
	<div>
		<img class=l1 stage=opps src=img/opps.png onclick=window.location="opps.php" title="Opportunities to reduce GHG emissions">
		<a href=opps.php style="color:#666">Opportunities</a>
	</div>
</div>

<style>
	#linearDiagram {background:#f6f6f6;border-bottom:1px solid #ccc;padding:0.4em 0 0.4em 0}
	#linearDiagram > div {
		height:50px;vertical-align:middle;transition:all 0.3s;display:inline-block;padding:0.2em;margin-right:-1px;border-radius:0.5em}
	#linearDiagram > div:hover {
		background:#e6e6e6;
		box-shadow: 0 1px 2px rgba(0,0,0,.1);
	}
	#linearDiagram img {position:relative;z-index:2;cursor:pointer;vertical-align:middle;padding:0} /*icons inside buttons to navigate to Level2*/
	#linearDiagram img.l1 {width:43px;} 
	#linearDiagram img.l2 {width:43px;}
	#linearDiagram img{border-radius:90%;border:4px solid transparent}
	#linearDiagram img.selected{border:4px solid lightgreen}
	#linearDiagram img:not(.inactive):hover {border:4px solid #d7bfaf}
	#linearDiagram #line {background-color:#aaa;position:relative; transform:translateY(-26px) translateX(-69px);z-index:1;width:305px;}
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
							case "Abstraction":stage="waterAbs";break;
							case "Treatment":stage="waterTre";break;
							case "Distribution":stage="waterDis";break;
							default:stage="water";break;
						}
						break;

					case "Waste":
						switch(sublevel)
						{
							case "Collection":stage="wasteCol";break;
							case "Treatment":stage="wasteTre";break;
							case "Discharge":stage="wasteDis";break;
							default:stage="waste";break;
						}
						break;

					case "Energy":
						stage="energy";break;

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
		//hl birds if we are in birds eye view
		if(strpos($_SERVER['PHP_SELF'],"configuration.php"))
		{
			?>
			document.querySelector('img[stage=conf]').classList.add('selected');
			<?php
		}
		//hl opps if we are in opps.php
		if(strpos($_SERVER['PHP_SELF'],"opps.php"))
		{
			?>
			document.querySelector('img[stage=opps]').classList.add('selected');
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
			if(stage=="birds" || stage=="energy" || stage=="conf" || stage=='opps')continue;
			var isActive = Global.Configuration.ActiveStages[stage];
			if(!isActive)
			{
				collection[i].src="img/"+stage+"-off.png";
				collection[i].classList.add('inactive');
				collection[i].onclick="";
				collection[i].style.cursor="default";
				collection[i].title+=" (<?php write('#inactive')?>)";
			}
		}
	})();
</script>
