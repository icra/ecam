<?php

//php called from javascript that returns a language field
//objective: make xmlhttprequests to have javascript variables inside php

//this loads all strings from the language
include'write.php';

$id = isset($_GET['id']) ? $_GET['id'] : false;

if(!$id) die('error');

//this variables are inside write.php
write("#$id");

?>
