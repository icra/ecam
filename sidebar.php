<!--side bar top left-->

<!--new open save clear functions-->
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

  //click anywhere hides the sidebar
  document.documentElement.addEventListener('click',function(){
    sidebar.visible=false;
  });

  //escape key hides the sidebar
  document.documentElement.addEventListener('keydown',function(e){
    if(e.which==27){
      sidebar.visible=false;
    }
  });

</script>
