<script>
  /*  
    file included in "summary.php"
    creates a table view indicating active stages
  */

  var aass={};//namespace "active stages"

  aass.stageName=function(alias) {
    var stage=Structure.find(s=>s.alias==alias);
    if(stage.sublevel){
      return translate(stage.sublevel);
    }else{
      return translate(stage.level);
    }
  }

  aass.printCell=function(stage,colspan,parentTR) {
    var color      = Global.Configuration.ActiveStages[stage] ? "black" : "#ccc";
    var background = Global.Configuration.ActiveStages[stage] ? "" : "#eee";
    var link_color = Structure.find(s=>s.alias==stage.substring(0,5)).color;

    parentTR.insertCell(-1).outerHTML=""+
      "<td class=stage onmouseover=aass.hlStage('"+stage+"',1) onmouseout=aass.hlStage('"+stage+"',0) colspan="+colspan+
      " style='text-align:center;background:"+background+";color:"+color+"'>"+
      "<a href='#"+stage+"' style=color:"+link_color+">"+this.stageName(stage)+"</a>";
  }

  aass.printRows=function(){
    var t=document.querySelector('table#aass');

    //level1
    var newRow=t.insertRow(-1);
    Structure.filter(s=>!s.sublevel).forEach(s=>{
      aass.printCell(s.alias, Structure.filter(st=>st.level==s.level).length-1, newRow);
    })

    //level2
    var newRow=t.insertRow(-1);
    Structure.filter(s=>s.sublevel).forEach(s=>{
      aass.printCell(s.alias,1,newRow);
    })
  }

  aass.hlStage=function(stage,hl) {
    var newColor = hl ? "lightgreen":"";
    var elements = document.querySelectorAll('tr[family='+stage+']')
    for(var i=0;i<elements.length;elements[i++].style.backgroundColor=newColor){}
  }
</script>

<table id=aass>
  <style>.stage:hover {background:lightgreen}</style>
  <tr><th colspan=10><?php write('#stages')?>
</table>

<script>
  aass.printRows();
</script>
