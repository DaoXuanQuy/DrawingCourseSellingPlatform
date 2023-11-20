package vn.fpt.elearning.workflow.workflow;

import com.uber.cadence.activity.ActivityOptions;
import com.uber.cadence.workflow.Workflow;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import vn.fpt.elearning.workflow.activity.interfaces.IStartDoExamWorkflowActivity;
import vn.fpt.elearning.workflow.workflow.interfaces.IStartDoExamWorkflow;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@Slf4j
@NoArgsConstructor
public class StartDoExamWorkflow implements IStartDoExamWorkflow {
    @Override
    public void startDoExamWorkflow(String code, int time, Map<String, ActivityOptions> activityOptionsMap) {
        log.debug("start: {}", LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss")));
        Workflow.sleep(Duration.ofMinutes(time + 1));
        log.debug("end: {}", LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss")));
        IStartDoExamWorkflowActivity activity = Workflow.newActivityStub(IStartDoExamWorkflowActivity.class, activityOptionsMap.get(IStartDoExamWorkflowActivity.class.getSimpleName()));
        activity.activity(code);
    }
}
