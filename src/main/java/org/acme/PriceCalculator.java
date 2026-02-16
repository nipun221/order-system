package org.acme;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PriceCalculator {

    public double calculateTotal(double price, int quantity) {
        double total = price * quantity;
        
        // Logic: 10% discount if total exceeds $100
        if (total > 100) {
            return total * 0.90; 
        }
        return total;
    }
}