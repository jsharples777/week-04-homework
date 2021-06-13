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
        let answer1 = new Answer(1, "&lt;javascript&gt;");
        let answer2 = new Answer(2, "&lt;js&gt;");
        let answer3 = new Answer(3, "&lt;script&gt;", true);
        let answer4 = new Answer(4, "&lt;scripting&gt;");
        let question = new Question(1, "Inside which HTML element do we put the JavaScript?", [answer1, answer2, answer3, answer4]);
        questions.push(question);
        answer1 = new Answer(1, " document.getElementById(\"demo\").innerHTML = \"Hello World!\";",true);
        answer2 = new Answer(2, " document.getElementByName(\"p\").innerHTML = \"Hello World!\";");
        answer3 = new Answer(3, " document.getElement(\"p\").innerHTML = \"Hello World!\";");
        answer4 = new Answer(4, " #demo.innerHTML = \"Hello World!\";");
        question = new Question(2, "What is the correct JavaScript syntax to change the content of the HTML element? &lt;p id=\"demo\"&gt;This is a demonstration.&lt;/p&gt;", [answer1, answer2, answer3, answer4]);
        questions.push(question);
        answer1 = new Answer(1, " alert(\"Hello World\");", true);
        answer2 = new Answer(2, " alertBox(\"Hello World\");");
        answer3 = new Answer(3, " msg(\"Hello World\");");
        answer4 = new Answer(4, " msgBox(\"Hello World\");");
        question = new Question(3, "How do you write \"Hello World\" in an alert box?", [answer1, answer2, answer3, answer4]);
        questions.push(question);
        answer1 = new Answer(1, "function:myFunction()");
        answer2 = new Answer(2, "function myFunction()",true);
        answer3 = new Answer(3, "function = myFunction()");
        question = new Question(4, "How do you create a function in JavaScript?", [answer1, answer2, answer3, answer4]);
        questions.push(question);
        answer1 = new Answer(1, "if i == 5 then");
        answer2 = new Answer(2, "if (i == 5)",true);
        answer3 = new Answer(3, "if i = 5");
        answer4 = new Answer(4, "if i = 5 then");
        question = new Question(5, "How to write an IF statement in JavaScript?", [answer1, answer2, answer3, answer4]);
        questions.push(question);
        answer1 = new Answer(1, " if i =! 5 then");
        answer2 = new Answer(2, " if (i != 5)",true);
        answer3 = new Answer(3, " if i &lt;&gt; 5");
        answer4 = new Answer(4, " if (i &lt;&gt; 5)");
        question = new Question(6, "How to write an IF statement for executing some code if \"i\" is NOT equal to 5?", [answer1, answer2, answer3, answer4]);
        questions.push(question);
        answer1 = new Answer(1, " while (i &lt;= 10)", true);
        answer2 = new Answer(2, " while i = 1 to 10");
        answer3 = new Answer(3, " while (i &lt;= 10; i++)");
        question = new Question(7, "How does a WHILE loop start?", [answer1, answer2, answer3, answer4]);
        questions.push(question);
        answer1 = new Answer(1, " for (i = 0; i &lt;= 5; i++)", true);
        answer2 = new Answer(2, " for (i = 0; i &lt;= 5)");
        answer3 = new Answer(3, " for (i &lt;= 5; i++)");
        answer4 = new Answer(4, " for i = 1 to 5");
        question = new Question(8, "How does a FOR loop start?", [answer1, answer2, answer3, answer4]);
        questions.push(question);
        answer1 = new Answer(1, " //This is a comment", true);
        answer2 = new Answer(2, " 'This is a comment");
        answer3 = new Answer(3, " &lt;!--This is a comment--&gt;");
        question = new Question(9, "How can you add a comment in a JavaScript?", [answer1, answer2, answer3, answer4]);
        questions.push(question);
        answer1 = new Answer(1, " var colors = [\"red\", \"green\", \"blue\"]", true);
        answer2 = new Answer(2, " var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")");
        answer3 = new Answer(3, " var colors = (1:\"red\", 2:\"green\", 3:\"blue\")");
        answer4 = new Answer(4, " var colors = \"red\", \"green\", \"blue\"");
        question = new Question(10, "What is the correct way to write a JavaScript array?", [answer1, answer2, answer3, answer4]);
        questions.push(question);
        logger.log(this.questions, 5);
        return questions;
    }

}

export default ObjectDataSourceDelegate;