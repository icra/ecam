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
        <div
          @click.prevent="unfolded^=true"
          class="see_more"
        >
          <div
            style="
              display:flex;
              justify-content:space-between;
            "
          >
            <div style="font-weight:bold">
              {{translate("Tip")}}: {{translate(title)}}
            </div>
            <div style="color:#666">
              <span v-if="!unfolded">{{translate("see more")}}</span>
              <span v-else          >{{translate("see less")}}</span>
            </div>
          </div>
        </div>
        <div v-if="unfolded" v-html="translate(text)" style="margin-top:5px"></div>
      </div>
      <div v-if="unfolded" style="text-align:center;padding-bottom:1em">
        <button @click.prevent="dismiss()" class=dismiss_tip>
          ok
        </button>
        <button
          @click.prevent="dismiss_all_tips()"
          class="dismiss_all_tips"
          v-html="translate('dismiss_all_tips')"
        ></button>
      </div>
    </div>
  `,

  data(){
    return{
      visible:true,
      unfolded:false,
      Languages,
    };
  },

  methods:{
    translate,

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
