let emission_tree = new Vue({
  el:"#emission_tree",

  methods:{
    format,
    translate,
  },

  data:{
    visible:false,
    Languages,
  },

  template:`
    <div id=emission_tree v-if="visible && Languages.ready">
      <summaries current_view=emission_tree></summaries>
      <h1>section removed (TODO delete view)</h1>
    </div>
  `,

  style:`
    <style></style>
  `,
});
