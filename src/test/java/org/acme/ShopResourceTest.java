package org.acme;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.containsString;

@QuarkusTest // This starts the container/database for the test
class ShopResourceTest {

    @Test
    void testOrderPageLoads() {
        given()
          .when().get("/")
          .then()
             .statusCode(200)
             .body(containsString("Product: Laptop")); // Verify HTML content
    }

    @Test
    void testOrderFlow() {
        // We simulate a form POST request to buy 1 item
        given()
          .formParam("quantity", "1")
          .when().post("/order")
          .then()
             .statusCode(200)
             .body(containsString("Success!"));
    }
}