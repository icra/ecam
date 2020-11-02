let equations = new Vue({
  el:"#equations",
  data:{
    visible:false,
    variable,
    Languages,
    Global,
    Structure,
    Formulas,
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
      <h3 style="padding-left:0">
        Equations
        <span>
          <button @click="fold_all(true)">See all</button>
          <button @click="fold_all()">Hide all</button>
        </span>
      </h3>

      <div>
        Navigate
        <ul id=navigation>
          <li
            v-for="stage in Structure.filter(s=>s.sublevel)"
          >
            <a :href="'#'+stage.level+'_'+stage.sublevel">
              {{stage.level}} {{stage.sublevel}}
            </a>
          </li>
        </ul>
      </div>

      <table style="margin:8px">
        <tbody
          v-for="stage in Structure.filter(s=>s.sublevel)"
          :id="stage.level+'_'+stage.sublevel"
          v-if="Global[stage.level][stage.sublevel].length"
        >
          <tr>
            <th>
              {{translate(stage.level)}}
              /
              {{translate(stage.sublevel)}}
              &mdash;
              <a href=#navigation style="color:white">&uarr; go top</a>
            </th>
            <th>formula</th>
            <th>unit</th>
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
            <td>
              <details>
                <summary>see/hide</summary>
                <div style="padding-top:1em">
                  <b>Formula:</b>
                  <pre class=prettyprint v-html="Formulas.prettify(Global[stage.level][stage.sublevel][0][key].toString())"></pre>
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
            <td> <span v-html="get_base_unit(key).prettify()"></span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,

  style:`
    <style>
      #equations {
        padding:1em;
      }
      #equations table th {
        background:var(--color-level-generic);
        color:white;
        text-align:left;
      }
      #equations table td {
        vertical-align:top;
      }
      #equations details summary {
        cursor:pointer;
      }
    </style>
  `,
});
