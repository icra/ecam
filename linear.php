<!--main menu for navigation at the top-->

<!--vue template ecam v3-->
<div id=linearDiagram v-if="visible" class=flex>
  <!--general info-->
  <div>
    <div>
      <a style="color:inherit">
        {{translate('getStarted_general_info')}}
      </a>
    </div>
    <img class=l1 src=img/getStarted.png :caption="translate('getStarted_general_info')">
  </div>

  <!--configuration-->
  <div>
    <div>
      <a style="color:inherit">
        {{translate('configuration')}}
      </a>
    </div>
    <img class=l1 src=img/dashboard.png :caption="translate('configuration')">
  </div>

  <!--population-->
  <div>
    <div>
      <a style="color:inherit">
        {{translate('population')}}
      </a>
    </div>
    <img class=l1 src=img/inhabitants.png :caption="translate('population')">
  </div>

  <!--tier A-->
  <div>
    <div>
      <a style="color:inherit" v-html="translate('tier_A')"></a>
    </div>
    <img class=l1 src=img/birds.png :caption="translate('tier_A')">
  </div>

	<!--tier B-->
  <div>
    <div>
      <span style="color:inherit"
        v-html="translate('tier_B')"
      ></span>
    </div>
    <img v-for="l2 in Structure.filter(s=>s.sublevel)"
      class=l2
      :stage="l2.alias"
      :caption="translate(l2.sublevel)"
      :src="`img/${l2.alias}${Global.Configuration.ActiveStages[l2.alias]?'':'-off'}.png`"
      @click="go_to_edit(l2)"
    >
  </div>

  <!--summaries and opps-->
  <div class=flex>
    <!--Summaries-->
    <div>
      <div>
        <span style="color:inherit">
          {{translate('summaries')}}
        </span>
      </div>
      <img class=l1 src=img/sources.png :caption="translate('ghg_summary')">
      <img class=l1 src=img/energy.png  :caption="translate('nrg_summary')">
    </div>

    <!--Opportunities-->
    <div>
      <div>
        <a style="color:inherit">
          {{translate('opportunities')}}
        </a>
      </div>
      <img class=l1 src=img/opps.png :caption="translate('opportunities')">
    </div>
  </div>
</div>

<!--css-->
<style>
  #linearDiagram {
    background:#f5f5f5;
    background:linear-gradient(#f5f5f5,#ddd);
    border-bottom:1px solid #e5e5e5;
    padding:0.4em 0 0.2em 0;
    box-shadow:0 1px 2px rgba(0,0,0,.5);
  }
  #linearDiagram > div {
    margin:0 4px;
    font-size:12px;
    vertical-align:middle;
    padding:0.2em;
    border-radius:0.5em;
    color:rgba(0,0,0,0.55);
  }
  #linearDiagram > div:hover {
    background:#e6e6e6;
    color:black;
  }
  #linearDiagram img[class=l1]:hover,
  #linearDiagram img[class=l2]:hover {
    border:3px solid #9fc231;
  }
  #linearDiagram img {position:relative;z-index:2;vertical-align:middle;padding:0;} /*icons inside buttons to navigate to Level2*/
  #linearDiagram img.l1 {width:42px;}
  #linearDiagram img.l2 {width:42px;}
  #linearDiagram img{border-radius:90%;border:3px solid transparent;}
  #linearDiagram img.selected{border:3px solid #9fc231;}
  #linearDiagram a:hover {text-decoration:none;}
</style>

<!--vue model ecam v3-->
<script>
  let linearDiagram=new Vue({
    el:'#linearDiagram',
    data:{
      Global,
      Structure,
      visible:true,
    },
    methods:{
      translate,
      go_to_edit(l2){
        if(Global.Configuration.ActiveStages[l2.alias]){
          window.location=`edit.php?level=${l2.level}&sublevel=${l2.sublevel}`;
        }
      }
    },
  });
</script>
