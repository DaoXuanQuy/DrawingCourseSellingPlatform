package vn.fpt.elearning.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import vn.fpt.elearning.common.Constant;

import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
@RequiredArgsConstructor
public class RedisService {
    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    public void setValue(String key, Object value) {
        try {
            String content = objectMapper.writeValueAsString(value);
            redisTemplate.opsForValue().set(this.concatPrefixKey(key), content);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    public void setTimeOut(String key, long timeSecond) {
        redisTemplate.expire(this.concatPrefixKey(key), timeSecond, TimeUnit.SECONDS);
    }

    public <T> T getValue(String key, Class<T> tClass) {
        T target = null;
        key = this.concatPrefixKey(key);
        try {
            Object data = redisTemplate.opsForValue().get(key);
            if (data != null) {
                target = objectMapper.readValue(data.toString(), tClass);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
        return target;
    }

    public void deleteKey(String key) {
        redisTemplate.delete(this.concatPrefixKey(key));
    }

    @Async
    public void deleteAll() {
        Set<String> redisKeys = redisTemplate.keys(Constant.REDIS_PREFIX_SERVICE_NAME + "*");
        if (!CollectionUtils.isEmpty(redisKeys)) {
            redisTemplate.delete(redisKeys);
        }
    }

    public void cacheSessionUser(String sessionId, String subjectId, long expire) {
        this.setValue(sessionId, subjectId);
        this.setTimeOut(sessionId, expire);
    }

    private String concatPrefixKey(String key) {
        return Constant.REDIS_PREFIX_SERVICE_NAME + key;
    }
}
