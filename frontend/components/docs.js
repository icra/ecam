let docs=new Vue({
  el:"#docs",
  data:{
    visible:false,
    Languages,
  },

  template:`
    <div id=docs v-if="visible && Languages.ready">
      <iframe
        src="frontend/docs/"
        style="
          width:100%;
          height:1000px;
          border:none;
        "
      ></iframe>
    </div>
  `,
});
