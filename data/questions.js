export default //JSON hack - HTML doesn't support json loading
[
  {
    "id": "1",
    "question": "Inside which HTML element do we put the JavaScript?",
    "answers": [
      {
        "id": "1",
        "answer": "&lt;javascript&gt;",
        "isCorrect": false
      },
      {
        "id": "2",
        "answer": "&lt;js&gt;",
        "isCorrect": false
      },
      {
        "id": "3",
        "answer": "&lt;script&gt;",
        "isCorrect": true
      },
      {
        "id": "4",
        "answer": "&lt;scripting&gt;",
        "isCorrect": false
      }
    ]
  },
  {
    "id": "2",
    "question": "What is the correct JavaScript syntax to change the content of the HTML element? &lt;p id=\"demo\"&gt;This is a demonstration.&lt;/p&gt;",
    "answers": [
      {
        "id": "1",
        "answer": "document.getElementById(\"demo\").innerHTML = \"Hello World!\";",
        "isCorrect": true
      },
      {
        "id": "2",
        "answer": "document.getElementByName(\"p\").innerHTML = \"Hello World!\";",
        "isCorrect": false
      },
      {
        "id": "3",
        "answer": "document.getElement(\"p\").innerHTML = \"Hello World!\";",
        "isCorrect": false
      },
      {
        "id": "4",
        "answer": "#demo.innerHTML = \"Hello World!\";",
        "isCorrect": false
      }
    ]
  },
  {
    "id": "3",
    "question": "How do you write \"Hello World\" in an alert box?",
    "answers": [
      {
        "id": "1",
        "answer": "alertBox(\"Hello World\");",
        "isCorrect": false
      },
      {
        "id": "2",
        "answer": "msg(\"Hello World\");",
        "isCorrect": false
      },
      {
        "id": "3",
        "answer": "alert(\"Hello World\");",
        "isCorrect": true
      },
      {
        "id": "4",
        "answer": "msgBox(\"Hello World\");",
        "isCorrect": false
      }
    ]
  },
  {
    "id": "4",
    "question": "How do you create a function in JavaScript?",
    "answers": [
      {
        "id": "1",
        "answer": "function myFunction()",
        "isCorrect": true
      },
      {
        "id": "2",
        "answer": "function:myFunction()",
        "isCorrect": false
      },
      {
        "id": "3",
        "answer": "function = myFunction()",
        "isCorrect": false
      }
    ]
  },
  {
    "id": "5",
    "question": "How to write an IF statement in JavaScript?",
    "answers": [
      {
        "id": "1",
        "answer": "if i == 5 then",
        "isCorrect": false
      },
      {
        "id": "2",
        "answer": "if (i == 5)",
        "isCorrect": true
      },
      {
        "id": "3",
        "answer": "if i = 5",
        "isCorrect": false
      },
      {
        "id": "4",
        "answer": "if i = 5 then",
        "isCorrect": false
      }
    ]
  },
  {
    "id": "6",
    "question": "How to write an IF statement for executing some code if \"i\" is NOT equal to 5?",
    "answers": [
      {
        "id": "1",
        "answer": "if i =! 5 then",
        "isCorrect": false
      },
      {
        "id": "2",
        "answer": "if (i != 5)",
        "isCorrect": true
      },
      {
        "id": "3",
        "answer": "if i &lt;&gt; 5",
        "isCorrect": false
      },
      {
        "id": "4",
        "answer": "if (i &lt;&gt; 5)",
        "isCorrect": false
      }
    ]
  },
  {
    "id": "7",
    "question": "How does a WHILE loop start?",
    "answers": [
      {
        "id": "1",
        "answer": "while (i &lt;= 10)",
        "isCorrect": true
      },
      {
        "id": "2",
        "answer": "while i = 1 to 10",
        "isCorrect": false
      },
      {
        "id": "3",
        "answer": "while (i &lt;= 10; i++)",
        "isCorrect": false
      }
    ]
  },
  {
    "id": "8",
    "question": "How does a FOR loop start?",
    "answers": [
      {
        "id": "1",
        "answer": "for (i = 0; i &lt;= 5; i++)",
        "isCorrect": true
      },
      {
        "id": "2",
        "answer": "for (i = 0; i &lt;= 5)",
        "isCorrect": false
      },
      {
        "id": "3",
        "answer": "for (i &lt;= 5; i++)",
        "isCorrect": false
      },
      {
        "id": "4",
        "answer": "for i = 1 to 5",
        "isCorrect": false
      }
    ]
  },
  {
    "id": "9",
    "question": "How can you add a comment in a JavaScript?",
    "answers": [
      {
        "id": "1",
        "answer": "//This is a comment",
        "isCorrect": true
      },
      {
        "id": "2",
        "answer": "'This is a comment",
        "isCorrect": false
      },
      {
        "id": "3",
        "answer": "&lt;!--This is a comment--&gt;",
        "isCorrect": false
      }
    ]
  },
  {
    "id": "10",
    "question": "What is the correct way to write a JavaScript array?",
    "answers": [
      {
        "id": "1",
        "answer": "var colors = [\"red\", \"green\", \"blue\"]",
        "isCorrect": true
      },
      {
        "id": "2",
        "answer": "var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")",
        "isCorrect": false
      },
      {
        "id": "3",
        "answer": "var colors = (1:\"red\", 2:\"green\", 3:\"blue\")",
        "isCorrect": false
      },
      {
        "id": "4",
        "answer": "var colors = \"red\", \"green\", \"blue\"",
        "isCorrect": false
      }
    ]
  }
]
