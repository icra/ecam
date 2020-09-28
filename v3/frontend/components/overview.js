let overview = new Vue({
  el:"#overview",
  data:{
    visible:false,

    //frontend
    caption,

    //backend
    Global,
    Structure,
    Languages,

    diagram_legend:[
      {name:"Water",        colors:['blue']},
      {name:"Wastewater",   colors:['brown','blue']},
      {name:"Sludge",       colors:['brown']},
      {name:"GHG emission", colors:['grey']},
    ]
  },

  methods:{
    translate,
    format,
    go_to,
  },

  template:`
    <div id=overview v-if="visible && Languages.ready">
      <h2 style="text-align:center">
        Overview
      </h2>

      <!--diagram of stages rework for v3-->
      <div style=text-align:center>
        <p>
          Stages' rework diagram for making ecam v3 ipcc 2019 compliant
        </p>
        <img
          src="frontend/diagram/map.dot.svg"
          style="display:block;margin:auto;width:99%;border:1px solid black"
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
  `,

  style:`
    <style>
    </style>
  `
});


