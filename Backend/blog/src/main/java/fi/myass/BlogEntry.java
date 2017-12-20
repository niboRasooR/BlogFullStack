package fi.myass;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.Set;

public class BlogEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String text;
    private Timestamp date;

    public BlogEntry(String title, String text) {
        this.title = title;
        this.text = text;
    }

    public BlogEntry() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String header) {
        this.title = header;
    }

    public String getMainText() {
        return text;
    }

    public void setMainText(String text) {
        this.text = text;
    }



    public void setDate(Timestamp date) {
        this.date = date;
    }

    public void setDate() {
        Date d = Calendar.getInstance().getTime();
        date = new java.sql.Timestamp(d.getTime());
        System.out.println("PÄIVÄMÄÄRÄ: " + date + " " + date.toString()+ "\n");

    }
    public String getDateString(){
        return date.toString();
    }
    public Timestamp getDate() {
        return this.date;
    }

}
