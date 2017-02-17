<?php
	if(!isset($_GET['level'])){die("ERROR: stage not specified");}
	/**
	  * Inputs:
	  *  - $level: 	   mandatory {"Water","Waste","Energy"}
	  *  - $sublevel:  optional. If set, enables level 3 {"Abstraction","Treatment","Distribution",[...]}
	  */
	$level=$_GET['level'];
	$sublevel=isset($_GET['sublevel']) ? $_GET['sublevel'] : false;

	//if user tries to go "General" (i.e. from variable.php?id=Days)
	if($level=="General") { header("Location: configuration.php"); }
?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		/** buttons class "prevNext" for closing current section and opening next one*/
		var PrevNext={
			next:function(container,nextId) //close current section and open "nextId"
			{
				//fold container div.card of the btn
				container.classList.add('folded');
				//open nextId div.card TBD 
				//document.querySelector('#'+nextId).parentNode.classList.remove('folded');
			},
		};
	</script>
	<script>
		function toggleDivs(event,btn,id1,id2)
		{
			event.stopPropagation();
			var div1=document.querySelector(id1);
			var div2=document.querySelector(id2);
			btn.classList.toggle('active');
			if(div1.style.display=='none') 
			{
				div1.style.display='<?php if($level=="Energy")echo "initial"?>';
				div2.style.display='none';
			}
			else
			{
				div1.style.display='none';
				div2.style.display='<?php if($level=="Energy")echo "initial"?>';
			}
			init();
		}
	</script>
	<style>
		div#main button.button.prevNext {
			display:block;
			vertical-align:bottom;
			margin:0.5em auto;
			background:#acb;
			border-radius:0;
		}
		div#main button.button.prevNext:after {
			content:'Ok';
		}
		body{background:#F5ECCE}

		#adv_questions td {padding:1em 1.618em;text-align:left}

		<?php
			if($level=="Waste")
			{?>
				table#inputs th:not(.tableHeader) {background:#d71d24}
				table#substages th {background:#d71d24}
				table#substages td.variableCode {background:#d71d24}
				#outputs a,#outputs a:visited{color:#d71d24}
				#nrgOutputs a,#nrgOutputs a:visited{color:#d71d24}
			<?php }
		?>

		.advanced {
			color:black;
			font-size:10px;
			float:right;
			background:#fafafa;
			margin-left:0.4em;
			border-radius:0.5em;
			box-shadow: 0 1px 2px rgba(0,0,0,.1);
			padding:0.3em;
		}
		.advanced.ghg {background:#bca;}
		.advanced.nrg {background:yellow;}
		.advanced.sl  {background:white;}

		div.card .number {
			border-radius:0.3em;
			background:#fff;
			padding:0.1em 0.5em;
		}

		.variableCode a {color:white}
		.variableCode {
			font-family:monospace;
			background:#00adef;
			text-align:left;
			font-size:11px;
			color:white;
		}

		#substageOutputs td.variableCode {background:inherit;}
		#substageOutputs td.variableCode a {color:initial;}

		td.input {
			width:70px;
			padding:0 0.2em;
			text-align:right;
			color:#666;
			cursor:cell;
			line-height:1em;
		}
		td.input input {width:95%;border:none;text-align:right;margin:0;padding:0 0.2em;height:24px}
		tr:not([hl=yes]) td.input {background-color:#eee;}
		tr:not([hl=yes]) td.CV {background-color:white}

		td.input.CV {text-align:right;cursor:default}

		table#substages { margin:0.2em 0 0.2em 0.2em; }
		table#substages tr:first-child td {border-top:none;border-left:none}

		table#outputs th:not(.tableHeader) {background:#c9ab98}
		table#outputs th:nth-child(n+2) {text-align:right}
		table#outputs td:nth-child(n+2) {text-align:right}

		table#nrgOutputs th:not(.tableHeader) {background:#c9ab98}
		table#nrgOutputs th:nth-child(2) {text-align:right}
		table#nrgOutputs td:nth-child(2) {text-align:right}
		table#nrgOutputs table#inputs table#outputs {
			
		}

		th.tableHeader
		{
			background:white;
			color:#666;
			font-size:15px;
			padding:0.7em 0 0.2em 0;
			font-weight:normal;
			border:none;
			text-align:left;
		}
		div.substageMenu{
			padding:0.1em;
			border:2px solid #ccc;
			background:#00aff1;
			position:absolute;
			box-shadow: 5px 5px 5px #888;
			z-index:1000;
		}
		input.substageMenu{
			padding:0.5em;
			outline:none;
			font-size:20px;
		}

		table#inputs    th.variableCode.isCV {background:#999;}
		table#substages td.variableCode.isCV {background:#999;}

		/*useful for development*/
		span.not_used_input {
			float:right;
			background:red;
			border-radius:0.2em;
			padding:0.1em 0.5em;
			box-shadow: 1px 1px 1px #888;
		}
		span.not_used_input:before {
			content:"not used";
		}
	</style>
	<script>
		<?php
			//establish the stage pointers we are going to be focused
			if($sublevel)
			{
				echo "
					var CurrentLevel = Global['$level']['$sublevel'];
					var substages = Substages['$level']['$sublevel'];
				";
			}
			else
			{
				echo "var CurrentLevel = Global['$level'];";
				echo "var substages = false;";
			}
		?>
		/** Redisplay table id=outputs (level2)*/
		function updateOutputs()
		{
			var t=document.getElementById('outputs');
			while(t.rows.length>2){t.deleteRow(-1)}
			for(var field in CurrentLevel)
			{
				if(typeof(CurrentLevel[field])!="function") continue;
				if(field.search(/^c_/)>=0) continue;
				if(field.search("_KPI_GHG")==-1) continue;

				/*check if field is level3 specific*/
				if(Level3.list.indexOf(field)+1) continue;

				//apply filters
				if(Questions.isHidden(field)) continue;

				//new row
				var newCell,newRow=t.insertRow(-1);
				newRow.setAttribute('field',field);

				var formula=CurrentLevel[field].toString();
				var prettyFormula=Formulas.prettify(formula);
				newRow.setAttribute('title',prettyFormula);
				newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
				newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');

				//compute the ABSOLUTE value, not normalized
				var value=CurrentLevel[field]()/Units.multiplier(field);

				/*description and code*/ 
				newCell=newRow.insertCell(-1);
				newCell.setAttribute('title',translate(field+"_expla"));
				newCell.innerHTML=(function()
				{
					var description=translate(field+"_descr");
					var code="<a style=font-size:10px href=variable.php?id="+field+">"+field+"</a>";
					return description+" ("+code+")";
				})();

				/*value*/ 
				newCell=newRow.insertCell(-1);
				newCell.innerHTML=(function()
				{
					//"has estimated data" warning
					var ed=DQ.hasEstimatedData(field) ? "<span class=estimated caption='<?php write('#variable_this_equation_contains_estimated_data')?>'>&#9888;</span>" : "";
					// level 2 warnings
					var l2w = Level2Warnings.hasOwnProperty(field) ? "<span style=color:#999>("+Level2Warnings[field]+")</span>" : "";
					return format(value)+" "+ed+" "+l2w;
				})();

				/*value per things*/
				newCell=newRow.insertCell(-1)
					//the first cell will be the value divided by Years
				newCell.setAttribute('title',"("+prettyFormula+")/Years");
				newCell.innerHTML=(function()
				{
					return format(value/Global.General.Years());
				})();

				/*Normalization*/
				(function()
				{
					var level    = '<?php echo $level?>';
					var sublevel = '<?php if($sublevel) echo $sublevel; else echo 'false' ?>';
					if(level=="Energy"){return "NA"}
					//value per resident population
					//value per serviced population
					//value per water volume
					['reside','servic','volume'].forEach(function(category)
					{
						var newCell=newRow.insertCell(-1);

						//determine the field to be highlighted
						var hlfield = (sublevel=='false' || category=='reside' || category=='servic') ? Normalization[level][category] : Normalization[level][sublevel][category];
						newCell.setAttribute('onmouseover',"Formulas.hlField('"+hlfield+"',1)")
						newCell.setAttribute('onmouseout',"Formulas.hlField('"+hlfield+"',0)")

						//the formula shoud change adding "/hlfield"
						newCell.setAttribute('title',"("+newCell.parentNode.title+")/"+hlfield);

						newCell.innerHTML=(function()
						{
							var norm=Normalization.normalize(category,field,level,sublevel);
							//the fields per inhab and per serv.pop are also per year
							if(category=="reside" || category=="servic")
							{
								norm/=Global.General.Years();
								newCell.title+="/Years"
							}
							return format(norm);
						})();
					});
				})();
			}

			//if the table is empty, add a warning
			if(t.rows.length<3)
			{
				var newCell=t.insertRow(-1).insertCell(-1)
				newCell.colSpan=6; 
				newCell.innerHTML="<span style=color:#999>~All GHG outputs inactive</span>";
			}

			//bottom line with the color of W/WW
			var newRow=t.insertRow(-1);
			var newTh=document.createElement('th');
			newTh.setAttribute('colspan',7)
			newTh.style.borderBottom='none';
			newTh.style.borderTop='none';
			newRow.appendChild(newTh);
		}

		// Redisplay NRG and SL outputs
		function updateNrgOutputs()
		{
			var t=document.getElementById('nrgOutputs');
			while(t.rows.length>2){t.deleteRow(-1);}
			for(var field in CurrentLevel)
			{
				if(typeof(CurrentLevel[field])!="function")continue;
				if(field.search(/^c_/)!=-1)continue;
				if(field.search("_KPI_GHG")>=0)continue;
				if(field.search('_nrg_')<0)continue;

				/*check if field is level3 specific*/
				if(Level3.list.indexOf(field)>-1){continue;}

				/*check if should be hidden according to questions*/
				if(Questions.isHidden(field))
				{
					continue
					//disableRow(newRow);
				}

				var newCell,newRow=t.insertRow(-1);
				newRow.setAttribute('field',field);

				var formula=CurrentLevel[field].toString();
				var prettyFormula=Formulas.prettify(formula);
				newRow.setAttribute('title',prettyFormula);
				newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
				newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');

				//compute the value
				var value = CurrentLevel[field]()/Units.multiplier(field)

				/*circle indicator 
				newCell=newRow.insertCell(-1);
				newCell.style.textAlign='center';
				newCell.innerHTML=(function()
				{
					var hasIndicator=RefValues.hasOwnProperty(field);
					if(hasIndicator)
					{
						var indicator=RefValues[field](CurrentLevel);
						newCell.title=indicator;
						var color;
						switch(indicator)
						{
							case "Good":           color="#af0";break;
							case "Acceptable":     color="orange";break;
							case "Unsatisfactory": color="red";break;
							case "Out of range":   color="brown";break;
							default:               color="#ccc";break;
						}
						return "<span style='font-size:20px;color:"+color+"'>&#128308;</span>";
					}
					else{
						newCell.title='<?php write('#edit_no_indicator_associated')?>';
						return "<span style=color:#ccc>NA</span>";
					}
				})();
				*/

				/*description*/ 
				newCell=newRow.insertCell(-1);
				newCell.setAttribute('title',(function()
				{
					return translate(field+"_expla");
				})());

				newCell.innerHTML=(function()
				{
					var description = translate(field+"_descr");
					var color = field.search(/^ww/)==0 ? "#d71d24" : "";
					var code = "<a style='font-size:10px;color:"+color+"' href=variable.php?id="+field+">"+field+"</a>";
					var nrg="<span class='advanced nrg'>NRG</span>";
					return description+"<br>("+code+")"+nrg;
				})();

				/*value*/ 
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{
					//has estimated data warning
					var ed = DQ.hasEstimatedData(field) ? "<span class=estimated caption='<?php write('#variable_this_equation_contains_estimated_data')?>'>&#9888;</span>" : "";
					// level 2 warnings
					var l2w = Level2Warnings.hasOwnProperty(field) ? "<span style=color:#999>("+Level2Warnings[field]+")</span>" : "";
					return format(value)+" "+ed+" "+l2w;
				})();

				/*unit*/
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{
					if(!Info[field])
						return "no unit";

					if(Info[field].magnitude=="Currency")
					{
						return Global.General.Currency;
					}
					else 
						return Info[field].unit;
				})();
			}
			for(var field in CurrentLevel)
			{
				if(typeof(CurrentLevel[field])!="function"){continue;}
				if(field.search(/^c_/)!=-1){continue;}
				if(field.search("_KPI_GHG")>=0)continue;
				if(field.search('_nrg_')>-1)continue;

				/*check if field is level3 specific*/
				if(Level3.list.indexOf(field)>-1){continue;}

				/*check if should be hidden according to questions*/
				if(Questions.isHidden(field))
				{
					continue
					//disableRow(newRow);
				}

				var newCell,newRow=t.insertRow(-1);
				newRow.setAttribute('field',field);

				var formula=CurrentLevel[field].toString();
				var prettyFormula=Formulas.prettify(formula);
				newRow.setAttribute('title',prettyFormula);
				newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
				newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');

				//compute now the value for creating the indicator
				var value = CurrentLevel[field]()/Units.multiplier(field)

				/*description*/ 
				newCell=newRow.insertCell(-1);
				newCell.setAttribute('title',(function()
				{
					return translate(field+"_expla");
				})());

				newCell.innerHTML=(function()
				{
					var description = translate(field+"_descr");
					var color = field.search(/^ww/)==0 ? "#d71d24" : "";
					var code = "<a style='font-size:10px;color:"+color+"' href=variable.php?id="+field+">"+field+"</a>";
					var sl="<span class='advanced sl'>SL</span>";
					return description+"<br>("+code+")"+sl;
				})();

				/*value*/ 
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{
					//has estimated data warning
					var ed = DQ.hasEstimatedData(field) ? "<span class=estimated caption='<?php write('#variable_this_equation_contains_estimated_data')?>'>&#9888;</span>" : "";
					// level 2 warnings
					var l2w = Level2Warnings.hasOwnProperty(field) ? "<span style=color:#999>("+Level2Warnings[field]+")</span>" : "";
					return format(value)+" "+ed+" "+l2w;
				})();

				/*unit*/
				newCell=newRow.insertCell(-1)
				newCell.innerHTML=(function()
				{
					if(!Info[field])
						return "no unit";

					if(Info[field].magnitude=="Currency")
					{
						return Global.General.Currency;
					}
					else 
						return Info[field].unit;
				})();
			}

			//if the table is empty, add a warning
			if(t.rows.length<3)
			{
				var newCell=t.insertRow(-1).insertCell(-1)
				newCell.colSpan=3
				newCell.innerHTML="<span style=color:#999>~All Energy outputs inactive</span>";
			}

			//bottom line with the color of W/WW
			var newRow=t.insertRow(-1);
			var newTh=document.createElement('th');
			newTh.setAttribute('colspan',6)
			newTh.style.borderBottom='none';
			newTh.style.borderTop='none';
			newRow.appendChild(newTh);
		}

		//depending on stage, draw different charts
		function drawCharts()
		{
			//draw the chart that is selected!!!
			//Graphs.graph4(false,'graph'); //GHG
			//Graphs.graph5(false,'graph'); //Energy

			//draw the active button graph
			var button;button=document.querySelector("div.buttonsGraph button.active");
			if(!button){button=document.querySelector("div.buttonsGraph button");}
			button.classList.remove('active');
			button.onclick();
		}

		/** Update all */
		function init()
		{
			if(typeof updateQuestionsTable !== 'undefined') {
				updateQuestionsTable('adv_questions',true);
			}
			if(typeof(level3)!="undefined") {
				level3.updateSubstagesTable();
				level3.updateOutputs();
			}
			if(typeof(level2)!="undefined"){ level2.updateInputs() }
			updateOutputs();
			updateNrgOutputs();
			Exceptions.apply();
			try{drawCharts()}
			catch(e){console.log(e)}
			Caption.listeners();
			updateResult();

			//fake a click in "View all" checkbox (cb)
			var cb=document.querySelector('#viewAll');
			if(cb){cb.checked=true}
		}
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>
<!--caption--><?php include'caption.php'?>

<!--TITLE-->
<?php 
	//Set a navigable title for page
	switch($level)
	{
		case "Water":
		case "Waste":  
			$titleLevel=$lang_json["#$level"];break;
		case "Energy": 
			$titleLevel="Energy summary";break;
		default:	   
			$titleLevel=$level;break;
	}
	if($sublevel)
	{
		switch($sublevel)
		{
			default: $titleSublevel="<span style='font-size:26px'>".$lang_json["#$sublevel"]."</span>";break;
		}
	}
	/*separator*/ 
	$sep="<span style=color:black>&rsaquo;</span>";
	$title=$sublevel 
		? 
		"<a href=edit.php?level=$level>$titleLevel</a> $sep <span style=color:black>$titleSublevel</span>" 
		: 
		"<span style=color:black;font-size:26px>$titleLevel</span>";
?>
<style> h1 {text-align:left;line-height:2.1em;border-bottom:1px solid #ccc;background:white} </style>
<h1><a href=sources.php><script>document.write(Global.General.Name)</script></a> <?php echo "$sep $title"?>
	<!--See description (link to iwa web)-->
	<?php if($sublevel)
		{ 
			?>
			<span style="font-size:12px;"><?php
					$iwaLink='http://www.iwa-network.org/water-climate-energy-solutions/public/catalogue/';
					if($level=="Water" && $sublevel=="Abstraction")      $iwaLink.='stage/water_abstraction';
					elseif($level=="Water" && $sublevel=="Treatment")    $iwaLink.='stage/water_treatment';
					elseif($level=="Water" && $sublevel=="Distribution") $iwaLink.='stage/water_distribution';
					elseif($level=="Waste" && $sublevel=="Collection")   $iwaLink.='stage/wastewater_collection';
					elseif($level=="Waste" && $sublevel=="Treatment")    $iwaLink.='stage/wastewater_treatment';
					elseif($level=="Waste" && $sublevel=="Discharge")    $iwaLink.='stage/wastewater_discharge';
				?>&emsp;<a target=_blank href="<?php echo $iwaLink?>">(Info)</a>
			</span>
			<?php 
		}
	?>

	<!--btn fold all div.cards-->
	<?php if($sublevel)
	{
		?>
		<div id=btn_all_container class=inline style="position:absolute;right:40%">
			<style>
				#btn_all_container a {
					border:1px solid #bbb;
					font-size:14px;
					font-family:Courier;
					padding:0.2em 0.5em;
					border-radius:0.3em;
					color:black;
					background:#eee;
					box-shadow: 0 1px 2px rgba(0,0,0,.1);
				}
			</style>
			<a id=btn_all_fold href=# style="margin-right:0.1em;" 
				onclick="
					var divs=document.querySelectorAll('div.card');
					for(var i=0;i<divs.length;i++){divs[i].classList.add('folded')}
					document.querySelector('#btn_all_expand').style.display=''
					document.querySelector('#btn_all_fold').style.display='none'
				"
				>[-] Fold all sections
			</a>
			<a id=btn_all_expand href=# style="display:none;" 
				onclick="
					var divs=document.querySelectorAll('div.card');
					for(var i=0;i<divs.length;i++){divs[i].classList.remove('folded')}
					document.querySelector('#btn_all_expand').style.display='none'
					document.querySelector('#btn_all_fold').style.display=''
				"
				>[+] Expand all sections
			</a>
		</div>
		<?php
	}
	?>

	<!--Tips-->
	<span style="font-size:12px;color:#666;float:right">
		<div style="padding:0.5em;cursor:pointer" onclick="document.querySelector('#tip').innerHTML=Tips.random()">
			<b>Tip</b> &rarr;
			<i id=tip><script>document.write(Tips.random())</script></i>
			&emsp; &#9654;
		</div>
	</span>
</h1>
</center>

<!--main-->
<div id=main>
	<!--questions-->
	<script>
		function updateQuestionsTable(id_table,adv) {
			adv=adv||false; //show advanced or normal
			var t=document.getElementById(id_table);
			if(!t)return;
			while(t.rows.length>0)t.deleteRow(-1);
			var questions=Questions.getQuestions(CurrentLevel);

			for(var q in questions)
			{
				var question = questions[q];
				if(Questions.isHiddenQuestion(question)){continue;}

				//check if question is "advanced"
				if(!adv){ if( Questions[question].advanced){continue;}}
				else{     if(!Questions[question].advanced){continue;}}

				//fetch current state
				var currentAnswer = Global.Configuration["Yes/No"][question];
				var checked = currentAnswer ? "checked":"";

				//new row
				var newRow = t.insertRow(-1);
				newRow.style.background = currentAnswer ? "lightgreen" : "";
				newRow.setAttribute('question',question);
				newRow.onmouseover=function(){hlQuestionFields(this.getAttribute('question'),1)}
				newRow.onmouseout=function(){hlQuestionFields(this.getAttribute('question'),0)}
				var newCell=newRow.insertCell(-1)
				newCell.innerHTML=translate(question)+"?";
				newCell.style.borderRight="none"
				newCell.style.fontWeight="bold"
				var newCell=newRow.insertCell(-1)
				newCell.style.borderLeft="none"
				newCell.innerHTML=(function()
				{
					var ret="<label>"+
							"<?php write('#no')?> "+
							"<input name='"+question+"' type=radio value=0 onclick=setQuestion('"+question+"',0) checked></label> "+
							"<label><?php write('#yes')?> "+
							"<input name='"+question+"' type=radio value=1 onclick=setQuestion('"+question+"',1) "+checked+"></label> ";
					return ret;
				})();
			}

			//hide whole table if no questions
			t.parentNode.parentNode.style.display="";
			if(t.rows.length==0){t.parentNode.parentNode.style.display="none";}
		}

		//highlight fields linked to the question
		function hlQuestionFields(question,hl) {
			var fields=Questions[question].variables; //array
			for(var i in fields)
			{
				Formulas.hlField(fields[i],hl);
			}
		}

		function setQuestion(question,newValue) {
			if(newValue)
				Global.Configuration['Yes/No'][question]=1;
			else //if(confirm("WARNING! Inputs from this question will be reseted to zero. Continue?"))
				Global.Configuration['Yes/No'][question]=0;

			//reset variables if checked=false
			if(!newValue) {
				//reset variables to zero
				for(var i in Questions[question].variables) {
					var code=Questions[question].variables[i];
					if(typeof(CurrentLevel[code])=="number") 
					{
						CurrentLevel[code]=0;
						//also substages
						for(var j in substages)
						{
							substages[j][code]=0;
						}
					}
				}
				//reset a les otherQuestions
				for(var i in Questions[question].otherQuestions) {
					var code_q=Questions[question].otherQuestions[i];
					Global.Configuration["Yes/No"][code_q]=0;
					//reset a les variables de les otherQuestions
					for(var j in Questions[code_q].variables) {
						var code_v=Questions[question].variables[j];
						if(typeof(CurrentLevel[code_v])=="number") 
						{
							CurrentLevel[code_v]=0;
							for(var k in substages)
							{
								substages[k][code_v]=0;
							}
						}
					}
				}
			}

			init();
		}
	</script>

	<!--level2 container-->
	<div class="card">
		<!--level 2 menu-->
		<div class=menu onclick=this.parentNode.classList.toggle('folded')>
			<button></button>
			<b>Inputs &amp; Outputs</b> &mdash; 
			Assessment period <b class=number><script>document.write(Global.General.Days())</script></b> days 
			<?php
					if($level!="Energy") 
					{
						echo "&mdash;";
						$resi_pop = $level=="Water" ? "ws_resi_pop" : "ww_resi_pop";
						$serv_pop = $level=="Water" ? "ws_serv_pop" : "ww_serv_pop";
						echo "Resident population <b class=number><script>document.write(Global.$level.$resi_pop)</script></b> &mdash; ";
						if($level=="Waste"){echo "Connected population <b class=number><script>document.write(Global.Waste.ww_conn_pop)</script></b> &mdash; ";}
						echo "Serviced population <b class=number><script>document.write(Global.$level.$serv_pop)</script></b>";
					}
			?>
			<!--button toggle outputs/graph display-->
			<button 
				class=btn_toggle 
				onclick="event.stopPropagation();this.parentNode.parentNode.classList.remove('folded');toggleDivs(event,this,'#graph_container','#outputs_container')">
				VIEW GRAPH
			</button>
		</div>

		<!--level2-->
		<div style=padding:0.5em>
			<!--inputs level2-->
			<div class=inline style="width:44%;margin-left:0.2em;<?php if($level=="Energy") echo "display:none;"?>">
				<?php include'level2.php'?> 
			</div>

			<!--outputs level2-->
			<div id=outputs_container class=inline style="width:54%;<?php if($level=="Energy") echo "margin:auto;display:initial;"?>">
				<?php if($level=="Energy") echo "<style>#outputs{display:none}</style>"; ?>

				<!--level2 GHG outputs-->
				<table id=outputs style="width:100%;background:#f6f6f6;">
					<tr><th colspan=7 class=tableHeader>
						OUTPUTS — GHG emissions (kg CO<sub>2</sub>)
					<tr>
						<th>Origin
						<th>kg CO<sub>2</sub><br>whole period
						<th>kg CO<sub>2</sub><br>per <?php write('#year')?>
						<th>kg CO<sub>2</sub><br>per <?php write('#year')?><br>per inhab
						<th>kg CO<sub>2</sub><br>per <?php write('#year')?><br>per serv.pop
						<th>kg CO<sub>2</sub><br>per m<sup>3</sup>
					<tr><td style=color:#ccc colspan=6>Loading...
				</table>

				<!--level2 outputs: NRG and SL-->
				<table id=nrgOutputs style="width:100%;background:#f6f6f6;">
					<tr><th colspan=4 class=tableHeader>OUTPUTS &mdash; Energy performance &amp; Service Level indicators
					<tr>
						<th><?php write('#edit_description')?>
						<th><?php write('#edit_current_value')?>
						<th><?php write('#edit_unit')?>
					<tr><td style=color:#ccc colspan=3>Loading...
				</table>
			</div>

			<!--GRAPHS-->
			<div id=graph_container class=inline style="width:54%;display:none;border:0px solid #ccc">
				<!--choose graph type buttons-->
				<?php include'buttonsGraphType.php'?>
				<!--actual graph-->
				<div id=graph><?php write('#loading')?></div>
				<script>
					google.charts.load('current',{'packages':['corechart','bar']});
					google.charts.setOnLoadCallback(drawCharts);
				</script>
				<style>
					#graph div.options{padding:1em}
					#graph button {margin:0.2em}
					#graph {text-align:center}
					#graph * {margin:auto}
				</style>
			</div>

			<button class="button save prevNext" onclick="PrevNext.next(this.parentNode.parentNode,'tbd')"></button>
		</div>
	</div>

	<!--level3-->
	<?php 
		if($sublevel)
		{ 
			?>
			<script>
				//namespace for old level3.php structure
				var level3={};
				/** INPUTS redisplay */
				level3.updateSubstagesTable=function()
				{
					/*table element*/
					var t=document.getElementById('substages');
					while(t.rows[0].cells.length>1)t.rows[0].deleteCell(-1);

					/*table headers */
						//go over substages: create a column for each
						for(var s in substages)
						{
							var newTH = document.createElement('th');
							newTH.style.cursor="pointer";
							newTH.style.width="90px";
							newTH.innerHTML=""+
								"Substage "+(parseInt(s)+1)+" "+
								"<div style=font-weight:bold>"+substages[s].name+"</div>";
							newTH.setAttribute('onclick','level3.showSubstageMenu('+s+',event)');
							newTH.setAttribute('caption',"<?php write('#level3_click_to_modify_the_name')?>");
							t.rows[0].appendChild(newTH);
						}
						//TOTAL header only if substages.length==1
						if(substages.length>1)
						{
							var newTH = document.createElement('th');
							t.rows[0].appendChild(newTH);
							newTH.innerHTML="&sum; Sum of stages";
						}

						//UNIT header
						var newTH = document.createElement('th');
						t.rows[0].appendChild(newTH);
						newTH.innerHTML="<?php write('#level3_unit')?>";
					/*end headers*/

					/*update table body*/
						while(t.rows.length>1)t.deleteRow(-1)

						//each row corresponds to a variable of the current stage
						var inputs=level3.getInputs();

						//find calculated variables
						var cvs=[];
						(function()
						{
							for(var f in CurrentLevel)
							{
								if(f.search(/^c_/)!=-1) {cvs.push(f);}
							}
							inputs=inputs.concat(cvs);
						})();

						//go over inputs array we've just created
						for(var input in inputs)
						{
							/*variable code*/
							var code=inputs[input];
							
							/*Skip if is level2 only*/
							if(Level2only.list.indexOf(code)+1) continue;

							if(Questions.isHidden(code)) continue;

							/*is a calculated variable*/
							var isCV=typeof(CurrentLevel[code])=="function" ? true : false;

							//copy the function inside substages
							if(isCV) 
							{
								for(var s in substages) 
									substages[s][code]=CurrentLevel[code]; 
							}

							//if is an option, continue (will show at the end of the table)
							if(Info[code]&&Info[code].magnitude=="Option") continue;

							/*new row*/
							var newRow=t.insertRow(-1);
							newRow.setAttribute('field',code);

							//mouse over listener for highlighting
							if(isCV)
							{
								var formula=CurrentLevel[code].toString();
								var prettyFormula=Formulas.prettify(formula);
								newRow.setAttribute('onmouseover','Formulas.hlInputs("'+code+'",CurrentLevel,1)');
								newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+code+'",CurrentLevel,0)');
							}
							else
							{
								newRow.setAttribute('onmouseover','Formulas.hlOutputs("'+code+'",CurrentLevel,1)');
								newRow.setAttribute('onmouseout', 'Formulas.hlOutputs("'+code+'",CurrentLevel,0)');
							}

							/*1st cell: show code*/
							var newCell=newRow.insertCell(-1);
							newCell.classList.add('variableCode');
							if(isCV) newCell.classList.add('isCV');
							newCell.innerHTML=(function()
							{
								var adv=Level3.list.indexOf(code)+1 ? "<span class=advanced caption='Advanced'>adv</span>" : "" ;
								return "<a href=variable.php?id="+code+">"+code+"</a> "+adv;
							})();

							/*2nd cell: variable name*/
							var newCell=newRow.insertCell(-1);
							newCell.style.textAlign="left";
							newCell.setAttribute('title', translate(code+'_expla'));
							newCell.innerHTML=(function(){
								var warning=(Formulas.outputsPerInput(code).length==0 && Utils.usedInBenchmarks(code).length==0) ? 
									" <span class=not_used_input caption='Input not used for any equation'></span>" : "";
								return translate(code+'_descr')+warning;
							})();

							//3rd cell and so on: go over substages
							var multiplier=Units.multiplier(code);
							for(var s in substages)
							{
								var newCell=newRow.insertCell(-1);
								newCell.setAttribute('substage',s);
								newCell.classList.add("input");

								if(isCV)
								{
									newCell.innerHTML=format(substages[s][code]()/multiplier);
									newCell.setAttribute('title',prettyFormula);
									newCell.classList.add("CV");
								}
								else
								{
									newCell.setAttribute('onclick','level3.transformField(this)');
									newCell.innerHTML=format(substages[s][code]/multiplier);
								}
							}

							//sum all inputs of this kind
							var sum=level3.sumAll(code);
							//some variables are averaged instead of summed up
							if(Averaged.isAveraged(code)) sum/=substages.length;

							//LEVEL 2 current value
							if(substages.length>1)
							{
								var newCell=newRow.insertCell(-1);
								newCell.style.textAlign="center";newCell.style.fontWeight="bold";
								newCell.innerHTML=(function()
								{
									if(isCV) 
									{
										return format(CurrentLevel[code]()/multiplier);
									}
									else
									{
										var isAvg = Averaged.isAveraged(code) ? " (average)": "";
										return format(sum/multiplier)+isAvg;
									}
								})();
								//UPDATE -> SUM OF SUBSTAGES to LEVEL 2
								//only update real inputs
								if(!isCV) CurrentLevel[code]=sum;
							}

							//Unit for current input
							newRow.insertCell(-1).innerHTML=(function()
							{
								//check if unit is entered in "Info"
								if(!Info[code]) return "undefined";
								//check if unit is currency
								if(Info[code].magnitude=="Currency") { return Global.General.Currency; }
								//if no magnitude, return unit string
								if(Units[Info[code].magnitude]===undefined) { return Info[code].unit }

								//look for current unit
								var currentUnit = Global.Configuration.Units[code] || Info[code].unit

								//create a <select> for unit changing
								var str="<select onchange=Units.selectUnit('"+code+"',this.value)>";
								for(unit in Units[Info[code].magnitude])
								{
									if(unit==currentUnit)
										str+="<option selected>"+unit+"</option>";
									else
										str+="<option>"+unit+"</option>";
								}
								str+="</select>"
								return str
							})();
						}

						//go over inputs "magnitude==option"
						for(var input in inputs)
						{
							/*variable code*/
							var code=inputs[input];
							
							//if not option, continue
							if(Info[code] && Info[code].magnitude!="Option") continue;

							/*Skip if is level2 only*/
							if(Level2only.list.indexOf(code)+1) continue;

							/*new row*/
							var newRow=t.insertRow(-1);
							newRow.setAttribute('field',code);
							if(Questions.isHidden(code)) disableRow(newRow);

							/*1st cell: show code*/
							var newCell=newRow.insertCell(-1);
							newCell.classList.add('variableCode');
							newCell.innerHTML=(function()
							{
								var adv="<span class=advanced caption='Advanced'>adv</span>";
								return "<a href=variable.php?id="+code+">"+code+"</a>"+adv;
							})();

							/*2nd cell: variable name*/
							var newCell=newRow.insertCell(-1);
							newCell.style.textAlign="left";
							newCell.setAttribute('title', translate(code+'_expla'));
							newCell.innerHTML=(function(){
								var warning=(Formulas.outputsPerInput(code).length==0 && Utils.usedInBenchmarks(code).length==0) ? 
									" <span class=not_used_input caption='Input not used for any equation'></span>" : "";
								return translate(code+'_descr')+warning;
							})();

							//3rd cell and so on: go over substages
							for(var s in substages)
							{
								var newCell=newRow.insertCell(-1);
								newCell.style.textAlign='left';
								newCell.classList.add("input");
								newCell.setAttribute('substage',s);
								(function()
								{
									var select=document.createElement('select');
									newCell.appendChild(select)
									if(substages.length==1)
										select.setAttribute('onchange','substages['+s+']["'+code+'"]=parseInt(this.value);CurrentLevel["'+code+'"]=parseInt(this.value);init()')
									else
										select.setAttribute('onchange','substages['+s+']["'+code+'"]=parseInt(this.value);init()')
									for(var op in Tables[code])
									{
										var option = document.createElement('option');
										var value = parseInt(Tables[code][op].value);
										select.appendChild(option);
										option.value=value;
										option.innerHTML="("+value+") "+op;
										if(substages[s][code]==value) 
										{
											option.selected=true;
										}
									}
								})();
							}
						}

						//last row: delete substage
						var newRow=t.insertRow(-1);
						var newCell=newRow.insertCell(-1);
						newCell.style.border="none";newCell.colSpan=2;
						for(var s in substages)
						{
							newCell=newRow.insertCell(-1);
							newCell.style.textAlign='center';
							var str=""+
								"<button class=button onclick=level3.deleteSubstage("+s+") caption='<?php write('#level3_delete_substage')?>' style='margin:0;'>&#9003;</button>"+
								"<br><br>"+
								"<a href='substage.php?level=<?php echo $level?>&sublevel=<?php echo $sublevel?>&index="+s+"'>Details</a>"+
								"";
							newCell.innerHTML=str
						}
					/*end update body*/

					/*update substage counter*/ 
					document.getElementById('counter').innerHTML=substages.length
				}
				level3.getInputs=function()
				{
					var inputs=[];
					for(var field in CurrentLevel)
					{
						if(typeof(CurrentLevel[field])!="number" ){continue;}
						inputs.push(field);
					}
					return inputs;
				}
				level3.sumAll=function(code)
				{
					var sum=0;
					for(var s in substages){sum+=parseFloat(substages[s][code])}
					return sum;
				}
				/** new Substage class for storing all variables that correspond to current stage */
				level3.Substage=function()
				{
					/*get a list of variables for this level*/ var inputs=level3.getInputs();
					/*substage default name*/ this.name="<?php write("#$sublevel")?> "+(parseInt(substages.length)+1);
					//init with zero values, e.g. Substage {tV1: 0, tV2: 0, tV3: 0, tV4: 0, tV5: 0, ...}
					for(var i in inputs){this[inputs[i]]=0;}
				}
				/** New substage button pushed */
				level3.newSubstage=function()
				{
					event.stopPropagation(); //this is to see the memory progress
					//check memory usage
					if(document.cookie.length>=8100)
					{
						alert("<?php write('#level3_error_memory_full')?> ("+document.cookie.length+" bytes used)");
						return
					}
					substages.push(new level3.Substage());
					init();
				}
				/** button delete substage pushed */
				level3.deleteSubstage=function(index)
				{
					if(substages.length==1)
					{
						alert("<?php write('#level3_error_cannot_delete_last_substage')?>");
						return;
					}
					substages.splice(index,1);

					//bug fix: caption onmouseout does not trigger, do it manually
					document.querySelector("#caption").style.display='none';

					init();
				}
				/** update substage name */
				level3.changeName=function(index,newValue)
				{
					substages[index].name=newValue;
					init();
				}
				/** make appear a menu for changing substage[index] name */
				level3.showSubstageMenu=function(index,ev)
				{
					//new div element
					var div = document.createElement('div')
					document.body.appendChild(div)
					div.className="substageMenu"
					//get mouse coordinates
					div.style.top=ev.pageY+"px"
					div.style.left=ev.pageX+"px"
					//add to screen
					div.innerHTML="<div style=color:white><?php write('#level3_new_name')?> "+(index+1)+":</div>"
					//new input element
					var input = document.createElement('input')
					div.appendChild(input)
					input.className="substageMenu"
					input.placeholder='New name'
					input.value=substages[index].name
					//onblur: remove it
					input.onblur=function(){document.body.removeChild(div)}
					//on enter pressed (13) hide it
					input.onkeypress=function(ev){if(ev.which==13)div.style.display='none'}
					//onchange: update name
					input.onchange=function(){level3.changeName(index,input.value)}
					input.select()
				}
				//transform a cell to make it editable
				level3.transformField=function(element)
				{
					element.removeAttribute('onclick')
					var field=element.parentNode.getAttribute('field')
					var substage=element.getAttribute('substage')
					element.innerHTML=""
					var input=document.createElement('input')
					element.appendChild(input);
					input.autocomplete='off'
					input.setAttribute('onkeypress',"if(event.which==13){this.onblur()}")
					input.setAttribute('onblur',"level3.updateSubstage("+substage+",'"+field+"',this.value)") //now works
					input.onkeydown=function(event)
					{
						function updateChart()
						{
							//problem: this only updates if we are plotting inputs. WHY?
							var newValue=parseFloat(input.value);
							if(isNaN(newValue))newValue=0;
							var multiplier=Units.multiplier(field);
							substages[substage][field]=multiplier*newValue;

							//SUM OF SUBSTAGES = LEVEL 2
							var sum=level3.sumAll(field);

							//some variables are averaged instead of summed up
							if(Averaged.isAveraged(field)) sum/=substages.length;

							//only update real inputs
							if(typeof(CurrentLevel[field])!="function") CurrentLevel[field]=sum;

							//try to draw charts
							drawCharts();
						}
						switch(event.which)
						{
							case 38: //up key
								if(!event.shiftKey){input.value++;updateChart();} 
								break;
							case 40: //down key
								if(!event.shiftKey){input.value--;updateChart();} 
								break;
							case  9: //TAB key
								setTimeout(function()
								{
									var el;//element to be clicked
									if(event.shiftKey) //shift+tab navigates back 
										el=document.querySelector('#substages tr[field='+field+'] td[substage="'+(parseInt(substage)-1)+'"]')
									else
										el=document.querySelector('#substages tr[field='+field+'] td[substage="'+(parseInt(substage)+1)+'"]')
									if(el){el.onclick();}
								},100);
								break;
						}
					}
					//value converted
					var multiplier = Units.multiplier(field);
					input.value=substages[substage][field]/multiplier;
					input.select();
				}
				//update a field of the substage[index]
				level3.updateSubstage=function(index,field,newValue)
				{
					newValue=parseFloat(newValue);
					if(isNaN(newValue))newValue=0;
					var multiplier=Units.multiplier(field);
					substages[index][field]=multiplier*newValue;

					//update level2 also
					var sum=level3.sumAll(field);
					//some variables are averaged instead of summed up
					if(Averaged.isAveraged(field)) sum/=substages.length;
					CurrentLevel[field]=sum;

					init();
				}
			</script>

			<!--advanced questions-->
			<div class="card">
				<?php cardMenu("<b>Advanced Assessment: Questions (<a href=questions.php>info</a>)</b>")?> 
				<div style=padding:0.5em;text-align:center>
					<table id=adv_questions class=inline></table>
					<style> #adv_questions td {text-align:left} </style>
					<button class="button save prevNext" onclick="PrevNext.next(this.parentNode.parentNode,'tbd')"></button>
				</div>
			</div>

			<!--substage inputs-->
			<div class="card" style="text-align:left">
				<?php 
					cardMenu(" <b>Advanced Assessment: Substages</b>
						&mdash; 
						Substages <b><span id=counter class=number>0</span></b>
						&mdash; 
						<a href=substages.php>Overview</a>
				")?>
				<div style=padding:0.5em>
					<table id=substages> 
						<tr><td colspan=2 style="min-width:260px;text-align:right">
							<!--view all-->
							<label style=float:left>
								<input id=viewAll type=checkbox onclick=level3.toggleViewSum() checked> 
								View all stages
								<script>
									level3.toggleViewSum=function()
									{
										var newDisplay=document.querySelector('#substages td.input').style.display=='none' ? '':'none';
										var n=substages.length;
										var tr=document.querySelector('#substages tr');//fist tr
										for(var i=0;i<n;i++) tr.cells[i+1].style.display=newDisplay;
										var tr=document.querySelector('#substages tr:last-child');//last tr
										for(var i=0;i<n;i++) tr.cells[i+1].style.display=newDisplay;
										var collection=document.querySelectorAll('#substages td.input');
										for(var i=0;i<collection.length;i++) collection[i].style.display=newDisplay;
									}
								</script>
							</label>

							<!--new substage button-->
							<button onclick=level3.newSubstage() class="button add" style="padding:auto;background:lightgreen;box-shadow: 0 1px 2px rgba(0,0,0,.1);">
								Add substage
							</button>

					</table>
					<button class="button save prevNext" onclick="PrevNext.next(this.parentNode.parentNode,'tbd')"></button>
				</div>
			</div>

			<!--outputs per substage-->
			<div class="card" style="text-align:left">
				<!--menu-->
				<div class=menu onclick=this.parentNode.classList.toggle('folded')>
					<button></button>
					<b>Advanced Assessment: Outputs per substage</b>
					<!--button toggle outputs/graph display-->
					<button 
						class=btn_toggle 
						onclick="event.stopPropagation();this.parentNode.parentNode.classList.remove('folded');toggleDivs(event,this,'#substageOutputs_container','#substageGraphs')">
						VIEW GRAPH
					</button>
				</div>

				<div style=padding:0.5em>

					<!--show ghgs checkbox-->
					<div style=margin-bottom:0.5em>
						<label onclick="event.stopPropagation();init()"><input type=checkbox id=showGHGss> Show GHG</label>
					</div>

					<!--Substage outputs-->
					<div id=substageOutputs_container>
						<table id=substageOutputs style="background:#f6f6f6"></table>
						<style>
							#substageOutputs th{background:#d7bfaf;text-align:left}
							#substageOutputs td:nth-child(n+3) {text-align:right}
						</style>
						<script>
							/** Redisplay outputs */
							level3.updateOutputs=function()
							{
								var t=document.getElementById('substageOutputs');
								while(t.rows.length>0) t.deleteRow(-1);

								//headers
									//new row
									var newRow=t.insertRow(-1);
									['<?php write('#level3_code')?>','<?php write('#level3_description')?>'].forEach(function(str)
									{
										var newTH=document.createElement('th'); newRow.appendChild(newTH);
										newTH.innerHTML=str;
									});
									for(var s in substages)
									{
										var newTH=document.createElement('th'); 
										newRow.appendChild(newTH);
										newTH.innerHTML="<?php write('#substage')?> "+(parseInt(s)+1)+" "+
										"<div><b>"+substages[s].name+"</div>"
									};
									['&sum; <?php write('#level3_TOTAL')?>','<?php write('#level3_unit')?>'].forEach(function(element)
									{
										var newTH=document.createElement('th'); newRow.appendChild(newTH);
										newTH.innerHTML=element;
									});
								//end headers

								//copy all functions to each substage
								for(var field in CurrentLevel)
								{
									//only functions
									if(typeof(CurrentLevel[field])!="function") continue;
									//IMPORTANT: for this to work all formulas that refer to internal variables should refer to them with "this" keyword
									for(var s in substages)
										substages[s][field]=CurrentLevel[field];
								}

								//go over CurrentLevel
								for(var field in CurrentLevel)
								{
									//only functions
									if(typeof(CurrentLevel[field])!="function") continue;

									//exclude service level indicators
									if(field.search('_SL_')>-1) continue;

									//exclude _KPI_GHG if checkbox is enabled
									var isGHG=(field.search('_KPI_GHG')+1) ? true : false;
									if(isGHG) 
										if(!document.querySelector('#showGHGss').checked)
											continue;

									//exclude the "level2only" variables
									if(Level2only.hasOwnProperty(field)) continue;

									/*check if should be hidden according to questions*/
									if(Questions.isHidden(field)) continue;

									//if is calculated variable, not show it
									if(field.search(/^c_/)>=0) continue;

									//new row
									var newRow=t.insertRow(-1);
									newRow.setAttribute('field',field);

									//set highlighting 
									newRow.setAttribute('onmouseover','Formulas.hlInputs("'+field+'",CurrentLevel,1)');
									newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+field+'",CurrentLevel,0)');

									//1st cell: show code identifier
									var newCell=newRow.insertCell(-1);
									newCell.classList.add('variableCode');
									newCell.innerHTML=(function()
									{
										var adv=Level3.list.indexOf(field)+1 ? "<span class='advanced'     caption='Advanced'>adv</span>":"";
										var ghg=isGHG                        ? "<span class='advanced ghg' caption='GHG'>GHG</span>":"";
										var nrg=field.search('_nrg_')+1      ? "<span class='advanced nrg' caption='Energy performance'>NRG</span>":""; 
										return "<a caption='"+translate(field+'_expla')+"' href=variable.php?id="+field+">"+field+"</a>"+ghg+adv+nrg;
									})();

									//2nd cell: description
									newRow.insertCell(-1).innerHTML=translate(field+'_descr');

									//get equation formula
									var formula=CurrentLevel[field].toString();
									var prettyFormula=Formulas.prettify(formula);

									//3rd cell and so on: values.
									for(var s in substages)
									{
										//new cell
										var newCell=newRow.insertCell(-1);
										//title for mouseover show formula
										//newCell.setAttribute('title',prettyFormula);
										//value
										newCell.innerHTML=(function()
										{
											//compute value and bechmark it
											var value=substages[s][field]()/Units.multiplier(field);

											//color circle benchmarking (TO DO: extract function from here)
											var indicator=(function()
											{
												if(!RefValues.hasOwnProperty(field)) return "";
												var text=RefValues[field](substages[s]);
												var color;
												switch(text)
												{
													case "Good":           color="#af0";break;
													case "Acceptable":     color="orange";break;
													case "Unsatisfactory": color="red";break;
													case "Out of range":   color="brown";break;
													default:               color="#ccc";break;
												}
												return "<span caption='Benchmarking: "+text+"' class=circle style='background:"+color+"'></span>";
											})();
											return "<span style='display:inline-block;width:75%' caption='"+prettyFormula+"'>"+format(value)+"</span> "+indicator;
										})();
									}

									//level 2 value
									var newCell=newRow.insertCell(-1);
									newCell.setAttribute('title',prettyFormula);
									newCell.style.fontWeight="bold";
									newCell.style.background="white";
									newCell.innerHTML=format(CurrentLevel[field]()/Units.multiplier(field));

									//unit
									newRow.insertCell(-1).innerHTML=(function()
									{
										return Info[field] ? Info[field].unit : "<span style=color:#ccc>no unit</span>";
									})();
								}

								//if no active equations show warning
								if(t.rows.length<2)
								{
									var newCell=t.insertRow(-1).insertCell(-1)
									newCell.colSpan=4+substages.length;
									newCell.innerHTML="<i style=color:#999>~No active outputs</i>";
								}

								//bottom line with the color of W/WW
								var newRow=t.insertRow(-1);
								var newTh=document.createElement('th');
								newRow.appendChild(newTh);
								newTh.setAttribute('colspan',4+substages.length)
								newTh.style.borderBottom='none';newTh.style.borderTop='none';
							}
						</script>
					</div>
					<!--Substage graphs-->
					<div id=substageGraphs style=padding:1em;display:none>
						<div class=buttonsGraph><!--
							--><button class="left"    onclick="buttonsGraph(this);Graphs.wsa_KPI_std_nrg_cons(false,'substageGraph')">Standardized energy consumption</button><!--
							--><button class="middle"  onclick="buttonsGraph(this);document.querySelector('#substageGraph').innerHTML='TBD'">Another graph</button><!--
							--><button class="right"   onclick="buttonsGraph(this);document.querySelector('#substageGraph').innerHTML='TBD'">Another graph</button><!--
							-->
						</div>
						<div id=substageGraph style=text-align:center>Click a graph to display</div>
					</div>
					<!--ok next btn-->
					<button class="button save prevNext" onclick="PrevNext.next(this.parentNode.parentNode,'tbd')"></button>
				</div>
			</div>
			<?php
		}
	?>
	
	<!--opportunities-->
	<?php 
		/*
		if(0 && $sublevel) //hidden now
		{
			?>
			<div class=card><?php cardMenu("<b>Opportunities</b> <span class=tbd>TBD</span>")?>
				<div style=padding:0.5em>
				Under development
				</div>
			</div>
			<?php 
		}
		*/
	?>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>

<script>
	/** If no substages (==first time entering: create one substage with L2 values*/
	(function()
	{
		if(substages.length==0)
		{
			substages.push(new level3.Substage()); //create a substage
		}
		//if there is already one substage...
		if(substages.length==1)
		{
			//make the first substage have L2 values
			level3.getInputs().forEach(function(field)
			{
				substages[0][field]=CurrentLevel[field];
			});
		}
	})();
</script>
