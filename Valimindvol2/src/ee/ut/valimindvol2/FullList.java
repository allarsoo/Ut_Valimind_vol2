package ee.ut.valimindvol2;

import java.sql.Date;

public class FullList {

	/**
	 * @param args
	 */
	int kandidaadiNr;
	String eesnimi;
	String perenimi;
	Date dob;
	String partei;
	String piirkond;
	
	public FullList(int id, String eesnimi, String perenimi, Date dob, String partei, String piirkond){
		this.kandidaadiNr=id;
		this.eesnimi=eesnimi;
		this.perenimi=perenimi;
		this.dob=dob;
		this.partei=partei;
		this.piirkond=piirkond;
	}

}
