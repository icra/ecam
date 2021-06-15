let ipcc_categories = new Vue({
  el:'#ipcc_categories',
  data:{
    visible:false,
    Languages,

    Global,
    IPCC_categories,
  },
  methods:{
    translate,
    format,
  },
  template:`
    <div id=ipcc_categories v-if="visible && Languages.ready">
      <h2 style="text-align:center;padding-bottom:0">
        IPCC categories: all ECAM emissions sorted
      </h2>

      <!--reference-->
      <p style="text-align:center">
        <a href="http://localhost/ecam/v3/frontend/docs/2019-ipcc/1_Volume1/19R_V1_Ch08_Reporting_Guidance.pdf#page=9" target=_blank>
          Reference: Table 8.2 "Classification and definition of categories of emissions and removals"
        </a>
      </p>

      <!--categories summary-->
      <div>
        <div
          v-for="cat,code in IPCC_categories"
          :style="{background:cat.color}"
          class=category
        >
          <details>
            <summary>
              <b><code>{{code}}</code></b>
              -
              {{cat.description}}
            </summary>
            <div style="padding-top:10px">
              <inputs_involved_table
                :obj="IPCC_categories[code]"
                :code="'emissions'"
              ></inputs_involved_table>
              <div style="padding-top:10px">
                Total: {{format(cat.emissions(Global))}} kgCO<sub>2</sub>eq
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  `,

  style:`
    <style>
      #ipcc_categories {
        padding-left:1em;
        padding-right:1em;
        margin:auto;
      }
      #ipcc_categories .category{
        padding:1em;
        margin-bottom:1px;
      }
      #ipcc_categories summary {
        cursor:pointer;
      }
      #ipcc_categories .category table {
        background:white;
      }
    </style>
  `,
});
