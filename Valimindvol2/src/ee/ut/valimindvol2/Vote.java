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
public class Vote extends HttpServlet {
	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse res)throws ServletException, IOException{
		res.setContentType("text/html");
		Connection con = null;
		String lausend = null;
		String lausend1 = null;
		PreparedStatement ps = null;
		PreparedStatement ps1 = null;
		String kandidaat=req.getParameter("kandidaat2");
		String tokens []=kandidaat.split(" ");
		String eesnimi=tokens[0];
		String perenimi=tokens[1];
		String partei=req.getParameter("partei2");
		String regioon=req.getParameter("regioon2");
		if(eesnimi.length()>0 && perenimi.length()>0 && partei.length()>0 && regioon.length()>0){
		try{
			DriverManager.registerDriver(new AppEngineDriver());
			con = DriverManager.getConnection("jdbc:google:rdbms://valmindbyut:valimindbyut/evalimised");
			lausend="insert into Voter(Isik) select Id from Isik where Eesnimi=(?) and Perenimi=(?);";
			ps=con.prepareStatement(lausend);
			ps.setString(1, "Allar");
			ps.setString(2, "Soo");
			ps.execute();
			//TODO
			lausend1="insert into Tulemused(Kandidaat,Valimine,Regioon, Voter) select Kandidaat.Id,Valimine.Id,Regioon.Id,Voter.Id from Kandidaat,Valimine,Regioon,Voter where Kandidaat.Id=(select Id from Kandidaat where Isik=(select Id from Isik where Eesnimi=(?) and Perenimi=(?))) and Valimini.Id=(select Id from Valimine where Tyyp='evalimine') and Regioon.Id=(select Id from Regioon where Nimi=(?)) and Voter.Id=(select Id from Voter where Isik=(select Id from Isik where Eesnimi=(?) and Perenimi=(?)));";
			ps1=con.prepareStatement(lausend1);
			ps1.setString(1, eesnimi);
			ps1.setString(2, perenimi);
			ps1.setString(3, regioon);
			ps1.setString(4, "Allar");
			ps1.setString(5, "Soo");
			
		}
		catch(Exception e){
			e.printStackTrace();
		}
		finally{
			if(con != null){
				try{
					con.close();
					System.out.println("Ühendus suletud");
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
