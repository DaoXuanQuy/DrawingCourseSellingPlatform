package vn.fpt.elearning.utils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Hex;

import javax.crypto.Cipher;
import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Base64;

@Slf4j
public class PaygateSecurityUtils {

    private static final String AES_CIPHER_ALGORITHM = "AES/CBC/PKCS5PADDING";

    public static String encryptAES(String data, String key) {
        try {
            Cipher cipher = Cipher.getInstance(AES_CIPHER_ALGORITHM);
            byte[] iv = Arrays.copyOf(Hex.decodeHex(key), 16);
            IvParameterSpec ivParameterSpec = new IvParameterSpec(iv);
            SecretKey priKey = new SecretKeySpec(Hex.decodeHex(key), "AES");
            cipher.init(Cipher.ENCRYPT_MODE, priKey, ivParameterSpec);
            byte[] plainText = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(plainText);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String decryptAES(String data, String key) {
        try {
            Cipher cipher = Cipher.getInstance(AES_CIPHER_ALGORITHM);
            byte[] iv = Arrays.copyOf(Hex.decodeHex(key), 16);
            IvParameterSpec ivParameterSpec = new IvParameterSpec(iv);
            SecretKey priKey = new SecretKeySpec(Hex.decodeHex(key), "AES");
            cipher.init(Cipher.DECRYPT_MODE, priKey, ivParameterSpec);
            byte[] plainText = cipher.doFinal(Base64.getDecoder().decode(data));
            return new String(plainText);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String hmacEncode(String key, String data) {
        try {
            Mac sha256HMAC = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            sha256HMAC.init(secretKey);

            return Hex.encodeHexString(sha256HMAC.doFinal(data.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            log.error("encode error: {}", e.getMessage());
        }
        return "";
    }

    public static String buildRawSignature(String clientId, String timestamp, String data) {
        return String.format("%s|%s|%s", clientId, timestamp, data);
    }
}
