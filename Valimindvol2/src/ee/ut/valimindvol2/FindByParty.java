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
public class FindByParty extends HttpServlet{

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
		ArrayList<CreateByParty> byParty=new ArrayList<CreateByParty>();
		String partyName=req.getParameter("partei");
		boolean proceed= false;
		if(partyName != null){
			if(partyName.length()>0){
				proceed=true;
			}
		}
		if(proceed){
		try{
			DriverManager.registerDriver(new AppEngineDriver());
			con = DriverManager.getConnection("jdbc:google:rdbms://valmindbyut:valimindbyut/evalimised");
			lausend="select * from Valitavad where Partei=(?);";
			ps=con.prepareStatement(lausend);
			ps.setString(1, partyName);
			rs=ps.executeQuery();
			while(rs.next()){
				byParty.add(new CreateByParty(rs.getInt(1),rs.getString(2),rs.getString(3),rs.getDate(4),rs.getString(5),rs.getString(6)));
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
		else{
			System.out.println("Teil puudub vastav parameeter, vaadake see üle");
		}		
	}
}
