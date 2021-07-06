//-----------------------------------------------------------------------------
// tutorial tips
//-----------------------------------------------------------------------------
Vue.component('tutorial_tip',{
  props:[
    'id',
    'title',
    'text',
  ],

  template:`
    <div
      v-if="visible && Languages.ready && is_visible()"
      class=tutorial_tip
    >
      <div style="padding:1em">
        <div style="text-align:left">
          <b>Tip: {{title}}</b>
        </div>
        <div v-html="text"></div>
      </div>
      <div style="text-align:center">
        <button @click="dismiss()" class=dismiss_tip>
          Ok
        </button>
        <button @click="dismiss_all_tips()" class=dismiss_all_tips>
          dismiss all tips
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

  methods:{
    is_visible(){
      return (
        landing.include_tutorial_tips &&
        landing.tutorial_tips_dismissed.indexOf(this.id)==-1
      );
    },

    dismiss(){
      landing.tutorial_tips_dismissed.push(this.id);
    },

    //close/disable/dismiss all tips
    dismiss_all_tips(){
      landing.include_tutorial_tips=false;
    },
  },
});
