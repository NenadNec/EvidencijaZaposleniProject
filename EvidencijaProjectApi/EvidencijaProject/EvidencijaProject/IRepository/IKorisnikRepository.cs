using EvidencijaProject.Models;

namespace EvidencijaProject.Repositories
{
    public interface IKorisnikRepository
    {
        IEnumerable<Korisnik> GetAllKorisnici();
        Korisnik GetKorisnikById(int id);
        void AddKorisnik(Korisnik korisnik);
        void UpdateKorisnik(Korisnik korisnik);
        void DeleteKorisnik(int id);
        bool Registracija(Korisnik korisnik);
        Korisnik LogIn(string username, string password);
    }
}
