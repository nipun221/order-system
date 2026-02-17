# Full-Stack Order System with Unit, Integration, E2E, and Load Testing (Dockerized)

This project demonstrates a complete testing strategy (Unit, Integration, End-to-End, and Load Testing) for a Java Quarkus application.

The entire development and testing environment is **containerized using Docker**, requiring **zero local installation** of Java, Maven, Chrome, or Gatling.

## 📸 Proof of Execution

### 1. The "Golden Run" (All Tests Passed)
*Evidence that Unit, Integration, and E2E tests executed successfully in the Docker container.*
<img width="1920" height="1080" alt="Screenshot_20260217_044503" src="https://github.com/user-attachments/assets/791fbdeb-ca1e-4415-95bb-dda585972ba7" />

### 2. Application UI (Running in Docker)
*Evidence that the web application is accessible at http://localhost:8080 and renders correctly.*
<img width="1920" height="1080" alt="Screenshot_20260217_044614" src="https://github.com/user-attachments/assets/71c177ad-6521-4f59-992e-368c199d14d6" />

### 3. Running Docker Containers (In Terminal)
*Evidence that both the Quarkus application and Selenium Chrome containers are running.*
<img width="1152" height="317" alt="Screenshot_20260217_044720" src="https://github.com/user-attachments/assets/24a3f621-49f8-4ff1-8beb-ac2391b1f7f5" />

### 4. Load Test Execution (Gatling Terminal)
*Evidence of 1,020 requests simulated with zero failures (KO=0).*
<img width="1920" height="1080" alt="Screenshot_20260217_052211" src="https://github.com/user-attachments/assets/24186223-001d-4290-ba2c-93cb357518c2" />

### 5. Load Test Analysis (Gatling Report)
*Graphical breakdown of response time distribution and throughput.*
<img width="1920" height="2813" alt="Screenshot 2026-02-17 at 05-21-10 Gatling Stats - Global Information" src="https://github.com/user-attachments/assets/25249f4d-9ac4-42a8-b430-6d40a7ea5fe8" />

## 🏗️ Tech Stack
* **Framework:** Quarkus (Java) - "Supersonic Subatomic Java"
* **Build Tool:** Maven (Running inside Docker)
* **Frontend:** Qute (Server-side templating)
* **Database:** H2 (In-memory)
* **Testing Frameworks:**
    * **Unit:** JUnit 5 (Mockito not required for pure logic)
    * **Integration:** RestAssured + `@QuarkusTest`
    * **End-to-End (E2E):** Selenium WebDriver (Remote) + Dockerized Chrome
    * **Load Testing:** Gatling (Scala simulation running in Docker)

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

### Step 4: Run Load Test (Gatling)

Open a new terminal and run the Gatling container to simulate traffic against the running app.
Bash

```bash
docker run -it --rm \
    --network host \
    -v "$(pwd)/gatling/simulations":/opt/gatling/user-files/simulations \
    -v "$(pwd)/gatling/results":/opt/gatling/results \
    denvazh/gatling:latest
```

## 🧪 Testing Strategy

This project implements the full testing pyramid plus non-functional performance testing:

### 1. Unit Testing (`PriceCalculatorTest.java`)

* **Focus:** Pure business logic (Discount rules).
* **Why:** Ensures math is correct before any database/API involvement.

### 2. Integration Testing (`ShopResourceTest.java`)

* **Focus:** API endpoints and Database interactions.
* **Why:** Verifies the REST API contract and transaction management.

### 3. End-to-End Testing (`WebInterfaceTest.java`)

* **Focus:** User Interface and Browser interaction via Selenium.
* **Why:** Simulates a real user clicking "Buy Now" to catch UI bugs.

### 4. Load Testing (`OrderSystemLoadTest.scala`)

* **Focus:** System stability under stress.
* **Scenario:** Simulates concurrent users ramping up to a peak load to identify bottlenecks.

---

## 📊 Performance Analysis

A load test was conducted simulating **1,020 requests** over a short duration.

* **Throughput:** The system handled an average of **32.9 requests/second**.
* **Reliability:** **0% Error Rate** (KO=0). The application logic correctly handled all concurrent transactions without crashing.
* **Bottleneck Identification:** * The **p95 response time** was approximately **10 seconds** (10,182 ms).
* **Analysis:** While the application remained stable (no errors), the high response time indicates a bottleneck, likely due to the **In-Memory H2 Database** locking during write-heavy concurrent transactions.
* **Recommendation:** For production use, migrating to a standalone PostgreSQL database would significantly reduce latency under load.

---

## 📂 Project Structure

```text
order-system/
├── gatling/
│   ├── simulations/         # Scala Load Test Scripts
│   └── results/             # HTML Reports (Generated)
├── screenshots/             # Proof of execution
├── src
│   ├── main
│   │   ├── java/org/acme
│   │   │   ├── OrderService.java    # Business Logic
│   │   │   └── ShopResource.java    # REST Controller
│   └── test
│       └── java/org/acme
│           ├── PriceCalculatorTest.java # Unit Test
│           ├── ShopResourceTest.java    # Integration Test
│           └── WebInterfaceTest.java    # Selenium E2E Test
├── pom.xml                              # Dependencies
└── README.md                            # Documentation

```

## ⚠️ Troubleshooting

* **"SessionNotCreatedException":** Ensure you are running both containers with `--network host`.
* **Tests Paused:** Press `r` in the terminal to resume/trigger tests.
