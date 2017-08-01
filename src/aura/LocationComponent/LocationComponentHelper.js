({
    locationUpdate : function(component, helper) {
        let objectName =  component.get("v.OverrideSObjectName") || component.get("v.sObjectName");
        if (!objectName){
            console.log("no objectname");
            component.find("leh").passText("Object name is not available");
            return;
        }
        let recordId = component.get("v.OverrideRecordId") || component.get("v.recordId");
        if (!recordId && objectName !== 'User'){ //we let user default to the user, no id required!
            console.log("no recordId");
            component.find("leh").passText("RecordId is not available");
            return;
        }
        if (!component.get("v.updateField")){
            console.log("no updateField");
            component.find("leh").passText("Don't know which field to update");
            return;
        }

        //public static string saveGeo(string objectName, string recordId, string field, decimal lat, decimal lon){
        let action = component.get("c.saveGeo");
        action.setParams({
            "objectName" : objectName,
            "recordId" : recordId,
            "field" : component.get("v.updateField"),
            "lat" : component.get("v.latlong").latitude,
            "lon" : component.get("v.latlong").longitude
        });

        action.setCallback(this, function(a){
            let state = a.getState();
            if (state === "SUCCESS") {
                console.log(a.getReturnValue());
                if (component.get("v.time")==='user'){
                    $A.get("e.force:showToast")
                      .setParams({"message" : "Location Updated", "type" : "success"}).fire();
                }
            } else if (state === "ERROR") {
                component.find("leh").passErrors(a.getError());
            }
        });
        $A.enqueueAction(action);
    }
})
