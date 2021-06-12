let ipcc_categories = new Vue({
  el:'#ipcc_categories',
  data:{
    visible:false,
    Languages,
  },
  methods:{
    translate,
  },
  template:`
    <div id=ipcc_categories v-if="visible && Languages.ready">
      <h2 style="text-align:center">
        IPCC categories work in progress
      </h2>

      <div style="text-align:center">
        <a href="backend/ipcc_categories.js" target=_blank>
          backend file in development
        </a>
      </div>
    </div>
  `,

  style:`
    <style>
      #ipcc_categories {
      }
    </style>
  `,
});
