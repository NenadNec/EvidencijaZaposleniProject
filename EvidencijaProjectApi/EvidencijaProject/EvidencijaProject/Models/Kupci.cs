namespace EvidencijaProject.Models
{
    public class Kupci
    {
        public int Id { get; set; }
        public string Naziv { get; set; }
        public string PIB { get; set; }
        public string Sifra { get; set; }
        public Zaposleni Zaposleni { get; set; }
        public int ZaposleniId { get; set; }
    }
}
