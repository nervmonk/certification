import java.util.concurrent.Semaphore;

class Printer {
    private final Semaphore semaphore;

    public Printer(int maxConcurrentUsers) {
        semaphore = new Semaphore(maxConcurrentUsers);
    }

    public void usePrinter(String user) {
        try {
            semaphore.acquire();
            System.out.println(user + " is using the printer.");
            Thread.sleep(2000);
            System.out.println(user + " has finished using the printer.");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        } finally {
            semaphore.release();
        }
    }
}

class User extends Thread {
    private final Printer printer;

    public User(Printer printer, String name) {
        super(name);
        this.printer = printer;
    }

    @Override
    public void run() {
        printer.usePrinter(getName());
    }
}

public class SemaphoreExample {
    public static void main(String[] args) {
        int maxUsers = 4;
        Printer printer = new Printer(maxUsers);

        for (int i = 1; i <= 12; i++) {
            new User(printer, "User " + i).start();
        }
    }
}
