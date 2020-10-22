let non_revenue_water = new Vue({
  el:"#non_revenue_water",
  data:{
    visible:false,
    Languages,
  },

  methods:{
    translate,
    image_exists(url){
      let xhr = new XMLHttpRequest();
      xhr.open('HEAD', url, false);
      xhr.send();
      if(xhr.status=="404"){
        console.warn(`Image doesn't exist for "${Languages.current}" language, loading "en" associated image...`);
        return false;
      }else{
        return true;
      }
    },
  },

  template:`
    <div id=non_revenue_water v-if="visible && Languages.ready">
      <!--title-->
      <h1>
        {{ translate('About non revenue water') }}
      </h1>

      <h3>
        {{ translate('Water injected to distribution') }}
      </h3>

      <!--non revenue water image-->
      <div v-if="image_exists('frontend/img/nrw/nrw-'+Languages.current+'.png')">
        <img :src="'frontend/img/nrw/nrw-'+Languages.current+'.png'"></img>
      </div>
      <div v-else>
        <img :src="'frontend/img/nrw/nrw-en.png'"></img>
      </div>

      <p>
        <code>
          Lambert, A. O. y Hirner, W., Losses from Water Supply Systems: Standard Terminology and
          Recommended Performance Measures. International Water Association, 2000.
        </code>
      </p>
    </div>
  `,

  style:`
    <style>
      #non_revenue_water {
        text-align:center;
      }
    </style>
  `
});
