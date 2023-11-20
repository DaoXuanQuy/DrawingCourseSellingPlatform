package vn.fpt.elearning.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.util.Map;

@Configuration
@ConfigurationProperties("cadence")
@Data
public class CadenceWorkflowRetryConfigProperties {
    private Map<String, Workflow> retry;


    @Data
    public static class Workflow {
        private Duration executionStartToCloseTimeout;
        private Duration mediumExecutionStartToCloseTimeout;
        private Duration longExecutionStartToCloseTimeout;
        private Map<String, Activity> activities;
    }

    @Data
    public static class Activity {
        private Duration scheduleToCloseTimeout;
        private Duration initialInterval;
        private Duration expiration;
        private Integer maximumAttempts;
    }
}
