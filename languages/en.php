<?php

$Languages["en"]=array
(
	'#Water' => 'Water supply',
	'#Waste' => 'Wastewater',
	'#Abstraction' => 'Abstraction',
	'#Treatment' => 'Treatment',
	'#Distribution' => 'Distribution',
	'#Collection' => 'Collection',
	'#Discharge' => 'Discharge',

	'#new' => 'New',
	'#open' => 'Open',
	'#save' => 'Save',
	'#save_as' => 'Save as',
	'#clear' => 'Clear',

	'#about' => 'About',
	'#assessment_period' => 'Assessment period',
	'#conversion_factor' => 'Conversion factor',
	'#currency' => 'Currency',
	'#days' => 'days',
	'#energy_performance' => 'Energy performance',
	'#energy_summary' => 'Energy summary',
	'#ghg_assessment' => 'GHG assessment',
	'#loading' => 'Loading...',
	'#next' => 'Next',
	'#previous' => 'Previous',
	'#quick_assessment' => 'Quick assessment',
	'#summary' => 'Summary',
	'#years' => 'years',
	'#stages' => 'Stages',
	'#substage' => 'Substage',
	'#substages' => 'Substages',

	'#navbar_title' => 'Energy performance and Carbon emissions Assessment and Monitoring Tool',

	'#index_first_time_using' => 'First time using ECAM Web Tool? Click on "New" or learn more in ',
	'#index_web_tool' => 'Web tool',
	'#index_description' => 'This tool evaluates utilities\'s operations in terms of GHG emissions and energy usage based on their own data.<br>ECAM is part of the knowledge platform provided by the <a href="http://www.iwa-network.org/WaCCliM/">WaCCliM project</a>. This tool is free and open source.',
	'#index_chrome_warning' => 'Please use Google Chrome browser.',
	'#index_latest_update' => 'Latest update',

	'#about_credits' => '
		Developed by <a href=http://icra.cat>ICRA</a> in cooperation with <a href=http://www.iwa-network.org/>IWA</a>,
		GIZ under the <a href="http://www.iwa-network.org/WaCCliM/">WaCCliM project</a> and Cobalt Water.<br>
		The tool was formerly developed in June 2015 as an EXCEL tool by the consortium Global Water Commons (LNEC and University of Valencia) in collaboration with Cobalt Water. 
		We want to acknowledge how extremely valuable The Excel tool has been to enable the development of this web-tool.
		<br><br>
		
		The source code of this project is in <a href=https://github.com/holalluis/ecam>GitHub</a>.
		There you can download the tool and have it offline. <br>
		You will need a PHP localhost (such as <a href=https://www.apachefriends.org/index.html>XAMPP</a>).<br>
		This software was written entirely using the <a href=http://www.vim.org>Vim</a> editor, inside a <a href=https://www.cygwin.com/>Cygwin</a> terminal. <br>
		Tool coded in HTML/PHP/CSS/Javascript languages. <br>
	',

	'#about_graphs_lib' => 'Graphs library used',
	'#about_json_viewer' => 'JSON viewer used',
	'#about_license' => 'License',

	'#license_license' => '
	Copyright 2016 IWA

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at

		http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
	',

	'#getStarted_general_info' => 'General Info',
	'#getStarted_subtitle' => 'General data of your system. You can edit this information later.',
	'#getStarted_table_name' => 'Name',
	'#getStarted_table_location' => 'Location',
	'#getStarted_table_start' => 'Assessment Period Start',
	'#getStarted_table_end' => 'Assessment Period End',
	'#getStarted_table_period' => 'Assessment Period',
	'#getStarted_table_comments' => 'Comments',
	'#getStarted_max_200' => 'Max 200 characters',

	'#configuration' => 'Configuration',
	'#configuration_activate_all' => 'Activate all',
	'#configuration_subtitle' => 'Use the left table to activate stages, which will form your system. Then, fill the options on the right.',
	'#configuration_ghg_assessment' => 'GHG assessment',
	'#configuration_energy_performance' => 'Energy performance',
	'#configuration_conversion_factor' => 'Conversion factor for grid electricity',
	'#configuration_enter_custom_value' => 'enter custom value or select country',
	'#configuration_custom' => 'CUSTOM',
	'#configuration_current_value' => 'Current value',
	'#configuration_new_currency' => '(Optional) Write new currency (3 letters max)',
	'#configuration_additional_questions' => 'Additional questions',
	'#configuration_active_stages_error' => 'There are no active stages. Click on the left table to activate them.',
	'#configuration_fuel_options' => 'Fuel options',
	'#configuration_stage' => 'Stage',
	'#configuration_selected_fuel' => 'Selected Fuel type',
	'#configuration_engines' => 'Engines',
	'#configuration_vehicles' => 'Vehicles',

	'#sidebar_general' => 'General',
	'#sidebar_home' => 'Home',
	'#sidebar_other' => 'Other',
	'#sidebar_all_inputs' => 'All inputs',
	'#sidebar_all_ccvv' => 'All Calculated variables',
	'#sidebar_all_kpis' => 'All Performance indicators',

	'#birds_quick_assessment_of' => 'Quick assessment of',
	'#birds_enter_typical' => 'Enter typical values from your daily operation',
	'#birds_stage_not_active' => 'Stage not active',

	'#edit_input_data' => 'Input data',
	'#edit_description' => 'Description',
	'#edit_current_value' => 'Current value',
	'#edit_unit' => 'Unit',
	'#edit_data_quality' => 'Data quality',
	'#edit_benchmark' => 'Benchmark',
	'#edit_ghg_emissions' => 'Greenhouse gas emissions',

	'#edit_origin' => 'Origin',
	'#edit_value_per_year' => 'Per year',
	'#edit_per_inhab' => 'Per inhabitant',
	'#edit_per_serv_pop' => 'Per serviced population',
	'#edit_per_water_volume' => 'Per water volume',
	'#edit_per_bod_removed' => 'Per BOD removed',
	'#edit_indicators' => 'indicators',
	'#edit_divided_in' => 'Divided in',

	'#variable_detailed_info' => 'Detailed info',
	'#variable_stage' => 'Stage',
	'#variable_go_back_to' => 'Go back to',
	'#variable_explanation' => 'Description',
	'#variable_type' => 'Type',
	'#variable_advanced' => 'Advanced',
	'#variable_inputs_involved' => 'Inputs involved',
	'#variable_value' => 'Value',
	'#variable_magnitude' => 'Magnitude',
	'#variable_unit' => 'Unidad',
	'#variable_is_used_to_calculate' => 'Is used to calculate',
	'#variable_nothing' => 'Nothing',
	'#variable_warning' => 'Warning',
	'#variable_this_equation_contains_estimated_data' => 'This equation contains estimated data in at least one input',
	'#variable_this_input_is_considered_estimated' => 'This input is considered estimated data by the user',

	'#stages_this_is_an_overview_of_your_system' => 'This is an overview of the active stages of your system. Click on a stage to input data. To activate more stages go to',
	'#stages_system_assessment_overview' => 'System assessment overview',
	'#stages_stage' => 'Stage',
	'#stages_num_of_substages' => 'Nº of substages',
	'#stages_type_of_assessment' => 'Type of assessment',

	'#level3_split_this_stage' => 'Split this stage in substages',
	'#level3_new_substage' => 'New substage',
	'#level3_results_kpis' => 'RESULTS - Key performance indicators',
	'#level3_code' => 'Code',
	'#level3_description' => 'Description',
	'#level3_TOTAL' => 'TOTAL',
	'#level3_unit' => 'Unit',
	'#level3_new_name' => 'New name for the substage',
	'#level3_click_to_modify_the_name' => 'Click here to modify the name',
	'#level3_advanced' => 'advanced',
	'#level3_error_memory_full' => 'Substage not added: memory is full',
	'#level3_error_cannot_delete_last_substage' => 'You can not delete the last substage',

	'#assessment_type' => 'Type of assessment',
	'#assessment_simple' => 'Simple',
	'#assessment_advanced' => 'Advanced',

	'#export_title' => 'Export to Excel',
	'#export_description' => 'Click on a stage to view its variables. Then click on "Highlight the whole table" to copy and paste to an empty Excel file',
	'#export_highlight_button' => 'Highlight the whole table',
	'#export_no_stage_selected' => 'No stage selected',
	'#export_code' => 'Code',
	'#export_type' => 'Type',
	'#export_name' => 'Name',
	'#export_form' => 'Formula or default value',
	'#export_unit' => 'Unit',
	'#export_desc' => 'Description',
	'#export_click_on_a_stage' => 'Click on a stage',

	'#sidebar_graphs' => 'Graphs',
	'#sidebar_export' => 'Export',
	'#sidebar_todo' => 'To do',
	'#sidebar_problems' => 'Problems',

	'#summary' => 'Summary',
	'#summary_no_active_stages' => 'No active stages',
	'#summary_all_active_inputs' => 'All active inputs (sorted by stage)',
	'#summary_all_active_outputs' => 'All active outputs (sorted by stage)',

	'#todo' => 'TO DO LIST',
	'#todo_task' => 'Task',
	'#todo_status' => 'Status',

	'#graphs' => 'Gráficos',

	/** I'm here **/
	'#new_description' => 'new description',

	'#new_description' => 'new description',

)?>
