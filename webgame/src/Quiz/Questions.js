import React from "react";

const Question = ({ question, selectedOption, onOptionChange, onSubmit }) => {
  return (
    <div>
      <h2>{question.question}</h2>
      <form onSubmit={onSubmit}>
        {question.options.map((option, index) => (
          <div className="px-3 pb-2" key={index} style={{ fontSize: '1.25em', borderRadius: `15px`, backgroundColor: selectedOption === option.value ? '#fff' : '' , color : selectedOption === option.value ? '#000' : '#fff'}}>
            <input
              type="radio"
              id={`option-${index}`}
              name="option"
              value={option.value}
              checked={selectedOption === option.value}
              onChange={onOptionChange}
              style={{ transform: 'scale(1.5)' }}
            />
            <label htmlFor={`option-${index}`} className=" px-3 mt-1">{option.value}</label>
          </div>
        ))}
        <button className="btn btn-warning mt-4" style={{ fontWeight: `500` }} type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default Question;
