let summary_ghg = new Vue({
  el:"#summary_ghg",
  data:{
    visible:false,

    //avoided ghg - list of variables
    ghg_avoided:[
      {level:'Waste', sublevel:'Treatment', code:'wwt_SL_GHG_avoided'},
      {level:'Waste', sublevel:'Treatment', code:'wwt_wr_C_seq_slu'},
      {level:'Waste', sublevel:'Discharge', code:'wwd_wr_GHG_avo_d'},
      {level:'Waste', sublevel:'Discharge', code:'wwd_SL_ghg_non'},
      {level:'Waste', sublevel:'Discharge', code:'wwd_wr_GHG_avo'},
      {level:'Waste', sublevel:'Onsite',    code:'wwo_SL_GHG_avoided'},
      {level:'Waste', sublevel:'Onsite',    code:'wwo_ghg_avoided_land'},
      {level:'Waste', sublevel:'Onsite',    code:'wwo_ghg_avoided_reuse'},
    ],

    //folded sections
    unfolded_levels:[],

    //frontend
    variable,
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

    toggle_folded_level(level){
      let index = this.unfolded_levels.indexOf(level);
      if(index==-1){
        this.unfolded_levels.push(level);
      }else{
        this.unfolded_levels.splice(index,1);
      }
    },

    put_detailed_ghg_sources_on_caption(level, sublevel){ //TODO
      //get #caption element
      let cap = document.querySelector('#caption');
      cap.innerHTML ="";

      //create new div
      let div = document.createElement('div');
      cap.appendChild(div);
      div.innerHTML=`<div><b>${translate(level)} ${translate(sublevel)}</b></div>`;

      //get emission code
      let code = this.Structure.find(s=>(s.level==level && s.sublevel==sublevel)).prefix + '_KPI_GHG';

      //get stage of emission
      let stage = this.Global[level][sublevel];

      //if no emission, end
      if(!this.stage[code]()){
        div.innerHTML += "<div><small>~"+translate('No emissions')+"</small></div>";
        return;
      }

      div.innerHTML += "<code>"+translate('Detailed GHG sources')+"<code>";

      //create new table
      let table = document.createElement('table');
      table.style.width = "100%";
      div.appendChild(table);

      stage.equations.forEach(field=>{
        if(field.search('_KPI_GHG_')==-1) return;

        //get value
        let value = this.stage[field](); //kgCO2eq
        if(!value) return;

        //create new row
        let newRow = table.insertRow(-1);
        newRow.insertCell(-1).innerHTML = translate(field+"_descr").prettify();
        newRow.insertCell(-1).innerHTML = format(value);
      })
    },
  },

  template:`
    <div id=summary_ghg v-if="visible && Languages.ready">
      <summaries current_view=summary_ghg></summaries>

      <!--title-->
      <div style="
        display:flex;
        justify-content:space-between;
        align-items:flex-end;
        padding:2em 4em;
      ">
        <div>
          <b style=font-size:large>Summaries</b>
          <p>
            All GHG emissions and energy consumed are summarized in this page.
          </p>
        </div>
        <div>
          <button>AP</button>
          <button>AP/year</button>
          <button>AP/year/serv.pop.</button>
        </div>
      </div>

      <!--summary table-->
      <div>
        <table style="margin:auto;width:70rem;border-spacing:1px">
          <tbody v-for="l1 in Structure.filter(s=>!s.sublevel)">
            <!--level 1-->
            <tr :style="{background:l1.color,color:'white'}">
              <td style="background:inherit;text-align:center">
                <button @click="toggle_folded_level(l1.level)">&darr;</button>
              </td>

              <!--level 1 name and icon-->
              <td style="background:inherit;text-align:center">
                <div style="font-size:large">
                  <a @click="go_to(l1.level)" style="color:white;">
                    {{ translate(l1.level) }}
                  </a>
                </div>
                <div>
                  <img :src="'frontend/img/'+l1.icon" style="width:65px">
                </div>
              </td>

              <!--level 1 emissions-->
              <td style="background:inherit;">
                <div style="
                  display:flex;
                  justify-content:center;
                  text-align:center;
                  padding-left:1em;
                  padding-right:1em;
                ">
                  <div>
                    <div style="font-size:x-small;">kgCO<sub>2</sub>eq</div>
                    <div class=number_placeholder :style="{color:l1.color, borderColor:l1.color}" v-html="format(Global[l1.level][l1.prefix+'_KPI_GHG']())"></div>
                  </div>
                </div>
              </td>

              <!--level 1 energy consumption-->
              <td :style="{background:'inherit',textAlign:'center'}">
                <div style="color:white">kWh</div>
                <div class=number_placeholder :style="{color:l1.color, borderColor:l1.color, margin:'auto'}">
                  {{format(Global[l1.level][l1.prefix+'_nrg_cons']())}}
                </div>
              </td>
            </tr>

            <!--level 2-->
            <tr v-for="l2 in Structure.filter(s=>(s.level==l1.level && s.sublevel))"
              v-if="unfolded_levels.indexOf(l1.level)>-1"
              @mousemove="caption.show($event)"
              @mouseout="caption.hide()"
            >
              <!--level 2 name and icon-->
              <td colspan=2 :style="{textAlign:'center',background:'var(--color-level-'+l1.level+'-secondary)'}">
                <div style="font-size:large">
                  <a @click="go_to(l2.level,l2.sublevel)" :style="{color:l1.color}">
                    {{translate(l2.sublevel)}}
                  </a>
                </div>
                <div>
                  <img :src="'frontend/img/'+l2.icon" style="width:75px;">
                </div>
              </td>

              <!--level 2 emissions-->
              <td style=background:white>
                <div
                  style="
                    display:flex;
                    justify-content:center;
                    text-align:center;
                    padding-left:1em;
                    padding-right:1em;
                  "
                >
                  <div>
                    <div style="font-size:x-small;">kgCO<sub>2</sub>eq</div>
                    <div class=number_placeholder :style="{color:l1.color, borderColor:l1.color}" v-html="format(Global[l2.level][l2.sublevel].map(s=>s[l2.prefix+'_KPI_GHG']()))"></div>
                  </div>
                </div>
              </td>

              <!--level 2 energy consumption-->
              <td :style="{background:'white', color:l1.color, textAlign:'center'}">
                <div style="color:black">kWh</div>
                <div class=number_placeholder :style="{color:l1.color, borderColor:l1.color, margin:'auto'}">
                  <div v-html="format(Global[l2.level][l2.sublevel].map(s=>s[l2.prefix+'_nrg_cons']))"></div>
                </div>
              </td>
            </tr>
          </tbody>

          <!--total ghg and nrg-->
          <tbody style="background:var(--color-level-generic);color:white">
            <tr>
              <td></td>
              <td style="font-size:large;text-align:center">
                <div>Total</div>
                <div>
                  <img src="frontend/img/sources1.png" style="width:65px">
                  <img src="frontend/img/energy.png" style="width:65px">
                </div>
              </td>
              <!--total emissions-->
              <td style="background:inherit;">
                <div style="
                  display:flex;
                  justify-content:center;
                  text-align:center;
                  padding-left:1em;
                  padding-right:1em;
                ">
                  <div>
                    <div style="font-size:x-small;">kgCO<sub>2</sub>eq</div>
                    <div class=number_placeholder v-html="format(Global.TotalGHG())"></div>
                  </div>
                </div>
              </td>

              <!--total energy consumption-->
              <td style="text-align:center">
                <div style="color:white">kWh</div>
                <div class=number_placeholder style="margin:auto">
                  {{format(Global.TotalNRG())}}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,

  style:`
    <style>
      #summary_ghg {
        background:#f6f6f6;
      }
      #summary_ghg table {
        border-collapse:separate;
        border-spacing:3px;
      }
      #summary_ghg table th,
      #summary_ghg table td {
        border:none;
        background:inherit;
      }
      #summary_ghg div.number_placeholder {
        width:150px;
        font-size:large;
        font-weight:bold;
        padding:0.5em 0;
        background:white;

        border:1px solid var(--color-level-generic);
        color:var(--color-level-generic);
        margin:0 1px;
      }
    </style>
  `
});
