package org.acme;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class OrderService {

    @Inject
    PriceCalculator calculator;

    @Transactional
    public String placeOrder(String productName, int quantity) {
        Product product = Product.findByName(productName);

        if (product == null) {
            throw new IllegalArgumentException("Product not found");
        }

        if (product.stock < quantity) {
            throw new IllegalStateException("Insufficient stock");
        }

        // Update Stock
        product.stock -= quantity;
        
        // Calculate Price
        double finalPrice = calculator.calculateTotal(product.price, quantity);
        
        // Save changes to DB
        product.persist();
        
        return String.format("Success! Paid $%.2f for %d %s(s)", finalPrice, quantity, productName);
    }
}