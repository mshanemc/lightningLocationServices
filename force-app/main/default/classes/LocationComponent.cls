public with sharing class LocationComponent {

	@AuraEnabled
	public static string saveGeo(string objectName, string recordId, string field, decimal lat, decimal lon){
		//TODO: handle non-custom fields
		string latField; string lonField;

		if (field.contains('__c')){
			latField = field.replace('__c', '__') + 'latitude__s';
		 	lonField = field.replace('__c', '__') + 'longitude__s';
		} else {
			latField = field+'Latitude';
			lonField = field+'Longitude';
		}
		system.debug(latField);
		system.debug(lonField);

		if (objectName=='User' && recordId == null){
			recordId = Userinfo.getUserId();
		}

		string query = 'select id,' + latField + ',' + lonField + ' from ' + objectName + ' where id = \'' + recordId + '\'';

		system.debug(query);
		sobject o = database.query(query);
		system.debug(o);

		o.put(latField, lat);
		o.put(lonField, lon);
		update o;

		return JSON.serialize(o);
	}

}
