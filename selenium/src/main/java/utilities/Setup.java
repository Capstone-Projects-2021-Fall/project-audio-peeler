package utilities;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.Point;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class Setup {

    public static ChromeDriver driver;


    public Setup() throws IOException {
        Properties props = getProperties();
        System.setProperty("webdriver.chrome.driver", props.getProperty("chromeDriver"));
        ChromeOptions options = new ChromeOptions();
        options.addArguments("user-data-dir=" + props.getProperty("profile"));
        options.addExtensions(new File(props.getProperty("ublockPath")));
        driver = new ChromeDriver(options);
        driver.manage().window().setSize(new Dimension(960, 1080));
        driver.manage().window().setPosition(new Point(0,0));
    }

    /**
     *
     * @return The config file for the entirety of the program. It is loaded in the @BeforeClass function.
     * @throws IOException
     */
    public static Properties getProperties() throws IOException {

        Properties props = new Properties();
        InputStream inputStream = Setup.class.getClassLoader().getResourceAsStream("config.properties");

        if (inputStream != null) {
            props.load(inputStream);
        } else {
            throw new FileNotFoundException("property file not found in the classpath");
        }
        return props;
    }
}
