public class Main {

    public static void main(String[] args) {

        Logger obj1 = Logger.getInstance();
        obj1.showMessage("Application started.");

        Logger obj2 = Logger.getInstance();
        obj2.showMessage("User logged in.");

        // Checking whether both references point to the same object
        if (obj1 == obj2) {
            System.out.println("Both objects are the same.");
        } else {
            System.out.println("Different objects are created.");
        }
    }
}