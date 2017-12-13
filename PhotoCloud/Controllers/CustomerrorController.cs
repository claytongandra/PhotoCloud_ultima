using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PhotoCloud.Repositories;
using PhotoCloud.Models;

namespace PhotoCloud.Controllers
{
    public class CustomerrorController : Controller
    {


        public ActionResult Error404()
        {
            return View();
        }

    }
}
