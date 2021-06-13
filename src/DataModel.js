import {Answer, HighScore, Question} from './DataTypes.js';
import logger from './SimpleDebug.js';
import ObjectDataSourceDelegate from "./ObjectDataSourceDelegate.js";

class DataModel {
    simpleStorage = null;
    currentHighScores = [];
    questions = [];
    dataSourceDelegate = null;

    highScoreKey = "highScores";

    constructor(simpleStorage = {}) {
        this.dataSourceDelegate = new ObjectDataSourceDelegate();
        //this.dataSourceDelegate = new FileDataSourceDelegate();
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
        return this.dataSourceDelegate.loadQuestions();
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
        this.questions = this.loadQuestions();
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
