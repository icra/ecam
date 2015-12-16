<?php
	if(isset($_COOKIE['GLOBAL']))
	{
		?>
			<div style="color:white;background:black;padding:0.4em;text-align:right">
			<?php
				$global=json_decode($_COOKIE['GLOBAL'],true);
				$name=$global["General"]["Name"];
				$location=$global["General"]["Location"];
				echo "Editing: $name ($location)";
			?>
			</div>
		<?php
	}
?>
