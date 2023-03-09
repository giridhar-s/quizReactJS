import { Component } from "react";
// import { Vortex } from "react-loader-spinner";
import QuestionDetails from "../QuestionDetails/index";
import "./index.css";

const categoriesList = [
  {
    id: "food_and_drink",
    categoryDisplayText: "Food and Drink",
  },
  {
    id: "general_knowledge",
    categoryDisplayText: "General Knowledge",
  },
  {
    id: "geography",
    categoryDisplayText: "Geography",
  },
];

class UserInput extends Component {
  state = {
    activeCategoryId: categoriesList[0].id,
    questionsList: [],
    isSubmitted: false,
    isFinished: false,
    score: 0,
    isLoading: true,
  };

  classCounter = 0;

  onChangeCategory = (event) => {
    this.setState({ activeCategoryId: event.target.value });
  };

  isAnsweredCorrectly = (currectAnswer, userAnswer) => {
    if (currectAnswer === userAnswer) {
      this.classCounter += 1;
    }
  };

  getQuestionsData = async () => {
    const { activeCategoryId } = this.state;
    const response = await fetch(
      `https://the-trivia-api.com/api/questions?categories=${activeCategoryId}&limit=10&region=IN&difficulty=easy`
    );
    const data = await response.json();
    this.setState({ questionsList: data, isLoading: false });
  };

  onClickSubmit = () => {
    this.setState((prevState) => ({
      isSubmitted: !prevState.isSubmitted,
      isFinished: false,
    }));
    this.getQuestionsData();
  };

  onClickBackButton = () => {
    return window.location.reload();
  };

  onFinishTheGame = () => {
    this.setState((prevState) => ({
      isFinished: !prevState.isFinished,
      score: this.classCounter,
    }));
  };

  renderUserInput = () => (
    <div className="user-input-container">
      <h3>Select the Category below</h3>
      <form className="form-container" onClick={this.onClickSubmit}>
        <div className="input-cotainer">
          <label className="label-name">Category</label>
          <select className="category-select" onChange={this.onChangeCategory}>
            {categoriesList.map((eachCategory) => (
              <option
                key={eachCategory.id}
                value={eachCategory.id}
                className="option"
              >
                {eachCategory.categoryDisplayText}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );

  renderQuestionsList = () => {
    const { questionsList, isFinished, score } = this.state;
    return (
      <div>
        {isFinished ? (
          <div className="score-section">
            <h1 className="score-heading">{`Your Score: ${score}`}</h1>
            <button
              type="button"
              className="btn"
              onClick={this.onClickBackButton}
            >
              Back
            </button>
          </div>
        ) : (
          <div>
            <div className="header"></div>
            <ul>
              {questionsList.map((eachQuestion, index) => (
                <QuestionDetails
                  questionDetails={eachQuestion}
                  questionNumber={index + 1}
                  key={eachQuestion.id}
                  isAnsweredCorrectly={this.isAnsweredCorrectly}
                />
              ))}
            </ul>
            <div className="finish-btn-container">
              <button
                className="btn finish-btn"
                type="button"
                onClick={this.onFinishTheGame}
              >
                Finish
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  render() {
    // this.getQuestionsData();
    const { isSubmitted } = this.state;
    return (
      <div className="responsive-quiz-container">
        <h1 className="main-heading">Quiz</h1>
        {isSubmitted ? this.renderQuestionsList() : this.renderUserInput()}
      </div>
    );
  }
}
export default UserInput;
