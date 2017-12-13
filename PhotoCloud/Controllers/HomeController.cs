using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PhotoCloud.Repositories;
using PhotoCloud.Models;
using System.IO;
using System.Text;

namespace PhotoCloud.Controllers
{
    public class HomeController : VerificaEstadoLogin
    {
        public ActionResult Index()
        {
            //ConvertMD5 _senhaCrip = new ConvertMD5();

            //UsersRepository x = new UsersRepository();

           

           //  ViewBag.md5 = _senhaCrip.getMD5Hash("admin");
           //  ViewBag.md5 = _senhaCrip.getMD5Hash("0000000001");
           //  ViewBag.md5 = _senhaCrip.getMD5Hash("0000000002");
           //  ViewBag.md5 = _senhaCrip.getMD5Hash("PhotoCloudMD5CryptographyKey");

        //    UsuarioLogado objUsuarioLogado = (UsuarioLogado)ViewData["TestValue"];

       //     ViewBag.dirUsuario = objUsuarioLogado.diretorioUsuario;

            //UsuarioLogadoModel test = (UsuarioLogadoModel)ViewData["TestValue"];

            //string _confDirBase = "0000000000" + test.idUsuario.ToString();

            //_confDirBase = _confDirBase.Substring(_confDirBase.Length - 10);

            //ViewBag.Crip = CryptographyRepository.Criptografar(_confDirBase);
            //ViewBag.DeCrip = CryptographyRepository.Descriptografar(CryptographyRepository.Criptografar(_confDirBase).ToString());
            //ViewBag.xxx = test.diretorioUsuario;
            //ViewBag.md5 = _senhaCrip.getMD5Hash(CryptographyRepository.Criptografar(_confDirBase));

            UsuarioLogadoModel objUsuarioLogado = (UsuarioLogadoModel)ViewData["vdtUsuarioLogado"];

            return View(objUsuarioLogado);
        }

        [HttpPost]
        public ActionResult InicioConteudo()
        {


            return PartialView();

        }

        public ActionResult ListaArquivos()
        {
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult ListaArquivos(FormCollection Postpath)
        {
            ConvertMD5 objMD5 = new ConvertMD5();

            var pastaAtual = Postpath["pasta"];

            if ((pastaAtual.LastIndexOf("/") - 1) > 1)
            {
                string _formataBreadcrumb = pastaAtual.Substring(1, pastaAtual.LastIndexOf("/") - 1);
                string[] _breadcrumb = _formataBreadcrumb.Split('/');
                ViewData["breadcrumb"] = _breadcrumb;
                ViewData["formataBreadcrumb"] = _formataBreadcrumb;
                ViewData["tamanhoBreadcrumb"] = _formataBreadcrumb.Length;

            }


            pastaAtual = pastaAtual.Substring(0, pastaAtual.LastIndexOf("/"));
            pastaAtual = pastaAtual.Substring(pastaAtual.LastIndexOf("/") + 1);

            if (pastaAtual == "" || pastaAtual == null)
            {
                pastaAtual = "[photoCloud]:";
            }
            ViewData["pasta"] = pastaAtual; //.Replace(@"_", @" ");
            ViewData["diretorio"] = Postpath["pasta"];




            //pastaAtual.Substring(pastaAtual.LastIndexOf("/") + 1);

            string realPath;
            string path = Postpath["pasta"];
            string _diretorioBaseUsuario = null;

            string _usuarioId = PhotoCloud.Models.CryptographyRepository.Descriptografar(HttpContext.Request.Cookies[objMD5.getMD5Hash("UserCookieAuthentication")][objMD5.getMD5Hash("USUIDLOGD")].ToString());

            int IDUsuario;
            if (int.TryParse(_usuarioId, out IDUsuario))
            {

                photocloudEntities ContextoUsuario = new photocloudEntities();

                var Consulta = (from usuario in ContextoUsuario.pho_usuarios
                                where usuario.usu_id == IDUsuario
                                select usuario).SingleOrDefault();


                _diretorioBaseUsuario = Consulta.usu_diretoriobase;

            }
            //   ViewData["path"] = Postpath["pasta"];

            realPath = Server.MapPath("~/pho_fotos/" + _diretorioBaseUsuario + "/" + path);

            //   ViewData["realPath"] = realPath;

            //  or realPath = "FullPath of the folder on server" 

            if (System.IO.File.Exists(realPath))
            {

                //http://stackoverflow.com/questions/1176022/unknown-file-type-mime
                return base.File(realPath, "application/octet-stream");
            }
            else if (System.IO.Directory.Exists(realPath))
            {

                //Uri url = Request.Url;

                ////Every path needs to end with slash
                //if (url.ToString().Last() != '/')
                //{
                //    Response.Redirect("/Explorer/" + path + "/");
                //}

                List<ListaDirModel> dirListModel = new List<ListaDirModel>();

                IEnumerable<string> dirList = Directory.EnumerateDirectories(realPath);
                foreach (string dir in dirList)
                {
                    DirectoryInfo d = new DirectoryInfo(dir);

                    ListaDirModel dirModel = new ListaDirModel();

                    dirModel.DirBase = _diretorioBaseUsuario;
                    dirModel.Dir = "/" + path + Path.GetFileName(dir) + "/";
                    dirModel.DirName = Path.GetFileName(dir);
                    dirModel.DirAccessed = d.LastAccessTime;

                    dirListModel.Add(dirModel);
                }

                List<ListaFileModel> fileListModel = new List<ListaFileModel>();

                IEnumerable<string> fileList = Directory.EnumerateFiles(realPath);
                foreach (string file in fileList)
                {
                    FileInfo f = new FileInfo(file);

                    ListaFileModel fileModel = new ListaFileModel();

                    if (f.Extension.ToLower() != "php" && f.Extension.ToLower() != "aspx" && f.Extension.ToLower() != "asp")
                    {

                        fileModel.FileName = Path.GetFileName(file);
                        fileModel.FileDirectoryName = "pho_fotos/" + _diretorioBaseUsuario + path + Path.GetFileName(file);
                        fileModel.FileAccessed = f.LastAccessTime;
                        fileModel.FileSizeText = (f.Length < 1024) ? f.Length.ToString() + " B" : f.Length / 1024 + " KB";
                        fileModel.FileExtension = f.Extension.Replace(@".", @"").ToLower();

                        fileListModel.Add(fileModel);
                    }
                }

                ListaConteudoDirModel explorerModel = new ListaConteudoDirModel(dirListModel, fileListModel);

                return PartialView(explorerModel);

            }
            else
            {
                return Content(path + " não é um arquivo ou diretório válido.");
            }
            //  return Content(realPath);
        }

    }
}
