package utilities;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.IOException;
import java.util.List;

public class Select {

    public static ChromeDriver driver;
    public static WebDriverWait wait;


    public Select(ChromeDriver driver, WebDriverWait wait) throws IOException {
        Select.driver = driver;
        Select.wait = wait;
    }

    public void getURL(String url) {
        driver.get(url);
    }

    public int getButtonsCount(){
        List<WebElement> buttons = driver.findElements(By.tagName("button"));
        return buttons.size();
    }

}
