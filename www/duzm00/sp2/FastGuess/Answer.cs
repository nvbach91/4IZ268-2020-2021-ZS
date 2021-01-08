namespace FastGuess
{
    public class Answer
    {
        public Answer(string answerText)
        {
            AnswerText = answerText;
        }
        public string AnswerText { get; set; }
        public bool IsCorrect { get; set; }
    }
}