package vn.fpt.elearning.workflow.workflow.interfaces;

import com.uber.cadence.activity.ActivityOptions;
import com.uber.cadence.workflow.WorkflowMethod;

import java.util.Map;

public interface IStartDoExamWorkflow {
    @WorkflowMethod
    void startDoExamWorkflow(String code, int time, Map<String, ActivityOptions> activityOptionsMap);
}
