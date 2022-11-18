let help=new Vue({
  el:"#help",
  data:{
    visible:false,
  },
  methods:{
    translate,
  },

  template:`
    <div id=help v-if="visible && Languages.ready">
      <h2 style=text-align:center>
        {{translate('Methodology Guide and User manual')}}
      </h2>

      <div
        style="
          width:66%;
          margin:auto;
          text-align:left;
          display:grid;
          grid-template-columns:50% 50%;
          grid-gap:20px;
        "
      >
        <div>
          The
          <a target=_blank href="frontend/docs/giz/MethodologyGuide_FinalVersion.pdf">
            Methodology Guide [PDF]
          </a> was developed as an additional instrument to the ECAM tool.
          The guide presents the tool's methodological background which
          includes the principles, equations, sources, and assumptions. It
          can serve as a reference source and allow comparisons with other
          methodologies, making it suitable for users with all levels of
          experience.
        </div>
        <div>
          The
          <a target=_blank href="frontend/docs/giz/UserManual_FinalVersion.pdf">
            User manual [PDF]
          </a> was developed as an instrument to support the use of the ECAM
          tool (Energy Performance and Carbon Emissions Assessment and
          Monitoring). It can help users to estimate greenhouse gases (GHG)
          emissions from the Urban Water Sector activities. This document is
          intended to be practical, accessible and "straight to the point".
          To understand the conceptual framework of the ECAM tool, the user
          can consult the additional document "Methodology Guide".
        </div>
        <img src="frontend/img/help/ECAM_Methodology_Guide.webp"
          onclick="window.open('frontend/docs/giz/MethodologyGuide_FinalVersion.pdf')"
        >
        <img src="frontend/img/help/ECAM_User_Manual.webp"
          onclick="window.open('frontend/docs/giz/UserManual_FinalVersion.pdf')"
        >
      </div>
    </div>
  `,

  style:`
    <style>
      #help img {
        display:block;
        width:200px;
        margin:auto;
        border:3px solid transparent;
        cursor:pointer;
      }
      #help img:hover {
        border:3px solid var(--color-level-generic-secondary);
      }
    </style>
  `,
});
