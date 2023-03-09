import "./index.css";

const QuestionDetails = (props) => {
  const { questionDetails, questionNumber, isAnsweredCorrectly } = props;
  const { question, correctAnswer, incorrectAnswers } = questionDetails;

  const getShuffledOptionsList = () => {
    const allOptions = [correctAnswer, ...incorrectAnswers];
    return allOptions.sort(() => Math.random() - 0.5);
  };
  const shuffledOptions = getShuffledOptionsList();

  const onClickFirstOption = (event) => {
    const choosenAnswer = event.target.value;
    isAnsweredCorrectly(correctAnswer, choosenAnswer);
  };

  const onClickSecondOption = (event) => {
    const choosenAnswer = event.target.value;
    isAnsweredCorrectly(correctAnswer, choosenAnswer);
  };

  const onClickThirdOption = (event) => {
    const choosenAnswer = event.target.value;
    isAnsweredCorrectly(correctAnswer, choosenAnswer);
  };

  const onClickForthOption = (event) => {
    const choosenAnswer = event.target.value;
    isAnsweredCorrectly(correctAnswer, choosenAnswer);
  };

  return (
    <li>
      <div className="question-box">
        <p className="question">{`${questionNumber}. ${question}`}</p>
      </div>
      <div className="options-container">
        <button
          type="button"
          className="option-btn"
          onClick={onClickFirstOption}
          value={shuffledOptions[0]}
        >
          {shuffledOptions[0]}
        </button>
        <button
          type="button"
          className="option-btn"
          onClick={onClickSecondOption}
          value={shuffledOptions[1]}
        >
          {shuffledOptions[1]}
        </button>
        <button
          type="button"
          className="option-btn"
          onClick={onClickThirdOption}
          value={shuffledOptions[2]}
        >
          {shuffledOptions[2]}
        </button>
        <button
          type="button"
          className="option-btn"
          onClick={onClickForthOption}
          value={shuffledOptions[3]}
        >
          {shuffledOptions[3]}
        </button>
      </div>
    </li>
  );
};

export default QuestionDetails;
