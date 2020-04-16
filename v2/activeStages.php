<table id=aass>
  <style>
    #aass .stage:hover {background:lightgreen}
  </style>
  <tr><th colspan=10><?php write('#stages')?>
</table>

<script>
  /*
    file included in "summary.php"
    creates a table view indicating active stages
  */

  let aass={};//namespace "active stages"

  aass.stageName=function(alias) {
    let stage=Structure.find(s=>s.alias==alias);
    if(!stage) return false;
    if(stage.sublevel){
      return translate(stage.sublevel);
    }else{
      return translate(stage.level);
    }
  }

  aass.printCell=function(stage,colspan,parentTR) {
    let color      = Global.Configuration.ActiveStages[stage] ? "black" : "#ccc";
    let background = Global.Configuration.ActiveStages[stage] ? "" : "#eee";
    let link_color = Structure.find(s=>s.alias==stage.substring(0,5)).color;

    parentTR.insertCell(-1).outerHTML=""+
      "<td class=stage onmouseover=aass.hlStage('"+stage+"',1) onmouseout=aass.hlStage('"+stage+"',0) colspan="+colspan+
      " style='text-align:center;background:"+background+";color:"+color+"'>"+
      "<a href='#"+stage+"' style=color:"+link_color+">"+this.stageName(stage)+"</a>";
  }

  aass.printRows=function(){
    let t=document.querySelector('table#aass');

    //level1
    let newRow=t.insertRow(-1);
    Structure.filter(s=>!s.sublevel).forEach(s=>{
      aass.printCell(s.alias, Structure.filter(st=>st.level==s.level).length-1, newRow);
    })

    //level2
    newRow=t.insertRow(-1);
    Structure.filter(s=>s.sublevel).forEach(s=>{
      aass.printCell(s.alias,1,newRow);
    })
  }

  aass.hlStage=function(stage,hl) {
    let newColor = hl ? "lightgreen":"";
    let elements = document.querySelectorAll('tr[family='+stage+']')
    for(let i=0;i<elements.length;elements[i++].style.backgroundColor=newColor){}
  }
</script>

<script>
  aass.printRows();
</script>
