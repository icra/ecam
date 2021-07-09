let more=new Vue({
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

  template:`
    <div id=more v-if="visible && Languages.ready">
      <h2 style="text-align:center">
        {{translate("More")}}
      </h2>

      <div id=buttons>
        <div class=button onclick="ecam.show('about')"            >{{translate('about ecam')           }}</div>
        <div class=button onclick="ecam.show('faqs')"             >{{translate('FAQs')                 }}</div>
        <div class=button onclick="ecam.show('diagram')"          >{{translate('Flow diagram')         }}</div>
        <div class=button onclick="ecam.show('non_revenue_water')">{{translate('non_revenue_water')    }}</div>
        <div class=button onclick="ecam.show('equations')"        >{{translate('equations')            }}</div>
        <div class=button onclick="ecam.show('constants')"        >{{translate('all_constants')        }}</div>
        <div class=button onclick="ecam.show('tables')"           >{{translate('Data tables')          }}</div>
        <div class=button onclick="ecam.show('benchmarks')"       >{{translate('benchmarks')           }}</div>
        <div class=button onclick="ecam.show('docs')"             >{{translate('Scientific literature')}}</div>
        <!--
          <div class=button onclick="ecam.show('ipcc_categories')">  IPCC categories</div>
        -->
      </div>
    </div>
  `,

  style:`
    <style>
      #more{
      }
      #more #buttons{
        width:50%;
        margin:auto;
        display:grid;
        grid-template-columns:repeat(2,1fr);
        grid-gap:1% 2%;
      }
      #more #buttons div.button {
        color:white;
        background-image:url("frontend/img/more/btn-bg.png");
        background-size:cover;
        text-align:center;
        padding:2em;
        border:none;
        border:3px solid white;
      }
      #more #buttons div.button:hover {
        border:3px solid var(--color-level-generic-secondary);
      }
    </style>
  `,
});
