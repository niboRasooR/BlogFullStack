package fi.myass;
import java.util.Calendar;
import java.util.Date;
import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class PostMaker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String mainText;
    private Timestamp date;      // timestamp vs. string?

    /*
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Date date = new Date();
    String frmtdDate = dateFormat.format(date);
    System.out.println("frmtdDate: " + frmtdDate);
    if you are trying to fit the date into some DB statement, you should not do it in the form of text,
    instead use one of the JDBC setters that utilize java.sql.Date or java.sql.Timestamp
    */
    public PostMaker() {

        this.setDate();
    }

    public PostMaker(String title, String body) {

    }

    public void setId(long id) {
        this.id = id;
    }
    public long getId() {
        return this.id;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    public String getTitle() {
        return this.title;
    }

    public void setContent(String content) {
        this.mainText = content;
    }
    public String getContent() {
        return this.mainText;
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
