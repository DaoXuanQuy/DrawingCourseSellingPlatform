package vn.fpt.elearning.common;

public class Constant {
    // common
    public static final String dd_MM_yyyy = "dd/MM/yyyy";
    // key on redis
    public static final String REDIS_PREFIX_SERVICE_NAME = "E-learning";

    // folder minio
    private static final String MINIO_FOLDER_OCR = "/ocr";
    private static final String MINIO_FOLDER_PUBLIC = "/public";
    // redis
    public static final String REDIS_ANSWERS_PREFIX = "ANSWERS_";

    public static String getOCRObjectName(String filename) {
        return MINIO_FOLDER_OCR + "/" + filename;
    }

    public static String getPublicObjectName(String fileName) {
        return MINIO_FOLDER_PUBLIC + "/" + fileName;
    }
}
