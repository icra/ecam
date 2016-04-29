<?php

/** GLOBALS */

//current
$lang = isset($_COOKIE['lang']) ? $_COOKIE['lang'] : "en" ;

//load language
include "$lang.php";

function write($id)
{
	global $Languages; //global object defined at each lang file, example "en.php"
	global $lang;

	//find text or display [not found]
	$text = isset($Languages[$lang][$id]) ? $Languages[$lang][$id] : "[ $id not found for lang $lang ]";

	echo $text;
}

?>
