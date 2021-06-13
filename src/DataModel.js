import {Answer, HighScore, Question} from './DataTypes.js';
import logger from './SimpleDebug.js';

class DataModel {
    simpleStorage = null;
    currentHighScores = [];
    questions = [];

    highScoreKey = "highScores";

    constructor(simpleStorage = {}) {
        this.initialise(simpleStorage);
    }

    resetQuestions() {
        logger.log("Resetting Questions", 5);
        for (let index = 0; index < this.questions.length; index++) {
            let question = this.questions[index];
            question.isAlreadyAsked = false;
        }
    }

    loadQuestions() {
        logger.log("Loading Questions", 5);
        let answer1 = new Answer(1, "test1 - not correct");
        let answer2 = new Answer(2, "test2 - not correct");
        let answer3 = new Answer(3, "test3 - correct", true);
        let answer4 = new Answer(4, "test4 - not correct");
        let question = new Question(1, "This is a test 1", [answer1, answer2, answer3, answer4]);
        this.questions.push(question);
        answer1 = new Answer(1, "test1 - not correct");
        answer2 = new Answer(2, "test2 - correct", true);
        answer3 = new Answer(3, "test3 - not correct");
        answer4 = new Answer(4, "test4 - not correct");
        question = new Question(2, "This is a test 2", [answer1, answer2, answer3, answer4]);
        this.questions.push(question);
        answer1 = new Answer(1, "test1 - correct", true);
        answer2 = new Answer(2, "test2 - not correct");
        answer3 = new Answer(3, "test3 - not correct");
        answer4 = new Answer(4, "test4 - not correct");
        question = new Question(3, "This is a test 3", [answer1, answer2, answer3, answer4]);
        this.questions.push(question);
        logger.log(this.questions, 5);
    }

    loadHighScores() {
        logger.log("Loading High Scores", 5);
        let savedHighScores = JSON.parse(this.simpleStorage.getItem(this.highScoreKey));
        logger.log("Saved High Scores were " + savedHighScores, 5);
        if (savedHighScores != null) {
            for (let index = 0; index < savedHighScores.length; index++) {
                /* create a store the high scores */
                let score = parseInt(savedHighScores[index].score);
                let name = savedHighScores[index].name;
                let highScore = new HighScore(score, name);
                this.currentHighScores.push(highScore);
            }
        }
        logger.log(this.currentHighScores, 5);
    }

    saveHighScores() {
        logger.log("Saving High Scores", 5);
        let stringifiedHighScores = JSON.stringify(this.currentHighScores);
        logger.log(stringifiedHighScores);
        this.simpleStorage.setItem(this.highScoreKey, stringifiedHighScores);
    }

    getQuestions() {
        /*
          in the data model we will just return the questions, but will make a copy of the them for the controller
          so that the controller may modify order and randomise answers without affecting the data model source
          ideally the questions array would be private to this class
        */
        logger.log("Getting Questions", 5);
        let copiedQuestions = [];
        for (let index = 0; index < this.questions.length; index++) {
            let question = this.questions[index];
            let copiedQuestion = new Question(question.id, question.question);
            copiedQuestions.push(copiedQuestion);
            let copiedAnswers = [];
            for (let j = 0; j < question.answers.length; j++) {
                let answer = question.answers[j];
                let copiedAnswer = new Answer(answer.id, answer.answer, answer.isCorrect);
                copiedAnswers.push(copiedAnswer);
            }
            copiedQuestion.answers = copiedAnswers;
        }
        logger.log(copiedQuestions, 5);
        return copiedQuestions;
    }


    addNewHighScore(score, name) {
        logger.log("Adding new high score " + score + " " + name, 5);
        /* create a new HighScore and add to the high scores in memory */
        let highScore = new HighScore(score, name);
        this.currentHighScores.push(highScore);
        /* sort the array of scores into descending order */
        this.currentHighScores.sort(compareHighScores);
        /* save the new scores */
        this.saveHighScores();
    }

    resetHighScores() {
        logger.log("Resetting high scores", 5);
        this.currentHighScores = []; /* empty the array, relies of gc */
        this.saveHighScores();
    }

    getHighScores() {
        return this.currentHighScores;
    }

    initialise(simpleStorage = {}) {
        /* assume a stringified storage with JSON format */
        this.simpleStorage = simpleStorage;
        /* create the questions */
        this.loadQuestions();
        /* load the high scores from local data */
        this.loadHighScores();
    }
}

/* reverse order comparison by score - not exported */
function compareHighScores(highScore1, highScore2) {
    /* sort into reverse order (i.e. descending) */
    return (highScore2.score - highScore1.score);
}

export default DataModel;
