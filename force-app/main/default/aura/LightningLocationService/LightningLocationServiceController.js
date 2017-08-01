/* globals navigator */
({
    doInit : function(component, event, helper) {
    	if ("geolocation" in navigator){
    		if (!component.get("v.watch")){
		    	navigator.geolocation.getCurrentPosition($A.getCallback(function(position) {
		    		console.log(position);
		    		component.set("v.position", position);
		    		component.set("v.latlong", position.coords);
					}));
    		} else {
    			navigator.geolocation.watchPosition($A.getCallback(function (position){
    				component.set("v.position", position);
		    		component.set("v.latlong", position.coords);
    			}));
    		}
    	} else {
    		component.set("v.error", "geolocation not available");
    	}
    }
})
