<!--set of grouped buttons-->

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
	/** make pressed button look active*/
	function buttonsGraph(button)
	{
		var isActive=button.classList.contains('active');
		var others=document.querySelectorAll("div.buttonsGraph button")
		for(var i=0;i<others.length;others[i++].classList.remove('active')){}
		if(!isActive)
		{
			button.classList.add('active');
		}else{
			button.classList.remove('active');
		}
	}
</script>

<div class=buttonsGraph><!--
	--><button class="left active" onclick="buttonsGraph(this);Graphs.graph4(false,'graph')">GHG</button><!--
	--><button class="middle"      onclick="buttonsGraph(this);Graphs.graph7(false,'graph')">Energy consumed</button><!--
	--><button class="middle"      onclick="buttonsGraph(this);Graphs.wsa_KPI_std_nrg_cons(false,'graph')">Std nrg consumed</button><!--
	--><button class="right"       onclick="buttonsGraph(this);document.querySelector('#graph').innerHTML='under development'">Water efficiency</button><!--
	-->
</div>
