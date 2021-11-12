package cases;

import javazoom.spi.mpeg.sampled.file.MpegAudioFileReader;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import utilities.Select;

import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.File;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

public class SingleSongSeparatorFileUpload extends Select{
    String fileDirectory;
    String expectedDownloadFilename;
    String downloadDirectory;

    public SingleSongSeparatorFileUpload(ChromeDriver driver, String fileDirectory, String downloadDirectory, String expectedDownloadFilename, String...url) throws IOException {
        super(driver);
        this.fileDirectory = fileDirectory;
        this.downloadDirectory = downloadDirectory;
        this.expectedDownloadFilename = expectedDownloadFilename;
    }

    public Long getSongDuration() throws UnsupportedAudioFileException, IOException {
        File file = new File(this.fileDirectory);
        AudioFileFormat baseFileFormat = new MpegAudioFileReader().getAudioFileFormat(file);
        Map properties = baseFileFormat.properties();
        return (Long) properties.get("duration")/1000;
    }

    public boolean downloadZip() throws InterruptedException, UnsupportedAudioFileException, IOException {
        WebElement choosefile = driver.findElement(By.cssSelector("#browse-button"));
        WebElement start = driver.findElement(By.xpath("//button[contains(text(),'Start')]"));
        WebElement download = driver.findElement(By.xpath("//button[contains(text(),'Download')]"));
        long songDur = getSongDuration();

        Thread.sleep(1000);
        choosefile.sendKeys(fileDirectory);
        start.click();
        Thread.sleep(songDur + 10000);
        download.click();
        Thread.sleep(10000);

        if(fileExists(downloadDirectory + expectedDownloadFilename + ".zip"))
            return true;

        return false;
    }



}
