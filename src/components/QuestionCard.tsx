import React from 'react';

import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

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
    <Wrapper>
        <p>
            Question: {questionNum} / {totalQustions}
        </p>
        <p dangerouslySetInnerHTML={{ __html:question }} />
        <div>
            {answers.map(answer =>(
                <ButtonWrapper
                   correct = {userAnswer?.correctAnswer === answer}
                   userClicked = { userAnswer?.answer === answer }
                >
                     <button disabled={userAnswer} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html:answer }} />
                     </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
  )
}
