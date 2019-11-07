using Microsoft.AspNetCore.Mvc;
using Innlevering3.Models;
using System.Collections.Generic;



namespace Innlevering3.Controllers
{

        [Route("api/[controller]")]
        public class SporsmalController : Controller

        {
            private readonly SporsmalContext _context;

            public SporsmalController(SporsmalContext context)
            {
                _context = context;
            }


        [HttpGet()]
        public JsonResult Get()
        {
            var db = new SpDB(_context);
            List<sporsmals> ut = db.hentalleSpørsmål();

            return Json(ut);
        }
    
           

   


        [HttpGet("[action]/{Id}")]
            public JsonResult Tommelopp(int id)
            {
                var db = new SpDB(_context);
                bool result = db.TommelOppSp(id);

                return Json(result);
            }
            [HttpGet("[action]/{Id}")]
            public JsonResult Tommelned(int id)
            {
                var db = new SpDB(_context);
                bool result = db.TommelNedsp(id);

                return Json(result);
            }

            [HttpPost("{Id}")]
            public JsonResult Post(int id, [FromBody]sporsmals innSp)
            {

                if (ModelState.IsValid)
                {
                    var db = new SpDB(_context);
                    bool Ok = db.lagreSpørsmål(id, innSp);
                    if (Ok)
                    {
                        return Json("OK");

                    }

                }
                return Json("Kunne ike lagre spørsmål");
            }



        }
    }
