//-----------------------------------------------------------------------------
// table that lists inputs involved in a formula
//-----------------------------------------------------------------------------
Vue.component('inputs_involved_table',{
  template:`<div>
    <table class=inputs_involved>
      <tbody v-for="match in Formulas.ids_per_formula(obj[code].toString())">
        <!--input involved is a constant-->
        <tr v-if="Cts[match]" :title="'CONSTANT: '+Cts[match].descr">
          <!--involved constant code-->
          <td>
            <a
              style="color:grey;font-weight:bold"
              @click="constant.view(match)"
              v-html="match"
            ></a>
          </td>
          <!--involved constant value-->
          <td class=number :title="Cts[match].value">{{ format(Cts[match].value) }}</td>
          <!--involved constant unit-->
          <td class=unit v-html="translate(Cts[match].unit,true).prettify()"></td>
        </tr>

        <!--input involved is an Option-->
        <tr v-else-if="Info[match] && Info[match].magnitude=='Option' && Info[match].table">
          <!--input involved code-->
          <td :title="translate(match+'_descr')">
            <a @click="variable.view(match)" :style="{color:get_level_color(locate_variable(match).level)}">{{match}}</a>
          </td>

          <!--involved input Option value-->
          <td style="text-align:right">
            <div v-if="!locate_variable(match).sublevel">
              Tables.get_row(Info[match].table, locate_variable(match).stage[match]).name
            </div>
            <div v-else>
              {{
                locate_variable(match).stage.map(ss=>(
                  Tables.get_row(Info[match].table, ss[match]).name
                ))
              }}
            </div>
          </td>

          <!--unit-->
          <td class=unit v-html="translate(Info[match].unit,true).prettify()"></td>
        </tr>

        <!--input involved is a normal one (input or output)-->
        <tr v-else>
          <td :title="translate(match+'_descr')">
            <a @click="variable.view(match)" :style="{color:get_level_color(locate_variable(match).level)}">{{match}}</a>
          </td>

          <!--input involved is an input-->
          <td v-if="get_variable_type(match)=='input'" style="text-align:right">
            <div v-if="!locate_variable(match).sublevel">
              {{
                format(locate_variable(match).stage[match])
              }}
            </div>
            <div v-else>
              {{
                locate_variable(match).stage.map(ss=>(
                  format(ss[match])
                ))
              }}
            </div>
          </td>

          <!--input involved is an output-->
          <td v-if="get_variable_type(match)=='output'" style="text-align:right">
            <div v-if="!locate_variable(match).sublevel">
              {{ format(get_output_value(match,locate_variable(match).stage)) }}
            </div>
            <div v-else>
              {{
                locate_variable(match).stage.map(ss=>(
                  format(get_output_value(match, ss))
                ))
              }}
            </div>
          </td>

          <!--unit-->
          <td v-if="get_variable_type(match)=='input'" class=unit v-html="translate(get_base_unit(match),true).prettify()"></td>
          <td v-else class=unit v-html="Info[match] ? translate(Info[match].unit,true).prettify() : translate('no unit')"></td>
        </tr>
      </tbody>

      <tbody
        v-for="tablename,i in Formulas.tables_per_formula(obj[code].toString())"
      >
        <tr v-if="i==0">
          <td style="padding-top:20px">
            <b>
              {{translate("Tables involved")}}
              (<a href=# onclick="ecam.show('tables')">
                {{translate("see all data tables")}}
              </a>)
            </b>
          </td>
        </tr>

        <tr
          v-if="tablename=='Fuel type'"
          style="color:green"
        >
          <td colspan=3>
            <table class=related_data_table>
              <thead>
                <tr>
                  <td rowspan=2>{{translate('fuelInfo_type')}}</td>
                  <td colspan=2>EF<sub>CH<sub>4</sub></sub> (kg/TJ)</td>
                  <td colspan=2>EF<sub>N<sub>2</sub>O</sub> (kg/TJ)</td>
                  <td rowspan=2>EF<sub>CO<sub>2</sub></sub> (kg/TJ)</td>
                  <td rowspan=2 style=cursor:help :title="translate('fuelInfo_fd')">FD   (kg/L)</td>
                  <td rowspan=2 style=cursor:help :title="translate('fuelInfo_ncv')">NCV (TJ/Gg)</td>
                </tr>
                <tr>
                  <td>{{translate('fuelInfo_engines')}}</td>
                  <td>{{translate('fuelInfo_vehicles')}}</td>
                  <td>{{translate('fuelInfo_engines')}}</td>
                  <td>{{translate('fuelInfo_vehicles')}}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="fuel in Tables['Fuel type']">
                  <td>{{translate(fuel.name)}}</td>
                  <td class=number>{{fuel.EFCH4.engines}}</td>
                  <td class=number>{{fuel.EFCH4.vehicles}}</td>
                  <td class=number>{{fuel.EFN2O.engines}}</td>
                  <td class=number>{{fuel.EFN2O.vehicles}}</td>
                  <td class=number>{{fuel.EFCO2}}</td>
                  <td class=number>{{fuel.FD}}</td>
                  <td class=number>{{fuel.NCV}}</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr v-else>
          <td colspan=3>
            <!--render data table-->
            <table class=related_data_table>
              <tr>
                <th colspan=100 style="background:var(--color-level-generic);text-align:left">
                  {{tablename}}
                </th>
              </tr>
              <tr v-for="row in Tables[tablename]">
                <td v-for="obj,key in row">
                  <b>{{key}}</b>:
                  <span v-if="typeof(obj)=='string'">
                    "{{translate(obj)}}"
                  </span>
                  <span v-else>
                    {{obj}}
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>`,

  props:[
    'obj',
    'code',
  ],

  data:function(){
    return{
      variable,
      constant,

      Info,
      Tables,
      Formulas,
      Cts,
    };
  },

  methods:{
    translate,
    format,
    get_level_color,
    locate_variable,
    get_variable_type,
    get_output_value,
    get_base_unit,
  },
});
