<script>
	/*  part of "summary.php"
		creates a table indicating active stages
	*/

	var aass={ }; //namespace "active stages"

	aass.stageName=function(stage)
	{
		var r;
		switch(stage)
		{
			case "water":	 r="<?php write('#Water')?>";break;
			case "waste":	 r="<?php write('#Waste')?>";break;
			case "waterAbs": r="<?php write('#Abstraction')?>";break;
			case "waterTre": r="<?php write('#Treatment')?>";break;
			case "waterDis": r="<?php write('#Distribution')?>";break;
			case "wasteCol": r="<?php write('#Collection')?>";break;
			case "wasteTre": r="<?php write('#Treatment')?>";break;
			case "wasteDis": r="<?php write('#Discharge')?>";break;
			default: r=stage;break;
		}
		return r;
	}

	aass.printCell=function(stage,colspan)
	{
		var color = Global.Configuration.ActiveStages[stage] ? "black" : "#ccc";
		var background = Global.Configuration.ActiveStages[stage] ? "" : "#eee";
		var link_color = stage.search(/^waste/)==0 ? "#d71d24" : "";
		document.write(""+
			"<td class=stage onmouseover=aass.hlStage('"+stage+"',1) onmouseout=aass.hlStage('"+stage+"',0) colspan="+colspan+
				" style='text-align:center;background:"+background+";color:"+color+"'>"+
				"<a href='#"+stage+"' style=color:"+link_color+">"+this.stageName(stage)+"</a>");
	}

	aass.hlStage=function(stage,hl)
	{
		var newColor = hl ? "lightgreen":"";
		var elements = document.querySelectorAll('tr[family='+stage+']')
		for(var i=0;i<elements.length;elements[i++].style.backgroundColor=newColor){}
	}
</script>

<table>
	<style>.stage:hover {background:lightgreen}</style>
	<tr><th colspan=8><?php write('#stages')?><tr>
		<tr><script>
		['water','waste'].forEach(function(stage)
		{
			aass.printCell(stage,3);
		});
		</script><tr><script>
		['waterAbs','waterTre','waterDis'].forEach(function(stage)
		{
			aass.printCell(stage,1);
		});
		['wasteCol','wasteTre','wasteDis'].forEach(function(stage)
		{
			aass.printCell(stage,1);
		});
	</script>
</table>
