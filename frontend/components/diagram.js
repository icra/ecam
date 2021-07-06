let diagram = new Vue({
  el:"#diagram",
  data:{
    visible:false,
    diagram_legend:[
      {name:"Water",        colors:['blue']},
      {name:"Wastewater",   colors:['brown','blue']},
      {name:"Sludge",       colors:['brown']},
      {name:"GHG emission", colors:['grey']},
    ],

    Languages,
  },

  methods:{
    translate,
    format,
    is_debug_mode_enabled(){
      return debug;
    },
  },

  template:`
    <div id=diagram v-if="visible && Languages.ready">

      <!--diagram stages-->
      <div>
        <h1>Flow diagram (water and wastewater flows)</h1>
        <img
          src="frontend/img/flowchart/flowchart.svg"
          style="display:block;margin:auto;width:90%;border:1px solid #eee"
        >

        <div v-if="is_debug_mode_enabled()" style="margin-top:2em">
          <b>The diagram below is only visible in dev mode</b>
          <img
            src="frontend/img/flowchart/map.dot.svg"
            style="display:block;margin:auto;width:90%;border:1px solid #eee"
          >
          <table border=1 style="margin:auto">
            <tr><th :colspan="diagram_legend.length">Legend</th></tr>
            <tr>
              <td v-for="obj in diagram_legend" style="width:100px">
                <div>{{obj.name}}</div>
                <div v-for="color in obj.colors" :style="{background:color,width:'99%',height:'2px'}"></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  `,

  style:`
    <style>
      #diagram {
        text-align:center;
      }
    </style>
  `,
});
