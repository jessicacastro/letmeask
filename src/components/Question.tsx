import { ReactNode } from "react";

import cn from 'classnames';

import "../styles/question.scss";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isHighlighted: boolean;
  isAnswered: boolean;
}

export function Question({ content, author, children, isAnswered, isHighlighted }: QuestionProps) {
  return(
    <div className={
      cn(
          'question',
          { answered: isAnswered },
          { highlighted: isHighlighted && !isAnswered } 
         )
    }>
      <p>{content}</p>
      

      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>

        <div>
          {children}
        </div>
      </footer>

    </div>
  );
}