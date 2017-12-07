<!doctype html><html><head>
<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--><?php include'linear.php'?>
<!--TITLE--><h1 style=color:black>
  <b>Automatic translation problems finder</b>
  &mdash;
  Current language: 
  <span style=color:black>
    <?php echo $lang ?>
  </span>
</h1>

<!--description-->
<code>
  This page compares the 
  <a href="languages/en.json">en.json</a> (english file)
  file with the 
  <a href="languages/<?php echo $lang?>.json"><?php echo $lang?>.json</a> 
  file
  (selected language)
</code>
<br>
<code>
  To get a list of not used tags run the <a href="languages/findNotUsed.sh">findNotUsed.sh</a> bash script from the command line
</code>

<!--show number of tags-->
<p>
  Number of language tags: <b><?php echo count($lang_json)?></b>
</p>

<!--problems counter-->
<p>
  <span style="background:red;color:black;">
    Total problems found:
    <span id=problems_counter>0</span>
  </span>
</p>
  
<!--problems found-->
<table style=font-family:monospace>
  <tr><th>Missing tags in "<?php echo "$lang.json"?>"<th>English Text
  <?php
    error_reporting(E_ALL^E_NOTICE);

    function updateCounter($problems){
      echo "<script>
        document.body.onload=function(){
          document.querySelector('#problems_counter').innerHTML='<b>$problems</b>'
        }
      </script>";
    }

    function compareCurrentLanguage(){
      global $lang_json;
      $en_lang_file=file_get_contents("languages/en.json");
      $en_lang_json=json_decode($en_lang_file,true);

      //counter for problems
      $problems=0;

      //look for missing tags in current language
      foreach($en_lang_json as $key=>$text){
        if(!$lang_json[$key]){
          echo "<tr>
            <td>$key
            <td><small>$text</small>
          </tr>";

          $problems++;
        }
      }


      //look for existing tags that are not existing in en.json
      echo '<tr><th>Not existing tags in "en.json"<th>Translated text (can be removed safely)';
      foreach($lang_json as $key=>$text){
        if(!$en_lang_json[$key]){
          echo "<tr>
            <td>$key
            <td><small>$text</small>
          </tr>";

          $problems++;
        }
      }

      //look for duplicated tags (removed)
      //NOTE: trying to add a duplicate on purpose fails, probably because json_decode already removes duplicates
      /*
      echo '<tr><th>Duplicated tags<th>Number of instances';
      $tags=[];
      foreach($lang_json as $key=>$text){
        $tags[]=$key;
      }
      $duplicated=array_count_values($tags);
      foreach($duplicated as $tag=>$n){
        if($n>1){
          echo "<tr>
            <td>$tag
            <td>$n
          </tr>";
          $problems++;
        }
      }
      */

      //update problems counter
      updateCounter($problems);
    }
    compareCurrentLanguage();
  ?>
</table>
