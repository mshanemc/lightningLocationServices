@isTest
public with sharing class LocationComponentTest {

	@isTest
	private static void testLocationUpdate(){

		account a = new account();
		a.Name = 'myTestAccount';
		insert a;

		//	public static string saveGeo(string objectName, string recordId, string field, string lat, string lon){
		string result = LocationComponent.saveGeo('Account', a.id, 'Shipping', 45.0, 54.0);
		system.debug(result);

		a = [select id, name, ShippingLatitude, ShippingLongitude from account where id =: a.id];
		system.assertEquals(a.ShippingLatitude, 45);
		system.assertEquals(a.ShippingLongitude, 54);

	}
}
