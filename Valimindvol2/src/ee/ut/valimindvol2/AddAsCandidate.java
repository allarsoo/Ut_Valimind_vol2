package ee.ut.valimindvol2;
import com.google.appengine.api.rdbms.AppEngineDriver;


import java.io.IOException;
import java.sql.*;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
* @author Allar
*
*/
@SuppressWarnings("serial")
public class AddAsCandidate extends HttpServlet  {
	
	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse res)throws ServletException, IOException{
		res.setContentType("text/html");
		Connection con = null;
		String lausend = null;
		PreparedStatement ps = null;
		String eesnimi=req.getParameter("eesnimi1");
		String perenimi=req.getParameter("perenimi1");
		String partei=req.getParameter("partei1");
		String regioon=req.getParameter("regioon1");
		if(eesnimi.length()>0 && perenimi.length()>0 && partei.length()>0 && regioon.length()>0){
		try{
			DriverManager.registerDriver(new AppEngineDriver());
			con = DriverManager.getConnection("jdbc:google:rdbms://valmindbyut:valimindbyut/evalimised");
			lausend="insert into Kandidaat(Partei,Regioon,Isik) select Partei.Id,Regioon.Id,Isik.Id from Partei,Regioon,Isik where Partei.Id=(select Id from Partei where Nimi=(?)) and Regioon.Id=(select Id from Regioon where Nimi=(?)) and Isik.Id=(select Id from Isik where Eesnimi=(?) and Perenimi=(?));";
			ps=con.prepareStatement(lausend);
			ps.setString(1, partei);
			ps.setString(2, regioon);
			ps.setString(3, eesnimi);
			ps.setString(4, perenimi);
			ps.execute();
		}
		catch(Exception e){
			e.printStackTrace();
		}
		finally{
			if(con != null){
				try{
					con.close();
					System.out.println("Lisasime teid edukalt kandidaadiks");
				}
				catch(SQLException ignore){
					
				}
			}
		}
		}
		else{
			System.out.println("Vajalikud väljad on täitmata, palun prooviga uuesti");
		}
	
	}
}
