let overview = new Vue({
  el:"#overview",
  data:{
    visible:false,
    Languages,
  },

  methods:{
    translate,
    format,
  },

  template:`
    <div id=overview v-if="visible && Languages.ready">
    </div>
  `,

  style:`
    <style>
      #overview {
      }
    </style>
  `,
});
