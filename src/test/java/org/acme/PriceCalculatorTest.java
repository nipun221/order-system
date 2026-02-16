package org.acme;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

// NOTE: No @QuarkusTest annotation here! 
// We want this to be a "pure" unit test that runs instantly.
class PriceCalculatorTest {

    PriceCalculator calculator = new PriceCalculator();

    @Test
    void testNormalPrice() {
        // 2 items at $10 each = $20 (No discount)
        double result = calculator.calculateTotal(10.0, 2);
        assertEquals(20.0, result, 0.01, "Total should be exactly $20");
    }

    @Test
    void testDiscountApplied() {
        // 2 items at $60 each = $120. 
        // Logic: > $100 gets 10% off.
        // Expected: $120 * 0.90 = $108.
        double result = calculator.calculateTotal(60.0, 2);
        assertEquals(108.0, result, 0.01, "Should apply 10% discount for orders over $100");
    }
}