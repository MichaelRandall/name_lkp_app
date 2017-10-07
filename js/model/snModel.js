var snbApp = window.snbApp || {};

snbApp.sn_model = (function(){


    var SNModel = {};
    SNModel.sn_primary_activity_code=document.getElementById("primary_activity_code");
    SNModel.sn_primary_activity_code_desc=document.getElementById("primary_activity_code_desc");
    SNModel.sn_secondary_activity_code=document.getElementById("secondary_activity_code");
    SNModel.sn_secondary_activity_code_desc=document.getElementById("secondary_activity_code_desc");
    SNModel.sn_primary_function_code=document.getElementById("primary_function_code");
    SNModel.sn_primary_function_code_desc=document.getElementById("primary_function_code_desc");
    SNModel.sn_secondary_function_code=document.getElementById("secondary_function_code");
    SNModel.sn_secondary_function_code_desc=document.getElementById("secondary_function_code_desc");
    SNModel.sn_number_sequence=document.getElementById("number_sequence");
    SNModel.sn_number_sequence_desc=document.getElementById("number_sequence_desc");
    SNModel.sn_site_code=document.getElementById("site_code");
    SNModel.sn_site_code_desc=document.getElementById("site_code_desc");
    SNModel.sn_environment=document.getElementById("environment");
    SNModel.sn_environment_desc=document.getElementById("environment_desc");

    SNModel.sn_primary_activity_holder=document.getElementById("primary_activity_holder");
    SNModel.sn_secondary_activity_holder=document.getElementById("secondary_activity_holder");
    SNModel.sn_primary_function_holder=document.getElementById("primary_function_holder");
    SNModel.sn_secondary_function_holder=document.getElementById("secondary_function_holder");
    SNModel.sn_number_sequence_holder=document.getElementById("number_sequence_holder");    
    SNModel.sn_site_code_holder=document.getElementById("site_code_holder");
    SNModel.sn_server_environment_holder=document.getElementById("server_environment_holder");

    SNModel.sn_messages=document.getElementById("messages");
    
    return SNModel;

})();