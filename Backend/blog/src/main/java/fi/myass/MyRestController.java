package fi.myass;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.ArrayList;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

//import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class MyRestController{
/*
    @Autowired
    BlogpostRepository database;

    @PostConstruct
    public void init() {
        // called when spring has created the bean
    }


    @RequestMapping(value="/blogentry/{id}", method= GET)
    public String getBlogEntryById(@PathVariable() long id) {

        return "Get BlogEntry by ID: " + id;
    }
    @RequestMapping(value="/blogentry", method= GET)
    public Iterable<BlogEntry> getBlogs() {
        return database.findAll();
    }
    @RequestMapping(value = "/blogentry",  method= RequestMethod.POST)
    public BlogEntry saveBlogEntry(@RequestBody BlogEntry entry) {
        BlogEntry b = entry;
        BlogEntry e = database.save(b);
        return e;
    }

*/
}
