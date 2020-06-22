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

  style:`
    <style>
      #caption {
        position:fixed;
        z-index:999;
        background:white;
        padding:0.3em 0.5em;
        box-shadow: 1px 1px 1px 1px rgba(0,0,0,.1);
        border:1px solid #ccc;
        color:#666;
        text-align:left;
        max-width:400px;
      }
    </style>
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
