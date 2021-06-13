import logger from './SimpleDebug.js';

/* this class will link the functionality of the data model and the application (view) */
class Controller {
    applicationView = null;
    htmlDOM = null;

    constructor(applicationView, htmlDOM, dataModel) {
        this.applicationView = applicationView;
        this.htmlDOM = htmlDOM;
        this.dataModel = dataModel;
        this.timePenaltyForWrongAnswer = 30;
        this.resetTimer();

        /* store useful view components */
        let goToSectionView = this.htmlDOM.getElementById("gotoSection");
        let startQuizButton = this.htmlDOM.getElementById("startQuizButton");
        let questionDisplayView = this.htmlDOM.getElementById("questionDisplayView");
        let addScoreFormView = this.htmlDOM.getElementById("addScoreForm");
        let resetScoresButton = this.htmlDOM.getElementById("resetScores");

        /* setup the randomised questions and set question index to the first in the list */
        this.resetQuestions();

        /* setup the event handlers */
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        startQuizButton.addEventListener('click', this.handleStartQuiz);
        this.handleAnswerSelection = this.handleAnswerSelection.bind(this);
        questionDisplayView.addEventListener('click', this.handleAnswerSelection);
        this.handleGotoSection = this.handleGotoSection.bind(this);
        goToSectionView.addEventListener('click', this.handleGotoSection);
        this.handleAddScore = this.handleAddScore.bind(this);
        addScoreFormView.addEventListener('submit', this.handleAddScore);
        this.handleResetScores = this.handleResetScores.bind(this);
        resetScoresButton.addEventListener('click', this.handleResetScores);
    }

    resetQuestions() {
        this.questions = [];
        this.currentQuestionIndex = 0;
    }


    randomiseAnswers(question) {
        /* simple randomise - just pick an answer and start from there in the array and loop through */
        let randomAnswerIndex = Math.floor(Math.random() * question.answers.length);
        /* get the questions from the index to the end of the array */
        let randomisedAnswers = [];
        for (let index = randomAnswerIndex; index < question.answers.length; index++) {
            randomisedAnswers.push(question.answers[index]);
        }
        if (randomAnswerIndex > 0) {
            for (let index = 0; index < randomAnswerIndex; index++) {
                randomisedAnswers.push(question.answers[index]);
            }
        }
        logger.log("Randomised answers to question " + question.id, 5);
        logger.log(randomisedAnswers, 5);
        return randomisedAnswers;
    }

    randomiseQuestionsAndAnswers(questions) {
        /* simple randomise - just pick a question and start from there in the array and loop through */
        let randomQuestionIndex = Math.floor(Math.random() * questions.length);
        logger.log("Start questions from " + randomQuestionIndex, 5);
        let randomisedQuestions = [];
        /* get the questions from the index to the end of the array */
        for (let index = randomQuestionIndex; index < questions.length; index++) {
            randomisedQuestions.push(questions[index]);
        }
        if (randomQuestionIndex > 0) {
            for (let index = 0; index < randomQuestionIndex; index++) {
                randomisedQuestions.push(questions[index]);
            }
        }
        logger.log("Randomised questions are: ", 5);
        logger.log(randomisedQuestions, 5);
        /* randomise the answers in each question */
        for (let i = 0; i < randomisedQuestions.length; i++) {
            let question = randomisedQuestions[i];
            logger.log("Randomising answers to question " + question.id,5);
            logger.log(question,5);
            question.answers = this.randomiseAnswers(question);
            logger.log("After randomising answers to question " + question.id,5);
            logger.log(question,5);
        }

        return randomisedQuestions;
    }

    initialiseRandomQuestions() {
        /* initialise the questions first */
        if (this.questions.length === 0) {
            this.questions = this.randomiseQuestionsAndAnswers(this.dataModel.getQuestions());
            this.currentQuestionIndex = 0;
        }
    }

    getNextQuestion() {
        this.initialiseRandomQuestions();
        let nextQuestion = null;
        /* get the next question in the list */
        if (!(this.currentQuestionIndex > (this.questions.length - 1))) {
            nextQuestion = this.questions[this.currentQuestionIndex];
            logger.log(nextQuestion);
            this.currentQuestionIndex++;
        } else {
            /* we are out of questions */
            /* stop the timer */
            let score = this.stopTimer();
            /* let the view know */
            this.applicationView.callbackQuestionsFinished(score);
            /* reset the state of the controller */
            this.resetTimer();
            this.resetQuestions();
        }


        /* an empty object will be returned for the question if we have finished */
        return nextQuestion;
    }

    getHighScores() {
        return this.dataModel.getHighScores();
    }

    /*
      Controller actions:
      0.  Run a timer and let the view know when time has run out
      1.  supply the questions to the view (randomised and randomised answer order) one at a time
      2.  supply the high scores for the view to display
      3.  the user selects an answer with a click for a displayed question - process the answer and update the score/timer
      4.  the user resets the high scores using a button click
      5.  provide the next question, and if none, let the view know we are done, and stop the timer
      6.  Add a high score with a name and score
     */
    stopTimer() {
        clearInterval(this.scoreTimer);
        return this.timeRemaining;
    }

    resetTimer() {
        this.scoreTimer = 0;
        this.timeRemaining = 100;
    }

    applyTimePenalty() {
        this.timeRemaining -= this.timePenaltyForWrongAnswer;
        if (this.timeRemaining < 0) this.timeRemaining = 0;
        this.applicationView.callbackUpdateTimerDisplay(this.timeRemaining);
    }

    startTimer() {
        this.applicationView.callbackUpdateTimerDisplay(this.timeRemaining);
        this.scoreTimer = setInterval(() => {
            /* count down each second and display the user */
            if (this.timeRemaining > 0) {
                this.timeRemaining--;
            } else {
                this.timeRemaining = 0;
                /* run out of time */
                this.stopTimer();
                /* let the view know */
                this.applicationView.callbackTimerRanOut();
                /* reset the state of the controller */
                this.resetTimer();
                this.resetQuestions();
            }
            /* ask the view to update the timer display */
            this.applicationView.callbackUpdateTimerDisplay(this.timeRemaining);
        }, 1000);
    }


    handleAnswerSelection(event) {
        logger.log("Checking for answer selection", 2);
        // did we click on an answer
        if (event.target.className === "answer") {
            // was it the correct answer?
            let value = event.target.getAttribute("iscorrect");
            if (value !== "true") {
                logger.log("Clicked incorrect answer", 3);
                /* penalise the timer */
                this.applyTimePenalty();
            }
            /* let the view give the user some information about the correctness of the answer */
            this.applicationView.callbackProvideAnswerFeedback(value === "true");
            /* show the next question */
            this.applicationView.callbackShowNextQuestion();
        }
    }

    handleStartQuiz(event) {
        logger.log("Handle start quiz", 2);
        /* start a timer */
        this.startTimer();
        /* let the view know about the state change */
        this.applicationView.callbackQuizStarted();

    }

    handleGotoSection(event) {
        logger.log("Showing other section of the site", 2);
        this.stopTimer();
        /* update the state of the view to let them know about the high score view */
        this.applicationView.callbackShowOtherSection();
    }

    handleAddScore(event) {
        logger.log("handling adding score to high scores", 2)
        event.preventDefault();
        /* has the user put something in the name field */
        let view = event.target; // should be the form object
        let nameView = view.querySelector("#nameText");
        /* if there is no name, we are assuming they don't want to save their score */
        if (nameView.value != "") {
            /* get the score out of the hidden details */
            let hiddenScoreView = view.querySelector("#score");
            let score = parseInt(hiddenScoreView.getAttribute("value"));
            this.dataModel.addNewHighScore(score, nameView.value);
        }
        this.applicationView.callbackResetQuizDisplay();

    }

    handleResetScores(event) {
        logger.log("Handling resetting scores", 2);
        event.preventDefault();
        /* clear the scores from the model */
        this.dataModel.resetHighScores();
        /* ask the view to reset back to the quiz display */
        this.applicationView.callbackResetQuizDisplay();


    }

}

export default Controller;