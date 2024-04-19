import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./Questions";
import Score from "./Score";
import qBank from "./QuestionBank";

class Questionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionBank: qBank,
      currentQuestion: 0,
      selectedOption: "",
      quizEnd: false,
      totalPoints: 0,
    };
  }

  handleOptionChange = (e) => {
    this.setState({ selectedOption: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.checkAnswer();
    this.handleNextQuestion();
  };

  checkAnswer = () => {
    const { questionBank, currentQuestion, selectedOption, totalPoints } = this.state;
    const selectedPoints = questionBank[currentQuestion].options.find(
      (option) => option.value === selectedOption
    ).points;
    this.setState((prevState) => ({ totalPoints: prevState.totalPoints + selectedPoints }));
	// console.log(totalPoints);
  };

  handleNextQuestion = () => {
    const { questionBank, currentQuestion } = this.state;
    if (currentQuestion + 1 < questionBank.length) {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
        selectedOption: "",
      }));
    } else {
      this.setState({
        quizEnd: true,
      });
    }
  };

  render() {
    const { questionBank, currentQuestion, selectedOption, quizEnd, totalPoints } =
      this.state;
    return (
      <div className="App">
        {!quizEnd ? (
          <Question
            question={questionBank[currentQuestion]}
            selectedOption={selectedOption}
            onOptionChange={this.handleOptionChange}
            onSubmit={this.handleFormSubmit}
          />
        ) : (
          <Score
            totalPoints={totalPoints}
            onNextQuestion={this.handleNextQuestion}
            className="score"
          />
        )}
      </div>
    );
  }
}

export default Questionnaire;
