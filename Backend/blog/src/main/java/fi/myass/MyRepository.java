package fi.myass;


public interface MyRepository<T, ID> {
    public T saveEntity(T entity);
    public Iterable<T> findAll();
}

