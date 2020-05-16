<?php /* 
  variable.php
  view info of a single variable
*/ ?>

<!--prettify benchmark code-->
<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>

<!--model ecam v2-->
<script>
function updateInfoTable() {
  //Values in substages
  if(typeof(currSubstage)=="object" && currSubstage.length > 0) {
    newRow=t.insertRow(-1);
    newCell=newRow.insertCell(-1);
    newCell.className='th';
    newCell.innerHTML="{{ translate('Substages') }}";
    newCell=newRow.insertCell(-1);

    //copy all functions inside substages
    Object.keys(currentStage).forEach(key=>{
      if(typeof currentStage[key] == 'function'){
        currSubstage.forEach(substage=>{
          substage[key]=currentStage[key];
        });
      }
    });

    //show all substage values in a table
    (function(){
      let t=document.createElement('table');
      newCell.appendChild(t);
      t.style.fontSize="10px";
      t.style.marginTop="5px";
      let s_newRow=t.insertRow(-1);
      let n=currSubstage.length;
      for(let i=0;i<n;i++){
        let s_newRow=t.insertRow(-1);
        let value = (function(){
          if(typeof(currentStage[id])=='function'){
            return currSubstage[i][id]()/Units.multiplier(id);
          }else{
            if(Info[id].magnitude=='Option'){
              return Tables.find(id,currSubstage[i][id]);
            }else{
              return currSubstage[i][id]/Units.multiplier(id);
            }
          }
        })();
        s_newRow.insertCell(-1).innerHTML="<a href=substage.php?level="+level+"&sublevel="+sublevel+"&index="+i+">Substage "+(i+1)+" ("+currSubstage[i].name+")</a>";
        s_newRow.insertCell(-1).innerHTML=typeof(value)=='number'?format(value):value;
      }
      s_newRow=t.insertRow(-1);
      if(Sumable_magnitudes.indexOf(Info[id].magnitude)+1){
        s_newRow.insertCell(-1).outerHTML="<td class=th>Substage total";
        if(typeof(currentStage[id])=='function')
          s_newRow.insertCell(-1).innerHTML=format(currSubstage.map(s=>s[id]()).reduce((pr,cu)=>pr+cu)/Units.multiplier(id));
        else
          s_newRow.insertCell(-1).innerHTML=format(currSubstage.map(s=>s[id]  ).reduce((pr,cu)=>pr+cu)/Units.multiplier(id));
      }
    })();
  }

  //If input:is used in benchmarking?
  if(typeof(currentStage[id])=='number') {
    newRow=t.insertRow(-1);
    newCell=newRow.insertCell(-1);
    newCell.className='th';
    newCell.innerHTML="Benchmarks where is used";
    newCell=newRow.insertCell(-1);
    newCell.innerHTML=(function() {
      //find if input is used in benchmark
      let benchmarks=Utils.usedInBenchmarks(id);
      if(benchmarks.length==0) {
        newRow.style.display='none';
        return "<span style=color:#999>None</span>";
      }

      let ret="<table id=bminv>";
      benchmarks.forEach(function(bm) {
        ret+="<tr><td><a caption='"+translate(bm+"_descr")+"' href=variable.php?id="+bm+">"+bm+"</a>";
      });
      ret+="</table>";
      return ret;
    })();
  }

  //Is "id" benchmarked?
  if(RefValues.hasOwnProperty(id)) {
    newRow=t.insertRow(-1);
    newCell=newRow.insertCell(-1);
    newCell.className='th';
    newCell.innerHTML="Is benchmarked?";
    //evaluate benchmarking and show formula
    newRow.insertCell(-1).innerHTML=""+
      "<div style='margin:1em 0'><b>Benchmarking status &rarr;</b> <span style=font-size:16px>\""+RefValues[id](currentStage)+"\"</span></div>"+
      "<div class='card folded' style=margin:0>"+
      "<div class=menu onclick=this.parentNode.classList.toggle('folded')>"+
      " <button></button> Benchmarking Formula"+
      "</div>"+
      "<pre class='prettyprint'>"+RefValues[id].toString().replace(/  /g,' ')+"</pre>"+
      "</div>"+
      "<div style=margin-top:1em><a href=benchmark.php>All variables benchmarked</a></div>"+
      "";
  }
}
</script>

<!--css ecam v2-->
<style>
  #info th,#info td{padding:1em}
  #info td.th{background:#00aff1;color:white;vertical-align:middle}
  #info td.input{color:#666;background-color:#eee;cursor:cell}
  #info td.input input {margin:0;padding:0;width:95%;}
  .variableCode { font-family:monospace; }
  <?php
    if(preg_match("/^ww/",$id)) {
      ?>
      #info td.th{background:#d71d24}
      #info a,#info a:visited,h1{color:#bf5050}
      <?php
    }
    else if(preg_match("/^fs/",$id)) {
      ?>
      #info td.th{background:green}
      #info a,#info a:visited,h1{color:green}
      <?php
    }
  ?>
  /** table "used to calculate" and "inputs involved" */
  table#bminv td, table#utc td, table#ininv td{padding:2px 5px 2px 7px;border:none}
  .unit{color:#aaa}
  #info .constant a {color:blue; !important}
  .fuel {color:#088A29}
  .fuel a {font-weight:bold;color:#088A29;}
  pre.prettyprint {margin:0.5em;margin-left:0;padding:1em}
  div.error {
    font-size:16px;
    padding:10px;
  }
</style>
