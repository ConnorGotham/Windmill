
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;

import com.infiniteautomation.datafilesource.contexts.AbstractSheetDataSource;
import com.infiniteautomation.datafilesource.dataimage.AlphanumericImportPoint;
import com.infiniteautomation.datafilesource.dataimage.BinaryImportPoint;
import com.infiniteautomation.datafilesource.dataimage.NumericImportPoint;
import com.serotonin.ShouldNeverHappenException;
import com.serotonin.m2m2.vo.emport.SpreadsheetException;

/*
 * 	General format accepted: cell(0,0) is empty, row(0) contains point names to be identified by the ds's
 * 		data points, column(0) is epoch timestamps, and cell(m,n) is the value of point (row(0),cell(m)) at time (row(n),cell(0))
 */

public class SimpleExcelImporter extends AbstractSheetDataSource {
	 //Generated in the datasource at polling runtime against the set of data points
	String[] xidMap; //Also generated, used to set values
	
	@Override
	protected String getSheetName() {
		return "nameOfSheetInExcel";
	}
	
	@Override
	public void setHeaders(String[] headers) {
		String[] cell0 = {"corner"}; //Cell(0,0) is empty
		this.headers = ArrayUtils.addAll(cell0, headers);
	}
	
	public void setXids(String[] xidMap) {
		this.xidMap = xidMap;
	}
	
	@Override
	public boolean takesPointHeaders() {
		return true;
	}
	
	@Override
	protected void importRow(Row rowData) throws SpreadsheetException {
		if(rowData.getPhysicalNumberOfCells() <= 0)
			return;
		Map<String, String> extraParams = new HashMap<String,String>();

		long ts = (long) rowData.getCell(0).getNumericCellValue();
		
		for(int k = 1; k < rowData.getPhysicalNumberOfCells(); ++k) {
			switch(rowData.getCell(k).getCellType()) {
			case Cell.CELL_TYPE_NUMERIC :
				parsedPoints.add(new NumericImportPoint(xidMap[k-1], rowData.getCell(k).getNumericCellValue(), ts, extraParams));
				break;
			case Cell.CELL_TYPE_BOOLEAN :
				parsedPoints.add(new BinaryImportPoint(xidMap[k-1], rowData.getCell(k).getBooleanCellValue(), ts, extraParams));
				break;
			case Cell.CELL_TYPE_STRING :
				parsedPoints.add(new AlphanumericImportPoint(xidMap[k-1], rowData.getCell(k).getStringCellValue(), ts, extraParams));
				break;
			default :
				throw new ShouldNeverHappenException("Unsupported cell type: " + rowData.getCell(k).getCellType());
			}
		}
	}


	@Override
	protected CellType[] getColumnTypes() {
		// Not Implemented
		return null;
	}

	@Override
	protected int[] getColumnWidths() {
		// Not Implemented
		return null;
	}
	
	@Override
	protected List<List<Object>> exportRows() {
		// Not Necessary
		return null;
	}
}