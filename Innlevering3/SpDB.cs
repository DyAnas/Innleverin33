﻿using Innlevering3.Models;
using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;

namespace Innlevering3
{
    public class SpDB { 


        private readonly SporsmalContext _context;

    public SpDB(SporsmalContext context)
    {
        _context = context;
    }
    public List<sporsmals> hentalleSpørsmål(int TypeId)
    {
        List<sporsmals> spørsmål = new List<sporsmals>();
        var alleSpørmål = _context.sporsmals.Where(k => k.type.TypeId == TypeId).ToList();
        foreach (DBSporsmal s in alleSpørmål)
        {
            spørsmål.Add(new sporsmals
            {
                Id = s.Id,
                sporsmal = s.sporsmal,
                rating = s.rating,
                svar = s.svar,


            });
        }

        return spørsmål;
    }
    public List<sporsmals> hentalleType()
    {
        List<sporsmals> type = _context.TypeSporsmal.Select(
            k => new sporsmals
            {
                TypeId=k.TypeId,
                type=k.type
            }
            
            
            
            
            ).ToList()
                ;

        return type;

    }

    public DBType hentType(int id)
    {
        var type = _context.TypeSporsmal.Include(s => s.sporsmal)
           .FirstOrDefault(k => k.TypeId == id);
        if (type != null)
        {
            return type;
        }
        return null;
    }
    public bool lagreSpørsmål(int TypeId, sporsmals innspørsmål)
    {

        var nySpørsmål = new DBSporsmal()
        {

            sporsmal = innspørsmål.sporsmal,
            stemmer = 0,
            rating = 0,
            svar = ""
        };
        DBType funntype = _context.TypeSporsmal.Find(TypeId);
        if (funntype == null)
        {
            return false;
        }

        nySpørsmål.type.TypeId = funntype.TypeId;
        try
        {
            _context.sporsmals.Add(nySpørsmål);
            _context.SaveChanges();
        }
        catch (Exception feil)
        {
            return false;
        }
        return true;

    }
    public List<DBSporsmal> HentEtSp(int id)
    {
        var sp = _context.sporsmals.Where(k => k.Id == id).OrderByDescending(k => k.rating).ToList();


        return sp;

    }



    public bool TommelOppSp(int id)
    {
        var sp = _context.sporsmals.FirstOrDefault(s => s.Id == id);
        if (sp == null)
        {
            return false;
        }
        sp.rating++;
        sp.stemmer++;

        try
        {
            _context.SaveChanges();
        }
        catch (Exception feil)
        {
            return false;
        }
        return true;

    }

    public bool TommelNedsp(int id)
    {
        var sp = _context.sporsmals.FirstOrDefault(s => s.Id == id);
        if (sp == null)
        {
            return false;
        }
        sp.rating--;
        sp.stemmer++;

        try
        {
            _context.SaveChanges();
        }
        catch (Exception feil)
        {
            return false;
        }
        return true;
    }
    public List<DBSporsmal> HentTop()
    {
        List<DBSporsmal> sp = _context.sporsmals.OrderByDescending(s => s.rating).Take(4).ToList();
        return sp;
    }


    public sporsmals hentEtSvar(int id)
    {
        DBSporsmal etSvar = _context.sporsmals.Include(s => s.type).FirstOrDefault(k => k.Id == id);

        var enSpørsmål = new sporsmals()
        {
            Id = etSvar.Id,
            svar = etSvar.svar
        };
        return enSpørsmål;
    }

}
}
