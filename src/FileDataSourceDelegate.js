import {Answer,Question} from './DataTypes.js';
import DataSource from "./DataSource.js";
import logger from "./SimpleDebug.js";


class ObjectDataSourceDelegate extends DataSource {
    constructor() {
        super();
    }

    loadQuestions() {
        let questions = [];
        logger.log("Loading Questions", 5);
        let questionsFile = new File()
        JSON.stringify()

        return questions;
    }
}
