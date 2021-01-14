let more=new Vue({
  el:"#more",
  data:{
    visible: false,
    Global,
    Structure,
    Languages,
  },
  methods:{
    translate,
    go_to,
  },

  template:`
    <div id=more v-if="visible && Languages.ready">
      <h2 style="text-align:center">
        More
      </h2>

      <!--sections-->
      <ul style="width:70%;margin:auto;">
        <!--summaries section-->
        <li class=section>
          <ul>
            <li class=item><a onclick="ecam.show('about')">              <div class=icon>&#9432;  </div> {{translate('about')               }}</a></li>
            <li class=item><a onclick="ecam.show('help')">               <div class=icon>&#128587;</div> {{translate('help')                }}</a></li>
            <li class=item><a onclick="ecam.show('diagram')">            <div class=icon>&#8605;  </div> Flow diagram                         </a></li>
            <li class=item><a onclick="ecam.show('constants')">          <div class=icon>&#8455;  </div> {{translate('all_constants')       }}</a></li>
            <li class=item><a onclick="ecam.show('benchmarks')">         <div class=icon>&#8542;  </div> {{translate('benchmarks')          }}</a></li>
            <li class=item><a onclick="ecam.show('fuel_table')">         <div class=icon>&#9981;  </div> {{translate('Fuel types')          }}</a></li>
            <li class=item><a onclick="ecam.show('non_revenue_water')">  <div class=icon>&#9810;  </div> {{translate('non_revenue_water')   }}</a></li>
            <li class=item><a onclick="ecam.show('equations')">          <div class=icon>&#8750;  </div> {{translate('equations')           }}</a></li>
            <li class=item><a onclick="ecam.show('tables')">             <div class=icon>&#128200;</div> Data tables                          </a></li>
            <li class=item><a onclick="window.open('backend/unfcc.js')"> <div class=icon>&#9729;  </div> {{translate('unfccc_categories')}}   </a></li>
            <li class=item><a onclick="ecam.show('development')">        <div class=icon>&#128187;</div> {{translate('dev')                 }}</a></li>
          </ul>
        </li>
      </ul>
    </div>
  `,

  style:`
    <style>
      #more{
      }
      #more ul{
        list-style:none;
      }
      #more li.section{
        padding:0;
      }
      #more .header{
        color:white;
        background:var(--color-level-generic);
        padding:0.35em;
      }
      #more li.item{
        padding:0.35em;
        padding-left:0.5em;
        border-bottom:1px solid #aaa;
        font-size:larger;
      }
      #more li.item-l2{
        padding-left:1em;
      }
      #more a {
        cursor:pointer;
      }
      #more ul li.section ul li.item div.icon {
        display:inline-block;
        width:30px;
      }
    </style>
  `,
});
