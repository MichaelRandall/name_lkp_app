(function(snbModel){
    var ServerName = function(){
        this.primary_activity_code = "";
        this.primary_activity_code_desc = "";
        this.secondary_activity_code = "";
        this.secondary_activity_code_desc = "";
        this.primary_function_code = "";
        this.primary_function_code_desc = "";
        this.secondary_function_code = "";
        this.secondary_function_code_desc = "";
        this.number_sequence = "";
        this.number_sequence_desc = "";
        this.site_code = "";
        this.site_code_desc = "";
        this.server_environment_code = "";
        this.server_environment_code_desc = "";
    };

    return {
        makeServerNameObj:function(details,details){
            var serverNameDetails = new ServerName(details, details);
            return serverNameDetails;
        }
    };


})(snbApp);