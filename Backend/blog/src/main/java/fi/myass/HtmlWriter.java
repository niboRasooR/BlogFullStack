package fi.myass;


import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class HtmlWriter implements HtmlHelper {
    public String createH1(String title){
        return "<h1>" + title + "</h1>";
    }
}
