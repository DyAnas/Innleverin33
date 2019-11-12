using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Innlevering3.Models
{
    public class sporsmals
    {


        public int Id { get; set; }
        [Required]
        [RegularExpression("^[a-zøæåA-ZØÆÅ. \\-]{2,200}$")]
        public string sporsmal { get; set; }
        [Required]
        [RegularExpression("^[a-zøæåA-ZØÆÅ. \\-]{2,200}$")]
        public string svar { get; set; }
        [Required]
        [RegularExpression("^[0-9]$")]
        public int rating { get; set; }
        [Required]
        [RegularExpression("^[0-9]$")]
        public int stemmer { get; set; }
        public int TypeId { get; set; }
        [Required]
        [RegularExpression("^[a-zæøåA-ZÆØÅ. \\-]{2,40}$")]
        public string type { get; set; }
        public int Kundeid { get; set; }
        [Required]
        [RegularExpression("^[a-zæøåA-ZÆØÅ. \\-]{2,40}$")]
        public string fornavn { get; set; }
        [Required]
        [RegularExpression("^[a-zæøåA-ZÆØÅ. \\-]{2,40}$")]
        public string etternavn { get; set; }
        [Required]
        [RegularExpression("^[a-zæøåA-ZÆØÅ. \\-]{2,40}$")]
        public string epost { get; set; }


     
    }
}
