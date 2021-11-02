import cases.SingleSongSeparatorFileUpload;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.support.ui.WebDriverWait;
import utilities.Select;
import utilities.Setup;

import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.IOException;
import java.time.Duration;

public class Runnable {

    public static Setup setup;
    public static Select utils;
    public static WebDriverWait wait;

    @BeforeClass
    public static void init() throws IOException {
        setup = new Setup();
        wait = new WebDriverWait(setup.driver, Duration.ofSeconds(2));
        utils = new Select(setup.driver, "https://audiopeeler.herokuapp.com/");
    }

    @Test
    public void mainPageButtonCountCheck() throws IOException {
        utils.getURL();
        int buttonCount = utils.getNavButtonsCount() + utils.getButtonsCount();
        //Input file button is not considered a button, therefore it should be one less than the expected number
        Assert.assertEquals(7, buttonCount);
    }

    @Test
    public void getSongDuration() throws IOException, UnsupportedAudioFileException, InterruptedException {
        utils.getURL();
        SingleSongSeparatorFileUpload shuffle = new SingleSongSeparatorFileUpload(setup.driver, "C:\\Users\\frank\\Desktop\\Que Sera Sera 30secs.mp3", "D:\\Downloads\\", "Que Sera Sera 30secs");
        long duration = shuffle.getSongDuration();
        Assert.assertEquals(30877, duration);
        shuffle.downloadZip();
        System.out.println(duration);
    }

    @Test
    public void verifyDownload() throws UnsupportedAudioFileException, IOException, InterruptedException {
        utils.getURL();
        SingleSongSeparatorFileUpload shuffle = new SingleSongSeparatorFileUpload(setup.driver,"C:\\Users\\frank\\Desktop\\Que Sera Sera 30secs.mp3","D:\\Downloads\\","Que_Sera_Sera_30secs");
        Assert.assertEquals(true,shuffle.downloadZip());
    }

    @AfterClass
    public static void cleanUp() {
        Setup.driver.close();
    }

}

