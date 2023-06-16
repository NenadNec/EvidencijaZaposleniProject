using EvidencijaProject.Models;
using EvidencijaProject.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EvidencijaProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KorisnikController : ControllerBase
    {
        private readonly IKorisnikRepository _korisnikRepository;

        public KorisnikController(IKorisnikRepository korisnikRepository)
        {
            _korisnikRepository = korisnikRepository;
        }

        // POST: api/Korisnik/Registracija
        [HttpPost("Registracija")]
        public IActionResult Registracija([FromBody] Korisnik korisnik)
        {
            if (korisnik == null)
            {
                return BadRequest();
            }

            try
            {
                bool uspesnaRegistracija = _korisnikRepository.Registracija(korisnik);

                if (uspesnaRegistracija)
                {
                    return Ok(true);
                }
                else
                {
                    return Ok(false);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Greška prilikom registracije: " + ex.Message);
            }
        }



        // POST: api/Korisnik/LogIn
        [AllowAnonymous]
        [HttpPost("LogIn")]
        public IActionResult LogIn([FromBody] Login loginModel)
        {
            try
            {
                var korisnik = _korisnikRepository.LogIn(loginModel.Username, loginModel.Password);
                if (korisnik == null)
                {
                    return Ok(false); // Korisnik nije pronađen
                }
                return Ok(true); // Korisnik je uspešno prijavljen
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



    }
}
