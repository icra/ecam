let summaries_menu = new Vue({
  el:"#summaries_menu",
  data:{
    visible:false,
    current_view:'summary_ghg',
    Languages,
  },

  methods:{
    is_current_view(view_name){
      return this.current_view == view_name;
    },

    show(view_name){
      this.current_view=view_name;
      ecam.show(view_name);
    },

    translate,
  },

  template:`
    <div id=summaries_menu v-if="visible && Languages.ready">
      <div id=tabs>
        <div :current="current_view=='summary_ghg'" onclick="summaries_menu.show('summary_ghg')" v-html="translate('Summary')"       ></div>
        <div :current="current_view=='sankey_ghg'"  onclick="summaries_menu.show('sankey_ghg' )" v-html="translate('Sankey_diagram')"></div>
        <div :current="current_view=='report'"      onclick="summaries_menu.show('report'     )" v-html="translate('Report')"        ></div>
      </div>
    </div>
  `,
  style:`
    <style>
      #summaries_menu {
      }
      #summaries_menu #tabs{
        display:flex;
        justify-content:center;
        border-bottom:1px solid #ccc;
      }
      #summaries_menu #tabs > div {
        padding:0 1em;
        padding-top:2em;
        border-bottom:4px solid transparent;
        cursor:pointer;
        margin-right:1px;
      }
      #summaries_menu #tabs > div[current],
      #summaries_menu #tabs > div:hover {
        border-bottom:4px solid var(--color-level-generic);
      }
    </style>
  `,
});
