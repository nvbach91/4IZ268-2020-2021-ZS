using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FastGuess
{
    public class UsedAnswers
    {
        public List<AnsweredQuestion> UserAnswersIds { get; set; }
    }

    public class AnsweredQuestion
    {
        public Guid QuestionId { get; set; }
        public string Answer { get; set; }
        public double msElapsed { get; set; }
    }
}
