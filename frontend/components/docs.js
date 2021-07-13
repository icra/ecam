let docs=new Vue({
  el:"#docs",
  data:{
    visible:false,
    Languages,
  },
  methods:{
    translate,
  },
  template:`
    <div id=docs v-if="visible && Languages.ready">
      <h3
        style="
          padding:2em 0.5em;
          background:#eff5fb;
          margin:0;
          font-size: 1.35em;
          font-weight: bold;
          color:black;
        "
      >
        ECAM
        {{translate("documents / scientific literature")}}
      </h3>

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
