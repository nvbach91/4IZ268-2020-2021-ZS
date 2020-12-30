using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FastGuess.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScoreController : ControllerBase
    {
        private readonly ILogger<ScoreController> _logger;
        private readonly DatabaseContext database;

        public ScoreController(ILogger<ScoreController> logger, DatabaseContext database)
        {
            _logger = logger;
            this.database = database;
        }

        [HttpPost]
        public IActionResult AddScore(ScoreRecord scoreBoard)
        {
            using (var database = new DatabaseContext())
            {
                var totalScore = 0;

                foreach (var item in scoreBoard.Answers.UserAnswersIds)
                {
                    var q = PictureMetaDb.Pictures.First(a => a.Id == item.QuestionId);
                    var answer = q.Answers.FirstOrDefault(a => a.AnswerText == item.Answer);
                    if (answer != null && answer.IsCorrect)
                    {
                        totalScore += (10000 / (int)item.msElapsed);
                    }
                }

                var score = new ScoreBoard()
                {
                    Nickname = scoreBoard.Nickname,
                    Score = totalScore
                };

                database.ScoreBoard.Add(score);
                database.SaveChanges();
            }

            return Ok();
        }

        [HttpGet]
        public IEnumerable<ScoreBoard> Get()
        {
            using (var database = new DatabaseContext())
            {
                return database.ScoreBoard.OrderByDescending(a => a.Score).ToList();
            }
        }


    }
}
