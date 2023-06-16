using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace EvidencijaProject.Models
{
    public class MagacinZaposleni
    {
        [Key]
        [Column(Order = 1)]
        [ForeignKey("Zaposleni")]
        public int ZaposleniId { get; set; }
        public Zaposleni Zaposleni { get; set; }

        [Key]
        [Column(Order = 2)]
        [ForeignKey("Magacin")]
        public int MagacinId { get; set; }
        public Magacin Magacin { get; set; }
    }







}
