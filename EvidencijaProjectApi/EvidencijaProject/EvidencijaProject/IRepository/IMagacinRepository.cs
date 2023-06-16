using EvidencijaProject.Models;

namespace EvidencijaProject.Repositories
{
    public interface IMagacinRepository
    {
        IEnumerable<Magacin> GetAllMagacini();
        //Magacin GetMagacinById(int id);
        //void AddMagacin(Magacin magacin);
        //void UpdateMagacin(Magacin magacin);
        //void DeleteMagacin(int id);
    }
}
