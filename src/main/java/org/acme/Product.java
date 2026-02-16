package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class Product extends PanacheEntity {
    public String name;
    public double price;
    public int stock;

    // Helper method to find by name
    public static Product findByName(String name){
        return find("name", name).firstResult();
    }
}