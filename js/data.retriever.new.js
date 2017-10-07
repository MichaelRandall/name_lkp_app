(function(lookups){
	//testing, no value to the application
    lookups.plane = {
        name:"superman",
        size:"jumbo",
        
        formula:function(a,b){
            return a * b;
        }
    };
    
    lookups.sp_single_list = {
		//noFunctionality called if there is no secondary function for the server, based on code provided = 0
		//noFunctionality not used referenced in the code at this time
		noFunctionality:function(myObj){
			myObj.codeField.value = myObj.code;
			myObj.descField.value = "This server does not have a secondary role";
		},
		//noResults called if there is no match in the list based on code provided
        noResults:function(myObj){
            myObj.codeField.value = myObj.code;
            myObj.descField.value = "Value not found";
        },
		//populateFields called if there is a match in the list based on code provided
        populateFields:function(theResults, myObj){
            var ui = snbApp.sn_model;
            var listName = myObj.theList.list;
            var onlyList = listName.slice(4,-2);
            switch(onlyList){
                case "SecondaryActivityCodes":
                    ui.sn_secondary_activity_code.value = theResults[0].Code;
                    ui.sn_secondary_activity_code_desc.value = theResults[0].Description;
                    break;
                case "PrimaryFunctionCodes":
                    ui.sn_primary_function_code.value = theResults[0].Code;
                    ui.sn_primary_function_code_desc.value = theResults[0].Description;
                    break;
                case "SecondaryFunctionCodes":
                    ui.sn_secondary_function_code.value = theResults[0].Code;
                    ui.sn_secondary_function_code_desc.value = theResults[0].Description;
                    break;
                case "SiteLocations":
                    ui.sn_site_code.value = theResults[0].Code;
                    ui.sn_site_code_desc.value = theResults[0].Description;
                    break;
                case "DC_OffPremiseCodes":
                    ui.sn_environment.value = theResults[0].Code;
                    ui.sn_environment_desc.value = theResults[0].Description;
                    break;
            }   
        },
		
		//ajax call using the list name and requesting the the specific object code and description
        pullListData:function(myObj, prop){
            var baseURL = SP.PageContextInfo.get_webServerRelativeUrl() + "/_vti_bin/listdata.svc/"+myObj.theList.list+
            "?$select=Code,Description,Active&$filter=Active eq true and Code eq '" + prop + "'" + "&$inlinecount=allpages";
            $.ajax({
                url:baseURL,
                type: "GET",
                headers: {
                    "accept": "application/json;odata=verbose",
                }
            })
            .done(function(results){
                var myResults = results.d.results;
                if(myResults.length === 0){
                    console.log("No Results");
                    snbApp.sp_single_list.noResults(myObj);
                }else{
                    snbApp.sp_single_list.populateFields(myResults,myObj);
                }
            })
            .fail(function (xhr, status, errorThrown){
                console.log("Error:" + errorThrown + ": " + myObj.theList.list);
                console.log("Status:" + status);
                console.dir(xhr);
            });
        },
        //assigns an outcome based on string subsection and corresponding list, if available
        getListDetails:function(myObj,osType){
            var myUI = snbApp.sn_model;
            var theSPList = snbApp.getArrayOfListsForObjects(osType);
            
            for(var p in myObj){
                var myKey = p;
                var myVal = myObj[p];
                switch(p){
                    case "primary_activity_code":
                        //default message;
                        myUI.sn_primary_activity_code.value = myVal;
                        myUI.sn_primary_activity_code_desc.value = "Core of Engineers";
                        break;
                    case "secondary_activity_code":
                        myUI.sn_secondary_activity_code.value = myVal;
                        //get value;
                        snbApp.sp_single_list.pullListData({theList:theSPList[0]},myVal);
                        break;
                    case "primary_function_code":
                        myUI.sn_primary_function_code.value = myVal;
                        //get value;
                        snbApp.sp_single_list.pullListData({theList:theSPList[1]},myVal);
                        break;
                    case "secondary_function_code":
                        myUI.sn_secondary_function_code.value = myVal;
                        if(myVal === "0"){
                            myUI.sn_secondary_function_code_desc.value = "Indicates no secondary functionality";
                        }else{
                            //get value;
                            snbApp.sp_single_list.pullListData({theList:theSPList[2]},myVal); 
                        }
                        break;
                    case "number_sequence":
                        //default message;
                        myUI.sn_number_sequence.value = myVal;
                        myUI.sn_number_sequence_desc.value = "Sequence number selected by user";
                        break;
                    case "site_code":
                        myUI.sn_site_code.value = myVal;
                        //default message;
                        if(myVal === "DC" || myVal === "OP"){
                            myUI.sn_site_code_desc.value = "Off-Premise or Data Center";
                        }else{
                            snbApp.sp_single_list.pullListData({theList:theSPList[3]},myVal);
                        }
                        break;
                    case "server_environment_code":
                        myUI.sn_environment.value = myVal;
                        //get value;
                        snbApp.sp_single_list.pullListData({theList:theSPList[4]},myVal);
                        break;
                }
            }
        }
    };
    
})(snbApp);