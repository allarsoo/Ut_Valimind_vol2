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

/**
 * @author Allar
 *
 */
@SuppressWarnings("serial")
public class StatisticByRegion extends HttpServlet {
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
			lausend="select  Regioon, count(Regioon) as Hääletajaid, count(Regioon)/(select count(*) from LiveTulemused)*100 as Protsent from LiveTulemused group by Regioon order by Hääletajaid desc;";
			ps=con.prepareStatement(lausend);
			rs=ps.executeQuery();
			while(rs.next()){
				byParty.add(new Statistic(rs.getInt(2),rs.getString(1),rs.getDouble(3)));
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
