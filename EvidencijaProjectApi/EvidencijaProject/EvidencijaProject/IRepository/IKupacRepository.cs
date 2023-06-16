using EvidencijaProject.Models;

namespace EvidencijaProject.Repositories
{
    public interface IKupacRepository
    {
        IEnumerable<Kupci> GetAllKupci();
        Kupci GetKupacById(int id);
        bool AddKupac(DodajKupca kupac);
        void UpdateKupac(Kupci kupac);
        void DeleteKupac(int id);
        IEnumerable<Kupci> GetKupciByZaposleniId(int zaposleniId);
    }
}
