/* data source interface to be implemented */
class DataSource {
    constructor() {
    }

    /* return an array of question objects */
    loadQuestions() {
        throw new ErrorEvent("DataSource is an interface class only - subclass and implement loadQuestions");
    }

}

export default DataSource;