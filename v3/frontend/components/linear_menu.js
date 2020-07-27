let linear_menu = new Vue({
  el:"#linear_menu",
  data:{
    visible:true,
    current_view:'landing',

    //floating windows
    summaries_menu_visible:false,

    caption,

    Global,
    Info,
    Structure,
    Languages,
  },
  methods:{
    translate,
  },
  template:`
    <!--linear menu COMPONENT-->
    <div id=linear_menu v-if="visible && Languages.ready" class=flex>
      <!--landing / home-->
      <div
        onclick="ecam.show('landing')"
        :selected="current_view=='landing'"
      >
        <div>Home</div>
      </div>

      <!--systems-->
      <div
        onclick="ecam.show('select_scenario')"
        :selected="current_view=='select_scenario'"
      >
        <div>Systems</div>
      </div>

      <!--general settings-->
      <div
        onclick="ecam.show('configuration')"
        :selected="current_view=='configuration'"
      >
        <div>Configuration</div>
      </div>

      <!--stages-->
      <div
        onclick="stages_menu.visible^=1;"
        :selected="current_view=='tier_b'"
      >
        <div>Stages</div>
      </div>

      <!--summaries-->
      <div
        @click="summaries_menu_visible^=1"
        style="cursor:pointer"
        :selected="['summary_ghg','summary_nrg','emission_tree','report'].indexOf(current_view)>=0"
      >
        <div>{{translate('summaries')}}</div>
        <ul
          id=summaries_menu
          v-if="summaries_menu_visible"
          @mouseenter="summaries_menu_visible=1"
          @mouseleave="summaries_menu_visible=0"
        >
          <li>
            <a href=# onclick="ecam.show('summary_ghg');">
              GHG summary
            </a>
          </li>
          <li>
            <a href=# onclick="ecam.show('summary_nrg');">
              Energy summary
            </a>
          </li>
          <li>
            <a href=# onclick="ecam.show('emission_tree');">
              All GHG emissions
            </a>
          </li>
          <li>
            <a href=# onclick="ecam.show('report');">
              Report
            </a>
          </li>
        </ul>
      </div>
    </div>
  `,

  style:`
    <style>
      #linear_menu {
        background:white;
        border-bottom:1px solid #ccc;
        padding:0 0 0 5em;
      }
      #linear_menu > div {
        color:#3c3c3b;
        margin:0 1em;
        font-size:12px;
        font-weight:bold;
        padding:0.2em;
        padding-top:2em;
        border-bottom:4px solid transparent;
        box-sizing:border-box;
      }
      #linear_menu > div[selected],
      #linear_menu > div:hover {
        color:black;
        border-color:var(--color-level-generic);
      }
      #linear_menu a:hover {
        text-decoration:none;
      }
      #linear_menu #summaries_menu {
        z-index:99;
        list-style:none;
        font-size:large;
        position:absolute;
        padding:1em;
        margin:0;
        border:1px solid #ccc;
        background:#eee;
        padding:0.5em;
        box-shadow: 5px 10px 15px 5px rgba(0,0,0,.1);
      }
      #linear_menu #summaries_menu a:hover{
        text-decoration:underline;
      }
    </style>
  `,
});
