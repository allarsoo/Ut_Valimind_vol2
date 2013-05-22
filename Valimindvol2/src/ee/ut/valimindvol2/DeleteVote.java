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
public class DeleteVote extends HttpServlet {
	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse res)throws ServletException, IOException{
		res.setContentType("text/html");
		Connection con = null;
		String lausend = null;
		PreparedStatement ps = null;
		String eesnimi=req.getParameter("eesnimi");
		String perenimi=req.getParameter("perenimi");
		if(eesnimi.length()>0 && perenimi.length()>0){
		try{
			DriverManager.registerDriver(new AppEngineDriver());
			con = DriverManager.getConnection("jdbc:google:rdbms://valmindbyut:valimindbyut/evalimised");
			lausend="delete from Tulemused where Voter=(select Id from Voter where Isik=(select Id form Isik where Eesnimi=(?) and Perenimi=(?)));";
			ps=con.prepareStatement(lausend);
			ps.setString(1, eesnimi);
			ps.setString(2, perenimi);
			ps.execute();
		}
		catch(Exception e){
			e.printStackTrace();
		}
		finally{
			if(con != null){
				try{
					con.close();
					System.out.println("Hääl edukalt eemaldatud");
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
