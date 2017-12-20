package fi.myass;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

public class MyCommandLineRunner implements CommandLineRunner {
    @Autowired
    HtmlHelper hp;

    @Override
    public void run(String... strings) throws Exception {
        // Print hello world
        System.out.println(hp.createH1("hello world"));
    }
}
