package vn.fpt.elearning.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
public class ThreadPoolConfig {
    @Value("${thread.pool.core-size}")
    private int poolCore;

    @Value("${thread.pool.max-size}")
    private int poolMax;

    @Value("${thread.pool.queue-capacity}")
    private int queueCapacity;

    @Value("${thread.pool.keep-alive}")
    private int keepAlive;

    @Bean
    public Executor executor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(poolCore);
        executor.setMaxPoolSize(poolMax);
        executor.setQueueCapacity(queueCapacity);
        executor.setKeepAliveSeconds(keepAlive);
        executor.setThreadNamePrefix("executor-1-");
        return executor;
    }
}
