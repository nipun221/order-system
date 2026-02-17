import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

class OrderSystemLoadTest extends Simulation {

  // 1. Define the Protocol (Target)
  val httpProtocol = http
    .baseUrl("http://localhost:8080") // Target our Quarkus App
    .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8")

  // 2. Define the Scenario (User Actions)
  val scn = scenario("Shopping Spree")
    .exec(
      http("View Home Page")
        .get("/")
        .check(status.is(200)) // Assert page loads
    )
    .pause(1) // User thinks for 1 second
    .exec(
      http("Buy Laptop")
        .post("/order")
        .formParam("quantity", "1") // Submit form
        .check(status.is(200))
        .check(css("#message").saveAs("responseMsg")) // Capture success message
    )

  // 3. Define the Load Injection (Stress Level)
  setUp(
    scn.inject(
      atOnceUsers(10),             // 10 users hit immediately
      rampUsers(500).during(30)    // Then 500 users gradually over 30 seconds
    )
  ).protocols(httpProtocol)
}