let summaries_menu = new Vue({
  el:"#summaries_menu",

  data:{
    visible:true,
    Languages,
  },

  methods:{
    is_current_view(view_name){
      return linear_menu.current_view == view_name;
    }
  },

  template:`
    <div id=summaries_menu v-if="visible && Languages.ready">
      <div id=tabs>
        <div :current="is_current_view('summary_ghg')" onclick="ecam.show('summary_ghg')">Summary GHG table</div>
        <div :current="is_current_view('sankey_ghg')"  onclick="ecam.show('sankey_ghg')">Sankey diagram GHG</div>
        <div :current="is_current_view('diagram')"     onclick="ecam.show('diagram')">Diagram stages (water and wastewater flows)</div>
        <div :current="is_current_view('report')"      onclick="ecam.show('report')">Report/charts</div>
      </div>
    </div>
  `,
  style:`
    <style>
      #summaries_menu {
        padding-top:2em;
      }
      #summaries_menu #tabs{
        display:flex;
        justify-content:center;
        border-bottom:1px solid #ccc;
      }
      #summaries_menu #tabs > div {
        padding:0 1em;
        border-bottom:4px solid transparent;
        cursor:pointer;
      }
      #summaries_menu #tabs > div[current],
      #summaries_menu #tabs > div:hover {
        border-bottom:4px solid var(--color-level-generic);
      }
    </style>
  `,
});
