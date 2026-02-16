package org.acme;

import io.quarkus.qute.Template;
import io.quarkus.qute.TemplateInstance; // Keep this import just in case
import jakarta.inject.Inject;
import jakarta.transaction.Transactional; // <--- This is the key import
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/")
public class ShopResource {

    @Inject
    Template page;

    @Inject
    OrderService orderService;

    @GET
    @Produces(MediaType.TEXT_HTML)
    @Transactional  // <--- ADD THIS ANNOTATION
    public String get() {
        // Seed data if empty (For testing purposes)
        if (Product.count() == 0) {
            Product p = new Product();
            p.name = "Laptop";
            p.price = 120.00;
            p.stock = 10;
            p.persist(); // This line caused the error!
        }
        return page.data("message", "Ready to order").render();
    }

    @POST
    @Path("order")
    @Produces(MediaType.TEXT_HTML)
    public String order(@FormParam("quantity") int quantity) {
        try {
            // The service already handles transactions internally
            String result = orderService.placeOrder("Laptop", quantity);
            return page.data("message", result).render();
        } catch (Exception e) {
            return page.data("message", "Error: " + e.getMessage()).render();
        }
    }
}