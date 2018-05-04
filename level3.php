<script>
  /* SUBSTAGES: level3 */
  var level3={};

  //show/hide question
  level3.toggleQuestionVisibility=function(cell,question) {
    var btn=cell.querySelector('span[expanded]');
    if(!btn)return;

    var currentState=Expanded[question];
    if(currentState===undefined)currentState=1;//expanded by default

    //toggle attribute 'expanded'
    if(currentState) {btn.setAttribute('expanded','0')}
    else             {btn.setAttribute('expanded','1')}

    //modify "Expanded" object
    if(currentState) {Expanded[question]=0}
    else             {Expanded[question]=1}

    //hide or show fields
    var newDisplay = currentState ? 'none':'';
    var trs=document.querySelectorAll('tr[field][question='+question+']');
    for(var i=0;i<trs.length;i++) {
      trs[i].style.display=newDisplay;
    }

    //"Expanded" is stored in cookies
    init()
  }

  /** INPUTS redisplay */
  level3.updateSubstagesTable=function() {
    console.time('updateSubstagesTable');

    /*table element*/
    var t=document.getElementById('substages');
    t.innerHTML="";

    /*table headers */
      //go over substages: create a column for each
      var newRow=t.insertRow(-1);
      newRow.insertCell(-1).outerHTML="<td rowspan=2 colspan=2>"+
      "<button onclick=level3.newSubstage(event) class='button add' style='float:right;padding:auto;background:lightgreen;box-shadow: 0 1px 2px rgba(0,0,0,.1);'>"+
      "<?php write('#Add substage')?>"+
      "</button>"+
      "";

      for(var s in substages) {
        var newTH = document.createElement('th');
        newTH.style.cursor="pointer";
        newTH.style.width="90px";
        newTH.innerHTML=""+
          "Substage "+(parseInt(s)+1)+" "+
          "<div style=font-weight:bold>"+substages[s].name+"</div>";
        newTH.setAttribute('onclick','level3.showSubstageMenu('+s+',event)');
        newTH.setAttribute('caption',"<?php write('#level3_click_to_modify_the_name')?>");
        newRow.appendChild(newTH);
      }

      //UNIT header
      var newTH = document.createElement('th');
      newRow.appendChild(newTH);
      newTH.innerHTML="<center><?php write('#level3_unit')?></center>";
      newTH.rowSpan=2;

      //SUM header
      var newTH = document.createElement('th');
      newRow.appendChild(newTH);
      newTH.innerHTML="<center>Substages total</center>";
      newTH.rowSpan=2;
      newTH.colSpan=2;
    /*end headers*/

    /*update table body*/
      //each row corresponds to a variable of the current stage
      var inputs=level3.getInputs();

      //first row: Details and Delete
      var newRow=t.insertRow(-1);
      for(var s in substages) {
        newCell=newRow.insertCell(-1);
        newCell.classList.add('outputValue');
        newCell.style.textAlign='center';
        newCell.innerHTML=(function(){
          var str=""+
          "<a href='substage.php?level=<?php echo $level?>&sublevel=<?php echo $sublevel?>&index="+s+"'>"+translate('Details')+"</a>"+
          " | "+
          "<a href=# onclick=\"level3.deleteSubstage("+s+");return false\" caption='<?php write('#level3_delete_substage')?>'>"+translate('Delete')+"</a>"+
          "";
          return str;
        })();
      }

      //draw unfiltered inputs only
      inputs
        .filter(code=>{return !Questions.isInside(code)})
        .forEach(code=>{
          level3.drawInput(t,code);
        });

      //draw unfiltered outputs only
      var showGHGss = document.querySelector('#showGHGss').checked;
      var showSLss = document.querySelector('#showSLss').checked;
      Object.keys(CurrentLevel)
        .filter(key=>typeof(CurrentLevel[key])=='function')
        .filter(key=>{return !Questions.isInside(key)})
        .forEach(key=>{
          level3.drawOutput(t,key,false,showGHGss,showSLss);
        });

      //go through questions
      (function(){
        Questions.getQuestions(CurrentLevel)
          //.filter(q=>{return Questions[q].advanced})
          .forEach(question=>{
            //fetch current state
            var currentAnswer = Global.Configuration["Yes/No"][question];
            var checked = currentAnswer ? "checked":"";

            //new row
            var newRow = t.insertRow(-1);
            if(Questions.isHiddenQuestion(question)){
              newRow.classList.add('disabled');
            }

            //new row
            newRow.style.background=currentAnswer?"lightgreen":"#eee";
            newRow.setAttribute('question',question);

            //question name
            var newCell=newRow.insertCell(-1);
            newCell.colSpan=2;
            newCell.style.textAlign="right";
            newCell.setAttribute('onclick',"level3.toggleQuestionVisibility(this,'"+question+"')");
            newCell.innerHTML=(function(){
              var ret="";
              if(checked) {
                var expanded=Expanded[question];
                if(expanded===undefined)expanded=1;//expanded by default
                ret+="<span expanded="+expanded+">&#9660;</span>"
              }
              ret+=translate(question)+"?";
              return ret;
            })()

            //yes/no inputs
            var newCell=newRow.insertCell(-1);
            newCell.style.borderLeft="none";
            newCell.colSpan=3+substages.length;
            newCell.innerHTML=(function(){
              var ret="<label>"+
                "<?php write('#no')?> "+
                "<input name='"+question+"' type=radio value=0 onclick=setQuestion('"+question+"',0); checked></label> "+
                "<label><?php write('#yes')?> "+
                "<input name='"+question+"' type=radio value=1 onclick=setQuestion('"+question+"',1); "+checked+"></label> ";
              return ret;
            })();

            //draw inputs from the question
            if(!currentAnswer) return;

            Questions[question].variables
              .filter(code=>typeof(CurrentLevel[code])=='number')
              .forEach(code=>{
                level3.drawInput(t,code,question);
              });
            Questions[question].variables
              .filter(code=>typeof(CurrentLevel[code])=='function')
              .forEach(code=>{
                level3.drawOutput(t,code,question,showGHGss,showSLss);
              });
          });
      })();
    /*end update body*/

    /*update substage counter*/
    document.getElementById('counter').innerHTML=substages.length

    //end
    Caption.listeners();
    console.timeEnd('updateSubstagesTable');
  }

  level3.drawInput=function(t,code,question){
    /*Skip if is level2 only*/
    if(Level2only.list.indexOf(code)+1) return;

    //check input
    question=question||false; //code of the question it belongs to

    //is an option?
    var isOption = (Info[code]&&Info[code].magnitude=="Option");

    /*new row*/
    var newRow=t.insertRow(-1);
    newRow.setAttribute('field',code);
    if(question) newRow.setAttribute('question',question);
    if(question && Expanded[question]==0) newRow.style.display='none';

    if(isOption){
      (function(){
        //1: show code
        var newCell=newRow.insertCell(-1);
        newCell.classList.add('variableCode');
        newCell.setAttribute('caption',translate(code+'_expla'));
        newCell.innerHTML=(function(){
          return "<div><a href=variable.php?id="+code+">"+code+"</a></div>";
        })();

        //2: variable name
        var newCell=newRow.insertCell(-1);
        newCell.style.textAlign="left";
        newCell.setAttribute('caption',translate(code+'_expla'));
        newCell.innerHTML=(function(){
          var warning=(Formulas.outputsPerInput(code).length==0 && Utils.usedInBenchmarks(code).length==0) ?
            "<span class=not_used_input caption='Input not used for any equation'></span>" : "";
          return "<small>"+translate(code+'_descr')+warning+"</small>";
        })();

        //3: substages options
        for(var s in substages) {
          var newCell=newRow.insertCell(-1);
          newCell.style.textAlign='left';
          newCell.classList.add("input");
          newCell.setAttribute('substage',s);
          (function(){
            var select=document.createElement('select');
            newCell.appendChild(select)
            if(substages.length==1)
              select.setAttribute('onchange','substages['+s+']["'+code+'"]=parseInt(this.value);CurrentLevel["'+code+'"]=parseInt(this.value);init()')
            else
              select.setAttribute('onchange','substages['+s+']["'+code+'"]=parseInt(this.value);init()')
            for(var op in Tables[code]){
              var option = document.createElement('option');
              var value = parseInt(Tables[code][op].value);
              select.appendChild(option);
              option.value=value;
              option.innerHTML="("+value+") "+op;
              if(substages[s][code]==value){
                option.selected=true;
              }
            }
          })();
        }

        //4: add extra cells
        newRow.insertCell(-1).colSpan=3;
      })()
    }else{
      (function(){
        newRow.setAttribute('onmouseover','Formulas.hlOutputs("'+code+'",CurrentLevel,1)');
        newRow.setAttribute('onmouseout', 'Formulas.hlOutputs("'+code+'",CurrentLevel,0)');

        /*1st cell: show code*/
        var newCell=newRow.insertCell(-1);
        newCell.classList.add('variableCode');
        newCell.innerHTML=(function() {
          return "<a caption='"+translate(code+'_expla')+"' href=variable.php?id="+code+">"+code+"</a>";
        })();

        /*3rd cell: variable name*/
        var newCell=newRow.insertCell(-1);
        newCell.style.textAlign="left";
        newCell.setAttribute('caption', translate(code+'_expla'));
        newCell.innerHTML=(function(){
          var warning=(Formulas.outputsPerInput(code).length==0 && Utils.usedInBenchmarks(code).length==0) ?
            " <span class=not_used_input caption='Input not used for any equation'></span>" : "";
          return "<small>"+translate(code+'_descr')+warning+"</small>";
        })();

        //4th cell and so on: go over substages
        var multiplier=Units.multiplier(code);
        for(var s in substages) {
          var newCell=newRow.insertCell(-1);
          newCell.setAttribute('substage',s);
          newCell.classList.add("input");
          newCell.setAttribute('onclick','level3.transformField(this)');
          newCell.innerHTML=format(substages[s][code]/multiplier);
        }

        //Unit for current variable
        var newCell=newRow.insertCell(-1)
        newCell.setAttribute('caption',Info[code].magnitude);
        newCell.innerHTML=(function() {
          //check if unit is entered in "Info"
          if(!Info[code]) return "undefined";
          //check if unit is currency
          if(Info[code].magnitude=="Currency") return Global.General.Currency;
          //if no magnitude, return unit string
          if(Units[Info[code].magnitude]===undefined) return Info[code].unit;

          //look for current unit
          var currentUnit = Global.Configuration.Units[code] || Info[code].unit;

          //create a <select> for unit changing
          var str="<select onchange=Units.selectUnit('"+code+"',this.value)>";
          for(unit in Units[Info[code].magnitude]) {
            if(unit==currentUnit)
              str+="<option selected>"+unit+"</option>";
            else
              str+="<option>"+unit+"</option>";
          }
          str+="</select>"
          return str
        })();
      })();
    }

    //sum of substages here
    newRow.insertCell(-1).outerHTML=(function(){
      if(isOption)return "";

      //sum all values
      var value=level3.sumAll(code)/Units.multiplier(code);

      //update stage level button
      var onclick = value==CurrentLevel[code]/Units.multiplier(code) ? "disabled=true" :"onclick=level2.updateField('"+code+"',"+value+")";

      //if magnitude is not sumable
      if(Sumable_magnitudes.indexOf(Info[code].magnitude)==-1){
        return "<td colspan=2>";
      }

      //button overwrite stage value with the sum
      var btn='<button '+onclick+' caption="Current value ('+format(CurrentLevel[code]/Units.multiplier(code))+') will be overwritten">'+
        'update stage value'+
        '</button>';
      return "<td style=text-align:center>"+format(value)+"<td>"+btn;
    })();
  }

  level3.drawOutput=function(t,code,question,showGHGss,showSLss){
    question=question||false;

    //exclude the "level2only" variables
    if(Level2only.list.indexOf(code)+1) return;

    //exclude service level indicators
    //if(code.search('_SL_')+1) return;

    //exclude _KPI_GHG if checkbox is enabled
    var isGHG=code.search('_KPI_GHG')+1;
    if(isGHG && !showGHGss) return;

    //exclude _SL_ if checkbox is enabled
    var isSL=code.search('_SL_')+1;
    if(isSL && !showSLss) return;

    //is calculated variable?
    var isCV=code.search(/^c_/)+1;

    //new row
    var newRow=t.insertRow(-1);
    newRow.setAttribute('field',code);
    if(question) newRow.setAttribute('question',question);
    if(question && Expanded[question]==0) newRow.style.display='none';

    //set highlight fxs
    newRow.setAttribute('onmouseover','Formulas.hlInputs("'+code+'",CurrentLevel,1)');
    newRow.setAttribute('onmouseout', 'Formulas.hlInputs("'+code+'",CurrentLevel,0)');

    //1: show code
    var newCell=newRow.insertCell(-1);
    newCell.classList.add('variableCode');
    newCell.setAttribute('caption', translate(code+'_expla'));

    if(isCV) newCell.classList.add('isCV');
    else     newCell.classList.add('output');

    newCell.innerHTML=(function(){
      return "<a href=variable.php?id="+code+">"+code+"</a>";
    })();

    //2: description
    var newCell=newRow.insertCell(-1);
    newCell.setAttribute('caption', translate(code+'_expla'));
    newCell.innerHTML="<small>"+translate(code+'_descr')+"</small>";

    //get equation formula
    var formula=CurrentLevel[code].toString();
    var prettyFormula=Formulas.prettify(formula);

    var multiplier=Units.multiplier(code);

    //3: substage values.
    substages.forEach(substage=>{
      //new cell
      var newCell=newRow.insertCell(-1);
      newCell.classList.add('outputValue');

      //compute value
      var value=substage[code]()/multiplier;

      //container for benchmark + value
      var div=document.createElement('div');
      div.classList.add('flex');
      div.style.justifyContent="space-between";
      newCell.appendChild(div);

      //1. benchmark
      div.appendChild((function(){
        //benchmark circle (TO DO: extract function from here)
        var indicator=(function(){
          if(!RefValues.hasOwnProperty(code)) return "";
          var text=RefValues[code](substage);
          var color;
          switch(text) {
            case "Good":           color="#af0";break;
            case "Acceptable":     color="orange";break;
            case "Unsatisfactory": color="red";break;
            case "Out of range":   color="brown";break;
            default:               color="#ccc";break;
          }
          return "<span caption='Benchmarking: "+text+"' class=circle style='background:"+color+"'></span>";
        })();
        var div_bm = document.createElement('div');
        div_bm.innerHTML=indicator;
        return div_bm;
      })());

      //2. value
      div.appendChild((function(){
        var div_v=document.createElement('div');
        //mouseover show formula
        div_v.setAttribute('caption',prettyFormula);
        div_v.innerHTML=format(value);
        return div_v;
      })());
    });

    //unit
    var newCell=newRow.insertCell(-1);
    newCell.setAttribute('caption',Info[code].magnitude);
    newCell.innerHTML=(function() {
      return Info[code] ? Info[code].unit : "<span style=color:#ccc>no unit</span>";
    })();

    //sum of substages here
    newRow.insertCell(-1).outerHTML=(function(){
      var rv="<td colspan=2 style='text-align:center'>";
      //sum all values
      if(Sumable_magnitudes.indexOf(Info[code].magnitude)+1){
        var value=level3.sumAll(code)/Units.multiplier(code);
        rv+=format(value);
      }
      return rv;
    })();
  }

  level3.getInputs=function() {
    var inputs=[];
    for(var field in CurrentLevel) {
      if(typeof(CurrentLevel[field])=="number")
        inputs.push(field);
    }
    return inputs;
  }

  level3.sumAll=function(code) {
    //is number (input) or is function (output)
    var isInput=typeof(CurrentLevel[code])=='number';
    var isOutput=typeof(CurrentLevel[code])=='function';
    //sum all values
    var sum=0;
    if(isInput){
      substages.forEach(substage=>{
        sum+=parseFloat(substage[code]);
      });
    }else if(isOutput){
      substages.forEach(substage=>{
        sum+=parseFloat(substage[code]());
      });
    }
    return sum;
  }

  /** new Substage class for storing all variables that correspond to current stage */
  level3.Substage=function() {
    /*substage default name*/
    this.name="<?php write("#$sublevel")?> "+(parseInt(substages.length)+1);
    //init with zero values, e.g. Substage {tV1: 0, tV2: 0, tV3: 0, tV4: 0, tV5: 0, ...}
    level3.getInputs().forEach(i=>{this[i]=0});
    //copy all functions inside
    Object.keys(CurrentLevel)
      .filter(key=>typeof(CurrentLevel[key])=="function")
      .forEach(key=>{
          this[key]=CurrentLevel[key];
      });
  }

  /** New substage button pushed */
  level3.newSubstage=function(event){
    if(event)event.stopPropagation(); //this is to see the memory progress

    //check memory usage
    if(document.cookie.length>=8100) {
      alert("<?php write('#level3_error_memory_full')?> ("+document.cookie.length+" bytes used)");
      return;
    }
    substages.push(new level3.Substage());

    init();

    //visual efect (color blink new stage)
    (function(){
      var els=document.querySelectorAll('td[substage="'+parseInt(substages.length-1)+'"]');
      for(var i=0;i<els.length;i++) {
        els[i].style.background='lightgreen';
        els[i].style.transition='background 1s';
      }
      setTimeout(function(){
        for(var i=0;i<els.length;i++) {
          els[i].style.background='';
        }
      },500);
    })();
  }

  /** button delete substage pushed */
  level3.deleteSubstage=function(index) {
    if(substages.length==1) {
      alert("<?php write('#level3_error_cannot_delete_last_substage')?>");
      return;
    }
    substages.splice(index,1);

    //bug fix: caption onmouseout does not trigger, do it manually
    document.querySelector("#caption").style.display='none';

    init();
  }

  //Backend: update substage name */
  level3.changeName=function(index,newValue) {
    substages[index].name=newValue;
    init();
  }

  //GUI - make appear a menu for changing substage[index] name */
  level3.showSubstageMenu=function(index,ev) {
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

  //GUI - transform a cell to make it editable
  level3.transformField=function(element) {
    element.removeAttribute('onclick')
    var field=element.parentNode.getAttribute('field')
    var substage=element.getAttribute('substage')
    element.innerHTML=""
    var input=document.createElement('input')
    element.appendChild(input);
    input.autocomplete='off'
    input.setAttribute('onblur',"level3.updateSubstage("+substage+",'"+field+"',this.value)") //now works
    input.onkeydown=function(event) {

      function updateChart() {
        var newValue=parseFloat(input.value);
        if(isNaN(newValue))newValue=0;
        var multiplier=Units.multiplier(field);
        substages[substage][field]=multiplier*newValue;
        //try to draw charts
        drawCharts();
      }

      switch(event.which) {
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

  //Backend - update a field of the substage[index]
  level3.updateSubstage=function(index,field,newValue) {
    newValue=parseFloat(newValue);
    if(isNaN(newValue))newValue=0;
    var multiplier=Units.multiplier(field);
    substages[index][field]=multiplier*newValue;
    init();
  }
</script>

<!--substages container-->
<?php $folded=isset($_COOKIE['Folded_substageInputs_container']) ? "folded" : ""?>
<div id=substageInputs_container class="card <?php echo $folded?>" style="text-align:left">
  <!--menu-->
  <div class=menu onclick=fold(this.parentNode)>
    <button></button>
    <b><?php write('#Advanced Assessment: Substages')?></b>
    <b>(<span id=counter class=number>0</span>)</b>
    &mdash;
    <a href=substages.php><?php write('#Overview')?></a>

    <!--button toggle outputs/graph display-->
    <button class=btn_toggle
      onclick="this.parentNode.parentNode.classList.remove('folded');toggleDivs(event,this,'#substages','#substageGraphs')"
    >
      <?php write('#VIEW GRAPH')?>
    </button>
  </div>

  <!--substages table container-->
  <div style=padding:0.5em>
    <!--show ghgs checkbox-->
    <div style=margin-bottom:0.5em>
      <input type=checkbox id=showGHGss checked onclick="level3.updateSubstagesTable()">
      <label for=showGHGss>
        <?php write('#Show GHG')?>
      </label>

      <input type=checkbox id=showSLss checked onclick="level3.updateSubstagesTable()">
      <label for=showSLss>
        <?php write('#Show SL')?>
      </label>

      <input type=checkbox id=showHL onclick="Global.Configuration.hl^=true;updateResult();">
      <label for=showHL>
        Highlight related inputs/outputs
      </label>
      <script>
        document.getElementById('showHL').checked=Global.Configuration.hl;
      </script>
    </div>
    <!--SUBSTAGES TABLE-->
    <table id=substages></table>
  </div>

  <!--Substage graphs-->
  <div id=substageGraphs style=padding:1em;display:none>
    <div class=buttonsGraph><!--
      --><button class="left"   onclick="buttonsGraph(this);Graphs.wsa_KPI_std_nrg_cons(false,'substageGraph')">Standardized energy consumption</button><!--
      --><button class="middle" onclick="buttonsGraph(this);document.querySelector('#substageGraph').innerHTML='TBD'">Another graph</button><!--
      --><button class="right"  onclick="buttonsGraph(this);document.querySelector('#substageGraph').innerHTML='TBD'">Another graph</button><!--
      -->
    </div>
    <div id=substageGraph style=text-align:center>Click a graph to display</div>
  </div>
</div>

<!--disabled questions-->
<style>
  #substages tr.disabled {
    color:#aaa;
    pointer-events:none;
  }
</style>

<script>
  //copy all functions form level2 to each substage
  Object.keys(CurrentLevel)
    .filter(key=>typeof(CurrentLevel[key])=="function")
    .forEach(key=>{
      substages.forEach(substage=>{
        substage[key]=CurrentLevel[key];
      });
    });
</script>

