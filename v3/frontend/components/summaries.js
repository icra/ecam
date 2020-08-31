let summaries= new Vue({
  el:"#summaries",

  data:{
    visible:false,

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
    get_variable_value,

  },

  template:`
    <div id=summaries v-if="visible && Languages.ready">
      <ul>
        <li>
          <a href=# onclick="ecam.show('summary_ghg');">
            GHG summary
          </a>
        </li>
        <li>
          <a href=# onclick="ecam.show('summary_nrg');">
            Energy summary
          </a>
        </li>
        <li>
          <a href=# onclick="ecam.show('emission_tree');">
            All GHG emissions
          </a>
        </li>
        <li>
          <a href=# onclick="ecam.show('report');">
            Report
          </a>
        </li>
      </ul>
    </div>
  `,
});
