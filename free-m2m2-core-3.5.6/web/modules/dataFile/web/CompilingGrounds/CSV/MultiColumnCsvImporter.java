import java.util.HashMap;
import java.util.Map;

import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import com.infiniteautomation.datafilesource.contexts.AbstractCSVDataSource;
import com.infiniteautomation.datafilesource.dataimage.NumericImportPoint;

/**
 * Importer that will import data on a point per column basis
 * The first column is the Date
 * 
 * @author Terry Packer
 *
 */
public class MultiColumnCsvImporter extends AbstractCSVDataSource {
	
	private DateTimeFormatter dtf = DateTimeFormat.forPattern("MM/dd/yyyy HH:mm:ss");
	private Map<Integer, String> headerMap = new HashMap<Integer, String>();
	
	
	@Override
	public void importRow(String[] row, int rowNum) {
		//Strip out the header row, it does not contain our data
		if(rowNum == 0){
			for(int k = 0; k < row.length; ++k) {
				this.headerMap.put(k, row[k]);
			}
		}else{
			
			//Column 0 is the time
			long time = dtf.parseDateTime(row[0]).getMillis();
			
			//Empty additional parameters
			Map<String, String> extraParams = new HashMap<String,String>();
			
			//For each additional column we will create an Import Point
			for(int i=1; i<row.length; i++){
				String identifier = headerMap.get(i); //Get the identifier from our header map
				double value = Double.parseDouble(row[i]); //Create the value
				NumericImportPoint point = new NumericImportPoint(identifier, value, time, extraParams);
				this.parsedPoints.add(point);
			}
		}
	}
}
