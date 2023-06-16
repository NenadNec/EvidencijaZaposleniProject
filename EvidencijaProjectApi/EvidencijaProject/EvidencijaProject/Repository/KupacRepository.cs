
using EvidencijaProject.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace EvidencijaProject.Repositories
{
    public class KupacRepository : IKupacRepository
    {
        private readonly EvidencijaDbContext _dbContext;

        public KupacRepository(EvidencijaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Kupci> GetAllKupci()
        {
            return _dbContext.Kupci.ToList();
        }

        public Kupci GetKupacById(int id)
        {
            return _dbContext.Kupci.FirstOrDefault(k => k.Id == id);
        }

        public IEnumerable<Kupci> GetKupciByZaposleniId(int zaposleniId)
        {
            return _dbContext.Kupci.Where(k => k.Zaposleni.Id == zaposleniId).ToList();
        }

        public bool AddKupac(DodajKupca kupac)
        {
            try
            {
                Kupci noviKupac = new Kupci
                {
                    Id = kupac.Id,
                    Naziv = kupac.Naziv,
                    PIB = kupac.PIB,
                    Sifra = kupac.Sifra,
                    ZaposleniId = kupac.ZaposleniId
                };

                _dbContext.Kupci.Add(noviKupac);
                _dbContext.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {            
                return false;
            }
        }




        public void UpdateKupac(Kupci kupac)
        {
            _dbContext.Entry(kupac).State = EntityState.Modified;
            _dbContext.SaveChanges();
        }



        public void DeleteKupac(int id)
        {
            var kupac = _dbContext.Kupci.Find(id);
            if (kupac != null)
            {
                _dbContext.Kupci.Remove(kupac);
                _dbContext.SaveChanges();
            }
        }


        
    }
}
