package vn.fpt.elearning.config;


import com.uber.cadence.WorkflowIdReusePolicy;
import com.uber.cadence.activity.ActivityOptions;
import com.uber.cadence.client.WorkflowOptions;
import com.uber.cadence.common.RetryOptions;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class CadenceWorkflowConfigManager {
    static final String DEFAULT_KEY = "default";
    private final CadenceWorkflowRetryConfigProperties properties;

    public WorkflowOptions getWorkflowOptions(String taskList) {
        return getWorkflowBuilder(taskList).build();
    }

    public WorkflowOptions getWorkflowOptions(String taskList, String workflowId) {
        return getWorkflowBuilder(taskList)
            .setWorkflowId(workflowId)
            .build();
    }

    public ActivityOptions getActivityOptions(String taskList, String activityName) {
        return getActivityBuilder(taskList, activityName)
            .build();
    }

    public WorkflowOptions.Builder getWorkflowBuilder(String taskList) {
        var workflow = properties.getRetry().getOrDefault(taskList, properties.getRetry().get(DEFAULT_KEY));
        return new WorkflowOptions.Builder()
            .setTaskList(taskList)
            .setWorkflowIdReusePolicy(WorkflowIdReusePolicy.TerminateIfRunning)
            .setExecutionStartToCloseTimeout(workflow.getExecutionStartToCloseTimeout());
    }

    public ActivityOptions.Builder getActivityBuilder(String taskList, String activityName) {
        var defaultWorkflowOptions = properties.getRetry().get(DEFAULT_KEY);
        var workflow = properties.getRetry().getOrDefault(taskList, defaultWorkflowOptions);
        var activity = workflow.getActivities().getOrDefault(activityName, defaultWorkflowOptions.getActivities().get(DEFAULT_KEY));
        var retry = new RetryOptions.Builder()
            .setInitialInterval(activity.getInitialInterval())
            .setExpiration(activity.getExpiration())
            .setMaximumAttempts(activity.getMaximumAttempts())
            .setBackoffCoefficient(1);
        return new ActivityOptions.Builder()
            .setScheduleToCloseTimeout(activity.getScheduleToCloseTimeout())
            .setRetryOptions(
                retry.build()
            );
    }
}
