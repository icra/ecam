let caption = new Vue({
  el:"#caption",

  template:`
    <div
      id=caption
      v-html="text"
      :style="visible?'':'display:none'"
    >
    </div>
  `,

  data:{
    visible:false,
    text:"caption text",
  },

  methods:{
    show(ev, new_text){
      ev.stopPropagation(); //prevent parent elements triggering show()
      if(new_text){
        this.text=new_text;
      }
      this.visible=true;
      let el=document.querySelector("#caption");
      el.style.left=(ev.clientX-10)+"px";
      el.style.top=(ev.clientY+15)+"px";
    },

    hide(){
      this.visible=false;
    },
  },
});
