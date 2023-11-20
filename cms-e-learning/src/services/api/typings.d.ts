declare namespace API {
  type AccessTokenResponseCustom = {
    otherClaims?: Record<string, any>;
    token?: string;
    expiresIn?: number;
    refreshExpiresIn?: number;
    refreshToken?: string;
    tokenType?: string;
    idToken?: string;
    notBeforePolicy?: number;
    sessionState?: string;
    scope?: string;
  };

  type AddDocumentRequest = {
    lessonId: string;
    documentName: string;
    documentType: 'VIDEO' | 'TEXT' | 'FILE';
    content?: string;
    file?: string;
    videoUrl?: string;
    description?: string;
  };

  type AddDocumentResponse = {
    document?: DocumentDto;
  };

  type AddExamRequest = {
    lessonId: string;
    examName: string;
    timeMinute: number;
    examType: 'ESSAY' | 'QUIZ';
    testAttempts?: number;
  };

  type AddExamResultRequest = {
    examId?: string;
    score?: number;
    correctTotal?: number;
    comment?: string;
  };

  type AddExamResultResponse = {
    id?: string;
    examId?: string;
    userId?: string;
    score?: number;
    correctTotal?: number;
    comment?: string;
    time?: string;
  };

  type AdministratorDto = {
    id?: string;
    fullName?: string;
    phone?: string;
    email?: string;
    status?: 'ACTIVE' | 'INACTIVE';
    createDate?: string;
  };

  type AnswerResponse = {
    id?: string;
    questionId?: string;
    fillAnswer?: string;
    fillAnswers?: FillAnswerResponse[];
    options?: string[];
  };

  type approveCourseParams = {
    id: string;
  };

  type ApproveRequestRoleTeacherRequest = {
    teacherId?: string;
  };

  type BanAdminRequest = {
    id?: string;
  };

  type BankResponse = {
    id?: number;
    name?: string;
    shortName?: string;
    commonName?: string;
    citad?: string;
    napasSupported?: boolean;
    napasCode?: string;
    benId?: string;
    swift?: string;
    vietQrSupported?: boolean;
    logo?: string;
    icon?: string;
    code?: string;
  };

  type banUserParams = {
    id: string;
  };

  type BaseResponseListCategoryInfo = {
    data?: CategoryInfo[];
  };

  type blockCourseParams = {
    id: string;
  };

  type BlockCourseResponse = {
    course?: CourseDto;
  };

  type CategoryDetail = {
    id?: string;
    title?: string;
    description?: string;
    topic?: number;
    post?: number;
    latestTopicInfo?: TopicInfo;
    parentId?: string;
    status?: 'ACTIVE' | 'INACTIVE';
  };

  type CategoryInfo = {
    id?: string;
    title?: string;
    description?: string;
    topic?: number;
    post?: number;
    latestTopicInfo?: TopicInfo;
    parentId?: string;
  };

  type ChangePasswordRequest = {
    passwordCurrent?: string;
    passwordNew?: string;
    passwordConfirm?: string;
  };

  type ChangePasswordResponse = {
    message?: string;
    success?: boolean;
  };

  type ChatMessage = {
    id?: string;
    chatId?: string;
    senderId?: string;
    recipientId?: string;
    senderName?: string;
    recipientName?: string;
    imagesUrl?: string[];
    content?: string;
    timestamp?: string;
    status?: 'RECEIVED' | 'DELIVERED';
    isRead?: boolean;
    epochTime?: number;
  };

  type ChatRoomDto = {
    id?: string;
    chatId?: string;
    senderId?: string;
    recipientId?: string;
  };

  type checkBankAccountParams = {
    accountNo: string;
    bin: string;
  };

  type CheckBankAccountResponse = {
    bankAccountName?: string;
  };

  type CmsBanUserResponse = {
    message?: string;
    success?: boolean;
  };

  type cmsGetAllParams = {
    status?: 'NONE' | 'CREATED' | 'SUCCESS' | 'CANCELED' | 'FAIL' | 'TIMEOUT';
    fromDate?: string;
    toDate?: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type CmsGetAllUserResponse = {
    users?: UserResponse[];
    paginate?: Paginate;
  };

  type cmsGetAllWithdrawInvoiceParams = {
    teacherId?: string;
    txnNumber?: string;
    status?: 'SUCCESS' | 'FAILED' | 'PENDING';
    fromDate?: string;
    toDate?: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type cmsGetCardsInfoParams = {
    fromDate?: string;
    toDate?: string;
  };

  type CmsGetCardsInfoResponse = {
    /** Tổng số lượng người dùng */
    totalUsers?: number;
    /** Tổng số lượng giảng viên */
    totalTeacher?: number;
    /** Tổng số lượng khóa học */
    totalCourses?: number;
    /** Tổng số lượng hóa đơn thanh toán thành công */
    totalSuccessInvoices?: number;
  };

  type cmsGetCoursesParams = {
    courseId?: string;
    courseName?: string;
    idUser?: string;
    status?: 'ACTIVE' | 'INACTIVE';
    approveStatus?: 'BLOCK' | 'APPROVE' | 'WAITING' | 'REJECTED';
    fromDate?: string;
    toDate?: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type cmsGetDetailByIdParams = {
    id: string;
  };

  type CmsGetDetailCourseResponse = {
    id?: string;
    courseName?: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    status?: 'ACTIVE' | 'INACTIVE';
    approveStatus?: 'BLOCK' | 'APPROVE' | 'WAITING' | 'REJECTED';
    createDate?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    gender?: 'MALE' | 'FEMALE';
    email?: string;
    phone?: string;
    avatar?: string;
  };

  type cmsGetStatisticParams = {
    fromDate?: string;
    toDate?: string;
  };

  type CmsGetStatisticResponse = {
    statistics?: CmsStatisticModel[];
  };

  type CmsStatisticModel = {
    date?: string;
    countUsers?: number;
    countCourses?: number;
  };

  type CmsUpdateInfoByIdRequest = {
    firstName?: string;
    lastName?: string;
    birthday?: string;
    gender?: 'MALE' | 'FEMALE';
    homeNumber?: number;
    streetName?: string;
    avatar?: string;
    provinceId?: number;
    districtId?: number;
    wardId?: number;
  };

  type Comment = {
    createdBy?: string;
    createDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id?: string;
    review?: Review;
    course?: Course;
    user?: User;
    comment?: string;
  };

  type CommentResponse = {
    id?: string;
    userId?: string;
    fullname?: string;
    comment?: string;
    allowEdit?: boolean;
  };

  type countNewMessageParams = {
    senderIds?: string[];
  };

  type CountNewMessageResponse = {
    notifyChats?: NotifyChatModel[];
  };

  type countNewMessagesParams = {
    senderId: string;
    recipientId: string;
  };

  type Course = {
    createdBy?: string;
    createDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id?: string;
    courseName?: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    teacher?: Teacher;
    status?: 'ACTIVE' | 'INACTIVE';
    approveStatus?: 'BLOCK' | 'APPROVE' | 'WAITING' | 'REJECTED';
    users?: User[];
    lessons?: Lesson[];
    reviews?: Review[];
    invoices?: Invoice[];
    discountPercentage?: number;
  };

  type CourseDto = {
    id?: string;
    courseName?: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    status?: 'ACTIVE' | 'INACTIVE';
    approveStatus?: 'BLOCK' | 'APPROVE' | 'WAITING' | 'REJECTED';
    createDate?: string;
    teacherId?: string;
    teacherName?: string;
    studentsCount?: number;
    discountPercentage?: number;
    currentPrice?: number;
    progressPercent?: number;
    star?: number;
  };

  type CreateAdminRequest = {
    phone: string;
    email: string;
    password?: string;
    fullName: string;
  };

  type CreateAdminResponse = {
    administrator?: AdministratorDto;
  };

  type CreateCategoryRequest = {
    title: string;
    description?: string;
    status?: 'ACTIVE' | 'INACTIVE';
    parentId?: string;
  };

  type CreateCommentRequest = {
    reviewId: string;
    comment: string;
  };

  type CreateCourseRequest = {
    courseName: string;
    courseImage: string;
    description?: string;
    price: number;
  };

  type CreateCourseResponse = {
    course?: CourseDto;
  };

  type CreateLessonRequest = {
    courseId: string;
    name: string;
    description: string;
  };

  type CreateListQuestionRequest = {
    examId: string;
    questions?: QuestionInfo[];
  };

  type CreateOptionRequest = {
    optionName: string;
    correct: boolean;
  };

  type CreatePostRequest = {
    content: string;
    topicId: number;
  };

  type CreateQuestionFromExcelRequest = {
    examId?: string;
    questions?: string;
  };

  type CreateQuestionFromExcelResponse = {
    success?: boolean;
  };

  type CreateQuestionRequest = {
    examId: string;
    questionNo: number;
    questionName?: string;
    fillCorrects?: FillCorrectInfo[];
    point: number;
    questionType?: 'FILL' | 'MULTIPLE_SELECT' | 'ONLY_ONE' | 'ESSAY';
    options?: CreateOptionRequest[];
  };

  type CreateReactionRequest = {
    reactionType: 'LIKE' | 'DISLIKE';
    postId?: string;
  };

  type CreateRequestRoleTeacherRequest = {
    ekycId?: string;
  };

  type CreateRequestRoleTeacherResponse = {
    teacher?: TeacherDto;
  };

  type CreateReviewRequest = {
    courseId: string;
    subject: string;
    content: string;
    star: number;
  };

  type CreateRoomChatRequest = {
    recipientId: string;
  };

  type CreateRoomChatResponse = {
    user?: UserDto;
    chatRoom?: ChatRoomDto;
  };

  type CreateTopicRequest = {
    title: string;
    tags?: string;
    categoryId: string;
    firstPostContent: string;
  };

  type DecreaseProgressRequest = {
    id: string;
    type: 'DOCUMENT' | 'EXAM';
  };

  type DeleteCategoryRequest = {
    id?: string;
  };

  type DeleteCommentRequest = {
    id: string;
  };

  type deleteDocumentParams = {
    id: string;
  };

  type deleteExam1Params = {
    id: string;
  };

  type deleteExamParams = {
    id: string;
  };

  type deleteLessonParams = {
    id: string;
  };

  type DeletePostRequest = {
    id?: string;
  };

  type deleteQuestionByExamIdParams = {
    examId: string;
  };

  type deleteQuestionByIdParams = {
    id: string;
  };

  type DeleteQuestionResponse = {
    success?: boolean;
  };

  type DeleteReactionRequest = {
    id?: string;
  };

  type DeleteReviewRequest = {
    id: string;
  };

  type DeleteReviewResponse = {
    success?: boolean;
  };

  type DeleteTopicRequest = {
    id?: number;
  };

  type deleteUserParams = {
    id: string;
  };

  type deleteUserV2Params = {
    id: string;
  };

  type DetectIdCardRequest = {
    imageFront: string;
    imageBack: string;
  };

  type DetectIdCardResponse = {
    idCard?: EkycDTO;
  };

  type DisplayDocumentRequest = {
    documentId: string;
    status: 'HIDE' | 'VISIBLE';
  };

  type DisplayLessonRequest = {
    lessonId: string;
    status: 'HIDE' | 'VISIBLE';
  };

  type District = {
    id?: number;
    name?: string;
    prefix?: string;
    province?: Province;
  };

  type DistrictDto = {
    id?: string;
    name?: string;
    prefix?: string;
  };

  type DistrictModel = {
    id?: number;
    name?: string;
    prefix?: string;
  };

  type DocumentDto = {
    id?: string;
    documentName?: string;
    content?: string;
    documentUrl?: string;
    documentType?: 'VIDEO' | 'TEXT' | 'FILE';
    description?: string;
    displayStatus?: 'HIDE' | 'VISIBLE';
    createDate?: string;
    done?: boolean;
  };

  type Ekyc = {
    createdBy?: string;
    createDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id?: string;
    address?: string;
    birthday?: string;
    characteristics?: string;
    district?: string;
    document?: string;
    expiry?: string;
    optionalData?: string;
    hometown?: string;
    no?: string;
    idType?: string;
    idCheck?: string;
    passportType?: string;
    idLogic?: string;
    idLogicMessage?: string;
    issueBy?: string;
    issueDate?: string;
    name?: string;
    province?: string;
    sex?: string;
    street?: string;
    ward?: string;
    national?: string;
    ethnicity?: string;
    religion?: string;
    frontUrl?: string;
    backUrl?: string;
  };

  type EkycDTO = {
    id?: string;
    address?: string;
    birthday?: string;
    characteristics?: string;
    district?: string;
    ward?: string;
    document?: string;
    expiry?: string;
    optionalData?: string;
    hometown?: string;
    no?: string;
    idType?: string;
    idCheck?: string;
    passportType?: string;
    idLogic?: string;
    idLogicMessage?: string;
    issueBy?: string;
    issueDate?: string;
    name?: string;
    province?: string;
    sex?: string;
    street?: string;
    national?: string;
    ethnicity?: string;
    religion?: string;
    frontUrl?: string;
    backUrl?: string;
  };

  type EncryptedBodyRequest = {
    data?: string;
  };

  type Exam = {
    createdBy?: string;
    createDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id?: string;
    examName?: string;
    timeMinute?: number;
    testAttempts?: number;
    examType?: 'ESSAY' | 'QUIZ';
    lesson?: Lesson;
    status?: 'ACTIVE' | 'INACTIVE';
    questions?: Question[];
  };

  type ExamResponse = {
    id?: string;
    createAt?: string;
    examName?: string;
    timeMinute?: number;
    examType?: 'ESSAY' | 'QUIZ';
    status?: 'ACTIVE' | 'INACTIVE';
    testAttempts?: number;
    totalAttemptsCompleted?: number;
    examMaxScore?: number;
    highestScore?: number;
    done?: boolean;
  };

  type ExamResult = {
    createdBy?: string;
    createDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id?: string;
    code?: string;
    exam?: Exam;
    user?: User;
    score?: number;
    correctTotal?: number;
    time?: string;
    status?: 'CREATE' | 'WAITING' | 'COMPLETE';
    comment?: string;
  };

  type FillAnswerInfo = {
    id?: string;
    answer?: string;
  };

  type FillAnswerResponse = {
    id?: string;
    answer?: string;
  };

  type FillCorrectInfo = {
    index: number;
    answer: string;
  };

  type FillCorrectResponse = {
    id?: string;
    index?: number;
    answer?: string;
    type?: 'TEXT' | 'NUMBER';
  };

  type findChatMessagesParams = {
    senderId: string;
    recipientId: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type findMessageParams = {
    id: string;
  };

  type ForgotPasswordRequest = {
    email?: string;
  };

  type ForgotPasswordResponse = {
    message?: string;
    success?: boolean;
  };

  type ForumCategory = {
    createdBy?: string;
    createDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id?: string;
    title?: string;
    description?: string;
    status?: 'ACTIVE' | 'INACTIVE';
    parentCategory?: ForumCategory;
    subCategories?: ForumCategory[];
    topics?: ForumTopic[];
  };

  type ForumPost = {
    createdBy?: string;
    createDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id?: string;
    content?: string;
    ordinal?: number;
    topic?: ForumTopic;
    reactions?: ForumReaction[];
  };

  type ForumReaction = {
    createdBy?: string;
    createDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    userId?: string;
    postId?: string;
    user?: User;
    post?: ForumPost;
    reactionType?: 'LIKE' | 'DISLIKE';
  };

  type ForumTopic = {
    createdBy?: string;
    createDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id?: number;
    title?: string;
    tags?: string;
    status?: 'ACTIVE' | 'INACTIVE';
    category?: ForumCategory;
    posts?: ForumPost[];
  };

  type getAllBanksParams = {
    name?: string;
    code?: string;
    napasSupported?: boolean;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type GetAllBanksResponse = {
    banks?: BankResponse[];
    paginate?: Paginate;
  };

  type GetAllInvoiceResponse = {
    invoices?: InvoiceResponse[];
    paginate?: Paginate;
  };

  type getAllParams = {
    status?: 'NONE' | 'CREATED' | 'SUCCESS' | 'CANCELED' | 'FAIL' | 'TIMEOUT';
    fromDate?: string;
    toDate?: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type getALlParams = {
    firstName?: string;
    lastName?: string;
    gender?: 'MALE' | 'FEMALE';
    active?: boolean;
    delete?: boolean;
    ban?: boolean;
    isOcr?: boolean;
    createFrom?: string;
    createTo?: string;
    isTeacher?: boolean;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type GetAllProvincesResponse = {
    provinces?: ProvinceDto[];
  };

  type GetAllProvinceV2Response = {
    provinces?: ProvinceModel[];
  };

  type getAllReviewByCourseParams = {
    id: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type GetAllReviewByCourseResponse = {
    reviews?: ReviewResponse[];
    paginate?: Paginate;
  };

  type GetAllWithdrawInvoiceResponse = {
    invoices?: WithdrawResponse[];
    paginate?: Paginate;
  };

  type getByExamIdParams = {
    examId: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type GetCategoryDetailRequest = {
    id?: string;
  };

  type getChatFriendRecentParams = {
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type getChatWithTeacherParams = {
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type GetCourseByUserIdResponse = {
    courses?: CourseDto[];
    paginate?: Paginate;
  };

  type getCourseParams = {
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type GetCurrentAnswerResponse = {
    answers?: SubmitAnswerRequest[];
    timestamp?: number;
  };

  type getCurrentAnswersParams = {
    code: string;
  };

  type getDetailById1Params = {
    id: GetCategoryDetailRequest;
  };

  type getDetailByIdParams = {
    id: GetTopicDetailRequest;
  };

  type getDetailCourseParams = {
    id: string;
  };

  type GetDetailCourseResponse = {
    course?: CourseDto;
  };

  type getDetailDocumentParams = {
    id: string;
  };

  type GetDetailDocumentResponse = {
    document?: DocumentDto;
  };

  type getDetailExamParams = {
    id: string;
  };

  type getDetailExamResultParams = {
    id: string;
  };

  type GetDetailExamResultResponse = {
    id?: string;
    examId?: string;
    userId?: string;
    score?: number;
    correctTotal?: number;
    time?: string;
    comment?: string;
    status?: 'CREATE' | 'WAITING' | 'COMPLETE';
  };

  type GetDetailTeacherByIdRequest = {
    id?: string;
  };

  type getDetailWithFilterPagingParams = {
    title?: string;
    parentId?: string;
    status?: 'ACTIVE' | 'INACTIVE';
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type getDistrictsByProvinceParams = {
    provinceCode: number;
  };

  type GetDistrictsByProvinceResponse = {
    districts?: DistrictDto[];
  };

  type getDistrictsByProvinceV2Params = {
    provinceId: number;
  };

  type GetDistrictsByProvinceV2Response = {
    districts?: DistrictModel[];
  };

  type getDocumentForStudentParams = {
    lessonId: string;
  };

  type getDocumentsParams = {
    courseId?: string;
    lessonId?: string;
    documentName?: string;
    documentType?: 'VIDEO' | 'TEXT' | 'FILE';
  };

  type GetEkycInfoResponse = {
    ekyc?: EkycDTO;
  };

  type getExamByLessonParams = {
    lessonId: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type GetExamByLessonResponse = {
    exams?: ExamResponse[];
    paginate?: Paginate;
  };

  type GetExamResultByExamIdResponse = {
    examResults?: GetDetailExamResultResponse[];
    paginate?: Paginate;
  };

  type getExamResultParams = {
    examId: string;
  };

  type getInfoAdminByIdParams = {
    id: string;
  };

  type GetInfoAdminResponse = {
    administrator?: AdministratorDto;
  };

  type getInfoByIdParams = {
    id: string;
  };

  type getInfoListWithFilterPaging1Params = {
    postId: string;
    reactionType?: 'LIKE' | 'DISLIKE';
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type getInfoListWithFilterPaging2Params = {
    topicId: number;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type getInfoListWithFilterPagingParams = {
    categoryId?: string;
    tags?: string;
    title?: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type GetInfoResponse = {
    user?: UserDto;
  };

  type GetInfoTeacherResponse = {
    teacher?: TeacherDto;
  };

  type GetLessonByCourseResponse = {
    lessons?: LessonResponse[];
  };

  type getLessonsByCourseParams = {
    courseId: string;
  };

  type getListAdministratorParams = {
    fullName?: string;
    status?: 'ACTIVE' | 'INACTIVE';
    fromDate?: string;
    toDate?: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type getListCoursesParams = {
    courseName?: string;
    fromDate?: string;
    toDate?: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type GetListCoursesResponse = {
    courses?: CourseDto[];
    paginate?: Paginate;
  };

  type GetListDocumentResponse = {
    documents?: DocumentDto[];
  };

  type getListRequestRoleTeacherParams = {
    teacherName?: string;
    status?: 'CREATE' | 'ACTIVE' | 'BAN' | 'REJECTED';
    phone?: string;
    fromDate?: string;
    toDate?: string;
    approveFromDate?: string;
    approveToDate?: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type getQuestionByExamIdParams = {
    id?: string;
    examId?: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type GetQuestionResponse = {
    questions?: QuestionResponse[];
    paginate?: Paginate;
  };

  type getRecommendFriendForStudentParams = {
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type getRecommendFriendForTeacherParams = {
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type getRoomChatParams = {
    recipientId?: string;
  };

  type GetRoomChatResponse = {
    chatRoom?: ChatRoomDto;
  };

  type getSubmitAnswerByExamResultParams = {
    examResultId: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type GetSubmitAnswerByExamResultResponse = {
    answers?: SubmitAnswer[];
    paginate?: Paginate;
  };

  type GetTopicDetailRequest = {
    id?: number;
  };

  type getUngradedExamsParams = {
    examId: string;
    status?: 'CREATE' | 'WAITING' | 'COMPLETE';
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type GetUngradedExamsResponse = {
    ungradedExams?: UngradedExamResponse[];
    paginate?: Paginate;
  };

  type getUnregisterCourseParams = {
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type GetUnregisterCourseResponse = {
    courses?: CourseDto[];
    paginate?: Paginate;
  };

  type getUsersByCourseParams = {
    courseId: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type GetUsersByCourseResponse = {
    users?: UserDto[];
    paginate?: Paginate;
  };

  type getUsersParams = {
    firstName?: string;
    avatar?: string;
    lastName?: string;
    gender?: 'MALE' | 'FEMALE';
    phone?: string;
    email?: string;
    birthday?: string;
    homeNumber?: number;
    streetName?: string;
    wards?: string;
    district?: string;
    city?: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type GetUsersResponse = {
    users?: UserResponse[];
    paginate?: Paginate;
  };

  type GetWardsbyDistrictResponse = {
    wards?: WardDto[];
  };

  type getWardsByDistrictV2Params = {
    districtId?: number;
  };

  type GetWardsByDistrictV2Response = {
    wards?: WardModel[];
  };

  type getWardsByProvinceParams = {
    districtCode: number;
  };

  type IncreaseProgressRequest = {
    id: string;
    type: 'DOCUMENT' | 'EXAM';
  };

  type Invoice = {
    createdBy?: string;
    createDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id?: string;
    user?: User;
    course?: Course;
    payTransactionId?: string;
    code?: string;
    payLinkCode?: string;
    timeout?: number;
    url?: string;
    virtualAccount?: string;
    description?: string;
    amount?: number;
    time?: string;
    status?: 'NONE' | 'CREATED' | 'SUCCESS' | 'CANCELED' | 'FAIL' | 'TIMEOUT';
  };

  type InvoiceResponse = {
    id?: string;
    user?: UserResponse;
    course?: CourseDto;
    payTransactionId?: string;
    url?: string;
    time?: string;
    status?: 'NONE' | 'CREATED' | 'SUCCESS' | 'CANCELED' | 'FAIL' | 'TIMEOUT';
    amount?: number;
    code?: string;
  };

  type Lesson = {
    createdBy?: string;
    createDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id?: string;
    name?: string;
    description?: string;
    displayStatus?: 'HIDE' | 'VISIBLE';
    course?: Course;
  };

  type LessonResponse = {
    id?: string;
    name?: string;
    description?: string;
    displayStatus?: 'HIDE' | 'VISIBLE';
    createAt?: string;
  };

  type LinkBankAccountRequest = {
    accountNo?: string;
    bin?: string;
    accountName?: string;
  };

  type LinkedAccountResponse = {
    accountNo?: string;
    accountName?: string;
    bank?: BankResponse;
  };

  type LoginCmsRequest = {
    phone?: string;
    password?: string;
  };

  type LoginRequest = {
    username?: string;
    password?: string;
  };

  type LogoutRequest = {
    refreshToken?: string;
  };

  type LogoutResponse = {
    success?: boolean;
  };

  type MultiUploadRequest = {
    files?: string[];
  };

  type MultiUploadResponse = {
    urls?: string[];
  };

  type NotifyChatModel = {
    senderId?: string;
    totalNewMessage?: number;
  };

  type notifyInvoiceParams = {
    'x-api-client': string;
    'x-api-validate': string;
    'x-api-time': number;
  };

  type notifyVNPayParams = {
    request: Record<string, any>;
  };

  type OptionResponse = {
    id?: string;
    optionName?: string;
    correct?: boolean;
  };

  type PageResponseDataAdministratorDto = {
    data?: AdministratorDto[];
    current?: number;
    pageSize?: number;
    total?: number;
    totalPage?: number;
  };

  type PageResponseDataCategoryDetail = {
    data?: CategoryDetail[];
    current?: number;
    pageSize?: number;
    total?: number;
    totalPage?: number;
  };

  type PageResponseDataChatMessage = {
    data?: ChatMessage[];
    current?: number;
    pageSize?: number;
    total?: number;
    totalPage?: number;
  };

  type PageResponseDataPostInfo = {
    data?: PostInfo[];
    current?: number;
    pageSize?: number;
    total?: number;
    totalPage?: number;
  };

  type PageResponseDataReactionInfo = {
    data?: ReactionInfo[];
    current?: number;
    pageSize?: number;
    total?: number;
    totalPage?: number;
  };

  type PageResponseDataTeacherDto = {
    data?: TeacherDto[];
    current?: number;
    pageSize?: number;
    total?: number;
    totalPage?: number;
  };

  type PageResponseDataTopicInfo = {
    data?: TopicInfo[];
    current?: number;
    pageSize?: number;
    total?: number;
    totalPage?: number;
  };

  type PageResponseDataUserInfoChat = {
    data?: UserInfoChat[];
    current?: number;
    pageSize?: number;
    total?: number;
    totalPage?: number;
  };

  type Paginate = {
    current?: number;
    pageSize?: number;
    total?: number;
    totalPage?: number;
  };

  type PostInfo = {
    createdBy?: string;
    createDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id?: string;
    content?: string;
    ordinal?: number;
    topicId?: number;
    user?: UserForum;
    like?: number;
    dislike?: number;
    currentUserReactionType?: number;
  };

  type previewParams = {
    objectName: string;
  };

  type Province = {
    id?: number;
    name?: string;
    code?: string;
  };

  type ProvinceDto = {
    id?: string;
    name?: string;
    code?: string;
  };

  type ProvinceModel = {
    id?: number;
    code?: string;
    name?: string;
  };

  type Question = {
    id?: string;
    questionNo?: number;
    exam?: Exam;
    questionName?: string;
    point?: number;
    questionType?: 'FILL' | 'MULTIPLE_SELECT' | 'ONLY_ONE' | 'ESSAY';
  };

  type QuestionInfo = {
    questionNo: number;
    questionName?: string;
    fillCorrects?: FillCorrectInfo[];
    point: number;
    questionType: 'FILL' | 'MULTIPLE_SELECT' | 'ONLY_ONE' | 'ESSAY';
    options?: CreateOptionRequest[];
  };

  type QuestionResponse = {
    id?: string;
    questionNo?: number;
    questionName?: string;
    fillCorrects?: FillCorrectResponse[];
    point?: number;
    questionType?: 'FILL' | 'MULTIPLE_SELECT' | 'ONLY_ONE' | 'ESSAY';
    options?: OptionResponse[];
  };

  type ReactionInfo = {
    postId?: string;
    userId?: string;
    firstName?: string;
    lastName?: string;
    type?: 'LIKE' | 'DISLIKE';
  };

  type ReActiveRequest = {
    email?: string;
  };

  type ReActiveResponse = {
    message?: string;
    success?: boolean;
  };

  type RefreshTokenRequest = {
    refreshToken?: string;
  };

  type RegisterCourseRequest = {
    courseId: string;
    paymentType: 'VNPAY' | 'UMEE_PAY';
  };

  type RegisterCourseResponse = {
    paymentUrl?: string;
    success?: boolean;
  };

  type RegisterRequest = {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    password?: string;
    birthday?: string;
    gender?: 'MALE' | 'FEMALE';
  };

  type RegisterResponse = {
    success?: boolean;
  };

  type rejectedCourseParams = {
    id: string;
  };

  type RejectRequestRoleTeacherRequest = {
    teacherId?: string;
    reason?: ('INVALID_ID_CARD' | 'BLUR_ID_CARD')[];
    descriptionReason?: string;
  };

  type ResetPasswordAdminRequest = {
    id?: string;
    password?: string;
  };

  type resetPasswordParams = {
    email: string;
    token: string;
  };

  type ResetPasswordRequest = {
    password?: string;
  };

  type ResetPasswordResponse = {
    message?: string;
    success?: boolean;
  };

  type ResponseBaseAccessTokenResponseCustom = {
    code?: number;
    message?: string;
    data?: AccessTokenResponseCustom;
  };

  type ResponseBaseAddDocumentResponse = {
    code?: number;
    message?: string;
    data?: AddDocumentResponse;
  };

  type ResponseBaseAddExamResultResponse = {
    code?: number;
    message?: string;
    data?: AddExamResultResponse;
  };

  type ResponseBaseBaseResponseListCategoryInfo = {
    code?: number;
    message?: string;
    data?: BaseResponseListCategoryInfo;
  };

  type ResponseBaseBlockCourseResponse = {
    code?: number;
    message?: string;
    data?: BlockCourseResponse;
  };

  type ResponseBaseCategoryDetail = {
    code?: number;
    message?: string;
    data?: CategoryDetail;
  };

  type ResponseBaseChangePasswordResponse = {
    code?: number;
    message?: string;
    data?: ChangePasswordResponse;
  };

  type ResponseBaseCheckBankAccountResponse = {
    code?: number;
    message?: string;
    data?: CheckBankAccountResponse;
  };

  type ResponseBaseCmsBanUserResponse = {
    code?: number;
    message?: string;
    data?: CmsBanUserResponse;
  };

  type ResponseBaseCmsGetAllUserResponse = {
    code?: number;
    message?: string;
    data?: CmsGetAllUserResponse;
  };

  type ResponseBaseCmsGetCardsInfoResponse = {
    code?: number;
    message?: string;
    data?: CmsGetCardsInfoResponse;
  };

  type ResponseBaseCmsGetDetailCourseResponse = {
    code?: number;
    message?: string;
    data?: CmsGetDetailCourseResponse;
  };

  type ResponseBaseCmsGetStatisticResponse = {
    code?: number;
    message?: string;
    data?: CmsGetStatisticResponse;
  };

  type ResponseBaseCommentResponse = {
    code?: number;
    message?: string;
    data?: CommentResponse;
  };

  type ResponseBaseCountNewMessageResponse = {
    code?: number;
    message?: string;
    data?: CountNewMessageResponse;
  };

  type ResponseBaseCreateAdminResponse = {
    code?: number;
    message?: string;
    data?: CreateAdminResponse;
  };

  type ResponseBaseCreateCourseResponse = {
    code?: number;
    message?: string;
    data?: CreateCourseResponse;
  };

  type ResponseBaseCreateQuestionFromExcelResponse = {
    code?: number;
    message?: string;
    data?: CreateQuestionFromExcelResponse;
  };

  type ResponseBaseCreateRequestRoleTeacherResponse = {
    code?: number;
    message?: string;
    data?: CreateRequestRoleTeacherResponse;
  };

  type ResponseBaseCreateRoomChatResponse = {
    code?: number;
    message?: string;
    data?: CreateRoomChatResponse;
  };

  type ResponseBaseDeleteQuestionResponse = {
    code?: number;
    message?: string;
    data?: DeleteQuestionResponse;
  };

  type ResponseBaseDeleteReviewResponse = {
    code?: number;
    message?: string;
    data?: DeleteReviewResponse;
  };

  type ResponseBaseDetectIdCardResponse = {
    code?: number;
    message?: string;
    data?: DetectIdCardResponse;
  };

  type ResponseBaseExamResponse = {
    code?: number;
    message?: string;
    data?: ExamResponse;
  };

  type ResponseBaseForgotPasswordResponse = {
    code?: number;
    message?: string;
    data?: ForgotPasswordResponse;
  };

  type ResponseBaseGetAllBanksResponse = {
    code?: number;
    message?: string;
    data?: GetAllBanksResponse;
  };

  type ResponseBaseGetAllInvoiceResponse = {
    code?: number;
    message?: string;
    data?: GetAllInvoiceResponse;
  };

  type ResponseBaseGetAllProvincesResponse = {
    code?: number;
    message?: string;
    data?: GetAllProvincesResponse;
  };

  type ResponseBaseGetAllProvinceV2Response = {
    code?: number;
    message?: string;
    data?: GetAllProvinceV2Response;
  };

  type ResponseBaseGetAllReviewByCourseResponse = {
    code?: number;
    message?: string;
    data?: GetAllReviewByCourseResponse;
  };

  type ResponseBaseGetAllWithdrawInvoiceResponse = {
    code?: number;
    message?: string;
    data?: GetAllWithdrawInvoiceResponse;
  };

  type ResponseBaseGetCourseByUserIdResponse = {
    code?: number;
    message?: string;
    data?: GetCourseByUserIdResponse;
  };

  type ResponseBaseGetCurrentAnswerResponse = {
    code?: number;
    message?: string;
    data?: GetCurrentAnswerResponse;
  };

  type ResponseBaseGetDetailCourseResponse = {
    code?: number;
    message?: string;
    data?: GetDetailCourseResponse;
  };

  type ResponseBaseGetDetailDocumentResponse = {
    code?: number;
    message?: string;
    data?: GetDetailDocumentResponse;
  };

  type ResponseBaseGetDetailExamResultResponse = {
    code?: number;
    message?: string;
    data?: GetDetailExamResultResponse;
  };

  type ResponseBaseGetDistrictsByProvinceResponse = {
    code?: number;
    message?: string;
    data?: GetDistrictsByProvinceResponse;
  };

  type ResponseBaseGetDistrictsByProvinceV2Response = {
    code?: number;
    message?: string;
    data?: GetDistrictsByProvinceV2Response;
  };

  type ResponseBaseGetEkycInfoResponse = {
    code?: number;
    message?: string;
    data?: GetEkycInfoResponse;
  };

  type ResponseBaseGetExamByLessonResponse = {
    code?: number;
    message?: string;
    data?: GetExamByLessonResponse;
  };

  type ResponseBaseGetExamResultByExamIdResponse = {
    code?: number;
    message?: string;
    data?: GetExamResultByExamIdResponse;
  };

  type ResponseBaseGetInfoAdminResponse = {
    code?: number;
    message?: string;
    data?: GetInfoAdminResponse;
  };

  type ResponseBaseGetInfoResponse = {
    code?: number;
    message?: string;
    data?: GetInfoResponse;
  };

  type ResponseBaseGetInfoTeacherResponse = {
    code?: number;
    message?: string;
    data?: GetInfoTeacherResponse;
  };

  type ResponseBaseGetLessonByCourseResponse = {
    code?: number;
    message?: string;
    data?: GetLessonByCourseResponse;
  };

  type ResponseBaseGetListCoursesResponse = {
    code?: number;
    message?: string;
    data?: GetListCoursesResponse;
  };

  type ResponseBaseGetListDocumentResponse = {
    code?: number;
    message?: string;
    data?: GetListDocumentResponse;
  };

  type ResponseBaseGetQuestionResponse = {
    code?: number;
    message?: string;
    data?: GetQuestionResponse;
  };

  type ResponseBaseGetRoomChatResponse = {
    code?: number;
    message?: string;
    data?: GetRoomChatResponse;
  };

  type ResponseBaseGetSubmitAnswerByExamResultResponse = {
    code?: number;
    message?: string;
    data?: GetSubmitAnswerByExamResultResponse;
  };

  type ResponseBaseGetUngradedExamsResponse = {
    code?: number;
    message?: string;
    data?: GetUngradedExamsResponse;
  };

  type ResponseBaseGetUnregisterCourseResponse = {
    code?: number;
    message?: string;
    data?: GetUnregisterCourseResponse;
  };

  type ResponseBaseGetUsersByCourseResponse = {
    code?: number;
    message?: string;
    data?: GetUsersByCourseResponse;
  };

  type ResponseBaseGetUsersResponse = {
    code?: number;
    message?: string;
    data?: GetUsersResponse;
  };

  type ResponseBaseGetWardsbyDistrictResponse = {
    code?: number;
    message?: string;
    data?: GetWardsbyDistrictResponse;
  };

  type ResponseBaseGetWardsByDistrictV2Response = {
    code?: number;
    message?: string;
    data?: GetWardsByDistrictV2Response;
  };

  type ResponseBaseLessonResponse = {
    code?: number;
    message?: string;
    data?: LessonResponse;
  };

  type ResponseBaseLinkedAccountResponse = {
    code?: number;
    message?: string;
    data?: LinkedAccountResponse;
  };

  type ResponseBaseLogoutResponse = {
    code?: number;
    message?: string;
    data?: LogoutResponse;
  };

  type ResponseBaseMultiUploadResponse = {
    code?: number;
    message?: string;
    data?: MultiUploadResponse;
  };

  type ResponseBasePageResponseDataAdministratorDto = {
    code?: number;
    message?: string;
    data?: PageResponseDataAdministratorDto;
  };

  type ResponseBasePageResponseDataCategoryDetail = {
    code?: number;
    message?: string;
    data?: PageResponseDataCategoryDetail;
  };

  type ResponseBasePageResponseDataChatMessage = {
    code?: number;
    message?: string;
    data?: PageResponseDataChatMessage;
  };

  type ResponseBasePageResponseDataPostInfo = {
    code?: number;
    message?: string;
    data?: PageResponseDataPostInfo;
  };

  type ResponseBasePageResponseDataReactionInfo = {
    code?: number;
    message?: string;
    data?: PageResponseDataReactionInfo;
  };

  type ResponseBasePageResponseDataTeacherDto = {
    code?: number;
    message?: string;
    data?: PageResponseDataTeacherDto;
  };

  type ResponseBasePageResponseDataTopicInfo = {
    code?: number;
    message?: string;
    data?: PageResponseDataTopicInfo;
  };

  type ResponseBasePageResponseDataUserInfoChat = {
    code?: number;
    message?: string;
    data?: PageResponseDataUserInfoChat;
  };

  type ResponseBaseQuestionResponse = {
    code?: number;
    message?: string;
    data?: QuestionResponse;
  };

  type ResponseBaseReActiveResponse = {
    code?: number;
    message?: string;
    data?: ReActiveResponse;
  };

  type ResponseBaseRegisterCourseResponse = {
    code?: number;
    message?: string;
    data?: RegisterCourseResponse;
  };

  type ResponseBaseRegisterResponse = {
    code?: number;
    message?: string;
    data?: RegisterResponse;
  };

  type ResponseBaseResetPasswordResponse = {
    code?: number;
    message?: string;
    data?: ResetPasswordResponse;
  };

  type ResponseBaseReviewCourseResponse = {
    code?: number;
    message?: string;
    data?: ReviewCourseResponse;
  };

  type ResponseBaseReviewResponse = {
    code?: number;
    message?: string;
    data?: ReviewResponse;
  };

  type ResponseBaseSettingCourseResponse = {
    code?: number;
    message?: string;
    data?: SettingCourseResponse;
  };

  type ResponseBaseShowAllResponse = {
    code?: number;
    message?: string;
    data?: ShowAllResponse;
  };

  type ResponseBaseStartDoExamResponse = {
    code?: number;
    message?: string;
    data?: StartDoExamResponse;
  };

  type ResponseBaseStatusResponse = {
    code?: number;
    message?: string;
    data?: StatusResponse;
  };

  type ResponseBaseString = {
    code?: number;
    message?: string;
    data?: string;
  };

  type ResponseBaseSubmitAnswersResponse = {
    code?: number;
    message?: string;
    data?: SubmitAnswersResponse;
  };

  type ResponseBaseTeacherGetBalanceResponse = {
    code?: number;
    message?: string;
    data?: TeacherGetBalanceResponse;
  };

  type ResponseBaseTeacherGetCardsInfoResponse = {
    code?: number;
    message?: string;
    data?: TeacherGetCardsInfoResponse;
  };

  type ResponseBaseTeacherGetStatisticResponse = {
    code?: number;
    message?: string;
    data?: TeacherGetStatisticResponse;
  };

  type ResponseBaseTopicInfo = {
    code?: number;
    message?: string;
    data?: TopicInfo;
  };

  type ResponseBaseUnblockCourseResponse = {
    code?: number;
    message?: string;
    data?: UnblockCourseResponse;
  };

  type ResponseBaseUpdateCourseResponse = {
    code?: number;
    message?: string;
    data?: UpdateCourseResponse;
  };

  type ResponseBaseUpdateDocumentResponse = {
    code?: number;
    message?: string;
    data?: UpdateDocumentResponse;
  };

  type ResponseBaseUpdateEkycResponse = {
    code?: number;
    message?: string;
    data?: UpdateEkycResponse;
  };

  type ResponseBaseUpdateExamResultResponse = {
    code?: number;
    message?: string;
    data?: UpdateExamResultResponse;
  };

  type ResponseBaseUpdateInfoAdminResponse = {
    code?: number;
    message?: string;
    data?: UpdateInfoAdminResponse;
  };

  type ResponseBaseUpdateInfoResponse = {
    code?: number;
    message?: string;
    data?: UpdateInfoResponse;
  };

  type ResponseBaseUploadFileResponse = {
    code?: number;
    message?: string;
    data?: UploadFileResponse;
  };

  type ResponseBaseUserResponse = {
    code?: number;
    message?: string;
    data?: UserResponse;
  };

  type ResponseBaseVerifyEmailResponse = {
    code?: number;
    message?: string;
    data?: VerifyEmailResponse;
  };

  type ResponseBaseVerifyReActiveResponse = {
    code?: number;
    message?: string;
    data?: VerifyReActiveResponse;
  };

  type ResponseBaseWithdrawResponse = {
    code?: number;
    message?: string;
    data?: WithdrawResponse;
  };

  type Review = {
    createdBy?: string;
    createDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id?: string;
    course?: Course;
    user?: User;
    subject?: string;
    content?: string;
    star?: number;
    comments?: Comment[];
  };

  type reviewCourseParams = {
    id: string;
  };

  type ReviewCourseResponse = {
    id?: string;
    courseName?: string;
    description?: string;
    price?: number;
    discountPercentage?: number;
    teacherName?: string;
    imageUrl?: string;
    status?: 'ACTIVE' | 'INACTIVE';
    approveStatus?: 'BLOCK' | 'APPROVE' | 'WAITING' | 'REJECTED';
    createDate?: string;
    lessons?: LessonResponse[];
    studentsCount?: number;
    examsCount?: number;
  };

  type ReviewResponse = {
    id?: string;
    userId?: string;
    avatar?: string;
    fullname?: string;
    subject?: string;
    content?: string;
    star?: number;
    allowEdit?: boolean;
    comments?: CommentResponse[];
  };

  type SetDiscountPercentageRequest = {
    courseId: string;
    discountPercentage: number;
  };

  type SettingCourseRequest = {
    id: string;
    status: 'ACTIVE' | 'INACTIVE';
  };

  type SettingCourseResponse = {
    course?: CourseDto;
  };

  type ShowAllResponse = {
    divisionDtos?: ProvinceDto[];
  };

  type StartDoExamRequest = {
    examId: string;
  };

  type StartDoExamResponse = {
    code?: string;
  };

  type StatusResponse = {
    success?: boolean;
  };

  type studentGetExamByLessonParams = {
    lessonId: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type studentGetLessonsByCourseParams = {
    courseId: string;
  };

  type studentGetQuestionByExamIdParams = {
    id?: string;
    examId: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type SubmitAnswer = {
    question?: QuestionResponse;
    answer?: AnswerResponse;
  };

  type SubmitAnswerRequest = {
    questionId: string;
    fillAnswers?: FillAnswerInfo[];
    options?: string[];
    fillAnswer?: string;
  };

  type SubmitAnswersRequest = {
    code?: string;
    answers?: SubmitAnswerRequest[];
  };

  type SubmitAnswersResponse = {
    score?: number;
    correct?: number;
  };

  type Teacher = {
    createdBy?: string;
    createDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id?: string;
    user?: User;
    ekyc?: Ekyc;
    status?: 'CREATE' | 'ACTIVE' | 'BAN' | 'REJECTED';
    reasonDeny?: string;
    approveDate?: string;
    accountNo?: string;
    accountName?: string;
    bin?: string;
    balance?: number;
  };

  type TeacherDto = {
    id?: string;
    user?: UserDto;
    ekyc?: EkycDTO;
    status?: 'CREATE' | 'ACTIVE' | 'BAN' | 'REJECTED';
    reasonDeny?: string;
    createDate?: string;
    approveDate?: string;
  };

  type teacherGetAllParams = {
    status?: 'NONE' | 'CREATED' | 'SUCCESS' | 'CANCELED' | 'FAIL' | 'TIMEOUT';
    fromDate?: string;
    toDate?: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type teacherGetAllWithdrawInvoiceParams = {
    txnNumber?: string;
    status?: 'SUCCESS' | 'FAILED' | 'PENDING';
    fromDate?: string;
    toDate?: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type TeacherGetBalanceResponse = {
    balance?: number;
  };

  type teacherGetCardsInfoParams = {
    fromDate?: string;
    toDate?: string;
  };

  type TeacherGetCardsInfoResponse = {
    /** Tổng số lượng khóa học */
    totalCourses?: number;
    /** Tổng số lượng học viên */
    totalStudents?: number;
    /** Tổng số lượng hóa đơn thành công */
    totalSuccessInvoices?: number;
    /** Doanh thu */
    balance?: number;
  };

  type teacherGetCoursesParams = {
    courseId?: string;
    courseName?: string;
    status?: 'ACTIVE' | 'INACTIVE';
    approveStatus?: 'BLOCK' | 'APPROVE' | 'WAITING' | 'REJECTED';
    fromDate?: string;
    toDate?: string;
    /** Zero-based page index (0..N) */
    page?: number;
    /** The size of the page to be returned */
    size?: number;
    /** Sorting criteria in the format: property,(asc|desc). Default sort order is ascending. Multiple sort criteria are supported. */
    sort?: string[];
  };

  type teacherGetDetailExamParams = {
    id: string;
  };

  type teacherGetStatisticParams = {
    fromDate?: string;
    toDate?: string;
  };

  type TeacherGetStatisticResponse = {
    statistics?: TeacherStatisticModel[];
  };

  type TeacherStatisticModel = {
    date?: string;
    revenue?: number;
  };

  type TopicInfo = {
    createdBy?: string;
    createDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id?: string;
    title?: string;
    tags?: string;
    path?: string;
    categoryId?: string;
    user?: UserForum;
  };

  type UnbanAdminRequest = {
    id?: string;
  };

  type unbanUserParams = {
    id: string;
  };

  type unblockCourseParams = {
    id: string;
  };

  type UnblockCourseResponse = {
    course?: CourseDto;
  };

  type UngradedExamResponse = {
    id?: string;
    userId?: string;
    name?: string;
    createTime?: string;
    submitTime?: string;
    duration?: string;
    correctTotal?: number;
    score?: number;
    comment?: string;
    status?: 'CREATE' | 'WAITING' | 'COMPLETE';
  };

  type UpdateCategoryRequest = {
    title: string;
    description?: string;
    status?: 'ACTIVE' | 'INACTIVE';
    parentId?: string;
    id?: string;
  };

  type UpdateCommentRequest = {
    id: string;
    comment: string;
  };

  type UpdateCourseRequest = {
    id: string;
    courseName: string;
    courseImage?: string;
    description?: string;
    price: number;
    discountPercentage?: number;
  };

  type UpdateCourseResponse = {
    course?: CourseDto;
  };

  type UpdateDocumentRequest = {
    id: string;
    documentName: string;
    documentType: 'VIDEO' | 'TEXT' | 'FILE';
    content?: string;
    file?: string;
    videoUrl?: string;
    description?: string;
  };

  type UpdateDocumentResponse = {
    document?: DocumentDto;
  };

  type UpdateEkycRequest = {
    ekycId?: string;
    fullName?: string;
    birthday?: string;
    gender?: string;
    province?: string;
    district?: string;
    ward?: string;
    address?: string;
    hometown?: string;
    cardNo?: string;
    issueBy?: string;
    issueDate?: string;
  };

  type UpdateEkycResponse = {
    ekycDTO?: EkycDTO;
  };

  type UpdateExamRequest = {
    id: string;
    examName?: string;
    timeMinute?: number;
    examType?: 'ESSAY' | 'QUIZ';
    status?: 'ACTIVE' | 'INACTIVE';
    testAttempts?: number;
  };

  type UpdateExamResultRequest = {
    id?: string;
    score?: number;
    correctTotal?: number;
    comment?: string;
  };

  type UpdateExamResultResponse = {
    id?: string;
    examId?: string;
    userId?: string;
    score?: number;
    correctTotal?: number;
    comment?: string;
    time?: string;
  };

  type UpdateInfoAdminRequest = {
    id?: string;
    fullName?: string;
    email?: string;
  };

  type UpdateInfoAdminResponse = {
    administrator?: AdministratorDto;
  };

  type updateInfoByIdParams = {
    id: string;
  };

  type UpdateInfoRequest = {
    avatar?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    gender?: 'MALE' | 'FEMALE';
    homeNumber?: number;
    streetName?: string;
    provinceId?: number;
    districtId?: number;
    wardId?: number;
  };

  type UpdateInfoResponse = {
    user?: User;
  };

  type UpdateLessonRequest = {
    id: string;
    name?: string;
    description?: string;
  };

  type UpdatePostRequest = {
    id?: string;
    content?: string;
  };

  type UpdateQuestionRequest = {
    id: string;
    questionNo: number;
    questionName?: string;
    fillCorrects?: FillCorrectInfo[];
    point: number;
    questionType: 'FILL' | 'MULTIPLE_SELECT' | 'ONLY_ONE' | 'ESSAY';
    options?: CreateOptionRequest[];
  };

  type UpdateReactionRequest = {
    id?: string;
    reactionType: 'LIKE' | 'DISLIKE';
  };

  type UpdateReviewRequest = {
    id: string;
    subject?: string;
    content?: string;
    star?: number;
  };

  type UpdateTopicRequest = {
    id?: number;
    title: string;
    tags?: string;
  };

  type UploadFileRequest = {
    file: string;
  };

  type UploadFileResponse = {
    url?: string;
  };

  type User = {
    createdBy?: string;
    createDate?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
    id?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    gender?: 'MALE' | 'FEMALE';
    province?: Province;
    district?: District;
    ward?: Ward;
    streetName?: string;
    homeNumber?: number;
    email?: string;
    phone?: string;
    active?: boolean;
    avatar?: string;
    ban?: boolean;
    delete?: boolean;
    isOrc?: boolean;
    isOnline?: boolean;
    sessionId?: string;
    teacher?: Teacher;
    courses?: Course[];
    examResultEntities?: ExamResult[];
    reviews?: Review[];
    invoices?: Invoice[];
    reactions?: ForumReaction[];
  };

  type UserDto = {
    id?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    gender?: 'MALE' | 'FEMALE';
    email?: string;
    phone?: string;
    province?: ProvinceDto;
    district?: DistrictDto;
    ward?: WardDto;
    streetName?: string;
    homeNumber?: number;
    isOrc?: boolean;
    active?: boolean;
    avatar?: string;
    ban?: boolean;
    isOnline?: boolean;
    createDate?: string;
  };

  type UserForum = {
    avatar?: string;
    firstName?: string;
    lastName?: string;
  };

  type UserInfoChat = {
    id?: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    totalNewMessage?: number;
    isOnline?: boolean;
  };

  type UserResponse = {
    id?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    gender?: 'MALE' | 'FEMALE';
    province?: ProvinceModel;
    district?: DistrictModel;
    ward?: WardModel;
    streetName?: string;
    homeNumber?: number;
    createDate?: string;
    email?: string;
    phone?: string;
    active?: boolean;
    avatar?: string;
    ban?: boolean;
    delete?: boolean;
    isOrc?: boolean;
  };

  type verifyEmailParams = {
    token?: string;
    email?: string;
  };

  type VerifyEmailResponse = {
    message?: string;
    success?: boolean;
  };

  type verifyReActiveParams = {
    token?: string;
    email?: string;
  };

  type VerifyReActiveResponse = {
    success?: boolean;
  };

  type Ward = {
    id?: number;
    name?: string;
    prefix?: string;
    province?: Province;
    district?: District;
  };

  type WardDto = {
    id?: string;
    name?: string;
    prefix?: string;
  };

  type WardModel = {
    id?: number;
    name?: string;
    prefix?: string;
  };

  type WithDrawRequest = {
    amount: number;
  };

  type WithdrawResponse = {
    id?: string;
    txnNumber?: string;
    accountNo?: string;
    accountName?: string;
    amount?: number;
    bank?: BankResponse;
    status?: 'SUCCESS' | 'FAILED' | 'PENDING';
    time?: string;
    user?: UserDto;
  };
}
