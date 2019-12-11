<!--side bar top left-->
<?php
  //sidebar displayed according to cookies
  $sbd = (isset($_COOKIE['sidebar']) && $_COOKIE['sidebar']==1) ? "on":"off";
?>

<!--new open save clear functions-->
<!--must group these fxs inside namespace-->
<script>
  function removeAllCookies() {
    removeCookie("Global");
    removeCookie("Substages");
  }

  /* New system */
  function newSystem() {
    removeAllCookies();
    window.location="getStarted.php";
  }

  /* Generate a json/text file of the Global object */
  function saveToFile() {
    let SavedFile={
      "Global":Global,
      "Substages":Substages,
    };
    let link=document.createElement('a');
    link.href="data:text/json;charset=utf-8,"+JSON.stringify(SavedFile,null,'  '); //with newlines
    link.download=Global.General.Name+".json";
    link.style.display='';
    document.body.appendChild(link);
    link.click();
  }

  /*update Global object with loaded file parsed to JSON*/
  function loadFile(evt) {
    //get json file contents
    let file = evt.target.files[0];
    let reader = new FileReader();
    reader.onload=function(){
      let SavedFile = JSON.parse(reader.result);

      copyFieldsFrom(SavedFile.Global, Global);
      copyFieldsFrom(SavedFile.Substages, Substages);
      //substages are saved unpacked, no need to convert

      //solve bug #183 after Global loaded (related to tier A visibility)
      Structure.filter(s=>!s.sublevel).forEach(s=>{
        Global.Configuration.Expanded[s.alias]=1;
      });

      updateResult(); //write cookies
      window.location='sources.php';
    }
    try{
      reader.readAsText(file);
    }catch(e){alert(e)}
  }

  /* clear current system */
  function clearSystem() {
    //simply remove cookie and default values will load
    removeAllCookies();
    window.location='index.php';
  }
</script>

<!--sidebar ecam v2-->
<div id=sidebar class="<?php echo $sbd ?>" onclick="event.stopPropagation()">
  <script>
    let Sidebar={
      element:document.querySelector('#sidebar'),

      toggle:function() {
        let element=this.element;
        if(element.className=="on") {
          setCookie('sidebar',0);
          element.className="off";
        } else {
          setCookie('sidebar',1);
          element.className="on";
        }
      },

      hide:function(){
        let element=this.element;
        if(element.className=='on') {
          this.toggle();
        }
      },

      //update disabled navigation links
      update: function() {
        document.querySelectorAll("#sidebar a[stage]").forEach(a=>{
          let stage    = a.getAttribute('stage');
          let isActive = Global.Configuration.ActiveStages[stage];
          if(isActive)
            a.classList.remove('inactive');
          else
            a.classList.add('inactive');
        });
        this.updateMemory(false);
      },

      updateMemory(warning){
        warning=warning||false;
        let progress = document.querySelector('#sidebar #progress')
        let length = getCookie('Global') ? document.cookie.length : 0;
        progress.value = length;
        let percent = 100*length/8100;
        progress.setAttribute('caption',format(percent)+"%");
        document.querySelector('#sidebar span#used_memory').innerHTML=format(percent)+"%";
        //add warning above 95%
        if(warning && percent>95){ alert("Warning: memory is "+format(percent)+"% full"); }
      },
    };
  </script>

  <script>
    /*listeners for sidebar*/

    //click anywhere hides the sidebar
    document.documentElement.addEventListener('click',function(){
      Sidebar.hide();
    });
    //escape key hides the sidebar
    document.documentElement.addEventListener('keydown',function(e){
      if(e.which==27){
        Sidebar.hide();
      }
    });
  </script>

  <div id=sidecontent>
    <table id=menu>
      <tr><th style="padding:5px"><?php write("#sidebar_mainMenu")?>
        <span id=Name style="float:right"></span>
        <script>
          document.querySelector('#sidebar #sidecontent #Name').innerHTML=Global.General.Name;
        </script>
      <tr>
        <td align=center style="padding:0.7em">
        <input type="file" id="loadfile" accept=".json" onchange="loadFile(event)" style="display:none">
        <div class=tab_buttons>
          <button class=left   onclick="newSystem()"><?php write('#new')?></button>
          <button class=middle onclick="document.getElementById('loadfile').click()"><?php write('#open')?></button>
          <button class=middle onclick="saveToFile()"><?php write('#save')?></button>
          <button class=right  onclick="clearSystem()"><?php write('#clear')?></button>
        </div>
    </table>

    <!--red/blue separator bars-->
    <div style="padding:0;margin:0;background:#d71d24;height:5px"></div>
    <div style="padding:0;margin:0;background:#0aaff1;height:5px"></div>

    <!--USED MEMORY-->
    <div style="padding:0.2em;text-align:center;font-size:smaller">
      <?php write('#memory')?>: <span id=used_memory>0%</span><br>
      <progress id=progress value=0 max=8100></progress>
      <style>
        progress{margin:0.1em 0.5em;cursor:help;width:80%;}
      </style>
    </div>

    <table>
      <tr><th><?php write('#main')?>
      <tr><td><a href=getStarted.php>   <?php write('#getStarted_general_info')?></a>
      <tr><td><a href=configuration.php><?php write('#configuration')?></a>
      <tr><td><a href=inhabitants.php>  <?php write('#population')?></a>
      <tr><td><a href=birds.php>        <?php write('#quick_assessment')?></a>
      <tr><th><?php write('#energy_performance')?>

      <!--water-->
      <tr><td><a class=water stage=water    href=edit.php?level=Water><?php write('#Water')?></a>
      <tr><td><a class=water stage=waterAbs href=edit.php?level=Water&sublevel=Abstraction>  &emsp; <?php write('#Abstraction')?></a>
      <tr><td><a class=water stage=waterTre href=edit.php?level=Water&sublevel=Treatment>    &emsp; <?php write('#Treatment')?></a>
      <tr><td><a class=water stage=waterDis href=edit.php?level=Water&sublevel=Distribution> &emsp; <?php write('#Distribution')?></a>
      <!--waste-->
      <tr><td><a class=waste stage=waste    href=edit.php?level=Waste><?php write('#Waste')?></a>
      <tr><td><a class=waste stage=wasteCol href=edit.php?level=Waste&sublevel=Collection> &emsp; <?php write('#Collection')?></a>
      <tr><td><a class=waste stage=wasteTre href=edit.php?level=Waste&sublevel=Treatment>  &emsp; <?php write('#Treatment')?></a>
      <tr><td><a class=waste stage=wasteDis href=edit.php?level=Waste&sublevel=Discharge>  &emsp; <?php write('#Discharge')?></a>
      <!--faecl-->
      <tr><td><a class=faecl stage=faecl    href=edit.php?level=Faecl><?php write('#Faecl')?></a>
      <tr><td><a class=faecl stage=faeclCon href=edit.php?level=Faecl&sublevel=Containment> &emsp; <?php write('#Containment')?></a>
      <tr><td><a class=faecl stage=faeclTre href=edit.php?level=Faecl&sublevel=Treatment>   &emsp; <?php write('#Treatment')?></a>
      <tr><td><a class=faecl stage=faeclReu href=edit.php?level=Faecl&sublevel=Reuse>       &emsp; <?php write('#Reuse')?></a>

      <tr><th><?php write('#summaries')?>
      <tr><td><a href=sources.php><?php write('#ghg_summary')?></a>
      <tr><td><a href=energy_summary.php><?php write('#nrg_summary')?></a>
      <tr><td><a href=edit.php?level=UNFCCC><?php write('#unfccc_categories')?></a>
      <tr><td><a href=substages.php><?php write('#all_substages')?></a>
      <tr><td><a href=summary.php?type=input><?php write('#all_inputs')?></a>
      <tr><td><a href=summary.php?type=output><?php write('#all_outputs')?></a>
      <tr><td><a href=summary.php?type=ccvv><?php write('#all_ccvv')?></a>
      <tr><td><a href=questions.php><?php write('#All questions')?></a>
      <tr><td><a href=constants.php><?php write('#all_constants')?></a>
      <tr><td><a href=benchmark.php><?php write('#all_benchmarks')?></a>
      <tr><th><?php write('#other')?>
      <tr><td><a href=opps.php><?php write("#opportunities")?></a>
      <tr><td><a href=export.php><?php write('#sidebar_export')?></a>
      <tr><td><a href=sankey.php><?php write('#Sankey diagram')?></a>
      <!--go to variable-->
      <tr><th><?php write('#go_to_variable_code')?>
      <tr><td>
        <form id=go_to method=GET action="variable.php">
          <input name=id list=variables placeholder="ws_KPI_GHG" autocomplete=off>
          <button><?php write('#go')?></button>
        </form>
        <datalist id=variables></datalist>
        <script>
          (function(){
            //add all tags to the datalist
            let dl=document.querySelector('#sidebar #variables');
            [
              Global.Water,
              Global.Water.Abstraction,
              Global.Water.Treatment,
              Global.Water.Distribution,
              Global.Waste,
              Global.Waste.Collection,
              Global.Waste.Treatment,
              Global.Waste.Discharge,
            ].forEach(stage=>{
              Object.keys(stage).filter(key=>{
                return 'object' != typeof stage[key]; //filter only non-objects
              }).forEach(key=>{
                dl.appendChild((function(){
                  let option=document.createElement('option');
                  option.value=key;
                  option.innerHTML=translate(key+'_descr');
                  return option;
                })());
              });
            });
          })();
        </script>
        <style>
          #go_to{
            display:flex;
          }
          #go_to button {
            display:block;
            margin-left:-1px;
          }
        </style>
      </tr>
      <tr><th><?php write('#Cache')?>
      <tr><td><button onclick="window.location.reload(true)">
        <?php write('#Reset cache')?>
      </button>
    </table>
    <ul style="
      text-align:left;
      padding:0.5em;
      ">
      <li><a href=development.php><?php write('#dev')?></a></li>
    </ul>
  </div>
</div>

<script>Sidebar.update()</script>

<!--css ecam v2-->
<style>
  div#sidebar {
    position:absolute;
    top:51px;
    left:0;
    z-index:999;
    background:white;
    padding:0;
    margin:0;
    box-shadow: 5px 10px 15px 5px rgba(0,0,0,.1);
    overflow:auto;
    border-right:2px solid #ccc;
    border-top:1px solid #ccc;
  }
  div#sidebar.off{width:0;height:0;top:0;z-index:-1;display:none}
  div#sidebar.on{width:255px;bottom:0;display:block}
  div#sidebar td.sidebar_selected {background:linear-gradient(lightgreen,white,lightgreen)}
  div#sidebar.on  div#sidecontent{display:block}
  div#sidebar.off div#sidecontent{display:none}
  div#sidebar div{padding:0;margin:0}
  div#sidebar table{width:100%;margin:0;}
  div#sidebar td, div#sidebar th {border-left:0;border-right:0;padding:0.2em;padding-left:1em;}
  div#sidebar td:hover {background:#f5f5f5}
  div#sidebar th {border-top:0;}
  div#sidebar table#menu td {border-bottom:0}
  div#sidebar a.water{color:#00adef}
  div#sidebar a.waste{color:#d71d24}
  div#sidebar a.faecl{color:green}
  div#sidebar a.inactive{pointer-events:none;color:#ccc;text-decoration:none}
  div#sidebar div#sidecontent th {text-align:left;border:none}
</style>

<!---------------------------------------------------------------------------------------->

<!--vue template (ecam v3)-->
<div id=sidebar-v3 v-if="visible">
  <div class="header flex" style="padding:5px;justify-content:space-between">
    <div>{{translate("sidebar_mainMenu")}}</div>
    <div>{{Global.General.Name}}          </div>
  </div>

  <!--new open save clear-->
  <div class=tab_buttons>
    <button class=left   onclick="newSystem()"> {{translate('new')}} </button>
    <button class=middle onclick="document.getElementById('loadfile').click()">
      {{translate('open')}}
    </button>
    <button class=middle onclick="saveToFile()"> {{translate('save')}} </button>
    <button class=right  onclick="clearSystem()"> {{translate('clear')}} </button>
    <input type="file" id="loadfile" accept=".json" onchange="loadFile(event)" style="display:none">
  </div>

  <!--sections-->
  <ul>
    <!--tier A-->
    <li class=section>
      <div class=header>{{translate('main')}}</div>
      <ul>
        <li class=item><a href=getStarted.php>   {{translate('getStarted_general_info')}}</a>
        <li class=item><a href=configuration.php>{{translate('configuration')          }}</a>
        <li class=item><a href=inhabitants.php>  {{translate('population')             }}</a>
        <li class=item><a href=birds.php>        {{translate('quick_assessment')       }}</a>
      </ul>
    </li>

    <!--tier B-->
    <li class=section>
      <div class=header>{{translate('energy_performance')}}</div>
      <ul>
        <li
          class=item
          v-for="l1 in Structure.filter(s=>!s.sublevel).filter(s=>Global.Configuration.ActiveStages[s.alias])"
        >
          <a :href=`edit.php?level=${l1.level}` :style=`color:${l1.color}`>
            {{translate(l1.level)}}
          </a>

          <ul>
            <li
              class=item-l2
              v-for="l2 in Structure
                            .filter(s=>(s.sublevel && s.level==l1.level))
                            .filter(s=>Global.Configuration.ActiveStages[s.alias])"
            >
              <a :href=`edit.php?level=${l2.level}&sublevel=${l2.sublevel}`
                :style=`color:${l1.color}`
              >
                {{translate(l2.sublevel)}}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </li>

    <!--summaries-->
    <li class=section>
      <div class=header>{{translate('summaries')}}</div>
      <ul>
        <li class=item><a href=sources.php>            {{translate('ghg_summary')      }}</a>
        <li class=item><a href=energy_summary.php>     {{translate('nrg_summary')      }}</a>
        <li class=item><a href=edit.php?level=UNFCCC>  {{translate('unfccc_categories')}}</a>
        <li class=item><a href=substages.php>          {{translate('all_substages')    }}</a>
        <li class=item><a href=summary.php?type=input> {{translate('all_inputs')       }}</a>
        <li class=item><a href=summary.php?type=output>{{translate('all_outputs')      }}</a>
        <li class=item><a href=summary.php?type=ccvv>  {{translate('all_ccvv')         }}</a>
        <li class=item><a href=questions.php>          {{translate('All questions')    }}</a>
        <li class=item><a href=constants.php>          {{translate('all_constants')    }}</a>
        <li class=item><a href=benchmark.php>          {{translate('all_benchmarks')   }}</a>
      </ul>
    </li>

    <!--other-->
    <li class=section>
      <div class=header>{{translate('other')}}</div>
      <ul>
        <li class=item><a href=opps.php>  {{translate("opportunities") }}</a>
        <li class=item><a href=export.php>{{translate('sidebar_export')}}</a>
        <li class=item><a href=sankey.php>{{translate('Sankey diagram')}}</a>
        <li class=item><a href=development.php>{{translate('dev')}}</a>
      </ul>
    </li>
  </ul>

  <!--for development-->
  <div>
    <button @click=visible^=1>close</button>
  </div>
</div>

<!--css (ecam v3)-->
<style>
  #sidebar-v3 {
    position:absolute;
    top:51px;
    left:0;
    z-index:998;
    background:white;
    padding:0;
    margin:0;
    box-shadow: 5px 10px 15px 5px rgba(0,0,0,.1);
    overflow:auto;
    border-right:2px solid #ccc;
    border-top:1px solid #ccc;
    text-align:left;
  }
  #sidebar-v3 ul{
    list-style-type:none;
    padding:0;
    margin:0;
  }
  #sidebar-v3 li.section {
    padding:0;
  }
  #sidebar-v3 .header{
    color:white;
    background:#2b6488;
    padding:0.35em;
  }
  #sidebar-v3 li.item {
    padding:0.35em;
    padding-left:0.5em;
    border-bottom:1px solid #aaa;
  }
  #sidebar-v3 li.item-l2 {
    padding-left:1em;
  }
</style>

<!--vue model (ecam v3)-->
<script>
  let sidebar=new Vue({
    el:"#sidebar-v3",
    data:{
      Global,
      Structure,
      visible:false,
    },
    methods:{
      translate,
    },
  });
</script>
