package vn.fpt.elearning.core;

public abstract class QueryHandler<T extends RequestData, I extends ResponseData> implements Handler<T, I> {
    public QueryHandler() {
    }
}
