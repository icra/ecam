<!--main menu for navigation at the top-->

<!--css-->
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

	<!--tier A-->
	<div
		style=cursor:pointer
		onclick=window.location="birds.php">
		<div><a href=birds.php style="color:inherit"><?php write('#tier_A')?></a></div>
		<img class=l1 stage=birds src=img/birds.png caption="<?php write('#tier_A')?>">
	</div>

	<!--tier B ecam v3-->
  <div id=linear_tierB class="detailed_img">
    <div>
      <span style="color:inherit"
        v-html="translate('tier_B')"
      ></span>
    </div>
    <img v-for="l2 in Structure.filter(s=>s.sublevel)"
      class=l2
      :stage="l2.alias"
      :caption="translate(l2.sublevel)"
      :src="`img/${l2.alias}${Global.Configuration.ActiveStages[l2.alias]?'':'-off'}.png`"
      @click="go_to_edit(l2)"
    >
  </div>

  <script>
    let linear_tierB=new Vue({
      el:'#linear_tierB',
      data:{
        Global,
        Structure,
      },
      methods:{
        translate,
        go_to_edit(l2){
          if(Global.Configuration.ActiveStages[l2.alias]){
            window.location=`edit.php?level=${l2.level}&sublevel=${l2.sublevel}`;
          }
        }
      },
    });
  </script>

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
  //highlight current stage
	<?php
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
