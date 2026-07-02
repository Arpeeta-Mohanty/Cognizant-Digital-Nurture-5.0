import java.util.Arrays;
import java.util.Comparator;

public class Main {

    public static void main(String[] args) {

        Product[] products = {
                new Product(101, "Laptop", "Electronics"),
                new Product(102, "Phone", "Electronics"),
                new Product(103, "Shoes", "Fashion"),
                new Product(104, "Watch", "Accessories")
        };

        // Linear Search
        Product p1 = SearchOperations.linearSearch(products, "Phone");

        if (p1 != null) {
            System.out.println("Linear Search Result");
            System.out.println("ID : " + p1.productId);
            System.out.println("Name : " + p1.productName);
            System.out.println("Category : " + p1.category);
        } else {
            System.out.println("Product not found.");
        }

        // Sort array before Binary Search
        Arrays.sort(products,
                Comparator.comparing(p -> p.productName));

        // Binary Search
        Product p2 = SearchOperations.binarySearch(products, "Phone");

        System.out.println();

        if (p2 != null) {
            System.out.println("Binary Search Result");
            System.out.println("ID : " + p2.productId);
            System.out.println("Name : " + p2.productName);
            System.out.println("Category : " + p2.category);
        } else {
            System.out.println("Product not found.");
        }
    }
}