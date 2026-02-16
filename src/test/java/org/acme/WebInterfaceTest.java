package org.acme;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.net.URL;
import static org.junit.jupiter.api.Assertions.assertTrue;

// NOTE: We don't use @QuarkusTest here because we are testing the REAL running app from the outside.
public class WebInterfaceTest {

    WebDriver driver;

    @BeforeEach
    void setup() throws MalformedURLException {
        // Connect to the Selenium Docker container we started
        ChromeOptions options = new ChromeOptions();
        // The container is listening on port 4444 by default
        driver = new RemoteWebDriver(new URL("http://localhost:4444/wd/hub"), options);
    }

    @Test
    void testBuyingItems() {
        // 1. Go to the app (running on host network)
        driver.get("http://localhost:8080");

        // 2. Find elements
        WebElement quantityInput = driver.findElement(By.id("quantity"));
        WebElement buyButton = driver.findElement(By.id("buyBtn"));

        // 3. Interact
        quantityInput.clear();
        quantityInput.sendKeys("2");
        buyButton.click();

        // 4. Verify Result
        WebElement message = driver.findElement(By.id("message"));
        String text = message.getText();
        
        // Expecting: "Success! Paid $216.00..."
        assertTrue(text.contains("Success"), "Message should contain 'Success' but was: " + text);
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit(); // Close the browser tab
        }
    }
}