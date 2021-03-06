﻿using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Innlevering3.Models
{
    public class DBSporsmal
    {
        [Key]
        public int Id { get; set; }
        public string sporsmal { get; set; }
        public string svar { get; set; }
        public int rating { get; set; }
        public int stemmer { get; set; }

        public virtual DBType type { get; set; }

    }
    public class DBkontakt
    {
        [Key]
        public int Kundeid { get; set; }
        public string fornavn { get; set; }
        public string etternavn { get; set; }
        public string epost { get; set; }
        public virtual DBSporsmal sp { get; set; }

    }




    public class DBType
    {
        [Key]
        public int TypeId { get; set; }
        public string type { get; set; }
        public virtual List<DBSporsmal> sporsmal { get; set; }
    }


    public class SporsmalContext : DbContext
    {
        public SporsmalContext(DbContextOptions<SporsmalContext> options) : base(options)
        {



        }


        public DbSet<DBkontakt> kontakts { get; set; }
        public DbSet<DBType> TypeSporsmal { get; set; }
        public DbSet<DBSporsmal> sporsmals { get; set; }

    }
}
