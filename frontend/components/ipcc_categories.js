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
        <a href="frontend/docs/2019-ipcc/1_Volume1/19R_V1_Ch08_Reporting_Guidance.pdf#page=9" target=_blank>
          Reference: Table 8.2 "Classification and definition of categories of emissions and removals"
        </a>
      </p>

      <!--categories summary-->
      <div style="
        display:grid;
        grid-template-columns:repeat(auto-fill, minmax(20rem,1fr))
      ">
        <div
          v-for="cat,code in IPCC_categories"
          :style="{background:cat.color}"
          class=category
        >
          <details open>
            <summary>
              <b><code>{{code}}</code></b>
              -
              {{cat.description}}
            </summary>
            <div style="padding-top:10px">
              <inputs_involved_table
                :obj="IPCC_categories[code]"
                :code="'emissions'"
                style="font-size:smaller"
              ></inputs_involved_table>
              <div style="padding-top:10px">
                Current value:
                {{format(cat.emissions(Global))}}
                kgCO<sub>2</sub>eq
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
        max-width:80%;
        margin:auto;
      }
      #ipcc_categories .category{
        padding:1em;
        margin:1px;
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
