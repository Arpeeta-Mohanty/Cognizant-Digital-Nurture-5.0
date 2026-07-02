public class Logger {

    // Creating a variable to store the single object
    private static Logger logger;

    // Private constructor so that no other class can create objects
    private Logger() {
        System.out.println("Logger is created.");
    }

    // Method to get the single object of Logger
    public static Logger getInstance() {
        if (logger == null) {
            logger = new Logger();
        }
        return logger;
    }

    // Method to display log messages
    public void showMessage(String message) {
        System.out.println("Log: " + message);
    }
}