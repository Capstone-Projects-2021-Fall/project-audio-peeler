import cases.Demuc;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.support.ui.WebDriverWait;
import utilities.Select;
import utilities.Setup;

import java.io.IOException;
import java.time.Duration;
import java.util.List;

public class Runnable {

    public static Setup setup;
    public static Select utils;
    public static WebDriverWait wait;

    @BeforeClass
    public static void init() throws IOException {
        setup = new Setup();
        wait = new WebDriverWait(setup.driver, Duration.ofSeconds(2));
        utils = new Select(setup.driver, wait);
    }

    @Test
    public void mainPageButtonCountCheck() throws IOException {
        Demuc shuffle = new Demuc(setup.driver, wait);

        //Input file button is not considered a button, therefore it should be one less than the expected number
        Assert.assertEquals(1, utils.getButtonsCount());
    }

}

