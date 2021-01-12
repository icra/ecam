<!--standalone floating caption element-->
<div id=caption style=display:none>#caption</div>

<script>
  let caption=document.querySelector("#caption"); //DOM element
  let Caption={};//namespace

  Caption.show=function(ev,element){
    caption.style.display='';
    caption.style.left=(ev.clientX-10)+"px";
    caption.style.top=(ev.clientY+15)+"px";
    caption.innerHTML=element.getAttribute('caption');
  };

  Caption.hide=function(){
    caption.style.display='none';
  };

  //add mouse listeners, to be called when html loads (<body onload>)
  Caption.listeners=function() {
    let els=document.querySelectorAll("[caption]");
    for(let i=0;i<els.length;i++){
      els[i].addEventListener('mousemove',function(e){Caption.show(e,this)});
      els[i].addEventListener('mouseout',function(){Caption.hide()});
    }
  };
</script>

<style>
  div#caption {
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
