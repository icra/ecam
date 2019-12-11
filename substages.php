<!doctype html><html><head>
  <?php include'imports.php'?>
</head><body>

<?php
  include'sidebar.php';     //sidebar
  include'navbar.php';      //navbar
  include'linear.php';      //linear
  include'caption.php';     //caption
  include'currentJSON.php'; //current json
?>

<!--vue template (ecam v3)-->
<div id=substages_overview>
  <!--title-->
  <h1 style=text-align:center>{{translate('Substages overview')}}</h1>

  <!--substages-->
  <table style=margin:auto>
    <!--name of sublevel-->
    <tr>
      <th v-for="l2 in Structure.filter(s=>s.sublevel)"
        :style="`background:${Structure.find(s=>(s.color&&s.level==l2.level)).color}`"
      >
        <a :href="`edit.php?level=${l2.level}&sublevel=${l2.sublevel}`"
          style="color:white"
        >
          {{translate(l2.sublevel)}}
        </a>
      </th>
    </tr>

    <!--list of substages-->
    <tr>
      <td v-for="l2 in Structure.filter(s=>s.sublevel)" >
        <table>
          <tr
            v-for="substage,i in Substages[l2.level][l2.sublevel]"
            style="border:1px solid"
          >
            <td>
              <a :href=`substage.php?level=${l2.level}&sublevel=${l2.sublevel}&index=${i}`>
                {{substage.name}}
              </a>
            </td>
          </tr>
        </table>
        <div v-if="Substages[l2.level][l2.sublevel].length==0">
          <span style=color:#666;font-size:12px>~{{translate('No substages')}}</span>
        </div>
      </td>
    </tr>
  </table>
</div>

<!--vue model (ecam v3)-->
<script>
  let substages_overview=new Vue({
    el:'#substages_overview',
    data:{
      Global,
      Substages,
      Structure,
    },
    methods:{
      translate,
    }
  });
</script>
