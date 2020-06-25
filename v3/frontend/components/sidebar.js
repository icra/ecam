let sidebar = new Vue({
  el:"#sidebar",

  data:{
    visible:false,

    Global,
    Structure,
  },

  methods:{
    translate,
    go_to,
    get_height(){
      return document.querySelector("#ecam_logo").offsetHeight;
    },
  },

  template:`
    <div id=sidebar v-if="visible" :style="'top:'+get_height()+'px'">
      <!--sidebar system name-->
      <div class="header flex" style="padding:5px;justify-content:space-between">
        <div>{{translate("sidebar_mainMenu")}}</div>
        <div>{{Global.General.Name}}          </div>
      </div>

      <!--sidebar open save buttons-->
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

      <!--sidebar sections-->
      <ul>
        <!--sidebar summaries section-->
        <li class=section>
          <div class=header>sidebar section title</div>
          <ul>
            <li class=item><a onclick="ecam.show('about')">       {{translate('about')            }}       </a></li>
            <li class=item><a onclick="ecam.show('help')">        {{translate('help')             }}       </a></li>
            <li class=item><a onclick="ecam.show('population')">  {{translate('population')       }}       </a></li>
            <li class=item><a onclick="ecam.show('constants')">   {{translate('all_constants')    }}       </a></li>
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

  style:`
    <style>
      #sidebar{
        position:absolute;
        left:0;
        z-index:998;
        background:white;
        padding:0;
        margin:0;
        box-shadow: 5px 10px 15px 5px rgba(0,0,0,.1);
        overflow:auto;
        border-right:2px solid #ccc;
        border-top:1px solid #ccc;
        text-align:left;
        height:100%;
      }
      #sidebar ul{
        list-style-type:none;
        padding:0;
        margin:0;
      }
      #sidebar li.section{
        padding:0;
      }
      #sidebar .header{
        color:white;
        background:var(--color-level-generic);
        padding:0.35em;
      }
      #sidebar li.item{
        padding:0.35em;
        padding-left:0.5em;
        border-bottom:1px solid #aaa;
      }
      #sidebar li.item-l2{
        padding-left:1em;
      }
      #sidebar a {
        cursor:pointer;
      }
    </style>
  `,
});

//clicking anywhere hides sidebar
document.documentElement.addEventListener('click',function(){
  sidebar.visible=false;
});

//ESC key hides the sidebar
document.documentElement.addEventListener('keydown',function(ev){
  if(ev.which==27){
    sidebar.visible=false;
  }
});
