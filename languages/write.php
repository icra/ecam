<?php

//Current language is in COOKIE "lang". Default is english ($lang="en")
$lang=isset($_COOKIE['lang']) ? $_COOKIE['lang'] : "en" ;

//load selected language
$lang_file=$lang=="null" ? file_get_contents("languages/en.json") : file_get_contents("languages/$lang.json");
$lang_json=json_decode($lang_file,true);

if($lang_json==NULL && $lang!="null") {
  echo "
    <script>
      var $lang=$lang_file;
    </script>";
  die("Error in $lang.json file. Paste the $lang.json file <a href='https://jsonformatter.curiousconcept.com/'>here</a> find the error.");
}

//use $lang_json to fetch $id inside file "$lang".json
//TRANSLATE SERVER SIDE
function write($id) {
	global $lang;global $lang_json;

  if($lang=="null") { echo "[$id]"; }
  else {
    //find text or display [not found]
    $text = isset($lang_json[$id]) ? $lang_json[$id] : "['$id' tag missing in '$lang' language]";
    echo $text;
  }
}
?>

<?php
	//TRANSLATE (CLIENT SIDE)
	if($lang!="null") { 
		?>
			<script><?php echo "var lang=$lang_file;"?></script>
			<script>
				function translate(id){
					return lang['#'+id] || false;
				}
			</script>
		<?php 
	} else { 
		?>
			<script>
				function translate(id){
					return '#'+id
				}
			</script>
		<?php 
	}
?>
