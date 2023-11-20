package vn.fpt.elearning.service.interfaces;

import vn.fpt.elearning.model.SendMailModel;

public interface IAsyncService {
    void sendMail(SendMailModel mailModel);
}
