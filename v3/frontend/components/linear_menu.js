let linear_menu = new Vue({
  el:"#linear_menu",
  data:{
    visible:true,
    current_view:'landing',
    Global,
    Languages,
  },
  methods:{
    translate,
    format,
  },

  template:`
    <!--linear menu COMPONENT-->
    <div id=linear_menu v-if="visible && Languages.ready">
      <div id=select_view class=flex>
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
          onclick="ecam.show('tier_b')"
          :selected="current_view=='tier_b'"
        >
          <div>Stages</div>
        </div>

        <!--overview-->
        <div
          onclick="ecam.show('overview')"
          :selected="current_view=='overview'"
        >
          <div>Overview</div>
        </div>

        <!--summaries-->
        <div
          onclick="ecam.show('summary_ghg')"
          :selected="['summary_ghg','summary_nrg','emission_tree','report'].indexOf(current_view)!=-1"
        >
          <div>{{translate('summaries')}}</div>
        </div>

        <!--more (old sidebar)-->
        <div
          onclick="ecam.show('more')"
          :selected="current_view=='more'"
        >
          <div>More</div>
        </div>
      </div>

      <!--current system-->
      <div id=current_system>
        <b style="color:#aaa">You are in</b>
        <b>{{Global.General.Name}}</b>
        <b :style="{color:'var(--color-level-generic)'}">
          ({{format(Global.TotalGHG())}} kgCO<sub>2</sub>eq)
        </b>
      </div>
    </div>
  `,

  style:`
    <style>
      #linear_menu {
        background:white;
        border-bottom:1px solid #ccc;
        padding:0 2em 0 5em;
        display:flex;
        justify-content:space-between;
        align-items:flex-end; /*align to bottom*/
      }
      #linear_menu {
        display:flex;
      }
      #linear_menu #select_view > div {
        color:#3c3c3b;
        font-size:12px;
        font-weight:bold;
        padding:2em 1em 0.2em 1em;
        border-bottom:4px solid transparent;
        box-sizing:border-box;
      }
      #linear_menu #select_view > div[selected],
      #linear_menu #select_view > div:hover {
        color:black;
        border-color:var(--color-level-generic);
      }
      #linear_menu #select_view a:hover {
        text-decoration:none;
      }
      #linear_menu #current_system{
      }
    </style>
  `,
});
