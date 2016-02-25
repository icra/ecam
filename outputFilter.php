
<!--grouped buttons inside edit.php [All | Per capita | Per serviced population| Per Authorized consumption | SSLL ]-->

| <span style="color:#aaa;font-size:11px">Filter</span>

<span id=outputFilter><!--
	--><button class="left active" onclick="outputFilter.filter('all',this)">All</button><!--
	--><button class="middle"      onclick="outputFilter.filter('capi',this)">Per capita</button><!--
	--><button class="middle"      onclick="outputFilter.filter('serv',this)">Per SP</button><!--
	--><button class="middle"      onclick="outputFilter.filter('auth',this)">Per Vol</button><!--
	--><button class="right"       onclick="outputFilter.filter('ssll',this)">Service Level Indicators</button>
</span>

<style>
	span#outputFilter button        { font-size:9px;padding:0 10px 0 10px;border:1px solid #ccc;background:#f5f5f5;outline:none;}
	span#outputFilter button:hover  { background:#e6e6e6}
	span#outputFilter button.left   { border-radius:0.5em 0.0em 0.0em 0.5em; border-right-style:none}
	span#outputFilter button.right  { border-radius:0.0em 0.5em 0.5em 0.0em; }
	span#outputFilter button.middle { border-right-style:none}
	span#outputFilter button.active { background-color:#ccc;box-shadow:inset 0 2px 4px rgba(0,0,0,.15),0 1px 2px rgba(0,0,0,.05);}
</style>

<script>
	var outputFilter =
	{
		//variables we want to see when button is pressed
		Water:
		{
			capi:['gE2w','wGHG1'],
			serv:['gE3w','wGHG2','wGHG4','wGHG6'],
			auth:['gE4w','wGHG3','wGHG5','wGHG7'],
			ssll:['wS1','wS2','wS3','wS4','wS5','wS6'],
		},
		Waste:
		{
			capi:['gE2ww','wwGHG1'],
			serv:['gE3ww','wwGHG2','wwGHG4','wwGHG6'],
			auth:['gE4ww','wwGHG3','wwGHG5','wwGHG7'],
			ssll:['wwS1','wwS2','wwS3','wwS4','wwS5'],
		},

		//inputs: category (string), button (pointer)
		filter:function(category,button)
		{
			//mark button
			this.setActive(button);

			//get outputs table
			var t=document.querySelector('#outputs')	
			//get rows 
			var rows=document.querySelectorAll('#outputs tr[field]')

			if(category=='all')
			{
				//show all rows and end
				for(var i=0;i<rows.length; rows[i++].style.display=''){}
				return;
			}

			//hide all rows
			for(var i=0; i<rows.length; rows[i++].style.display='none'){}

			//show only "level"."category" rows

			for(var i in this['<?php echo $level?>'][category])
			{
				var code = this['<?php echo $level?>'][category][i];
				document.querySelector('tr[field='+code+']').style.display=''
			}
		},

		setActive:function(button)
		{
			var isActive = button.classList.contains('active')
			var others=document.querySelectorAll("span#outputFilter button")
			for(var i=0;i<others.length;others[i++].classList.remove('active')){}
			if(!isActive){button.classList.add('active')}
		},

	}
</script>
