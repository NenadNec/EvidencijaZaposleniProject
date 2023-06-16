using EvidencijaProject.Models;

namespace EvidencijaProject.Repositories
{
    public interface IZaposleniRepository
    {
        IEnumerable<Zaposleni> GetAllZaposleni();
        IEnumerable<Zaposleni> GetAllZaposleniWithMagacini();
        //Zaposleni GetZaposleniById(int id);
        int AddZaposleni(DodajZaposlenog zaposleni);
        void AddZaposleniMagacini(int zaposleniId, List<int> magacini);
        //Magacin GetMagacinById(int magacinId);

    }

}
