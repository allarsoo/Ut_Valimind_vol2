package ee.ut.valimindvol2;

/**
 * @author Allar
 *
 */
public class Statistic {
	int kandidaadiNr;
	String eesnimi;
	String perenimi;
	String partei;
	String regioon;
	int hääli;
	double protsent;
	
	public Statistic(String partei, int hääli, double protsent){
		this.partei=partei;
		this.hääli=hääli;
		this.protsent=protsent;
	}
	public Statistic(int hääli, String regioon, double protsent){
		this.regioon=regioon;
		this.hääli=hääli;
		this.protsent=protsent;
	}
	
	public Statistic(int id, String eesnimi, String perenimi, String partei, String regioon,int hääli){
		this.kandidaadiNr=id;
		this.eesnimi=eesnimi;
		this.perenimi=perenimi;
		this.partei=partei;
		this.regioon=regioon;
		this.hääli=hääli;
	}
	

}
