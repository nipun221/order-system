# Full-Stack Order System with Testing Pyramid

This project demonstrates a complete testing strategy (Unit, Integration, and End-to-End) for a Java Quarkus application.

The entire development and testing environment is **containerized using Docker**, requiring **zero local installation** of Java, Maven, or Chrome. The project implements a "Testing Pyramid" approach to ensure software quality at every level.

## 🏗️ Tech Stack
* **Framework:** Quarkus (Java) - "Supersonic Subatomic Java"
* **Build Tool:** Maven (Running inside Docker)
* **Frontend:** Qute (Server-side templating)
* **Database:** H2 (In-memory)
* **Testing Frameworks:**
    * **Unit:** JUnit 5 (Mockito not required for pure logic)
    * **Integration:** RestAssured + `@QuarkusTest`
    * **End-to-End (E2E):** Selenium WebDriver (Remote) + Dockerized Chrome

## 🚀 How to Run

### Prerequisites
* **Docker** installed and running.
* **Linux** (Fedora/Ubuntu) is recommended for host networking support.

### Step 1: Start the Selenium Container
This runs a headless Chrome browser that our E2E tests will control. We use `--network host` to allow it to communicate with the Quarkus app easily.

```bash
docker run -d --rm \
    --name selenium-chrome \
    --network host \
    --shm-size="2g" \
    selenium/standalone-chrome:latest

```

### Step 2: Start the Application & Run Tests

This command mounts the current directory, compiles the app, and enters the Quarkus Dev Mode.

```bash
docker run -it --rm \
    --name quarkus-dev \
    --network host \
    -v "$(pwd)":/usr/src/app \
    -w /usr/src/app \
    maven:3.9-eclipse-temurin-17 \
    mvn quarkus:dev

```

### Step 3: Execute the Test Suite

Once the application starts and you see `Profile dev activated` in the terminal:

1. **Open your browser** at `http://localhost:8080` to verify the UI is running.
2. **Press `r**` in the terminal window to execute all tests.

You should see output confirming `Tests passed: 3` (Unit, Integration, and E2E).

---

## 🧪 Testing Strategy

This project implements the three critical layers of the testing pyramid:

### 1. Unit Testing (`PriceCalculatorTest.java`)

* **Layer:** Bottom (Fastest, Isolated)
* **Focus:** Pure business logic.
* **Scenario:** Verifies that orders over $100 correctly receive a 10% discount.
* **Tool:** JUnit 5.
* **Why:** Ensures the math is correct before any database or API is involved.

### 2. Integration Testing (`ShopResourceTest.java`)

* **Layer:** Middle (Service + Database)
* **Focus:** API endpoints and Database interaction.
* **Scenario:** Verifies that the `/order` endpoint accepts POST requests, processes the transaction, and returns a 200 OK status.
* **Tool:** `@QuarkusTest` + RestAssured.
* **Why:** Ensures the REST API contract is honored and the application context loads correctly.

### 3. End-to-End Testing (`WebInterfaceTest.java`)

* **Layer:** Top (Slowest, Most Realistic)
* **Focus:** User Interface and Browser interaction.
* **Scenario:** Connects to the `selenium-chrome` container, navigates to the app, types a quantity, clicks "Buy Now", and scrapes the success message.
* **Tool:** Selenium `RemoteWebDriver`.
* **Why:** Simulates a real user journey to catch UI/UX issues.

---

## 📂 Project Structure

```text
order-system/
├── src
│   ├── main
│   │   ├── java/org/acme
│   │   │   ├── OrderService.java    # Business Logic (Transaction management)
│   │   │   ├── PriceCalculator.java # Pure Logic (Discount rules)
│   │   │   ├── Product.java         # Database Entity (Panache ORM)
│   │   │   └── ShopResource.java    # REST Controller & Qute Renderer
│   │   └── resources/templates
│   │       └── page.qute.html       # Web UI Template
│   └── test
│       └── java/org/acme
│           ├── PriceCalculatorTest.java # Unit Test
│           ├── ShopResourceTest.java    # Integration Test
│           └── WebInterfaceTest.java    # Selenium E2E Test
├── pom.xml                              # Dependencies (Quarkus + Selenium)
└── README.md                            # Documentation

```

## ⚠️ Troubleshooting

* **"SessionNotCreatedException":** Ensure you are running both containers with `--network host`.
* **Tests Paused:** Press `r` in the terminal to resume/trigger tests.