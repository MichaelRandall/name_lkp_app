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
        populateFields:function(theResults,myObj){
            var listName = myObj.theList.list;
            var onlyList = listName.slice(4,-2);
            switch(onlyList){
                case "SecondaryActivityCodes":
                    myObj.codeField.value = theResults[0].SecondaryActivityCode;
                    myObj.descField.value = theResults[0].SecondaryActivityDescription;
                    break;
                case "PrimaryFunctionCodes":
                    myObj.codeField.value = theResults[0].PrimaryFunctionCode;
                    myObj.descField.value = theResults[0].PrimaryFunctionDescription;
                    break;
                case "SecondaryFunctionCodes":
                    myObj.codeField.value = theResults[0].SecondaryFunctionCode;
                    myObj.descField.value = theResults[0].SecondaryFunctionDescription;
                    break;
                case "SiteLocations":
                    myObj.codeField.value = theResults[0].LocationCode;
                    myObj.descField.value = theResults[0].LocationDescription;
                    break;
                case "DC_OffPremiseCodes":
                    myObj.codeField.value = theResults[0].DC_OffPremiseCode;
                    myObj.descField.value = theResults[0].DC_OffPremiseDescription;
                    break;
            }   
        },
		
		//ajax call using the list name and requesting the the specific object code and description
        pullListData:function(myObj, prop){
            var baseURL = SP.PageContextInfo.get_webServerRelativeUrl() + "/_vti_bin/listdata.svc/"+myObj.theList.list+
            "?$select=" + myObj.theList.codeDigits + "," + myObj.theList.codeDescription + "," + myObj.theList.ItemStatus + "&$filter=Active eq true and "+myObj.theList.codeDigits+" eq '" + prop + "'" + "&$inlinecount=allpages";
			console.log("From the query: " + myObj.theList.codeDigits + ", " + myObj.theList.codeDescription + ", " + myObj.theList.ItemStatus + ", " + prop);
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
                    //console.log("No Results");
                    snbApp.sp_single_list.noResults(myObj);
                }else{
                    //document.getElementById("error_holder").innerHTML="The results: " + results.d.results.toString() + ", Typeof: " + typeof results.d.results + ", length: " + results.d.results.length;
                    snbApp.sp_single_list.populateFields(myResults,myObj);
                }
            })
            .fail(function (xhr, status, errorThrown){
				document.getElementById("error_holder").innerHTML = "Error:" + errorThrown + ": " + myObj.theList.list;
                //console.log("Error:" + errorThrown + ": " + myObj.theList.list);
                //console.log("Status:" + status);
                //console.dir(xhr);
            });
        },
        //assigns an outcome based on string subsection and corresponding list, if available
        getListDetails:function(myObj,osType){
            var fullServerNameDetails = {};
            var theSPList = snbApp.getArrayOfListsForObjects(osType);
            var myObjLength = myObj.length;
            //var subStringLength = myObj.subStringsArray.length;
            //var i=0;
            for(var p in myObj){
                var myKey = p;
                var myVal = myObj[p];
                switch(p){
                    case "primary_activity_code":
                        //default message;
                        fullServerNameDetails.primary_activity_code = myVal;
                        fullServerNameDetails.primary_activity_code_desc = "Core of Engineers";
                        //document.getElementById('primary_activity_code').value = myVal;
                        //document.getElementById('primary_activity_code_desc').value = "Core of Engineers default";
                        break;
                    case "secondary_activity_code":
                        fullServerNameDetails.secondary_activity_code = myVal;
                        fullServerNameDetails.secondary_activity_code_desc
                        var codeField = document.getElementById('secondary_activity_code');
                        var descField = document.getElementById('secondary_activity_code_desc');
                        //get value;
                        snbApp.sp_single_list.pullListData({theList:theSPList[0],code:myVal,codeField:codeField,descField:descField},myVal);
                        break;
                    case "primary_function_code":
                        fullServerNameDetails.primary_function_code = myVal;
                        fullServerNameDetails.primary_function_code_desc
                        var codeField = document.getElementById('primary_function_code');
                        var descField = document.getElementById('primary_function_code_desc');
                        //get value;
                        snbApp.sp_single_list.pullListData({theList:theSPList[1],code:myVal,codeField:codeField,descField:descField},myVal);
                        break;
                    case "secondary_function_code":
                        if(myVal === "0"){
                            fullServerNameDetails.secondary_function_code = myVal;
                            fullServerNameDetails.secondary_function_code_desc = "Indicates no secondary functionality";
                           //document.getElementById('secondary_function_code').value = myVal;
                           //document.getElementById('secondary_function_code_desc').value = "Indicates no secondary functionality";
                        }else{
                            fullServerNameDetails.secondary_function_code = myVal;
                            fullServerNameDetails.secondary_function_code_desc
                           var codeField = document.getElementById('secondary_function_code');
                           var descField = document.getElementById('secondary_function_code_desc');
                           //get value;
                           snbApp.sp_single_list.pullListData({theList:theSPList[2],code:myVal,codeField:codeField,descField:descField},myVal); 
                        }
                        break;
                    case "number_sequence":
                        //default message;
                        fullServerNameDetails.number_sequence = myVal;
                        fullServerNameDetails.number_sequence_desc = "Sequence number selected by user";
                        //document.getElementById('number_sequence').value = myVal;
                        //document.getElementById('number_sequence_desc').value = "Sequence number selected by user";
                        break;
                    // case "site_locations":
                    //     var codeField = document.getElementById('site_locations');
                    //     var descField = document.getElementById('site_locations_desc');
                    //     //get value;
                    //     snbApp.sp_single_list.pullListData({theList:myObj.listsArray[3],code:myVal,codeField:codeField,descField:descField});
                    //     break;
                    case "site_code":
                        //default message;
                        fullServerNameDetails.site_code = myVal;
                        fullServerNameDetails.site_code_desc = "Off-Premise or Data Center";
                        //document.getElementById('site_code').value = myVal;
                        //document.getElementById('site_code_desc').value = "Off-Premise or Data Center";
                        break;
                    case "server_environment_code":
                        fullServerNameDetails.environment = myVal;
                        fullServerNameDetails.environment_desc
                        var codeField = document.getElementById('environment');
                        var descField = document.getElementById('environment_desc');
                        //get value;
                        snbApp.sp_single_list.pullListData({theList:theSPList[4],code:myVal,codeField:codeField,descField:descField},myVal);
                        break;
                }
            }
            return fullServerNameDetails;
        }
    };
    
})(snbApp);