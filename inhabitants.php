<!doctype html><html><head>
  <?php include'imports.php'?>
  <script>
    function init() {
      updateResult(); //update cookies
      Caption.listeners();
    }
  </script>
</head><body onload=init()>
<center>
<?php 
  include'sidebar.php';
  include'navbar.php';
  include'linear.php';
  include'caption.php';
?>
<!--title and subtitle-->
<h1><?php write('#population')?></h1>
<h4 style=margin:0;margin-bottom:1em>
  Enter the population living at each level of your system
</h4>

<!--main-->
<div id=main>
  <!--table-->
  <style>
    table#inputs th, #inputs td {text-align:left;}
    #inputs td.input {
      width:70px;
      border:1px solid #aaa;
      color:#666;
      background:#eee;
      padding:0 !important;
    }
    #inputs td.input input {
      background:inherit;
      border:none;
      text-align:right;
      cursor: cell;
      line-height:1em;
      width:70px;
      height:24px;
      display:block;
    }
    #inputs td.input input:focus {
      background:white;
    }
    #inputs tr.hidden {display:none}
    /**indication "not active"**/
    #inputs tr[indic]{
      text-align:center;color:#999;background:#eee;
      font-size:smaller;
    }
  </style>
  <table id=inputs style="font-size:16px;margin:1em;width:50%">
    <!--WATER-->
    <tr><th colspan=3 style=background:#0aaff1>
      <img src=img/water.png width=25 style="line-height:4em;vertical-align:middle"><?php write('#Water')?>
      <tr stage=water class=hidden><td><?php write('#ws_resi_pop_descr')?><td class=input><input id='ws_resi_pop'><td><small><?php write('#people')?>
      <tr stage=water class=hidden><td><?php write('#ws_serv_pop_descr')?><td class=input><input id='ws_serv_pop'><td><small><?php write('#people')?>
      <tr indic=water class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>
    </tr>
    <!--WASTE-->
    <tr><th colspan=3 style=background:#d71d24>
      <img src=img/waste.png width=25 style="line-height:4em;vertical-align:middle"> <?php write('#Waste')?>
      <tr stage=waste class=hidden><td><?php write('#ww_resi_pop_descr')?> <td class=input><input id='ww_resi_pop'> <td><small><?php write('#people')?>
      <tr stage=waste class=hidden><td><?php write('#wwc_conn_pop_descr')?><td class=input><input id='wwc_conn_pop'><td><small><?php write('#people')?>
      <tr stage=waste class=hidden><td><?php write('#wwt_serv_pop_descr')?><td class=input><input id='wwt_serv_pop'><td><small><?php write('#people')?>
      <tr indic=waste class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>
    </tr>
    <!--FAECL-->
    <tr><th colspan=3 style=background:green>
      <img src=img/faecl.png width=25 style="line-height:4em;vertical-align:middle"> <?php write('#Faecl')?>
      <tr stage=faecl class=hidden><td><?php write('#fs_resi_pop_descr')?> <td class=input><input id='fs_resi_pop'> <td><small><?php write('#people')?>
      <tr stage=faecl class=hidden><td><?php write('#fs_onsi_pop_descr')?> <td class=input><input id='fs_onsi_pop'> <td><small><?php write('#people')?>
      <tr indic=faecl class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>
    </tr>
  </table>
</div>

<!--prev next-->
<div>
  <button class="button prev" onclick="event.stopPropagation();window.location='configuration.php'">
    <?php write('#previous')?>
  </button>
  <button class="button next" onclick="event.stopPropagation();window.location='birds.php'">
    <?php write('#next')?>
  </button>
</div>
<!--CURRENT JSON--><?php include'currentJSON.php'?>

<script>
  //populate page onload
  (function updateDefaults() {
    var inputs=document.querySelectorAll('#inputs tr[stage] input[id]');

    for(var i=0;i<inputs.length;i++) {
      var input = inputs[i];
      var field = input.id;

      //set the longer description in the input <td> element
      var prnt=input.parentNode.parentNode.childNodes[0];
      try{
        prnt.setAttribute('caption',translate(field+'_expla'));
      } catch(e){ console.log(prnt) }

      //the value we are going to put in the input

      var value = getVariable(field)/Units.multiplier(field);

      //set the value
      input.value=format(value);
    }
  })();

  Caption.listeners();

  (function showActive() {
    ['water','waste','faecl'].forEach(function(stage) {
      if(Global.Configuration.ActiveStages[stage]) {
        var trs=document.querySelectorAll('#inputs tr[stage='+stage+']');
        for(var i=0;i<trs.length;i++)
          trs[i].classList.remove('hidden');
      }else{
        document.querySelector('#inputs tr[indic='+stage+']').classList.remove('hidden');
      }
    });
  })();

  //add event listeners to inputs
  (function(){
    var els=document.querySelectorAll('#inputs input[id]');
    for(var i=0; i<els.length; i++){
      els[i].addEventListener('change',function(){
        //get info from the input element
        var field = this.id;
        var value = parseFloat(this.value); //convert string to float
        value*=Units.multiplier(field);

        //if value is not a number, set to zero
        if(isNaN(value))value=0;

        //locate variable
        var loc = locateVariable(field);
        if(loc.sublevel){
          Global[loc.level][loc.sublevel][field]=value;
        }else if(loc.level){
          Global[loc.level][field]=value;
        }else{
          alert('field '+field+' undefined');return;
        }

        //end
        init();
      });
      els[i].addEventListener('focus', function(){ this.value=getVariable(this.id); this.select() });
      els[i].addEventListener('blur',  function(){ this.value=format(getVariable(this.id)) });
      els[i].addEventListener('click', function(){ this.select() });
    }
  })();

  //first input fake click depending on active stages
  (function(){
    var first=(function(){
      if(Global.Configuration.ActiveStages.water)
        return document.querySelector('#inputs tr[stage=water] td.input input[id]');
      if(Global.Configuration.ActiveStages.waste)
        return document.querySelector('#inputs tr[stage=waste] td.input input[id]');
      if(Global.Configuration.ActiveStages.faecl)
        return document.querySelector('#inputs tr[stage=faecl] td.input input[id]');
    })();
    if(first && getVariable(first.id)==0){
      first.dispatchEvent(new CustomEvent('click'));
    }
  })();
</script>
