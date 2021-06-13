export class Answer {
    constructor(id, answer, isCorrect) {
        this.id = id;
        this.answer = answer;
        this.isCorrect = (isCorrect == null) ? false : isCorrect;
    }

    toString() {
        return "{Answer id: " + this.id + ", answer: " + this.answer + ", iscorrect: " + this.isCorrect + "}";
    }
}

export class Question {
    constructor(id, question, answers = []) {
        this.id = id;
        this.question = question;
        this.answers = answers;
        this.alreadyAsked = false;
    }

    toString() {
        return "{Question id: " + this.id + ", question: " + this.question + "}";
    }

}

export class HighScore {
    constructor(score, name) {
        this.score = score;
        this.name = name;
    }
}
