import { type } from '@testing-library/user-event/dist/type'
import React from 'react'


type Props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer:any;
    questionNum: number;
    totalQustions:number; 
}

export const QuestionCard: React.FC<Props> = ({ question, answers , callback , userAnswer , questionNum , totalQustions  }) => {
  return (
    <div>
        <p>
            Question: {questionNum} / {totalQustions}
        </p>
        <p dangerouslySetInnerHTML={{ __html:question }} />
        <div>
            {answers.map(answer =>(
                <div>
                     <button disabled={userAnswer} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html:answer }} />
                     </button>
                </div>
            ))}
        </div>
    </div>
  )
}
