using EvidencijaProject.Models;

namespace EvidencijaProject.Repositories
{
    public class KorisnikRepository : IKorisnikRepository
    {
        private readonly EvidencijaDbContext _dbContext;
        private readonly ILogger<KorisnikRepository> _logger;

        public KorisnikRepository(EvidencijaDbContext dbContext, ILogger<KorisnikRepository> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public IEnumerable<Korisnik> GetAllKorisnici()
        {
            return _dbContext.Korisnici.ToList();
        }

        public Korisnik GetKorisnikById(int id)
        {
            return _dbContext.Korisnici.FirstOrDefault(k => k.Id == id);
        }

        public void AddKorisnik(Korisnik korisnik)
        {
            _dbContext.Korisnici.Add(korisnik);
            _dbContext.SaveChanges();
        }

        public void UpdateKorisnik(Korisnik korisnik)
        {
            _dbContext.Korisnici.Update(korisnik);
            _dbContext.SaveChanges();
        }

        public void DeleteKorisnik(int id)
        {
            var korisnik = _dbContext.Korisnici.FirstOrDefault(k => k.Id == id);
            if (korisnik != null)
            {
                _dbContext.Korisnici.Remove(korisnik);
                _dbContext.SaveChanges();
            }
        }

        public bool Registracija(Korisnik korisnik)
        {
            try
            {
                // Provera da li korisnik već postoji u bazi podataka
                var existingKorisnik = _dbContext.Korisnici.FirstOrDefault(k => k.Ime == korisnik.Ime || k.User == korisnik.User);
                if (existingKorisnik != null)
                {
                    // Korisnik već postoji, vraćamo false
                    return false;
                }

                _dbContext.Korisnici.Add(korisnik);
                _dbContext.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
               
                _logger.LogError(ex, "Greška prilikom registracije korisnika.");

                // Vraćanje rezultata da je registracija neuspešna
                return false;
            }
        }




        public Korisnik LogIn(string username, string password)
        {
            try
            {
                // Provera da li korisnik postoji u bazi podataka
                var korisnik = _dbContext.Korisnici.FirstOrDefault(k => k.User == username && k.Password == password);
                return korisnik;
            }
            catch (Exception ex)
            {
                _logger.LogError("Greška prilikom prijavljivanja: {0}", ex.Message);
                throw;
            }
        }


    }
}
