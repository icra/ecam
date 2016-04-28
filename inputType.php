<!--grouped buttons inside edit.php: [All|Water|Energy|GHG] -->
<!--CURRENTLY NOT USED-->

<style>
	span#inputType               { margin-left:1em;font-size:19px}
	span#inputType button        { padding:0 10px 0 10px;border:1px solid #ccc;background:#f5f5f5;outline:none;}
	span#inputType button:hover  { background:#e6e6e6}
	span#inputType button.left   { border-radius:0.5em 0.0em 0.0em 0.5em; border-right-style:none}
	span#inputType button.right  { border-radius:0.0em 0.5em 0.5em 0.0em; }
	span#inputType button.middle { border-right-style:none}
	span#inputType button.active { background-color:#ccc;box-shadow:inset 0 2px 4px rgba(0,0,0,.15),0 1px 2px rgba(0,0,0,.05);}
</style>

<script>
	/** make pressed button look like active*/
	function inputType(button)
	{
		var isActive = button.classList.contains('active')
		var others=document.querySelectorAll("span#inputType button")
		for(var i=0;i<others.length;others[i++].classList.remove('active')){}
		if(!isActive){button.classList.add('active')}
	}
</script>

<span id=inputType><!--
	--><button class="left active" onclick="inputType(this)">All</button><!--
	--><button class="middle"      onclick="inputType(this)">Water efficiency </button><!--
	--><button class="middle"      onclick="inputType(this)">Energy efficiency</button><!--
	--><button class="right"       onclick="inputType(this)">GHG emissions</button>
</span>
