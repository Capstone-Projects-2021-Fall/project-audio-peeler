package models;

public class Mutable<T> {
    T it;

    public Mutable(T it) {
        this.it = it;
    }

    public void set(T it) {
        this.it = it;
    }

    public T get() {
        return it;
    }
}