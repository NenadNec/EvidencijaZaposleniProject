using EvidencijaProject.Models;
using EvidencijaProject.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace EvidencijaProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MagacinController : ControllerBase
    {
        private readonly IMagacinRepository _magacinRepository;

        public MagacinController(IMagacinRepository magacinRepository)
        {
            _magacinRepository = magacinRepository;
        }

        // GET: api/Magacin
        [HttpGet]
        public IActionResult GetAllMagacini()
        {
            var magacini = _magacinRepository.GetAllMagacini();
            return Ok(magacini);
        }

        //// GET: api/Magacin/{id}
        //[HttpGet("{id}")]
        //public IActionResult GetMagacinById(int id)
        //{
        //    var magacin = _magacinRepository.GetMagacinById(id);
        //    if (magacin == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(magacin);
        //}

        //// POST: api/Magacin
        //[HttpPost]
        //public IActionResult AddMagacin([FromBody] Magacin magacin)
        //{
        //    if (magacin == null)
        //    {
        //        return BadRequest();
        //    }
        //    _magacinRepository.AddMagacin(magacin);
        //    return CreatedAtAction(nameof(GetMagacinById), new { id = magacin.Id }, magacin);
        //}

        //// PUT: api/Magacin/{id}
        //[HttpPut("{id}")]
        //public IActionResult UpdateMagacin(int id, [FromBody] Magacin magacin)
        //{
        //    if (magacin == null || id != magacin.Id)
        //    {
        //        return BadRequest();
        //    }
        //    var existingMagacin = _magacinRepository.GetMagacinById(id);
        //    if (existingMagacin == null)
        //    {
        //        return NotFound();
        //    }
        //    _magacinRepository.UpdateMagacin(magacin);
        //    return NoContent();
        //}

        //// DELETE: api/Magacin/{id}
        //[HttpDelete("{id}")]
        //public IActionResult DeleteMagacin(int id)
        //{
        //    var magacin = _magacinRepository.GetMagacinById(id);
        //    if (magacin == null)
        //    {
        //        return NotFound();
        //    }
        //    _magacinRepository.DeleteMagacin(id);
        //    return NoContent();
        //}
    }
}
