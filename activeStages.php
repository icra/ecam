<script>
	/*  
		file included in "summary.php"
		creates a table view indicating active stages
	*/

	var aass={ }; //namespace "active stages"

	aass.stageName=function(stage) {
		var r;
		switch(stage){
			case "water":	   r="<?php write('#Water')?>";break;
			case "waste":	   r="<?php write('#Waste')?>";break;
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

	aass.printCell=function(stage,colspan,parentTR) {
		var color = Global.Configuration.ActiveStages[stage] ? "black" : "#ccc";
		var background = Global.Configuration.ActiveStages[stage] ? "" : "#eee";
		var link_color = stage.search(/^waste/)==0 ? "#d71d24" : "";

    parentTR.insertCell(-1).outerHTML=""+
			"<td class=stage onmouseover=aass.hlStage('"+stage+"',1) onmouseout=aass.hlStage('"+stage+"',0) colspan="+colspan+
			" style='text-align:center;background:"+background+";color:"+color+"'>"+
			"<a href='#"+stage+"' style=color:"+link_color+">"+this.stageName(stage)+"</a>";
	}

  aass.printRows=function(){
    var t=document.querySelector('table#aass');
    var newRow=t.insertRow(-1);
    ['water','waste'].forEach(function(stage){
      aass.printCell(stage,3,newRow);
    });
    var newRow=t.insertRow(-1);
    ['waterAbs','waterTre','waterDis'].forEach(function(stage) {
      aass.printCell(stage,1,newRow);
    });
    ['wasteCol','wasteTre','wasteDis'].forEach(function(stage) {
      aass.printCell(stage,1,newRow);
    });
  }

	aass.hlStage=function(stage,hl) {
		var newColor = hl ? "lightgreen":"";
		var elements = document.querySelectorAll('tr[family='+stage+']')
		for(var i=0;i<elements.length;elements[i++].style.backgroundColor=newColor){}
	}
</script>

<table id=aass>
	<style>.stage:hover {background:lightgreen}</style>
	<tr><th colspan=8><?php write('#stages')?>
</table>
<script>
  aass.printRows();
</script>
