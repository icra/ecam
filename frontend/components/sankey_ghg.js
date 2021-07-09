let sankey_ghg=new Vue({
  el:"#sankey_ghg",
  data:{
    visible:false,
    Languages,
  },
  methods:{
    show_summaries_menu(){
      summaries_menu.visible=true;
    },
    translate,
  },
  updated(){
    this.$nextTick(()=>{
      try{
        Charts.draw_sankey_ghg();
      }catch(e){
        if(this.visible) console.warn(e);
      }
    })
  },
  template:`
    <!--sankey diagram-->
    <div id=sankey_ghg v-if="visible && Languages.ready">
      <div>
        {{show_summaries_menu()}}
      </div>
      <h1 style=text-align:center>
        {{translate("Sankey diagram GHG")}}
      </h1>
      <div id=sankey></div>
    </div>
  `,
  style:`
    <style>
      #sankey_ghg {
        padding-left:1em;
      }
      #sankey_ghg #sankey {
        padding: 10px;
        min-width: 600px;
        max-width: 1200px;
        margin: auto;
        height: 400px;
        font: 13px sans-serif;
      }
      #sankey_ghg #sankey .node rect {
        fill-opacity: .9;
        shape-rendering: crispEdges;
        stroke-width: 0;
      }
      #sankey_ghg #sankey .node text {
        text-shadow: 0 1px 0 #fff;
      }
      #sankey_ghg #sankey .link {
        fill: none;
        stroke: #000;
        stroke-opacity: .2;
      }
    </style>
  `,
});
