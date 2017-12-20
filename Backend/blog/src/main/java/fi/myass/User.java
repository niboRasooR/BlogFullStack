package fi.myass;

        import java.util.HashSet;
        import java.util.Set;
public class User {
    /**
     *
     */
    private Long id;
    private String username;
    private String passwordHash;
    private String realName;
    private Set<BlogEntry> entries = new HashSet<>();

    @Override
    public String toString() {
        return "User{" + "id=" + id + ", username='" + username + '\'' +
                ", passwordHash='" + passwordHash + '\'' +
                ", fullName='" + realName + '\'' + '}';
    }

    public User(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public Set<BlogEntry> getEntries() {
        return entries;
    }

    public void setEntries(Set<BlogEntry> entries) {
        this.entries = entries;
    }

    public BlogEntry[] getBlogEntries() {
        //       return blogs;
        return null;
    }

    public void setBlogEntry(BlogEntry[] blogs) {
        //this.blogs = blogs;
    }

   /* public Comment[] getComments() {
        //return comments;
        return null;
    }

    public void setComments(Comment[] comments) {
        //this.comments = comments;
    }*/

}
