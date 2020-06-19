let sidebar = new Vue({
  el:"#sidebar",

  data:{
    visible:false,

    Global,
    Structure,
  },

  methods:{
    translate,
    go_to,
    get_height(){
      return document.querySelector("#ecam_logo").offsetHeight;
    },
  },

  template:`
    <div id=sidebar v-if="visible" :style="'top:'+get_height()+'px'">
      <!--sidebar system name-->
      <div class="header flex" style="padding:5px;justify-content:space-between">
        <div>{{translate("sidebar_mainMenu")}}</div>
        <div>{{Global.General.Name}}          </div>
      </div>

      <!--sidebar open save buttons-->
      <div class=tab_buttons>
        <button class=left onclick="" disabled>
          {{translate('open')}}
        </button>
        <button class=right onclick="" disabled>
          {{translate('save')}}
        </button>
        <input type="file" id="loadfile" accept=".json"
          onchange="loadFile(event)" style="display:none">
      </div>

      <!--sidebar sections-->
      <ul>
        <!--sidebar general info to tier A section-->
        <li class=section>
          <div class=header>{{translate('main')}}</div>
          <ul>
            <li class=item><a onclick="ecam.show('select_scenario')">  Systems                        </a></li>
            <li class=item><a onclick="ecam.show('configuration')">  {{translate('configuration')   }}</a></li>
            <li class=item><a onclick="ecam.show('population')">     {{translate('population')      }}</a></li>
            <li class=item><a onclick="ecam.show('tier_a')">         {{translate('quick_assessment')}}</a></li>
          </ul>
        </li>

        <!--sidebar tier B section-->
        <li class=section>
          <div class=header>{{translate('energy_performance')}}</div>
          <ul>
            <li
              class=item
              v-for="l1 in Structure.filter(s=>(
                !s.sublevel && Global.Configuration.ActiveStages[s.alias])
              )"
            >
              <a @click="go_to(l1.level)" :style="'color:'+l1.color">
                {{translate(l1.level)}}
              </a>

              <ul>
                <li
                  class=item-l2
                  v-for="l2 in Structure.filter(s=>(
                      s.sublevel && s.level==l1.level
                      &&
                      Global.Configuration.ActiveStages[s.alias]
                    ))
                  "
                >
                  <a @click="go_to(l2.level, l2.sublevel)"
                    :style="'color:'+l1.color"
                  >
                    {{translate(l2.sublevel)}}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <!--sidebar summaries section-->
        <li class=section>
          <div class=header>{{translate('summaries')}}</div>
          <ul>
            <li class=item><a onclick="ecam.show('summary_ghg')">{{translate('ghg_summary')      }}       </a></li>
            <li class=item><a onclick="ecam.show('summary_nrg')">{{translate('nrg_summary')      }}       </a></li>
            <li class=item><a onclick="ecam.show('constants')"  >{{translate('all_constants')    }}       </a></li>
            <li class=item><a onclick="alert('TODO')">           {{translate('unfccc_categories')}} [TODO]</a></li>
            <li class=item><a onclick="alert('TODO')">           {{translate('all_substages')    }} [TODO]</a></li>
            <li class=item><a onclick="alert('TODO')">           {{translate('all_benchmarks')   }} [TODO]</a></li>
          </ul>
        </li>

        <!--sidebar other section-->
        <li class=section>
          <div class=header>{{translate('other')}}</div>
          <ul>
            <li class=item><a onclick="alert('TODO')">              {{translate('sidebar_export') }} [TODO]</a></li>
            <li class=item><a onclick="alert('TODO')">              {{translate('Sankey diagram') }} [TODO]</a></li>
            <li class=item><a onclick="ecam.show('development')">   {{translate('dev')            }}</a></li>
          </ul>
        </li>

        <!--sidebar support section-->
        <li class=section>
          <div class=header>Support</div>
          <ul>
            <li class=item><a onclick="ecam.show('help')"> {{translate('help')}} </a></li>
            <li class=item><a onclick="ecam.show('about')">{{translate('about')}}</a></li>
          </ul>
        </li>
      </ul>

      <!--sidebar close button-->
      <div>
        <button @click="visible^=1">close</button>
      </div>
    </div>
  `,
});

//clicking anywhere hides sidebar
document.documentElement.addEventListener('click',function(){
  sidebar.visible=false;
});

//ESC key hides the sidebar
document.documentElement.addEventListener('keydown',function(ev){
  if(ev.which==27){
    sidebar.visible=false;
  }
});
