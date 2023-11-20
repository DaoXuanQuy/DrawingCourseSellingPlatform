package vn.fpt.elearning.config;


import com.uber.cadence.WorkflowIdReusePolicy;
import com.uber.cadence.activity.ActivityOptions;
import com.uber.cadence.client.WorkflowClient;
import com.uber.cadence.client.WorkflowClientOptions;
import com.uber.cadence.client.WorkflowOptions;
import com.uber.cadence.common.RetryOptions;
import com.uber.cadence.serviceclient.ClientOptions;
import com.uber.cadence.serviceclient.IWorkflowService;
import com.uber.cadence.serviceclient.WorkflowServiceTChannel;
import com.uber.cadence.worker.WorkerFactory;
import com.uber.cadence.worker.WorkerFactoryOptions;
import lombok.Data;
import lombok.SneakyThrows;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Configuration
public class CadenceWorkflowConfig implements InitializingBean, Cloneable {

    @Value("${cadence.host}")
    private String cadenceHost;

    @Value("${cadence.port}")
    private int cadencePort;

    @Value("${cadence.domain}")
    private String domain;

    @Value("${cadence.retry.default.execution-start-to-close-timeout}")
    private Duration executionStartToCloseTimeout;
    @Value("${cadence.retry.default.long-execution-start-to-close-timeout}")
    private Duration longExecutionStartToCloseTimeout;

    @Value("${cadence.retry.default.activities.default.schedule-to-close-timeout}")
    private Duration activityScheduleToCloseTimeout;

    @Value("${cadence.retry.default.activities.default.initial-interval}")
    private Duration activityInitialInterval;

    @Value("${cadence.retry.default.activities.default.expiration}")
    private Duration activityExpiration;

    @Value("${cadence.retry.default.activities.default.maximum-attempts}")
    private Integer activityMaximumAttempts;

    @Value("${cadence.workerfactory.max-workflow-thread-count}")
    private Integer maxWorkflowThreadCount;

    @Value("${cadence.workerfactory.sticky-cache-size}")
    private Integer stickyCacheSize;

    @Value("${cadence.workerfactory.disable-sticky-execution}")
    private Boolean disableStickyExecution;

    @Value("${cadence.worker.max-concurrent-activity-execution-size}")
    private Integer maxConcurrentActivityExecutionSize;

    @Value("${cadence.worker.max-concurrent-workflow-execution-size}")
    private Integer maxConcurrentWorkflowExecutionSize;

    @Value("#{'${cadence.worker.disabled}'.split(',')}")
    private List<Object> disabledWorkers = List.of();

    @Deprecated
    final WorkflowOptionMap workflowOptionMap = new WorkflowOptionMap();

    @Deprecated
    ActivityOptions activityOptions;

    @Override
    public void afterPropertiesSet() {
        // Activities default config
        activityOptions = new ActivityOptions.Builder()
            .setScheduleToCloseTimeout(activityScheduleToCloseTimeout)
            .setRetryOptions(
                new RetryOptions.Builder()
                    .setInitialInterval(activityInitialInterval)
                    .setExpiration(activityExpiration)
                    .setMaximumAttempts(activityMaximumAttempts)
                    .setBackoffCoefficient(1)
                    .setDoNotRetry()
                    .build()
            ).build();
    }


    @Bean
    public IWorkflowService workflowService() {
        return new WorkflowServiceTChannel(ClientOptions.newBuilder()
            .setHost(cadenceHost)
            .setPort(cadencePort)
            .build());
    }

    @Bean
    public WorkflowClient workflowClient(IWorkflowService workflowService) {
        return WorkflowClient.newInstance(
            workflowService,
            WorkflowClientOptions.newBuilder()
                .setDomain(domain)
                .build());
    }

    @Bean
    public WorkerFactory workerFactory(WorkflowClient workflowClient) {
        return WorkerFactory.newInstance(
            workflowClient,
            WorkerFactoryOptions.newBuilder()
                .setMaxWorkflowThreadCount(maxWorkflowThreadCount)
                .setStickyCacheSize(stickyCacheSize)
                .setDisableStickyExecution(disableStickyExecution)
                .build());
    }


    /**
     * Sử dụng WorkflowConfigManager
     */
    @Deprecated
    public class WorkflowOptionMap {
        private final Map<String, WorkflowOptions> internalMap = new HashMap<>();

        public WorkflowOptions get(String taskList, String workFlowId) {
            return getOrDefault(taskList, workFlowId);
        }

        public WorkflowOptions get(String taskList) {
            return getOrDefault(taskList);
        }

        private WorkflowOptions getOrDefault(String taskList) {
            if (internalMap.get(taskList) == null) {
                WorkflowOptions defaultOptions = new WorkflowOptions.Builder()
                    .setTaskList(taskList)
                    .setExecutionStartToCloseTimeout(getExecutionStartToCloseTimeout()
                    ).build();
                internalMap.put(taskList, defaultOptions);
            }
            return internalMap.get(taskList);
        }

        private WorkflowOptions getOrDefault(String taskList, String workFlowId) {
            if (internalMap.get(taskList) == null) {
                WorkflowOptions defaultOptions = new WorkflowOptions.Builder()
                    .setTaskList(taskList)
                    .setWorkflowId(workFlowId)
                    .setWorkflowIdReusePolicy(WorkflowIdReusePolicy.TerminateIfRunning)
                    .setExecutionStartToCloseTimeout(getExecutionStartToCloseTimeout()
                    ).build();
                internalMap.put(taskList, defaultOptions);
            }
            return internalMap.get(taskList);
        }

        public void put(String taskList, WorkflowOptions options) {
            internalMap.put(taskList, options);
        }
    }

}
