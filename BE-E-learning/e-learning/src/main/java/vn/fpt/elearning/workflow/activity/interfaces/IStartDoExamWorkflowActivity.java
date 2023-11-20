package vn.fpt.elearning.workflow.activity.interfaces;

import com.uber.cadence.activity.ActivityMethod;


public interface IStartDoExamWorkflowActivity {
    @ActivityMethod
    void activity(String code);
}
