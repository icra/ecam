<!doctype html><html><head>
  <?php include'imports.php'?>
  <script>
    //count all variables (inputs and outputs)
    function countVariables(obj) {
      obj=obj||Global;
      var n=0;
      for(var field in obj) {
        switch(typeof(obj[field])) {
          case 'number': case 'function':
            n++
            break;
          case 'object':
            n+=countVariables(obj[field])
            break;
        }
      }
      return n;
    }

    function findInexisting(obj,table) {
      (function() {
        var inex=[];
        if(obj instanceof Array) {
          for(var i in obj) {
            if(locateVariable(obj[i])==false) inex.push(obj[i]);
          }
        }else if(typeof(obj)=="object") {
          for(var field in obj) {
            if(locateVariable(field)==false) inex.push(field);
          }
        }
        else return []; //obj is not array or object
        if(inex.length==0) { 
          table.insertRow(-1).outerHTML="<tr><td class=allok></td>"; 
          return []
        }
        return inex;
      })().forEach(function(field) {
        table.insertRow(-1).outerHTML="<tr><td style=background:red>"+field;
      });
    }
  </script>


</head><body>

<!--problems-->
<div>
  <!--not used inputs-->
  <div>
    <table><tr><th>Inputs not used in any<br><b>Outputs</b><br> and<br><b>Benchmarks</b>
      <script>
        //get unused inputs
        function getUnused(obj) {
          obj=obj||Global;
          var unused=[];
          for(var field in obj) {
            switch(typeof(obj[field])) {
              case 'number':
                var n=Formulas.outputsPerInput(field).length;
                if(n==0) unused.push(field);
                break;
              case 'function':
                if(field.search(/^c_/)==0) {
                  var n=Formulas.outputsPerInput(field).length;
                  if(n==0) unused.push(field);
                }
                break;
              case 'object':
                unused=unused.concat(getUnused(obj[field]));
                break;
            }
          }
          return unused;
        }

        //also see if fields are used in benchmarks
        ['Water','Waste'].forEach(function(level) {
          var unused=getUnused(Global[level])
          unused.forEach(function(field) {
            //is used in benchmark?
            if(Utils.usedInBenchmarks(field).length==0) {
              var color=field.search('ww')==-1 ? "" : "#bf5050";
              try{
                document.write("<tr><td>");
                document.write("<a caption='"+translate(field+"_descr")+"' style=color:"+color+" href=variable.php?id="+field+">"+field+"</a>");
              } catch(e) {
                document.write("<tr><td colspan=3>"+field+" need to be removed. Reset chaché")
              }
            }
          });
        });
      </script>
    </table>
  </div>

  <!--questions-->
  <div>
    <table id=inex_questions>
      <tr><th>Inexisting variable codes that appear in questions.js
    </table>
    <script>
      for(var q in Questions) {
        if(typeof(Questions[q])=="function") continue;
        findInexisting(Questions[q].variables, document.querySelector('#inex_questions'))
      }
    </script>
  </div>

  <!--rest of data structures-->
  <div>
    <table id=vawomu><tr><th>Variables without magnitude/unit
      <tr><td class=allok>
      <script>
        (function(){
          function listUnitless(obj) {
            for(var field in obj) {
              if(typeof(obj[field])=="object"){return};
              if(Info[field]==undefined) {
                document.querySelector("#vawomu td.allok").style.display='none';
                var loc=locateVariable(field);
                var link = "edit.php?level="+loc.level;
                if(loc.sublevel)link+="&sublevel="+loc.sublevel;
                document.write("<tr><td><a href='"+link+"'>"+field+"</a>");
              }
            }
          }
          Structure.forEach(s=>{
            if(s.sublevel){
              listUnitless(Global[s.level][s.sublevel]);
            }else{
              listUnitless(Global[s.level]);
            }
          });
        })()
      </script>
    </table>

    <table id=inex_info><tr><th>Inexisting that appear in info.js           </table>
    <table id=inex_refV><tr><th>Inexisting that appear in refValues.js      </table>
    <table id=inex_lvl2><tr><th>Inexisting that appear in level2only.js     </table>
    <table id=inex_lvl3><tr><th>Inexisting that appear in level3variables.js</table>
    <script>
      findInexisting(Info,            document.querySelector('#inex_info'));
      findInexisting(RefValues,       document.querySelector('#inex_refV'));
      findInexisting(Level2only.list, document.querySelector('#inex_lvl2'));
      findInexisting(Level3.list,     document.querySelector('#inex_lvl3'));
    </script>

    <table><tr><th>Repeated variables in questions.js
      <script>
        var repeated=Questions.findRepeated()
        repeated.forEach(function(variable){
          document.write("<tr><td style=background:red>"+variable)
        })
        if(repeated.length==0)document.write("<tr><td class=allok>")
      </script>
    </table>

    <table><tr><th>Not used constants
      <script>
        var j=0;
        for(var constant in Cts) {
          var i=0;
          Formulas.outputsPerInput(constant).forEach(function(equation) {
            i++;
          })
          if(i==0){ document.write("<tr><td style=background:red><a href=constant.php?id="+constant+">"+constant+"</a>");j++; }
        }
        if(j==0)document.write("<tr><td class=allok>")
      </script>
    </table>
  </div>
</div>

<style>
  div#main table {
    display:inline-block;
    vertical-align:top;
    margin:2px 1px;
  }
  td.allok {
    background:lightgreen;
    font-style:italic;
  }
  td.allok:before {content:"All OK"}
</style>
