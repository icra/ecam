<!doctype html><html><head>
<?php include'imports.php'?>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--><?php include'linear.php'?>
<!--TITLE--><h1 style=color:black>
  Developer tool:
  translation problems finder
  &mdash;
  Current language: 
  <span style=color:black;font-weight:bold>
    <?php echo $lang ?>
  </span>
</h1>

<?php
  //solve problems if "null" is selected
  if($lang=="null")$lang="en";
?>

<!--description-->
<p>
  This page compares the 
  <a target=_blank href="languages/en.json">en.json</a> (used for development)
  against the 
  <a target=_blank href="languages/<?php echo $lang?>.json"><?php echo $lang?>.json</a> 
  file (the current selected language by the user)
</p>
<ul style=max-width:50%;text-align:left>
  <li>
    Language tags: <b><?php echo count($lang_json)?></b>
  <li>
    To list not used tags: run the <a href="languages/findNotUsed.sh">findNotUsed.sh</a> bash script from the command line.
  <li> 
    Duplicated tags:
    <?php
      function countLines($file){
        $linecount = 0;
        $handle=fopen($file,"r");
        while(!feof($handle)){
          $line=fgets($handle);
          $linecount++;
        }
        fclose($handle);
        return $linecount;
      }
      function compareFiles($file1,$file2){
        global $lang;
        $f1=countLines($file1);
        $f2=countLines($file2);
        if($f1!=$f2){
          echo "<ul>
            <li>$file1: $f1 lines
            <li>$file2: $f2 lines 
            <li> Paste the <a target=_blank href='languages/$lang.json'>$lang.json</a> file <a target=_blank href='https://jsonformatter.curiousconcept.com/'>here</a> to find duplicates.
          </ul>
          ";
        }else{
          echo "<span style=background:#af0>No duplicated tags found &#128515;</a>";
        }
      }
      compareFiles("languages/en.json","languages/$lang.json");
    ?>
  <li>
    <span style="background:red;color:black;">
      Other problems found:
      <span id=problems_counter>0</span>
    </span>
</ul>

  

<!--problems found-->
<table style=font-family:monospace>
  <tr><th>Missing tags in "<?php echo "$lang.json"?>"<th>English text (currently not translated in "<?php echo "$lang.json"?>")
  <?php
    error_reporting(E_ALL^E_NOTICE);

    function updateCounter($problems){
      echo "<script>
        document.body.onload=function(){
          var pc=document.querySelector('#problems_counter');
          pc.innerHTML='<b>$problems</b>';
          if($problems==0){
            pc.parentNode.style.background='#af0';
          }
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
