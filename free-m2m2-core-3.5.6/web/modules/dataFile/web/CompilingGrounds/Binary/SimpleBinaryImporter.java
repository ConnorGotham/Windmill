import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import com.infiniteautomation.datafilesource.contexts.AbstractFileStreamDataSource;
import com.infiniteautomation.datafilesource.dataimage.NumericImportPoint;

public class SimpleBinaryImporter extends AbstractFileStreamDataSource {

	@Override
	public void importFile(InputStream in) throws IOException {
		int n;
		int counter = 0;
		Map<String, String> extraParams = new HashMap<String, String>();
		while((n = in.read()) != -1) {
			//This class is just going to import every fifth byte to the same point
			int thisByte = counter % 5;
			this.parsedPoints.add(new NumericImportPoint(Integer.toString(thisByte), n, System.currentTimeMillis()-(counter/5), extraParams));
			counter += 1;
		}
	}

}
