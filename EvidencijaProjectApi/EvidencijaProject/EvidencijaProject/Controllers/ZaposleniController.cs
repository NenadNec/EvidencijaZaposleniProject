using EvidencijaProject;
using EvidencijaProject.Models;
using EvidencijaProject.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EvidencijaProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZaposleniController : ControllerBase
    {
        private readonly IZaposleniRepository _zaposleniRepository;

        public ZaposleniController(IZaposleniRepository zaposleniRepository)
        {
            _zaposleniRepository = zaposleniRepository;
        }

     

        [HttpGet("GetAllZaposleniWithMagacini")]
        public IActionResult GetAllZaposleniWithMagacini()
        {
            var zaposleni = _zaposleniRepository.GetAllZaposleniWithMagacini();
            Console.WriteLine(zaposleni);
            return Ok(zaposleni);
        }


        [HttpPost("AddZaposleni")]
        public IActionResult AddZaposleni([FromBody] DodajZaposlenog request)
        {
            try
            {
                var zaposleniId = _zaposleniRepository.AddZaposleni(request);
                if (request.ZaposleniMagacini != null && request.ZaposleniMagacini.Any())
                {
                    _zaposleniRepository.AddZaposleniMagacini(zaposleniId, request.ZaposleniMagacini);
                }
                return Ok(zaposleniId);
            }
            catch (Exception ex)
            {
                var innerExceptionMessage = ex.InnerException?.Message ?? ex.Message;
                return BadRequest("An error occurred while saving the entity changes. See the inner exception for details." + innerExceptionMessage);
            }
        }







    }
}




