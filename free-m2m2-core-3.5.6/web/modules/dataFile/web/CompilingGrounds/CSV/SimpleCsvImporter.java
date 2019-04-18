import java.util.HashMap;
import java.util.Map;

import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import com.infiniteautomation.datafilesource.contexts.AbstractCSVDataSource;
import com.infiniteautomation.datafilesource.dataimage.NumericImportPoint;

public class SimpleCsvImporter extends AbstractCSVDataSource {
	
	private DateTimeFormatter dtf = DateTimeFormat.forPattern("MM/dd/yyyy hh:mm:ss");
	private Map<String, Integer> headerMap = new HashMap<String, Integer>();
	
	@Override
	public void importRow(String[] row, int rowNum) {
		//Strip out the header row, it does not contain our data
		if(rowNum == 0){
			for(int k = 0; k < row.length; ++k) {
				this.headerMap.put(row[k], k);
			}
		}else{
			//this.parsedPoints are the data we are pulling in,
			// each call should add a new parsed point
			String identifier = "simplePoint"; //This will always put the value into the point with identifier 'simplePoint'
			double value = Double.parseDouble(row[1]);
			long time = dtf.parseDateTime(row[0]).getMillis();
			Map<String, String> extraParams = new HashMap<String,String>();
			
			NumericImportPoint point = new NumericImportPoint(identifier, value, time, extraParams);
			this.parsedPoints.add(point);
		}
	}
}
