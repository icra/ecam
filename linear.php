<!--main menu for navigation at the top-->
<style>
	#linearDiagram {
		background:#f5f5f5;
		background:linear-gradient(#f5f5f5,#ddd);
		border-bottom:1px solid #e5e5e5;
		padding:0.4em 0 0.2em 0;
		display:flex;
		flex-wrap:wrap;
		justify-content:center;
		box-shadow:0 1px 2px rgba(0,0,0,.5);
	}
	#linearDiagram > div {
		margin:0 4px;
		font-size:12px;
		vertical-align:middle;
		padding:0.2em;
		border-radius:0.5em;
		color:rgba(0,0,0,0.55);
	}
	#linearDiagram > div:hover {
		background:#e6e6e6;
		color:black;
	}
	#linearDiagram img[class=l1]:hover,
	#linearDiagram img[class=l2]:hover {
		border:3px solid #9fc231;
	}
	#linearDiagram img {position:relative;z-index:2;vertical-align:middle;padding:0;} /*icons inside buttons to navigate to Level2*/
	#linearDiagram img.l1 {width:42px;} 
	#linearDiagram img.l2 {width:42px;}
	#linearDiagram img{border-radius:90%;border:3px solid transparent;}
	#linearDiagram img.selected{border:3px solid #9fc231;}
	#linearDiagram img.inactive {pointer-events:none;}
	#linearDiagram img:not(.inactive) {cursor:pointer;}
	#linearDiagram a:hover {text-decoration:none;}
</style>

<div id=linearDiagram>
	<!--general info-->
	<div 
		style=cursor:pointer
		onclick=window.location="getStarted.php">
		<div><a href=getStarted.php style="color:inherit"><?php write('#getStarted_general_info')?></a></div>
		<img class=l1 stage=gets src=img/getStarted.png caption="<?php write('#getStarted_general_info')?>">
	</div>

	<!--configuration-->
	<div 
		style=cursor:pointer
		onclick=window.location="configuration.php">
		<div><a href=configuration.php style="color:inherit"><?php write('#configuration')?></a></div>
		<img class=l1 stage=conf src=img/dashboard.png caption="<?php write('#configuration')?>">
	</div>

	<!--population-->
	<div 
		style=cursor:pointer
		onclick=window.location="inhabitants.php">
		<div><a href=inhabitants.php style="color:inherit"><?php write('#population')?></a></div>
		<img class=l1 stage=inha src=img/inhabitants.png caption="<?php write('#population')?>">
	</div>

	<!--Global-->
	<div
		style=cursor:pointer
		onclick=window.location="birds.php">
		<div><a href=birds.php style="color:inherit"><?php write('#tier_A')?></a></div>
		<img class=l1 stage=birds src=img/birds.png caption="<?php write('#tier_A')?>">
	</div>

  <!--L1
  <div class="l1_img">
    <div><span style="color:inherit">Level 1 stages</span></div>
    <script>
      var div=document.querySelector("#linearDiagram div.l1_img");
      Structure.filter(s=>!s.sublevel).forEach(s=>{
        var img=document.createElement('img');
        div.appendChild(img);
        img.classList.add('l2');
        img.setAttribute('stage',s.alias);
        img.setAttribute('caption',translate(s.level));
        img.src=(function(){
          var isActive=Global.Configuration.ActiveStages[s.alias];
          if(isActive){
            return "img/"+s.alias+".png";
          }else{
            img.classList.add('inactive');
            return "img/"+s.alias+"-off.png";
          }
        })();
        img.addEventListener('click',function(){
          window.location='edit.php?level='+s.level;
        });
      });
    </script>
  </div>
  -->

	<!--DETAILED-->
	<div class="detailed_img">
		<div><span style="color:inherit"><?php write('#tier_B')?></span></div>
    <script>
      var div_detailed_img=document.querySelector("#linearDiagram div.detailed_img");
      Structure.filter(s=>s.sublevel).forEach(s=>{
        var img=document.createElement('img');
        div_detailed_img.appendChild(img);
        img.classList.add('l2');
        img.setAttribute('stage',s.alias);
        img.setAttribute('caption',translate(s.sublevel));
        img.src=(function(){
          var isActive=Global.Configuration.ActiveStages[s.alias];
          if(isActive){
            return "img/"+s.alias+".png";
          }else{
            img.classList.add('inactive');
            return "img/"+s.alias+"-off.png";
          }
        })();
        img.addEventListener('click',function(){
          window.location='edit.php?level='+s.level+'&sublevel='+s.sublevel;
        });
      });
    </script>
	</div>

	<!--Summaries-->
	<div>
		<div><span style="color:inherit"><?php write('#summaries')?></span></div>
		<img class=l1 stage=sources src=img/sources.png onclick=window.location="sources.php"        caption="<?php write('#ghg_summary')?>">
		<img class=l1 stage=energy  src=img/energy.png  onclick=window.location="energy_summary.php" caption="<?php write('#nrg_summary')?>"> 
	</div>

  <!--Opportunities-->
	<div>
		<div>
			<a href=opps.php style="color:inherit"><?php write('#opportunities')?></a>
		</div>
		<img class=l1 stage=opps src=img/opps.png caption="<?php write('#opportunities')?>" onclick=window.location="opps.php">
	</div>
</div>

<script>
	<?php
		//highlight current stage
		//only if currently we are in edit.php or level3.php
		if(strpos($_SERVER['PHP_SELF'],"edit.php") || strpos($_SERVER['PHP_SELF'],"level3.php"))
		{ ?>
			(function() {
				//we need to find level and sublevel to create a stage name i.e. "waterAbs"
				var level    = '<?php echo $level?>';
				var sublevel = '<?php echo $sublevel?>';
				var stage=false;
				switch(level) {
					case "Water":
						switch(sublevel) {
							case "Abstraction":stage="waterAbs";break;
							case "Treatment":stage="waterTre";break;
							case "Distribution":stage="waterDis";break;
						}
						break;

					case "Waste":
						switch(sublevel) {
							case "Collection":stage="wasteCol";break;
							case "Treatment":stage="wasteTre";break;
							case "Discharge":stage="wasteDis";break;
						}
						break;

          case "Faecl":
            switch(sublevel) {
              case "Containment":stage="faeclCon";break;
              case "Treatment":stage="faeclTre";break;
              case "Reuse":stage="faeclReu";break;
            }
            break;
				}
				if(stage) { document.querySelector('img[stage='+stage+']').classList.add('selected') }
			})();
			<?php 
		}
		//hl birds if we are in birds eye view
		if(strpos($_SERVER['PHP_SELF'],"birds.php"))
		{ ?>document.querySelector('img[stage=birds]').classList.add('selected');<?php }
		//hl configuration if we are in configuration
		else if(strpos($_SERVER['PHP_SELF'],"configuration.php"))
		{ ?>document.querySelector('img[stage=conf]').classList.add('selected');<?php }
		//hl sources if we are in sources.php
		else if(strpos($_SERVER['PHP_SELF'],"sources.php"))
		{ ?>document.querySelector('img[stage=sources]').classList.add('selected');<?php }
		//hl energy_summary if we are in energy_summary.php
		else if(strpos($_SERVER['PHP_SELF'],"energy_summary.php"))
		{ ?>document.querySelector('img[stage=energy]').classList.add('selected');<?php }
		//hl inhabitants
		else if(strpos($_SERVER['PHP_SELF'],"inhabitants.php"))
		{ ?>document.querySelector('img[stage=inha]').classList.add('selected');<?php }
		//hl Opportunities
		else if(strpos($_SERVER['PHP_SELF'],"opps.php"))
		{ ?>document.querySelector('img[stage=opps]').classList.add('selected');<?php }
	?>
</script>
