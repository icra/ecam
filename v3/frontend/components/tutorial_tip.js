//-----------------------------------------------------------------------------
// tutorial tips
//-----------------------------------------------------------------------------
Vue.component('tutorial_tip',{
  props:[
    'title',
    'text',
  ],

  template:`
    <div
      v-if="visible && Languages.ready"
      class=tutorial_tip
    >
      <div style="padding:1em">
        <div style="text-align:left">
          <b>Tip: {{title}}</b>
        </div>
        <div v-html="text"></div>
      </div>
      <div>
        <button @click="visible=false" class=dismiss_tip>
          Ok
        </button>
      </div>
    </div>
  `,

  data(){
    return{
      visible:true,
      Languages,
    };
  },

  methods:{/*TODO*/},
});
