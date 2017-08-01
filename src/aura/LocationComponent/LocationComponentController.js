({

    locationChange : function(component, event, helper) {
    	console.log("locationChange is fired");

    	if (component.get("v.time")==='load'){
    		helper.locationUpdate(component, helper);
    	}
    },

    onDemand : function(component, event, helper) {
    	console.log("onDemand is fired");
		helper.locationUpdate(component, helper);
    },
})
