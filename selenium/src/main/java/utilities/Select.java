package utilities;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

public class Select {

    public static ChromeDriver driver;
    String url = "http://localhost:3000";
    public static WebDriverWait wait;

    public Select(ChromeDriver driver, String...url) throws IOException {
        this.url = (url.length == 0) ? localSelector() : url[0];
        this.driver = driver;
    }

    public String localSelector() throws IOException {
        int responseCode = getResponseCode("http://localhost:3000");

        if(responseCode == 200){
            return "http://localhost:3000";
        }

        responseCode = getResponseCode("http://localhost:3001");

        if(responseCode == 200){
            return "http://localhost:3001";
        }

        return "";

    }

    /**
     * A url is submitted and it returns the response code, the intention is to detect the environment currently being used during testing. It checks localhost availability
     * if no url was initially passed for the argvar.
     *
     * @param urlInput
     * @return
     * @throws IOException
     */
    private int getResponseCode(String urlInput) throws IOException {
        URL url = new URL(urlInput);
        HttpURLConnection huc = (HttpURLConnection) url.openConnection();

        int responseCode = huc.getResponseCode();
        return responseCode;
    }

    /**
     * Loads the url set in the constructor.
     */
    public void getURL() {
        driver.get(url);
    }

    /**
     * Returns the number of buttons on the page by tagName("button")
     *
     * @return int Button size
     */
    public int getButtonsCount(){
        List<WebElement> buttons = getButtons();
        return buttons.size();
    }

    /**
     * Returns all web elements with the tagname("button"), will be useful for interfacing with the webapp.
     *
     * @return List<WebElement> Button
     */
    public List<WebElement> getButtons() {
        return driver.findElements(By.tagName("button"));
    }

    /**
     * Nav buttons are actually divs when rendered on the webapp and therefore requires a different method of accessing them for testing.
     *
     * @return List<WebElement> NavButtons
     */
    public int getNavButtonsCount(){
        List<WebElement> buttons = driver.findElements(By.className("nav-button"));
        return buttons.size();
    }

    public boolean fileExists(String fileLocation){
        File file = new File(fileLocation);
        return file.exists();
    }

}
