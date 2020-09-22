let more = new Vue({
  el:"#more",
  data:{
    visible:false,
    Global,
    Structure,
    Languages,
  },
  methods:{
    translate,
    go_to,
  },

  style:`
    <style>
      #more{
      }
      #more ul{
        list-style:none;
      }
      #more li.section{
        padding:0;
      }
      #more .header{
        color:white;
        background:var(--color-level-generic);
        padding:0.35em;
      }
      #more li.item{
        padding:0.35em;
        padding-left:0.5em;
        border-bottom:1px solid #aaa;
      }
      #more li.item-l2{
        padding-left:1em;
      }
      #more a {
        cursor:pointer;
      }
    </style>
  `,

  template:`
    <div id=more v-if="visible && Languages.ready">
      <h3 style="text-align:center">
        Placeholder for ecam v3 development
      </h3>

      <!--diagram of stages rework for v3-->
      <div style=text-align:center>
        <b>
          Stages' rework diagram for making ecam v3 ipcc 2019 compliant
        </b>
        <img
          src="frontend/diagram/map.dot.svg"
          style="display:block;margin:auto;width:100%;border:1px solid #ccc"
        >
      </div>

      <!--open save buttons-->
      <div class=tab_buttons>
        <button class=left onclick="" disabled>
          {{translate('open')}}
        </button>
        <button class=right onclick="" disabled>
          {{translate('save')}}
        </button>
        <input type="file" id="loadfile" accept=".json"
          onchange="loadFile(event)" style="display:none">
      </div>

      <!--sections-->
      <ul style="width:70%;margin:auto;margin-bottom:10px">
        <!--summaries section-->
        <li class=section>
          <ul>
            <li class=item><a onclick="ecam.show('about')">       {{translate('about')            }}       </a></li>
            <li class=item><a onclick="ecam.show('help')">        {{translate('help')             }}       </a></li>
            <li class=item><a onclick="ecam.show('population')">  {{translate('population')       }}       </a></li>
            <li class=item><a onclick="ecam.show('constants')">   {{translate('all_constants')    }}       </a></li>
            <li class=item><a onclick="ecam.show('fuel_table')">  {{translate('Fuel types')       }}       </a></li>
            <li class=item><a onclick="ecam.show('development')"> {{translate('dev')              }}       </a></li>

            <li class=item><a onclick="alert('TODO')">            [TODO] {{translate('unfccc_categories')}}</a></li>
            <li class=item><a onclick="alert('TODO')">            [TODO] {{translate('all_substages')    }}</a></li>
            <li class=item><a onclick="alert('TODO')">            [TODO] {{translate('all_benchmarks')   }}</a></li>
            <li class=item><a onclick="alert('TODO')">            [TODO] {{translate('sidebar_export')   }}</a></li>
            <li class=item><a onclick="alert('TODO')">            [TODO] {{translate('Sankey diagram')   }}</a></li>
          </ul>
        </li>
      </ul>
    </div>
  `,
});
