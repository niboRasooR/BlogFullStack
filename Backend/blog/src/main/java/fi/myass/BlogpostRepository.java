package fi.myass;

import org.springframework.data.repository.CrudRepository;


public interface BlogpostRepository extends CrudRepository<BlogEntry, Long> {

    public abstract void sayHello();


}