package vn.fpt.elearning.model;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class SendMailModel {
    private final String mailTo;
    private final String mailFrom;
    private final String subject;
    private final List<VariablesThymeleaf> listVariables;
    private final List<File> listFileAttach;

    public SendMailModel(String mailTo, String mailFrom, String subject, List<VariablesThymeleaf> listVariables, List<File> listFileAttach) {
        this.mailTo = mailTo;
        this.mailFrom = mailFrom;
        this.subject = subject;
        this.listVariables = listVariables;
        this.listFileAttach = listFileAttach;
    }

    public static SendMailModelBuilder builder() {
        return new SendMailModelBuilder();
    }

    public SendMailModel(SendMailModelBuilder builder) {
        this.mailTo = builder.mailTo;
        this.mailFrom = builder.mailFrom;
        this.subject = builder.subject;
        this.listVariables = builder.listVariables;
        this.listFileAttach = builder.listFileAttach;
    }

    public String getMailTo() {
        return mailTo;
    }

    public String getMailFrom() {
        return mailFrom;
    }

    public String getSubject() {
        return subject;
    }

    public List<VariablesThymeleaf> getListVariables() {
        return listVariables;
    }

    public List<File> getListFileAttach() {
        return listFileAttach;
    }

    public static class SendMailModelBuilder {
        private String mailTo;
        private String mailFrom;
        private String subject;
        private final List<VariablesThymeleaf> listVariables = new ArrayList<>();
        private final List<File> listFileAttach = new ArrayList<>();

        public SendMailModelBuilder builder() {
            return new SendMailModelBuilder();
        }

        public SendMailModelBuilder setMailTo(String mailTo) {
            this.mailTo = mailTo;
            return this;
        }

        public SendMailModelBuilder setMailFrom(String mailFrom) {
            this.mailFrom = mailFrom;
            return this;
        }

        public SendMailModelBuilder setSubject(String subject) {
            this.subject = subject;
            return this;
        }

        public SendMailModelBuilder addVariable(VariablesThymeleaf variable) {
            this.listVariables.add(variable);
            return this;
        }

        public SendMailModelBuilder addFileAttach(File file) {
            this.listFileAttach.add(file);
            return this;
        }

        public SendMailModel build() {
            return new SendMailModel(this);
        }
    }
}
