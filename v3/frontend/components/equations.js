let equations = new Vue({
  el:"#equations",
  data:{
    visible:false,
    variable,
    Languages,
    Global,
    Structure,
    Formulas,
    Estimations,
    References,
  },

  methods:{
    translate,
    get_base_unit,

    //see/hide all formulas
    fold_all(unfold){
      unfold=unfold||false;
      document.querySelectorAll('#equations table td details').forEach(el=>{
        if(unfold)
          el.setAttribute('open',unfold);
        else
          el.removeAttribute('open');
      });
    },
  },

  updated(){
    document.querySelectorAll(".prettyprinted").forEach(el=>{
      el.classList.remove('prettyprinted');
    });
    this.$nextTick(function() {
      PR.prettyPrint();
    });
  },

  template:`
    <div id=equations v-if="visible && Languages.ready">
      <h1 style="padding-left:0" id=title>
        Equations and Estimations
        <span>
          <button @click="fold_all(true)">See all formulas</button>
          <button @click="fold_all()">Hide all formulas</button>
        </span>
      </h1>

      <details open>
        <summary>Equations</summary>
        <div>
          <table style="margin:8px">
            <tbody
              v-for="stage in Structure.filter(s=>s.sublevel)"
              :id="stage.level+'_'+stage.sublevel"
              v-if="Global[stage.level][stage.sublevel].length"
            >
              <tr>
                <th :style="{background:stage.color}">
                  {{translate(stage.level)}} /
                  {{translate(stage.sublevel)}}
                  &mdash;
                  <a href=#title style="color:black">[&uarr; go top]</a>
                </th>
                <th :style="{background:stage.color}">Formula (code)</th>
                <th :style="{background:stage.color}">Reference</th>
              </tr>

              <tr
                v-for="key in Object.getOwnPropertyNames(stage.class.prototype).filter(key=>key!='constructor')"
              >
                <td :title="translate(key+'_expla')">
                  <div>
                    {{translate(key+'_descr')}}
                  </div>
                  <a href=# @click="variable.view(key)">
                    {{key}}
                  </a>
                </td>
                <!--code-->
                <td>
                  <details>
                    <summary>see/hide</summary>
                    <div style="padding-top:1em">
                      <b>Formula:</b>
                      <pre
                        class=prettyprint
                        v-html="Formulas.prettify(Global[stage.level][stage.sublevel][0][key].toString())"
                      ></pre>
                      <b>Involved inputs:</b>
                      <div>
                        <inputs_involved_table
                          :code="key"
                          :obj="Global[stage.level][stage.sublevel][0]"
                        >
                        </inputs_involved_table>
                      </div>
                    </div>
                  </details>
                </td>
                <!--equation reference-->
                <td>
                  <div v-if="References[key]">
                    <code>
                      <ul>
                        <li v-if="References[key].ref">
                          <b>ref</b>: {{References[key].ref}}
                        </li>
                        <li v-if="References[key].link">
                          <b>link</b>: <a target=_blank :href="References[key].link">{{References[key].link}}</a>
                        </li>
                      </ul>
                    </code>
                  </div>
                  <div v-else>
                    <span style="color:#aaa">
                      ~reference missing
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      <details open>
        <summary>Estimations</summary>
        <div>
          <table style="margin:8px">
            <tr
              style="
                background:var(--color-level-generic);
                color:white;
              "
            >
              <th>Id
              <th>Formula (code)
              <th>Reference
            </tr>
            <tr v-for="obj,key in Estimations">
              <!--estimation key-->
              <th>
                <div>
                  {{translate(key+'_descr')}}
                </div>
                <a href=# @click="variable.view(key)">
                  {{key}}
                </a>
              </th>
              <!--estimation formula-->
              <td>
                <details>
                  <summary>see/hide</summary>
                  <div style="padding-top:1em">
                    <b>Formula:</b>
                    <pre
                      class=prettyprint
                      v-html="Formulas.prettify(obj.toString())"
                    ></pre>
                    <b>Involved inputs:</b>
                    <div>
                      <inputs_involved_table
                        :code="key"
                        :obj="Estimations"
                      >
                      </inputs_involved_table>
                    </div>
                  </div>
                </details>
              </td>
              <!--estimation reference-->
              <td>
                <div v-if="References[key]">
                  <code>
                    <ul>
                      <li v-if="References[key].ref">
                        <b>ref</b>: {{References[key].ref}}
                      </li>
                      <li v-if="References[key].link">
                        <b>link</b>: <a target=_blank :href="References[key].link">{{References[key].link}}</a>
                      </li>
                    </ul>
                  </code>
                </div>
                <div v-else>
                  <span style="color:#aaa">
                    ~reference missing
                  </span>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </details>
    </div>
  `,

  style:`
    <style>
      #equations {
        padding:1em;
      }
      #equations table th {
        text-align:left;
      }
      #equations table td {
        vertical-align:top;
      }
      #equations details summary {
        cursor:pointer;
        font-size:larger;
      }
      #equations details > div{
        margin-left:8px;
      }
      #equations table {
        max-width:100%;
      }
    </style>
  `,
});
