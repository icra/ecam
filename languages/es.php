<?php

$Languages["es"] = array
(
	'#Water' => 'Suministro de agua',
	'#Waste' => 'Aguas residuales',
	'#Abstraction' => 'Extracción',
	'#Treatment' => 'Tratamiento',
	'#Distribution' => 'Distribución',
	'#Collection' => 'Recolección',
	'#Discharge' => 'Descarga',

	'#new' => 'Nuevo',
	'#open' => 'Abrir',
	'#save' => 'Guardar',
	'#save_as' => 'Guardar como',
	'#clear' => 'Borrar todo',
	
	'#about' => 'Acerca de',
	'#assessment_period' => 'Período de evaluación',
	'#conversion_factor' => 'Factor de conversión',
	'#currency' => 'Moneda',
	'#days' => 'días',
	'#energy_performance' => 'Rendimiento energético',
	'#energy_summary' => 'Resumen energía',
	'#ghg_assessment' => 'Evaluación GEI',
	'#loading' => 'Cargando...',
	'#next' => 'Siguiente',
	'#previous' => 'Anterior',
	'#quick_assessment' => 'Evaluación rápida',
	'#summary' => 'Resumen',
	'#years' => 'años',
	'#stages' => 'Etapas',
	'#substage' => 'Subetapa',
	'#substages' => 'Subetapas',

	'#navbar_title' => 'Herramienta de asesoramiento y monitorización de rendimiento energético y emisiones de Carbono',

	'#index_first_time_using' => '¿Es tu primera vez usando ECAM Web Tool? Pulsa "Nuevo" para empezar, o lee más información en ',
	'#index_web_tool' => 'Herramienta web',
	'#index_description' => 'Esta herramienta evalúa las infraestructuras en términos de emisiones de GEI y uso de energía basado en sus propios datos.<br>ECAM es parte de la plataforma de conocimiento proporcionada por el <a href="http://www.iwa-network.org/WaCCliM/">proyecto WaCClim</a>. Esta herramienta es gratuita y de código abierto.',
	'#index_chrome_warning' => 'Por favor, utiliza el explorador Google Chrome.',
	'#index_latest_update' => 'Última actualización',

	'#about_credits' => '
		Desarrollado por <a href=http://icra.cat/>ICRA</a> en colaboración con <a href=http://www.iwa-network.org/>IWA</a>,
		GIZ, en el <a href="http://www.iwa-network.org/WaCCliM/">proyecto WaCClim</a>, y Cobalt Water.<br>
		La herramienta fue desarrollada en Junio de 2015 en EXCEL por el consorcio Global Water Commons (LNEC i la Universidad de Valencia) 
		en colaboración con Cobalt Water.
		Queremos reconocer la utilidad de la herramienta EXCEL para permitir el desarrollo de esta herramienta web.
		<br><br>
		
		El código fuente de este proyecto esta en <a href=https://github.com/holalluis/ecam>GitHub</a>.
		Allí puede descargarlo y tenerlo offline.<br>
		Necesitarà un host PHP local, como <a href=https://www.apachefriends.org/index.html>XAMPP</a>.<br>
		Este software fue escrito completament usando el editor <a href=http://www.vim.org>Vim</a>, 
		dentro de un terminal <a href=https://www.cygwin.com/>Cygwin</a>. <br>
		Creado en los lenguajes HTML/PHP/CSS/Javascript. <br>
	',

	'#about_graphs_lib' => 'Biblioteca para gráficos utilizada',
	'#about_json_viewer' => 'Visor JSON utilizado',
	'#about_license' => 'Licencia',

	'#license_license' => '
	Copyright 2016 IWA

	Autorizado en virtud de la Licencia de Apache, Versión 2.0 (la "Licencia"); 
	se prohíbe utilizar este archivo, excepto en cumplimiento con la Licencia.
	Puede obtener una copia de la Licencia en:

		http://www.apache.org/licenses/LICENSE-2.0

	A menos que lo exijan las leyes pertinentes o se haya establecido por escrito, 
	el software distribuido bajo la Licencia se distribuye “TAL CUAL”, 
	SIN GARANTÍAS NI CONDICIONES DE NINGÚN TIPO, ya sean expresas o implícitas.
	Véase la Licencia para consultar el texto específico relativo a los permisos 
	y limitaciones establecidos en la Licencia.
	',

	'#getStarted_general_info' => 'Información General',
	'#getStarted_subtitle' => 'Información general sobre su sistema. Puede editar esta información más tarde.',
	'#getStarted_table_name' => 'Nombre',
	'#getStarted_table_location' => 'Localización',
	'#getStarted_table_start' => 'Período de evaluación Inicio',
	'#getStarted_table_end' => 'Período de evaluación Final',
	'#getStarted_table_period' => 'Período de evaluación',
	'#getStarted_table_comments' => 'Comentarios',
	'#getStarted_max_200' => 'Máximo 200 caracteres',

	'#configuration' => 'Configuración',
	'#configuration_activate_all' => 'Activar todos',
	'#configuration_subtitle' => 'Use el menú de la izquierda para activar las etapas del ciclo del agua que formarán su sistema. Luego rellene las opciones de la derecha.',
	'#configuration_conversion_factor' => 'Factor de conversión para electricidad',
	'#configuration_enter_custom_value' => 'escribe valor personalizado, o elige un país',
	'#configuration_custom' => 'PERSONALIZADO',
	'#configuration_current_value' => 'Valor actual',
	'#configuration_new_currency' => '(Opcional) Escriba nueva moneda (3 letras máximo)',
	'#configuration_additional_questions' => 'Preguntas adicionales',
	'#configuration_active_stages_error' => 'No hay etapas activas. Active etapas en la tabla de la izquierda de la página.',
	'#configuration_fuel_options' => 'Opciones para combustibles',
	'#configuration_stage' => 'Etapa',
	'#configuration_selected_fuel' => 'Combustible seleccionado',
	'#configuration_engines' => 'Motores',
	'#configuration_vehicles' => 'Vehículos',

	'#sidebar_general' => 'General',
	'#sidebar_home' => 'Principal',
	'#sidebar_other' => 'Otros',
	'#sidebar_all_inputs' => 'Todos los inputs',
	'#sidebar_all_ccvv' => 'Todas las variables calculadas',
	'#sidebar_all_kpis' => 'Todos los indicadores de rendimiento',

	'#birds_quick_assessment_of' => 'Evaluación rápida de',
	'#birds_enter_typical' => 'Escriba los valores típicos de sus operaciones diarias',
	'#birds_stage_not_active' => 'Etapa inactiva',

	'#edit_input_data' => 'Entrar datos',
	'#edit_description' => 'Descripción',
	'#edit_current_value' => 'Valor actual',
	'#edit_unit' => 'Unidad',
	'#edit_data_quality' => 'Calidad',
	'#edit_benchmark' => 'Referencia',
	'#edit_ghg_emissions' => 'Emisiones de GEI',
	'#edit_origin' => 'Origen',
	'#edit_value_per_year' => 'Por año',
	'#edit_per_inhab' => 'Por habitante',
	'#edit_per_serv_pop' => 'Por población atendida',
	'#edit_per_water_volume' => 'Por volumen de agua',
	'#edit_per_bod_removed' => 'Por BOD eliminada',
	'#edit_indicators' => 'Indicadores',
	'#edit_divided_in' => 'Dividido en',

	'#variable_detailed_info' => 'Información detallada',
	'#variable_stage' => 'Etapa',
	'#variable_go_back_to' => 'Ir atrás a',
	'#variable_explanation' => 'Descripción',
	'#variable_type' => 'Tipo',
	'#variable_advanced' => 'Avanzado',
	'#variable_inputs_involved' => 'Inputs implicados',
	'#variable_value' => 'Valor',
	'#variable_magnitude' => 'Magnitud',
	'#variable_unit' => 'Unidad',
	'#variable_is_used_to_calculate' => 'Se usa para calcular',
	'#variable_nothing' => 'Nada',
	'#variable_warning' => 'Aviso',
	'#variable_this_equation_contains_estimated_data' => 'Esta ecuación contiene datos estimados en almenos un input',
	'#variable_this_input_is_considered_estimated' => 'Este input es considerado estimado por el usuario',

	'#stages_this_is_an_overview_of_your_system' => 'Visión general de las etapas activas de su sistema. Para activar etapas vaya a',
	'#stages_system_assessment_overview' => 'Visión general por subetapas',
	'#stages_stage' => 'Etapa',
	'#stages_num_of_substages' => 'Nº de subetapas',
	'#stages_type_of_assessment' => 'Tipo de asesoramiento',

	'#level3_split_this_stage' => 'Divida esta etapa en subetapas',
	'#level3_new_substage' => 'Nueva subetapa',
	'#level3_results_kpis' => 'RESULTADOS - Indicadores de rendimiento',
	'#level3_code' => 'Código',
	'#level3_description' => 'Descripción',
	'#level3_TOTAL' => 'TOTAL',
	'#level3_unit' => 'Unidad',
	'#level3_new_name' => 'Nuevo nombre para la subetapa',
	'#level3_new_name_short' => 'Nuevo nombre',
	'#level3_click_to_modify_the_name' => 'Clic para modificar el nombre',
	'#level3_advanced' => 'avanzado',
	'#level3_error_memory_full' => 'Subetapa no añadida: memoria llena',
	'#level3_error_cannot_delete_last_substage' => 'No se puede borrar la última subetapa',

	'#assessment_type' => 'Tipo de asesoramiento',
	'#assessment_simple' => 'Simple',
	'#assessment_advanced' => 'Avanzado',

	'#export_title' => 'Exportar a Excel',
	'#export_description' => 'Pulse en una etapa para ver sus variables. Luego, pulse "Seleccionar toda la tabla" para copiar y pegar a una nueva hoja de Excel',
	'#export_highlight_button' => 'Seleccionar toda la tabla',
	'#export_no_stage_selected' => 'Ninguna etapa seleccionada',
	'#export_code' => 'Código',
	'#export_type' => 'Tipo',
	'#export_name' => 'Nombre',
	'#export_form' => 'Formula o valor por defecto',
	'#export_unit' => 'Unidad',
	'#export_desc' => 'Descripción',
	'#export_click_on_a_stage' => 'Pulse una etapa',

	'#sidebar_graphs' => 'Gráficos',
	'#sidebar_export' => 'Exportar',
	'#sidebar_todo' => 'Pendiente',
	'#sidebar_problems' => 'Problemas',

	'#summary' => 'Resumen',
	'#summary_no_active_stages' => 'Ninguna etapa activada',
	'#summary_all_active_inputs' => 'Todos los inputs activados (ordenados por etapas)',
	'#summary_all_active_outputs' => 'Todos los outputs activados (ordenados por etapas)',

	'#todo' => 'TAREAS PENDIENTES',
	'#todo_task' => 'Tarea',
	'#todo_status' => 'Estado',

	'#graphs' => 'Gráficos',

	/** I'm here **/
	'#ws_resi_pop' => 'Población residente',
	'#ws_resi_pop' => 'Población residente',

	'#new_description' => 'new description',
)?>
