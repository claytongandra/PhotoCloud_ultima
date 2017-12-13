using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations;
using PhotoCloud.Models;
using PhotoCloud.Repositories;

namespace PhotoCloud.Controllers
{
    public class AcessoController : Controller
    {
        ConvertMD5 objMD5 = new ConvertMD5();

        public ActionResult Login()
        {
            AcessoModel objAcessoUsuario = new AcessoModel();

            var _cookieLembraUsuario = HttpContext.Request.Cookies[objMD5.getMD5Hash("UserCookieLembrarUsuario")];
            var _cookieManterConectado = HttpContext.Request.Cookies[objMD5.getMD5Hash("UserCookieManterConectado")];

            HttpCookie BrowserVerificaCriarCookie = new HttpCookie(objMD5.getMD5Hash("BrowserVerificaCriarCookie")); // C6D27B273F1B25456B7D9D05ECAFECA4
            HttpContext.Response.Cookies.Add(BrowserVerificaCriarCookie);

            if (_cookieManterConectado != null)
            {
                if (CryptographyRepository.Descriptografar(HttpContext.Request.Cookies[objMD5.getMD5Hash("UserCookieManterConectado")][objMD5.getMD5Hash("USUMANTERLOG")].ToString()) == "true")
                {
                    objAcessoUsuario.manterConectado = true;
                }

            }

            if (_cookieLembraUsuario != null)
            {
                objAcessoUsuario.usuario = CryptographyRepository.Descriptografar(HttpContext.Request.Cookies[objMD5.getMD5Hash("UserCookieLembrarUsuario")][objMD5.getMD5Hash("USERNAME")]);
                objAcessoUsuario.lembrarUsuario = true;
            }
            return View(objAcessoUsuario);
        }

        [HttpPost]
        public ActionResult Login(AcessoModel acessoUsuario)
        {
            var _cookieHabilitadoBrowser = HttpContext.Request.Cookies[objMD5.getMD5Hash("BrowserVerificaCriarCookie")];

            if (_cookieHabilitadoBrowser == null)
            {
                return RedirectToAction("HabilitarCookie", "Restricao");
               // ModelState.AddModelError(string.Empty, "O navegador (ou browser) que você está usando recusa-se a fazer o login em sua conta. (cookies rejeitados)!");
               // return View();
            }

            if (string.IsNullOrEmpty(acessoUsuario.usuario))
            {
                ModelState.AddModelError(string.Empty, "Informe o seu Usuário ou E-mail!");
                return View();
            }
            if (string.IsNullOrEmpty(acessoUsuario.senha))
            {
                ModelState.AddModelError(string.Empty, "Informe a senha!");
                return View();
            }
            if (ModelState.IsValid)
            {
                string _Username, _Password, _PasswordCrip;
                bool _LembrarUsuario;
                bool _ManterConectado;

                _Username = acessoUsuario.usuario;
                _Password = acessoUsuario.senha;
                _LembrarUsuario = acessoUsuario.lembrarUsuario;
                _ManterConectado = acessoUsuario.manterConectado;

                _PasswordCrip = objMD5.getMD5Hash(_Password);

                if (UsersRepository.AutenticarUsuario(_Username, _PasswordCrip, _LembrarUsuario, _ManterConectado))
                {
                    HttpCookie VerificaCookie = new HttpCookie(objMD5.getMD5Hash("BrowserVerificaCriarCookie"));
                    VerificaCookie.Expires = DateTime.Now.AddDays(-1d);
                    Response.Cookies.Add(VerificaCookie);

                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Usuário ou Senha inválidos!");
                    return View();
                }
            }
            return View();
        }
        public ActionResult Logout()
        {
            if (Request.Cookies[objMD5.getMD5Hash("UserCookieAuthentication")] != null)
            {
                HttpCookie myCookie = new HttpCookie(objMD5.getMD5Hash("UserCookieAuthentication"));
                myCookie.Expires = DateTime.Now.AddDays(-1d);
                Response.Cookies.Add(myCookie);
            }
            return RedirectToAction("Login", "Acesso");
        }
    }
}
