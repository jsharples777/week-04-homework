import {Answer,Question} from './DataTypes.js';
import DataSource from "./DataSource.js";
import logger from "./SimpleDebug.js";
import data from "../data/questions.js";


class FileDataSourceDelegate extends DataSource {
    constructor() {
        super();
    }

    loadQuestions() {
        logger.log("Loading Questions", 5);
        logger.log(data);
        return data;
    }
}

export default FileDataSourceDelegate;
