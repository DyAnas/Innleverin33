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

        
            [HttpGet("{i}")]
            public JsonResult GetAllespørsmål(int i)
            {
                var db = new SpDB(_context);
                var ut = db.hentalleSpørsmål(i);

                return Json(ut);
            }

 


            [HttpPut]
            public JsonResult Tommelopp( [FromBody]sporsmals innsporsmal)
            {
                var db = new SpDB(_context);
                bool result = db.TommelOppSp(innsporsmal);
            if (result)
            {
                return Json("OK");
            }
        
            return Json("Kunne ikke endre kunden i DB");
    
}
  
            


        }
    }
