using EvidencijaProject.Models;
using EvidencijaProject.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace EvidencijaProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KupacController : ControllerBase
    {
        private readonly IKupacRepository _kupacRepository;

        public KupacController(IKupacRepository kupacRepository)
        {
            _kupacRepository = kupacRepository;
        }

        // GET: api/Kupac/Zaposleni/{zaposleniId}
        [HttpGet("Zaposleni/{zaposleniId}")]
        public IActionResult GetKupciByZaposleniId(int zaposleniId)
        {
            var kupci = _kupacRepository.GetKupciByZaposleniId(zaposleniId);
            Console.WriteLine(kupci);
            return Ok(kupci);
        }

        // GET: api/Kupac/{id}
        [HttpGet("{id}")]
        public IActionResult GetKupacById(int id)
        {
            var kupac = _kupacRepository.GetKupacById(id);
            if (kupac == null)
            {
                return NotFound();
            }
            return Ok(kupac);
        }

        // POST: api/Kupac/AddKupac
        [HttpPost("AddKupac")]
        public ActionResult<bool> AddKupac([FromBody] DodajKupca kupac)
        {
            if (kupac == null)
            {
                return BadRequest();
            }

            bool isAdded = _kupacRepository.AddKupac(kupac);

            return Ok(isAdded);
        }




        // PUT: api/Kupac/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateKupac(int id, [FromBody] DodajKupca kupac)
        {
            if (kupac == null || id != kupac.Id)
            {
                return BadRequest();
            }
            var existingKupac = _kupacRepository.GetKupacById(id);
            if (existingKupac == null)
            {
                return NotFound();
            }
            // Mapiranje podataka iz modela DodajKupca na model Kupci
            existingKupac.Naziv = kupac.Naziv;
            existingKupac.PIB = kupac.PIB;
            existingKupac.Sifra = kupac.Sifra;
            existingKupac.ZaposleniId = kupac.ZaposleniId;
            _kupacRepository.UpdateKupac(existingKupac);
            return NoContent();
        }



        // DELETE: api/Kupac/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteKupac(int id)
        {
            var kupac = _kupacRepository.GetKupacById(id);
            if (kupac == null)
            {
                return NotFound();
            }
            _kupacRepository.DeleteKupac(id);
            return NoContent();
        }

    }
}
