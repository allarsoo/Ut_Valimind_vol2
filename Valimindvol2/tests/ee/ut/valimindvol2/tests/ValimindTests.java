package ee.ut.valimindvol2.tests;

import com.thoughtworks.selenium.*;
import org.testng.annotations.*;
import static org.testng.Assert.*;
import java.util.regex.Pattern;

public class ValimindTests extends SeleneseTestCase {
	@BeforeSuite(alwaysRun = true)
    public void setUp() {
        echo("in setup.");
        selenium = new DefaultSelenium("localhost", 
                4444, "*mock", "http://valimindbyutvalimind.appspot.com/kasutamind.html");
        echo("selenium instance created:"+selenium.getClass());
        selenium.start();
        echo("selenium instance started. Opening website...");
        selenium.open("http://valimindbyutvalimind.appspot.com/kasutamind.html");
    }
	private void echo(String msg){
        if(new Boolean(System.getProperties().getProperty("DEBUG")))
            System.out.println(msg);
    }

	@Test 
	public void testLisaKandidaat() throws Exception {
		selenium.open("kasutamind.html");
		selenium.waitForPageToLoad("30000");
		selenium.click("id=resource4");
		selenium.type("id=eesnimi1", "Allar");
		selenium.type("id=perenimi1", "Soo");
		selenium.type("id=DOB", "1991-12-12");
		selenium.select("id=partei1", "label=IRL");
		selenium.select("id=regioon1", "label=Tartumaa");
		selenium.click("id=kandi");
		selenium.click("id=resource1");
		selenium.click("id=list");
		verifyTrue(selenium.isTextPresent("Allar Soo"));
	}
	@Test
	public void otsiByParty() throws Exception{
		selenium.open("kasutamind.html");
		selenium.waitForPageToLoad("30000");
		selenium.click("id=resource1");
		selenium.type("id=eesnimi", "Peeter");
		selenium.type("id=perenimi", "Python");
		selenium.click("id=byName");
		selenium.wait(3000);
		verifyTrue(selenium.isTextPresent("Peeter Python"));
	}
	@Test
	public void vote() throws Exception{
		selenium.open("kasutamind.html");
		selenium.waitForPageToLoad("30000");
		selenium.click("id=resource5");
		selenium.select("id=kandidaat2", "label= John Java");
		selenium.select("id=partei2", "label=Keskerakond");
		selenium.select("id=regioon2", "label=Põlvamaa");
		selenium.click("id=voter");
		selenium.click("OK");
		selenium.click("id=resource3");
		selenium.click("id=n2ita");
		verifyTrue(selenium.isTextPresent("John Java"));
	}
}