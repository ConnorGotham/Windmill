
/**
 * Save the DS
 */
function saveDataSourceImpl(basic) {

	ControlCoreEditDwr.saveDataSource(basic, 
			$get("commPortId"),
			$get("baudRate"), 
			$get("flowControlIn"), 
			$get("flowControlOut"),
			$get("dataBits"), 
			$get("stopBits"), 
			$get("parity"),
			$get("readTimeout"), 
			$get("responseTimeout"),
			$get("socketTimeout"), 
			$get("allowedClients"),
			$get("portNumber"),
			saveDataSourceCB);

}

/**
 * Add a Point
 */
function addPointImpl() {
}

function editPointCBImpl(locator) {
}

/**
 * Save a Point
 */
function savePointImpl(locator) {

}