let report = new Vue({
  el:"#report",

  data:{
    visible:false,

    Global,
    Info,
    Languages,
  },

  methods:{
    format,
    translate,

    get_ghg_emissions_by_level(){ //Water, Waste, Faecl
      return Structure.filter(s=>s.sublevel==false).map(s=>{
        let level = translate(s.level);
        let code  = s.prefix+'_KPI_GHG';
        let descr = translate(code+'_descr');
        let value = Global[code]();
        let unit  = Info[code].unit;
        return {level,code,descr,value,unit};
      });
    },

    get_ghg_emissions_by_source(){ //electricity, CO2, N2O, CH4
      let elec=0+
        Global.wsa_KPI_GHG_elec()+
        Global.wst_KPI_GHG_elec()+
        Global.wsd_KPI_GHG_elec()+
        Global.wwc_KPI_GHG_elec()+
        Global.wwt_KPI_GHG_elec()+
        Global.wwd_KPI_GHG_elec()+
        Global.fsc_KPI_GHG_elec()+
        Global.fst_KPI_GHG_elec()+
        Global.fsr_KPI_GHG_elec()+
      0;

      let co2=0+
        //fuel engines
        Global.wsa_KPI_GHG_fuel_co2()+
        Global.wst_KPI_GHG_fuel_co2()+
        Global.wsd_KPI_GHG_fuel_co2()+
        Global.wwc_KPI_GHG_fuel_co2()+
        Global.wwt_KPI_GHG_fuel_co2()+
        Global.wwd_KPI_GHG_fuel_co2()+
        Global.fst_KPI_GHG_fuel_co2()+
        Global.fsr_KPI_GHG_fuel_co2()+
        //fuel trucks
        Global.wsd_KPI_GHG_trck_co2()+
        Global.wwt_KPI_ghg_tsludge_co2()+
        Global.wwd_KPI_GHG_trck_co2()+
        Global.fsc_KPI_GHG_trck_co2()+
        Global.fst_KPI_GHG_trck_co2()+
        Global.fsr_KPI_GHG_trck_co2()+
        //sludge mgmt
        Global.wwt_KPI_GHG_dig_fuel_co2()+
        Global.wwt_KPI_ghg_stock_co2eq()+
      0;

      let n2o=0+
        //fuel engines
        Global.wsa_KPI_GHG_fuel_n2o()+
        Global.wst_KPI_GHG_fuel_n2o()+
        Global.wsd_KPI_GHG_fuel_n2o()+
        Global.wwc_KPI_GHG_fuel_n2o()+
        Global.wwt_KPI_GHG_fuel_n2o()+
        Global.wwd_KPI_GHG_fuel_n2o()+
        Global.fst_KPI_GHG_fuel_n2o()+
        Global.fsr_KPI_GHG_fuel_n2o()+
        //fuel trucks
        Global.wsd_KPI_GHG_trck_n2o()+
        Global.wwt_KPI_ghg_tsludge_n2o()+
        Global.wwd_KPI_GHG_trck_n2o()+
        Global.fsc_KPI_GHG_trck_n2o()+
        Global.fst_KPI_GHG_trck_n2o()+
        Global.fsr_KPI_GHG_trck_n2o()+
        //untreated ww
        Global.ww_KPI_GHG_unt_n2o()+
        //treated ww
        Global.wwt_KPI_GHG_tre_n2o()+
        //digester fuel
        Global.wwt_KPI_GHG_dig_fuel_n2o()+
        //sludge mgmt
        Global.wwt_slu_composting_n2o()+
        Global.wwt_slu_inciner_n2o()+
        Global.wwt_slu_landapp_n2o()+
        Global.wwt_slu_landfill_n2o()+
        //discharge
        Global.wwd_KPI_GHG_tre_n2o()+
        //fsm
        Global.fst_KPI_GHG_tre_n2o()+
        Global.fsr_KPI_GHG_landapp()+
        Global.fsr_KPI_GHG_landfil_n2o()+
        Global.fsr_KPI_GHG_dumping_n2o()+
        Global.fsr_KPI_GHG_tre_n2o()+
      0;

      let ch4=0+
        //fuel engines
        Global.wsa_KPI_GHG_fuel_ch4()+
        Global.wst_KPI_GHG_fuel_ch4()+
        Global.wsd_KPI_GHG_fuel_ch4()+
        Global.wwc_KPI_GHG_fuel_ch4()+
        Global.wwt_KPI_GHG_fuel_ch4()+
        Global.wwd_KPI_GHG_fuel_ch4()+
        Global.fst_KPI_GHG_fuel_ch4()+
        Global.fsr_KPI_GHG_fuel_ch4()+
        //fuel trucks
        Global.wsd_KPI_GHG_trck_ch4()+
        Global.wwt_KPI_ghg_tsludge_ch4()+
        Global.wwd_KPI_GHG_trck_ch4()+
        Global.fsc_KPI_GHG_trck_ch4()+
        Global.fst_KPI_GHG_trck_ch4()+
        Global.fsr_KPI_GHG_trck_ch4()+
        //untreated ww
        Global.ww_KPI_GHG_unt_ch4()+
        //treated ww
        Global.wwt_KPI_GHG_tre_ch4()+
        Global.wwd_KPI_GHG_tre_ch4()+
        //biogas
        Global.wwt_KPI_GHG_biog()+
        Global.fst_KPI_GHG_biog()+
        //digester fuel
        Global.wwt_KPI_GHG_dig_fuel_ch4()+
        //sludge mgmt
        Global.wwt_slu_storage_ch4()+
        Global.wwt_slu_composting_ch4()+
        Global.wwt_slu_inciner_ch4()+
        Global.wwt_slu_landfill_ch4()+
        //fsm
        Global.fsc_KPI_GHG_cont()+
        Global.fst_KPI_GHG_tre_ch4()+
        Global.fsr_KPI_GHG_landfil_ch4()+
        Global.fsr_KPI_GHG_dumping_ch4()+
        Global.fsr_KPI_GHG_tre_ch4()+
      0;

      return [
        ['variable',               'emission'],
        [translate('Electricity'), elec      ],
        ['CO2',                    co2       ],
        ['N2O',                    n2o       ],
        ['CH4',                    ch4       ],
      ];
    },
  },


  template:`
    <div id=report v-if="visible && Languages.ready">
      <h1>
        {{Global.General.Name}}
        &mdash;
        Report (under development)
      </h1>

      <ul>
        <li>
          <details>
            <summary>
              figure 1: ghg emissions by system (pie chart)
            </summary>
            <pre v-html="JSON.stringify(get_ghg_emissions_by_level(),null,'  ')"></pre>
          </details>
        </li>

        <li>
          <details>
            <summary>
              figure 2: ghg emissions by source (CO2, N2O, CH4)
            </summary>
            <pre v-html="JSON.stringify(get_ghg_emissions_by_source(),null,'  ')"></pre>
          </details>
        </li>

        <li>figure 3: ghg emissions by compound (detailed)</li>
        <li>figure 4: ghg emissions by UNFCCC categories</li>

        <li>figure 5: energy consumption by system</li>

        <li>figure 6:water total running costs</li>
        <li>figure 7:waste total running costs</li>

        <li>figure 8: serviced population in water supply (%)</li>
        <li>figure 9: total ghg water supply (kg/year/serv.pop)</li>

        <li>figure10: serviced population in wastewater (%)</li>
        <li>figure11: total ghg wastewater (kg/year/serv.pop)</li>

        <li>figure12: serviced population in fsm (%)</li>
        <li>figure13: total ghg fsm (kg/year/serv.pop)</li>
      </ul>
    </div>
  `,

  style:`
    <style>
      #report details summary {
        cursor:pointer;
      }
    </style>
  `,
});

//
{
  let style       = document.createElement('style');
  document.body.appendChild(style);
  style.outerHTML = report.$options.style;
}
