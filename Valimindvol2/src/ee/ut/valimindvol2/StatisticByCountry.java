package ee.ut.valimindvol2;
import com.google.appengine.api.rdbms.AppEngineDriver;
import com.google.gson.Gson;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@SuppressWarnings("serial")
public class StatisticByCountry extends HttpServlet  {

	/**
	 * @param args
	 */
	@Override
	public void doGet(HttpServletRequest req, HttpServletResponse res)throws ServletException, IOException{
		res.setContentType("text/html");
		Connection con = null;
		String lausend = null;
		ResultSet rs = null;
		PreparedStatement ps = null;
		Gson gson=new Gson();
		ArrayList<Statistic> byParty=new ArrayList<Statistic>();
		try{
			DriverManager.registerDriver(new AppEngineDriver());
			con = DriverManager.getConnection("jdbc:google:rdbms://valmindbyut:valimindbyut/evalimised");
			lausend="select KandidaadiNr, Nimi, Perenimi, Partei, Regioon, count(KandidaadiNr) as Hääli from LiveTulemused group by Nimi order by Hääli desc;";
			ps=con.prepareStatement(lausend);
			rs=ps.executeQuery();
			while(rs.next()){
				byParty.add(new Statistic(rs.getInt(1),rs.getString(2),rs.getString(3),rs.getString(4),rs.getString(5),rs.getInt(6)));
			}
			String result=gson.toJson(byParty);
			res.setContentType("application/json");
		    res.setCharacterEncoding("UTF-8");
		    PrintWriter out=res.getWriter();
		    out.print(result);
		}
		
		catch(Exception e){
			throw new RuntimeException(e.getMessage(),e);
		}
		finally{
			if(con != null){
				try{
					con.close();
				}
				catch(SQLException ignore){
					System.out.println("Toimus erind "+ ignore);
				}
			}
		}		
	}
}
	
