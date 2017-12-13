using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PhotoCloud.Repositories;

namespace PhotoCloud.Controllers    
{
    public class RestricaoController : Controller
    {
        public ActionResult HabilitarCookie()
        {
            ConvertMD5 objMD5 = new ConvertMD5();

            var _cookieHabilitadoBrowser = HttpContext.Request.Cookies[objMD5.getMD5Hash("BrowserVerificaCriarCookie")];

            if (_cookieHabilitadoBrowser == null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Acesso");
            }
        }

    }
}
