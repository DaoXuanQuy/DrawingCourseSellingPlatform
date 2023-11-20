package vn.fpt.elearning.service;


import io.minio.*;
import io.minio.http.Method;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import vn.fpt.elearning.client.IRestClient;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

@Service
@Slf4j
@RequiredArgsConstructor
public class MinIOService {
    private final MinioClient minioClient;
    private final IRestClient iRestClient;

    @Value("${minio.bucket}")
    private String defaultBucket;
    @Value("${minio.url}")
    private String minioUrl;

    @Value("${minio.folder-public}")
    private String folderPublic;


    @SneakyThrows
    public void createBucket(String bucketName) {
        minioClient.makeBucket(
                MakeBucketArgs.builder()
                        .bucket(bucketName)
                        .build()
        );
    }

    @SneakyThrows
    public String uploadFile(String objName, byte[] content, String type, boolean isPublic) {
        InputStream inputStream = new ByteArrayInputStream(content);
        objName = isPublic ? objectPublic(objName) : objName;
        ObjectWriteResponse response = minioClient.putObject(
                PutObjectArgs.builder()
                        .bucket(defaultBucket)
                        .contentType(type)
                        .object(objName)
                        .stream(inputStream, inputStream.available(), -1)
                        .build()
        );
        log.info("Object: {}", response.object());
        inputStream.close();
        return objName;
    }

    @SneakyThrows
    public InputStream getFile(String object) {
        return minioClient.getObject(
                GetObjectArgs.builder()
                        .bucket(defaultBucket)
                        .object(object)
                        .build()
        );
    }

    @SneakyThrows
    public String getPreSignURL(String object) {
        return minioClient.getPresignedObjectUrl(
                GetPresignedObjectUrlArgs.builder()
                        .bucket(defaultBucket)
                        .object(object)
                        .method(Method.GET)
                        .build()
        );
    }

    @SneakyThrows
    public String getObjectURL(String object) {
        return minioClient.getObjectUrl(defaultBucket, object);
    }

    public String objectPublic(String objectName) {
        return String.format("%s/%s", folderPublic, objectName);
    }
    public String publicUrl(String objectName) {
        return String.format("%s/%s/%s/%s", minioUrl, defaultBucket, folderPublic, objectName);
    }
}
