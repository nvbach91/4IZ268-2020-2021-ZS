using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FastGuess
{
    public class ScoreBoard
    {
        [Key]
        public Guid Id { get; set; } = new Guid();
        public string Nickname { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public int Score { get; set; }
    }


    public class ScoreRecord
    {
        [Required]
        public string Nickname { get; set; }

        public DateTime Date = DateTime.UtcNow;
        public UsedAnswers Answers { get; set; }
    }
}
