namespace EvidencijaProject.Models
{
    public class Zaposleni
    {
        public int Id { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string Sifra { get; set; }
        public string Grad { get; set; }
        public ICollection<MagacinZaposleni> Magacini { get; set; }
    }





}