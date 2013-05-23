package ee.ut.valimindvol2.tests;
import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

public class Tests extends TestSuite{
	public static Test suite() {
		Tests suite = new Tests();
		suite.addTestSuite(ValimindTests.class);
		return suite;
	}
	public static void main(String[] args) {
		junit.textui.TestRunner.run(suite());
	}
}