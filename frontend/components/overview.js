let overview = new Vue({
  el:"#overview",
  data:{
    visible:false,
    Languages,
  },

  methods:{
  },

  template:`
    <div id=overview v-if="visible && Languages.ready">
      <p style="text-align:center">
        <i>Click a tab in the menu above.</i>
      </p>
    </div>
  `,
});
