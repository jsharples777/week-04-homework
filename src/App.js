import logger from "./SimpleDebug.js";
import DataModel from "./DataModel.js";
import Controller from "./Controller.js";

class App {
    /*
      The quiz has multiple states (an enumeration would be useful)
      1.  Quiz not started - VALUE -1;
      2.  Quiz started, not yet finished - VALUE 1;
      3.  Quiz finished - VALUE 2;
      4.  Not showing Quiz, but showing high scores - VALUE 3;
     */

    constructor() {
        logger.log("Setting starting state");
        this.currentQuestion = {};
        this.highScores = [];
        this.quizState = -1;
        this.currentlyShowingQuiz = true;
    }

    /* components are all setup, now we can render everything */
    initialise() {
        /* setup the model view controller */
        this.model = new DataModel(window.localStorage); // ideally the view shouldn't know about the model
        this.controller = new Controller(this, document, this.model);
        logger.log("changing state to next question and high scores");
        let highScores = this.controller.getHighScores();
        logger.log(highScores);

        /* useful view components references */
        this.questionDisplayView = document.getElementById("questionDisplayView");
        this.timerView = document.getElementById("timer");
        this.questionView = document.getElementById("question");
        this.answersListView = document.getElementById("answers");
        this.addHighScoreView = document.getElementById("addHighScore");
        this.gotoSectionView = document.getElementById("gotoSection");
        this.scoreListView = document.getElementById("scoreList");
        this.highScoresView = document.getElementById("scoreDisplayDiv");
        this.answerFeedbackView = document.getElementById("answerFeedBack");
    }

    updateQuestionDisplay(question) {
        /* remove any existing question */
        this.questionView.innerHTML = "";
        this.answersListView.querySelectorAll('*').forEach(answerItem => answerItem.remove());

        /* is there a question to display */
        if (question != null) {
            this.questionView.innerHTML = question.question;
            for (let index = 0; index < question.answers.length; index++) {
                let answer = question.answers[index];
                let displayAnswerText = index + ". " + answer.answer;
                let answerItem = document.createElement("li");
                answerItem.setAttribute("class", "answer");
                answerItem.setAttribute("iscorrect", answer.isCorrect);
                answerItem.innerHTML = displayAnswerText;
                this.answersListView.appendChild(answerItem);
            }
        }
    }

    callbackQuizStarted() {
        /* the timer has been started by the controller */
        this.quizState = 1; // record the current state - quiz started
        /* hide the start button */
        let startQuizButtonView = document.getElementById("startQuiz");
        startQuizButtonView.style.display = "none";
        /* now display the first question */
        let question = this.controller.getNextQuestion();
        logger.log(question,2);
        this.updateQuestionDisplay(question);
    }


    callbackTimerRanOut() {
        logger.log("Timer ran out",1);
        this.quizState = 2;
        let score = 0;
        this.callbackQuestionsFinished(score);
    }

    callbackShowNextQuestion() {
        /* ask for the next question from the controller */
        let question = this.controller.getNextQuestion();
        /*
          do we have anymore questions?  if so, proceed to update the display,
          the controller will let us know if we are done with a different callback
        */

        if (question != null) {
            this.updateQuestionDisplay(question);
        }

    }

    callbackQuestionsFinished(score = 0) {
        logger.log("Quiz Finished - no further questions", 1);
        this.quizState = 2;
        /* clear the question display */
        this.updateQuestionDisplay(null);
        /* show the high score submission */
        this.addHighScoreView.style.display = "block";
        this.answerFeedbackView.style.display = "block";
        setTimeout(() => {
            this.answerFeedbackView.style.display = "none";
        },2000);
        /* show the user their score */
        let scoreDisplayView = this.addHighScoreView.querySelector("#scoreDisplay");
        scoreDisplayView.innerHTML = "The quiz is finished, you scored " + score + ".  Add your name to the high scores.";
        /* add the score to the form data */
        let hiddenScoreView = this.addHighScoreView.querySelector("#score");
        hiddenScoreView.setAttribute("value", score);
        /* let the controller manage the user submission */
    }

    /* private */ resetDisplay(showQuiz = true) {
        this.updateQuestionDisplay(null);
        let quizViewsDisplayStyle = "block";
        let highScoreViewsDisplayStyle = "none";
        let gotoSectionText = "Show High Scores";
        this.currentlyShowingQuiz = showQuiz;
        if (!showQuiz) {
            quizViewsDisplayStyle = "none";
            highScoreViewsDisplayStyle = "block";
            gotoSectionText = "Return to Quiz";
        }
        /* show the base test and button to start the quiz */
        this.questionDisplayView.style.display = quizViewsDisplayStyle;
        this.questionView.innerHTML = "A series of coding questions about Javascript, please press Start Quiz to begin";
        let startQuizButtonView = document.getElementById("startQuiz");
        startQuizButtonView.style.display = quizViewsDisplayStyle;
        this.answerFeedbackView.style.display = "none"; //remove the feedback
        this.addHighScoreView.style.display = "none"; // always hide the add new high score
        /* hide the high scores display */
        this.highScoresView.style.display = highScoreViewsDisplayStyle;
        /* show the timer display */
        this.timerView.style.display = quizViewsDisplayStyle;
        /* set the navigation to section details */
        this.gotoSectionView.innerHTML = gotoSectionText;
    }

    /* private */ showHighScores() {
        let highScores = this.controller.getHighScores();
        /* remove the previous list */
        this.scoreListView.querySelectorAll('*').forEach(scoreItem => scoreItem.remove());

        for (let index = 0; index < highScores.length; index++) {
            let highScore = highScores[index];
            let displayScoreText = highScore.score + ".    " + highScore.name;
            let scoreItem = document.createElement("li");
            scoreItem.innerHTML = displayScoreText;
            this.scoreListView.appendChild(scoreItem);
        }

    }



    callbackShowOtherSection() {
        logger.log("Show the other section", 1);
        if (this.currentlyShowingQuiz) {
            /* user wants to see the high scores */
            logger.log("Showing highscores");
            this.resetDisplay(false);
            this.showHighScores();
        }
        else {
            logger.log("Show quiz");
            /* user wants to go back to the quiz */
            this.resetDisplay(true);
        }
    }

    callbackUpdateTimerDisplay(timeRemaining) {
        logger.log("Update timer display " + timeRemaining, 5);
        this.timerView.innerHTML = timeRemaining + " s";
    }

    callbackResetQuizDisplay() {
        logger.log("Resetting quiz display",1);
        /* show the base test and button to start the quiz */
        this.resetDisplay(true);
    }

    callbackProvideAnswerFeedback(isCorrect = false) {
        let spanTextView = this.answerFeedbackView.querySelector("span");
        spanTextView.innerText = (isCorrect)?"Previous answer was Correct":" Previous answer was Incorrect";
        /* get the feedback to appear */
        this.answerFeedbackView.style.display = "block";
    }


}


document.addEventListener('DOMContentLoaded',() => {
logger.log("Document loaded - starting application setup");
let app = new App();
app.initialise();
});
