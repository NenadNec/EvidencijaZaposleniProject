using EvidencijaProject.Models;
using Microsoft.EntityFrameworkCore;


namespace EvidencijaProject.Repositories
{
    public class ZaposleniRepository : IZaposleniRepository
    {
        private readonly EvidencijaDbContext _dbContext;

        public ZaposleniRepository(EvidencijaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Zaposleni> GetAllZaposleni()
        {
            return _dbContext.Zaposleni.Include(z => z.Magacini).ToList();
        }


        //public Magacin GetMagacinById(int magacinId)
        //{
        //    return _dbContext.Magacini.FirstOrDefault(m => m.Id == magacinId);
        //}

        public IEnumerable<Zaposleni> GetAllZaposleniWithMagacini()
        {
            var zaposleni = _dbContext.Zaposleni
                .Select(z => new Zaposleni
                {
                    Id = z.Id,
                    Ime = z.Ime,
                    Prezime = z.Prezime,
                    Sifra = z.Sifra,
                    Grad = z.Grad,
                    Magacini = z.Magacini.Select(mz => new MagacinZaposleni
                    {
                        ZaposleniId = z.Id,
                        Zaposleni = z,
                        MagacinId = mz.MagacinId,
                        Magacin = new Magacin
                        {
                            Id = mz.Magacin.Id,
                            Naziv = mz.Magacin.Naziv
                        }
                    }).ToList()
                })
                .ToList();

            return zaposleni;
        }





        //public Zaposleni GetZaposleniById(int id)
        //{
        //    return _dbContext.Zaposleni.FirstOrDefault(z => z.Id == id);
        //}



        public int AddZaposleni(DodajZaposlenog zaposleni)
        {
            var noviZaposleni = new Zaposleni
            {
                Ime = zaposleni.Ime,
                Prezime = zaposleni.Prezime,
                Sifra = zaposleni.Sifra,
                Grad = zaposleni.Grad
            };

            _dbContext.Zaposleni.Add(noviZaposleni);
            _dbContext.SaveChanges();

            return noviZaposleni.Id;
        }




        public void AddZaposleniMagacini(int zaposleniId, List<int> magacini)
        {
            foreach (var magacinId in magacini)
            {
                var magacinZaposleni = new MagacinZaposleni
                {
                    ZaposleniId = zaposleniId,
                    MagacinId = magacinId
                };

                _dbContext.MagacinZaposleni.Add(magacinZaposleni);
            }

            _dbContext.SaveChanges();
        }





    }
}
