package vn.fpt.elearning.utils;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.MediaType;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.ThreadLocalRandom;

public class CommonUtils {

    public static String updateIfNotEmpty(String src, String input) {
        return StringUtils.isBlank(input) ? src : input;
    }

    public static MediaType getTypeImage(String imageName) {
        String extension = FilenameUtils.getExtension(imageName);
        if (extension.equals("png")) {
            return MediaType.IMAGE_PNG;
        } else if (extension.equals("jpg") || extension.equals("jpeg")) {
            return MediaType.IMAGE_JPEG;
        } else {
            return MediaType.APPLICATION_OCTET_STREAM;
        }
    }

    public static String fileNameTimestamp(String filename) {
        String extension = FilenameUtils.getExtension(filename);
        return filename + "_" + System.currentTimeMillis() + "." + extension;
    }

    public static String getRandomString(int size, boolean isHardCode) {
        if (isHardCode) {
            return "12345678";
        }
        return RandomStringUtils.randomAlphanumeric(size);
    }

    public static String generateCode() {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyMMdd");
        long number = ThreadLocalRandom.current().nextInt(999999);
        String numberFormat = String.format("%06d", number);
        StringBuilder res = new StringBuilder();
        res.append(LocalDate.now().format(dateTimeFormatter));
        res.append(numberFormat);
        res.append(CommonUtils.getCheckDigit(res.toString()));
        return res.toString();
    }

    public static int getCheckDigit(String number) {
        int sum = 0;
        for (int i = 0; i < number.length(); i++) {

            // Get the digit at the current position.
            int digit = Integer.parseInt(number.substring(i, (i + 1)));

            if ((i % 2) == 0) {
                digit = digit * 2;
                if (digit > 9) {
                    digit = (digit / 10) + (digit % 10);
                }
            }
            sum += digit;
        }

        // The check digit is the number required to make the sum a multiple of
        // 10.
        int mod = sum % 10;
        return ((mod == 0) ? 0 : 10 - mod);
    }
}
