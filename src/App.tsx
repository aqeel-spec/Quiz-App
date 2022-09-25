import React , {useState} from 'react';
import { QuestionCard } from './components/QuestionCard';
import { fetchQuestions , Difficulty , QuestionState } from './API';

import { GlobalStyle, Wrapper } from './App.styles';

const TOTAL_QUESTION = 10;
 
type AnswerObject = {
  question: string;
  answer:string;
  correct:boolean;
  correctAnswer: string;
}

function App() {
//   const myStyle={
//     backgroundImage: 
// "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
//     height:`100%`,
//     marginTop:'-70px',
//     fontSize:'50px',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
// };

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
    <>  
       <GlobalStyle />
      <Wrapper> 
        <h1>Quiz App By Aqeel Shahzad</h1>

        {gameOver || userAnswer.length === TOTAL_QUESTION ? (
        <button className='start' onClick={startQuiz}>
          Begin Quiz
        </button>):null}

        {!gameOver ? (
        <p className='score'>
         Your Current Score : {score}
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
       
        {gameOver || userAnswer.length === TOTAL_QUESTION ? (
         <h2>Click the above button to Start Quize</h2>):null}
      </Wrapper>
      
    </>  
  );
}

export default App;
