<!--set of grouped buttons to display graphs in Level 2-->

<style>
  div.buttonsGraph               { text-align:center;font-size:19px;padding:0.5em 0}
  div.buttonsGraph button        { padding:0 10px 0 10px;border:1px solid #ccc;background:#f5f5f5;outline:none;}
  div.buttonsGraph button:hover  { background:#e6e6e6}
  div.buttonsGraph button.left   { border-radius:0.5em 0.0em 0.0em 0.5em; border-right-style:none}
  div.buttonsGraph button.right  { border-radius:0.0em 0.5em 0.5em 0.0em; }
  div.buttonsGraph button.middle { border-right-style:none}
  div.buttonsGraph button.active { background-color:#ccc;box-shadow:inset 0 2px 4px rgba(0,0,0,.15),0 1px 2px rgba(0,0,0,.05);}
</style>

<script>
  /*onclick listener*/
  function buttonsGraph(button) {
    var isActive=button.classList.contains('active');
    var others=document.querySelectorAll("div.buttonsGraph button")
    for(var i=0;i<others.length;others[i++].classList.remove('active')){}
    if(!isActive) {
      button.classList.add('active');
    }else{
      button.classList.remove('active');
    }
  }
</script>

<?php
  function getPrefix(){ //get current stage: wsa,wst,wsd,wwc,wwt or wwd
    global $level,$sublevel;
    if($sublevel){
      switch($level."-".$sublevel){
        case "Water-Abstraction" :return "wsa";break;
        case "Water-Treatment"   :return "wst";break;
        case "Water-Distribution":return "wsd";break;
        case "Waste-Collection"  :return "wwc";break;
        case "Waste-Treatment"   :return "wwt";break;
        case "Waste-Discharge"   :return "wwd";break;
        case "Faecl-Containment" :return "fsc";break;
        case "Faecl-Treatment"   :return "fst";break;
        case "Faecl-Reuse"       :return "fsr";break;
      }
    }else{
      switch($level){
        case "Water":return "ws";break;
        case "Waste":return "ww";break;
        case "Faecl":return "fs";break;
      }
    }
    return "nothing";
  }
?>

<div class=buttonsGraph><!--
  --><button class="left active" onclick="buttonsGraph(this);Graphs.ghg_by_stage(false,'graph','<?php echo getPrefix()?>')">
    <?php write('#GHG by type')?>
  </button><!--
  --><button class="right" onclick="buttonsGraph(this);Graphs.ghg_by_substage(false,'graph','<?php echo getPrefix()?>')">
    <?php write('#GHG by substage')?>
  </button>
</div>
