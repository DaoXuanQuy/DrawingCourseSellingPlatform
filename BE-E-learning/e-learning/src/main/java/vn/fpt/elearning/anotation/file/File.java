package vn.fpt.elearning.anotation.file;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Target({ElementType.ANNOTATION_TYPE, ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = {FileValidation.class})
@Documented
public @interface File {
    Class<? extends Payload>[] payload() default {};

    Class<?>[] groups() default {};

    long fileSize() default 10;

    String[] extensions() default {};

    String message() default "File invalid";
}
