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
	if($level=="General"){header("Location: configuration.php");}
?>
<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		body{background:#f5ecce}
		<?php
			//color in red wastewater stages links
			if($level=="Waste") { 
				?>
				h1 a:not([id]) {color:#d71d24 !important}
				table#inputs th:not(.tableHeader) {background:#d71d24}
				table#substages th {background:#d71d24}
				table#substages td.variableCode {background:#d71d24}
				table#substages td.variableCode.output {background:#c9ab98}
				#outputs a,#outputs a:visited{color:#d71d24}
				#nrgOutputs a,#nrgOutputs a:visited{color:#d71d24}
				<?php 
			}
		?>

		/*TAGS*/
		.advanced {
			color:rgba(0,0,0,0.85);
			font-size:10px;
			float:right;
			background:#fafafa;
			margin-left:0.4em;
			border-radius:0.5em;
			box-shadow: 0 1px 2px rgba(0,0,0,.1);
			padding:0.3em;
		}
		.advanced.SM { /*sludge management*/
			float:left;
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
		.variableCode.output {background:#c9ab98}

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
		span.not_used_input:before { content:"not used"; }
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
							//special cases for not including untreated wastewater to ghg/year/serv.pop
								//special case 1: wwc_KPI_GHG_unt / year / serv. pop. is not applicable
								if( 
									field=="wwc_KPI_GHG_unt"
									&& 
									(category=="servic" || category=="volume") 
								){
									return "<span style=color:#ccc>NA</span>"
								}

								//special case 2: wwc_KPI_GHG should not include untreated wastewater
								if( 
									field=="wwc_KPI_GHG"
									&& 
									(category=="servic" || category=="volume") 
								){
									var norm=Normalization.normalize(category,field,level,sublevel);
									var subt=Normalization.normalize(category,'wwc_KPI_GHG_unt',level,sublevel);
									var resu=norm-subt;

									//the fields per inhab and per serv.pop are also per year
									if(category=="reside" || category=="servic")
									{
										resu/=Global.General.Years();
										newCell.title+="/Years"
									}
									newCell.title=newCell.title.replace('wwc_KPI_GHG_unt','0')
									return format(resu);
								}
							//special cases end

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

		//Redisplay NRG and SL outputs (level2)
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
					var nrg="<span class='advanced nrg' caption='Energy performance'>NRG</span>";
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

		//function for "View Graphs" buttons
		function toggleDivs(event,btn,id1,id2)
		{
			event.stopPropagation();
			var div1=document.querySelector(id1);
			var div2=document.querySelector(id2);

			//change btn text
			btn.classList.toggle('active');
			if(btn.innerHTML=="VIEW GRAPH")
			{
				btn.innerHTML="VIEW TABLE";
			}
			else
			{
				btn.innerHTML="VIEW GRAPH";
			}

			if(div1.style.display=='none') 
			{
				div1.style.display='';
				div2.style.display='none';
			}
			else
			{
				div1.style.display='none';
				div2.style.display='';
			}
			init();
		}

		//functions for questions
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

		//update the value
		function setQuestion(question,newValue) {
			if(newValue)
			{
				Global.Configuration['Yes/No'][question]=1;
				Expanded[question]=1;//start by showing the new variables
			}
			else //if(confirm("WARNING! Inputs from this question will be reseted to zero. Continue?"))
				Global.Configuration['Yes/No'][question]=0;

			//reset variables if checked=false
			if(!newValue) {
				//reset variables to zero
				for(var i in Questions[question].variables) 
				{
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
				for(var i in Questions[question].otherQuestions) 
				{
					var code_q=Questions[question].otherQuestions[i];
					Global.Configuration["Yes/No"][code_q]=0;

					//reset a les variables de les otherQuestions
					for(var j in Questions[code_q].variables) 
					{
						var code_v=Questions[code_q].variables[j];
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
	<script>
		//generate cookies for div.card folding
		//called after divs are clicked
		function fold(card) {
			card.classList.toggle('folded');
			if(card.classList.contains('folded')) {
				setCookie("Folded_"+card.id,1);
			}
			else {
				removeCookie("Folded_"+card.id);
			}
		}
	</script>
</head><body onload=init()><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include'navbar.php'?>
<!--linear--><?php include'linear.php'?>
<!--caption--><?php include'caption.php'?>

<!--TITLE-->
<?php 
	//navigable title
	switch($level) {
		case "Water":
		case "Waste":  $titleLevel=$lang_json["#$level"];break;
		case "Energy": $titleLevel="Energy summary";break;
		default:	     $titleLevel=$level;break;
	}
	if($sublevel) {
		$titleSublevel="<span style='font-size:26px'>".$lang_json["#$sublevel"]."</span>";
	}
	/*separator*/ 
	$sep="<span style=color:black>&rsaquo;</span>";
	$title=$sublevel 
		? 
		"<a href='edit.php?level=$level'>$titleLevel</a> $sep <span style='color:black'>$titleSublevel</span>" 
		: 
		"<span style='color:black;font-size:26px'>$titleLevel</span>";
?>
<style>h1{text-align:left;line-height:2.1em;border-bottom:1px solid #ccc;background:white}</style>
<h1><a href=sources.php><script>document.write(Global.General.Name)</script></a> <?php echo "$sep $title"?>
	<!--See description (link to iwa web)-->
	<?php if($sublevel)
		{ 
			?>
			<span style=line-height:10px>
				<?php
					$iwaLink='http://www.iwa-network.org/water-climate-energy-solutions/public/catalogue/';
					if($level=="Water" && $sublevel=="Abstraction")      {$alias="waterAbs"; $iwaLink.='stage/water_abstraction';}
					elseif($level=="Water" && $sublevel=="Treatment")    {$alias="waterTre"; $iwaLink.='stage/water_treatment';}
					elseif($level=="Water" && $sublevel=="Distribution") {$alias="waterDis"; $iwaLink.='stage/water_distribution';}
					elseif($level=="Waste" && $sublevel=="Collection")   {$alias="wasteCol"; $iwaLink.='stage/wastewater_collection';}
					elseif($level=="Waste" && $sublevel=="Treatment")    {$alias="wasteTre"; $iwaLink.='stage/wastewater_treatment';}
					elseif($level=="Waste" && $sublevel=="Discharge")    {$alias="wasteDis"; $iwaLink.='stage/wastewater_discharge';}
				?>
				<a target=_blank href="<?php echo $iwaLink?>">
					<img style=width:27px;margin-left:10px title="More info" src='img/<?php echo "$alias.png"?>'>
				</a>
			</span>
			<?php 
		}
	?>

	<!--btns fold all div.cards-->
	<?php if($sublevel)
	{
		?>
		<div id=btn_all_container class=inline style="position:absolute;right:40%">
			<style>
				#btn_all_container a {
					border:1px solid #bbb;
					font-size:11px;
					font-family:monospace;
					padding:0.2em 0.5em;
					border-radius:0.3em;
					color:rgba(0,0,0,0.55);
					background:#f5f5f5;
					box-shadow: 0 1px 2px rgba(0,0,0,.1);
					text-decoration:none;
				}
				#btn_all_container a:hover {
					color:rgba(0,0,0,0.85);
				}
			</style>
			<a id=btn_all_expand href=# style="margin-right:0.1em;" 
				onclick="
					var divs=document.querySelectorAll('div.card');
					for(var i=0;i<divs.length;i++){divs[i].classList.remove('folded')}
				"
				>Expand all
			</a>
			<a id=btn_all_fold href=# style="" 
				onclick="
					var divs=document.querySelectorAll('div.card');
					for(var i=0;i<divs.length;i++){divs[i].classList.add('folded')}
				"
				>Fold all
			</a>
		</div>
		<?php
	}
	?>

	<!--Tips-->
	<span style="font-size:12px;color:#666;float:right">
		<div style="padding:0.5em;cursor:pointer" onclick="document.querySelector('#tip').innerHTML=Tips.random()">
			<b>Tip</b> &rarr; <i id=tip><script>document.write(Tips.random())</script></i> &emsp; &#9654;
		</div>
	</span>
</h1>
</center>

<!--main-->
<div id=main>
	<!--level2 container-->
	<?php $folded=isset($_COOKIE['Folded_level2_container'])?"folded":"";?>
	<div id=level2_container class="card <?php echo $folded?>">
		<!--level 2 menu-->
		<div class=menu onclick=fold(this.parentNode)>
			<button></button>
			<b>Inputs &amp; Outputs</b> &mdash; 
			Assessment period <b class=number><script>document.write(Global.General.Days())</script></b> days 
			<?php
				//population
				if($level!="Energy") {
					echo "&mdash; ";
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
				onclick="event.stopPropagation();this.parentNode.parentNode.classList.remove('folded');toggleDivs(event,this,'#graph_container','#outputs_container')"
			>VIEW GRAPH</button>
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
						OUTPUTS — GHG emissions (kg CO2)
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
		</div>
	</div>

	<!--level3-->
	<?php 
		if($sublevel){include'level3.php';}
	?>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>

<script>
	/** If no substages (will happen at the first time. Create one substage with L2 values*/
	(function() {
		if(substages.length==0) {
			substages.push(new level3.Substage()); //create a substage
		}
		//if there is already one substage...
		if(substages.length==1) {
			//make the first substage have L2 values
			level3.getInputs().forEach(function(field)
			{
				substages[0][field]=CurrentLevel[field];
			});
		}
	})();
</script>
