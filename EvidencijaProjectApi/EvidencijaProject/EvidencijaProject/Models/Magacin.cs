using EvidencijaProject.Models;

public class Magacin
{
    public int Id { get; set; }
    public string Naziv { get; set; }
    public ICollection<MagacinZaposleni> MagacinZaposleni { get; set; }
}




