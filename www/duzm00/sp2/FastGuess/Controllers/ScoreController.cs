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

            try
            {
                var score = new ScoreBoard()
                {
                    Id = new Guid(scoreBoard.Id),
                    Nickname = scoreBoard.Nickname,
                    Score = totalScore
                };


                this.database.ScoreBoard.Add(score);
                this.database.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest();
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
