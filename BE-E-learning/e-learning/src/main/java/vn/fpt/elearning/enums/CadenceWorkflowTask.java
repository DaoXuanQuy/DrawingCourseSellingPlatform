package vn.fpt.elearning.enums;

public enum CadenceWorkflowTask {
    START_DO_EXAM_TASK("StartDoExamTaskId", "StartDoExamTask"),
    ;
    private final String id;
    private final String name;

    CadenceWorkflowTask(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
