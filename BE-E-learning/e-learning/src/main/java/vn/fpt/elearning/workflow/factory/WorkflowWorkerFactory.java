package vn.fpt.elearning.workflow.factory;


import com.uber.cadence.RegisterDomainRequest;
import com.uber.cadence.serviceclient.IWorkflowService;
import com.uber.cadence.worker.Worker;
import com.uber.cadence.worker.WorkerFactory;
import com.uber.cadence.worker.WorkerOptions;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.thrift.TException;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import vn.fpt.elearning.config.CadenceWorkflowConfig;
import vn.fpt.elearning.enums.CadenceWorkflowTask;
import vn.fpt.elearning.workflow.activity.interfaces.IStartDoExamWorkflowActivity;
import vn.fpt.elearning.workflow.workflow.StartDoExamWorkflow;
import vn.fpt.elearning.workflow.workflow.interfaces.IStartDoExamWorkflow;

@Component
@Slf4j
@RequiredArgsConstructor
public class WorkflowWorkerFactory implements InitializingBean {
    private final CadenceWorkflowConfig workflowConfig;

    private final WorkerFactory workerFactory;

    private final IWorkflowService workflowService;

    private final IStartDoExamWorkflowActivity activity;
    //
    @Override
    public void afterPropertiesSet() {
        registerDomain();
        runFactory();
    }

    private void registerDomain() {
        RegisterDomainRequest request = new RegisterDomainRequest();
        request.setName(workflowConfig.getDomain());
        request.setWorkflowExecutionRetentionPeriodInDays(1);
        try {
            workflowService.RegisterDomain(request);
        } catch (TException ignore) {
        }

    }

    private void runFactory() {
        if (!workflowConfig.getDisabledWorkers().contains(IStartDoExamWorkflow.class.getSimpleName())) {
            createStartDoExamWorker();
        }
        workerFactory.start();
    }

    private void createStartDoExamWorker() {
        Worker worker = workerFactory.newWorker(CadenceWorkflowTask.START_DO_EXAM_TASK.getName(),
            WorkerOptions.newBuilder()
                .setMaxConcurrentActivityExecutionSize(workflowConfig.getMaxConcurrentActivityExecutionSize())
                .setMaxConcurrentWorkflowExecutionSize(workflowConfig.getMaxConcurrentWorkflowExecutionSize())
                .build());
        worker.registerWorkflowImplementationTypes(StartDoExamWorkflow.class);
        worker.registerActivitiesImplementations(activity);

    }

}

