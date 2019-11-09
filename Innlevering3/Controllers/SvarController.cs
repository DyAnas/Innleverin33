using System;
using Microsoft.AspNetCore.Mvc;
using Innlevering3.Models;
using System.Collections.Generic;

namespace Innlevering3.Controllers
{
    [Route("api/[controller]")]
    public class SvarController : Controller
    {
        private readonly SporsmalContext _context;

        public SvarController(SporsmalContext context)
        {
            _context = context;
        }
        [HttpGet]
        public JsonResult Get()
        {
            var db = new SpDB(_context);
            List<sporsmals> alletyper = db.hentalleType();

            return Json(alletyper);

        }
        [HttpGet("{Id}")]
        public JsonResult GetSvar(int id)
        {
            var db = new SpDB(_context);
            var ut = db.hentEtSvar(id);
            return Json(ut);
        }

        [HttpPost]
        public JsonResult Post([FromBody]sporsmals innSp)
        {

                var db = new SpDB(_context);
                bool Ok = db.lagreSpørsmål(innSp);
                if (Ok)
                {
                    return Json("OK");

                }

            
            return Json("Kunne ike lagre spørsmål");
        }

    }
}