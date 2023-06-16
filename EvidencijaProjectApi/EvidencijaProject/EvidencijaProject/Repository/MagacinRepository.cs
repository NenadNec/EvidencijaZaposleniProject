
using EvidencijaProject.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace EvidencijaProject.Repositories
{
    public class MagacinRepository : IMagacinRepository
    {
        private readonly EvidencijaDbContext _dbContext;

        public MagacinRepository(EvidencijaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Magacin> GetAllMagacini()
        {
            return _dbContext.Magacini.ToList();
        }

        public Magacin GetMagacinById(int id)
        {
            return _dbContext.Magacini.FirstOrDefault(m => m.Id == id);
        }

        //public void AddMagacin(Magacin magacin)
        //{
        //    _dbContext.Magacini.Add(magacin);
        //    _dbContext.SaveChanges();
        //}

        //public void UpdateMagacin(Magacin magacin)
        //{
        //    _dbContext.Entry(magacin).State = EntityState.Modified;
        //    _dbContext.SaveChanges();
        //}

        //public void DeleteMagacin(int id)
        //{
        //    var magacin = _dbContext.Magacini.Find(id);
        //    if (magacin != null)
        //    {
        //        _dbContext.Magacini.Remove(magacin);
        //        _dbContext.SaveChanges();
        //    }
        //}
    }
}
