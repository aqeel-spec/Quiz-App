import React , {useState} from 'react';
import { QuestionCard } from './components/QuestionCard';
import { fetchQuestions , Difficulty , QuestionState } from './API';

const TOTAL_QUESTION = 10;
 
type AnswerObject = {
  question: string;
  answer:string;
  correct:boolean;
  correctAnswer: string;
}

function App() {

  const [loading , setloading] = useState(false);
  const [questions , setQuestions] = useState<QuestionState[]>([]);
  const[number , setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score , setScore] = useState(0);
  const [ gameOver, setGameOver ] = useState(true);
  console.log(questions)

  const startQuiz = async() => {
    setloading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(TOTAL_QUESTION, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setloading(false);
  };

  const nextQuestion = async() => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTION){
      setGameOver(true);

    }
    else {
      setNumber(nextQuestion);
    }
  };
  
  const chackAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver ){
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer; 
      if (correct) setScore(pre => pre +1)
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswer(prev => [...prev, answerObject])
    }
  };


  return (
      <div className="App"> 
        <h1>Quize</h1>

        {gameOver || userAnswer.length === TOTAL_QUESTION ? (
        <button className='start' onClick={startQuiz}>
          Begin Quiz
        </button>):null}

        {!gameOver ? (
        <p className='score'>
          Score : {score}
        </p>):null}

        {loading ? (
        <p>
          Loading
        </p>):null}

        {!loading && !gameOver ? (
         <QuestionCard 
           questionNum={number + 1}
           totalQustions = {TOTAL_QUESTION}
           question = {questions[number].question}
           answers = {questions[number].answers}
           userAnswer={userAnswer ? userAnswer[number]:undefined}
           callback={chackAnswer}

        /> ):null}

        {!gameOver && !loading && userAnswer.length === number +1 && number !==TOTAL_QUESTION-1 ? (
        <button className='next' onClick={nextQuestion}>
           Next
        </button>
        ):null }
      </div>
  );
}

export default App;
