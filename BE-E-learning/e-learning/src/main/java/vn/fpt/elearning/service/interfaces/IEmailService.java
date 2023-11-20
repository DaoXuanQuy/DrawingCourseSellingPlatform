package vn.fpt.elearning.service.interfaces;

import vn.fpt.elearning.model.email.EmailModel;

public interface IEmailService {
    void sendEmail(EmailModel model);
}
