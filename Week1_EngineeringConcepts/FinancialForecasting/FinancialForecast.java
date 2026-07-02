import java.util.Scanner;

public class FinancialForecast {

    public static double predictValue(double amount,
                                      double rate,
                                      int years) {

        // Base condition
        if (years == 0) {
            return amount;
        }

        // Recursive call
        return predictValue(amount * (1 + rate),
                            rate,
                            years - 1);
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter present value: ");
        double amount = sc.nextDouble();

        System.out.print("Enter annual growth rate (%): ");
        double rate = sc.nextDouble() / 100;

        System.out.print("Enter number of years: ");
        int years = sc.nextInt();

        double futureValue =
                predictValue(amount, rate, years);

        System.out.printf("Future Value after %d years = %.2f",
                years, futureValue);

        sc.close();
    }
}