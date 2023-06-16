namespace EvidencijaProject.Models
{
    public class DodajZaposlenog
    {
        //public int Id { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Sifra { get; set; }
        public string Grad { get; set; }
        public int MagacinId { get; set; }
        public List<int> ZaposleniMagacini { get; set; }
    }
}
