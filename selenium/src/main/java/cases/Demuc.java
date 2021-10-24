package cases;

import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import utilities.Select;

import java.io.IOException;

public class Demuc {
    String demucClassic = "https://quiet-tundra-75664.herokuapp.com";
    static Select utils;

    public Demuc(ChromeDriver driver, WebDriverWait wait) throws IOException {
        utils = new Select(driver, wait);
        utils.getURL(demucClassic);
    }


}
