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
  },

  methods:{
    translate,
    format,
    go_to,
  },

  template:`
    <div id=overview v-if="visible && Languages.ready">

      <h2 style="text-align:center">
        Substages overview
      </h2>

      <p style="text-align:center">
        This part will be implemented after stage rework for ipcc 2019 compliance
      </p>

      <table border=1 style="margin:1em auto">
        <tr>
          <td
            v-for="l2 in Structure.filter(s=>s.sublevel)"
            :style="{textAlign:'center',background:'var(--color-level-'+l2.level+')'}"
          >
            <a href=# @click="go_to(l2.level,l2.sublevel)" style=color:white>
              {{translate(l2.sublevel)}}
            </a>
          </td>
        </tr>
        <tr>
          <td v-for="l2 in Structure.filter(s=>s.sublevel)">
            <div v-if="Global.Substages[l2.level][l2.sublevel].length==0">
              <small style=color:#666>~no substages</small>
            </div>
            <div v-for="substage in Global.Substages[l2.level][l2.sublevel]">
              substage 1
            </div>
          </td>
        </tr>
        <tr>
          <td v-for="l2 in Structure.filter(s=>s.sublevel)">
            <button>
              + add new substage
            </button>
          </td>
        </tr>
      </table>

      <!--diagram of stages rework for v3-->
      <div style=text-align:center>
        <p>
          Stages' rework diagram for making ecam v3 ipcc 2019 compliant
        </p>
        <img
          src="frontend/diagram/map.dot.svg"
          style="display:block;margin:auto;width:100%;border:1px solid black"
        >
      </div>
    </div>
  `,

  style:`
    <style>
    </style>
  `
});


