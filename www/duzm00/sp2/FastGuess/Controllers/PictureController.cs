using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace FastGuess.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PictureController : ControllerBase
    {

        private readonly ILogger<PictureController> _logger;

        public PictureController(ILogger<PictureController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IActionResult GetNextPicture(UsedAnswers usedAnswers)
        {
            if (usedAnswers.UserAnswersIds.Count >= PictureMetaDb.Pictures.Length)
            {
                return BadRequest("Used pictures count is higher than pictures count on server");
            }

            var rng = new Random();
            var randomPic = GetRandomPic(rng);

            while (usedAnswers.UserAnswersIds.Any(a => a.QuestionId == randomPic.Id))
            {
                randomPic = GetRandomPic(rng);
            }

            return Ok(randomPic);

            static PictureMeta GetRandomPic(Random rng)
            {
                return PictureMetaDb.Pictures[rng.Next(PictureMetaDb.Pictures.Length)];
            }
        }

       
    }
}
