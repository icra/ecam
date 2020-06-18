let get_started = new Vue({
  el:"#get_started",

  data:{
    visible:false,

    Global,
  },

  methods:{
    translate,
  },

  template:`
    <div id=get_started v-if="visible">
      <!--PREV&NEXT-->
      <div class=flex style="justify-content:center;margin-top:1em">
        <button class="button prev"
          onclick="event.stopPropagation();ecam.show('landing')">
          {{translate('previous')}}
        </button>
        <button class="button next"
          onclick="event.stopPropagation();ecam.show('configuration')">
          {{translate('next')}}
        </button>
      </div>
    </div>
  `,
});
