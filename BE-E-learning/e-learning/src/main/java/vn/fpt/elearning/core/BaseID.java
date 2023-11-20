package vn.fpt.elearning.core;

@SuppressWarnings("unchecked")
public interface BaseID<ID> {
    ID getId();

    void setId(ID id);

    default <T> T convertedId() {
        return (T) getId();
    }
}
