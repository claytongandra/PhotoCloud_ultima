using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PhotoCloud.Models;
using PhotoCloud.Repositories;
using System.IO;
using System.Text;

namespace PhotoCloud.Controllers
{
    public class FileTreeController : VerificaEstadoLogin
    {

        [HttpPost]
        public ActionResult Index(FormCollection Postpath)
        {
            ConvertMD5 objMD5 = new ConvertMD5();

            int _contFolder = 0;
            int _contFile = 0;
            
            string realPath;
          //  string path = HttpUtility.UrlDecode(Postpath["dir"]);
            string path = Postpath["dir"];
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

            
            Encoding iso = Encoding.GetEncoding("ISO-8859-1");

            path = HttpUtility.UrlDecode(path, iso);

            realPath = Server.MapPath("~/pho_fotos/" + _diretorioBaseUsuario + "/" + path);
           
            if (System.IO.File.Exists(realPath))
            {
                return base.File(realPath, "application/octet-stream");
            }
            else if (System.IO.Directory.Exists(realPath))
            {
                try
                {
                    //cria objeto dirListModel do tipo lista do model DirModel (FileTreeModel)
                    List<DiretorioModel> dirListModel = new List<DiretorioModel>();

                    IEnumerable<string> dirList = Directory.EnumerateDirectories(realPath);
                    foreach (string dir in dirList)
                    {
                        DirectoryInfo objdiretorio = new DirectoryInfo(dir);

                        DiretorioModel dirModel = new DiretorioModel();

                        dirModel.DirBase = _diretorioBaseUsuario;
                        dirModel.Dir = "/" + path + Path.GetFileName(dir) + "/";
                        dirModel.DirName = Path.GetFileName(dir);
                        dirModel.DirAccessed = objdiretorio.LastAccessTime;

                        dirListModel.Add(dirModel);
                        _contFolder++;
                    }

                    List<FileModel> fileListModel = new List<FileModel>();

                    IEnumerable<string> fileList = Directory.EnumerateFiles(realPath);
                    foreach (string file in fileList)
                    {
                        FileInfo f = new FileInfo(file);

                        FileModel fileModel = new FileModel();

                        if (f.Extension.ToLower() != "php" && f.Extension.ToLower() != "aspx" && f.Extension.ToLower() != "asp")
                        {
                            if (path == "") 
                            {
                                path = "/";
                                fileModel.FileDirectory = "/";
                            }
                            else
                            {
                                string _pastaPai = path.Substring(1, path.LastIndexOf("/") - 1);

                                fileModel.FileDirectory = _pastaPai.Substring(_pastaPai.LastIndexOf("/") + 1);
                            }
                        
                            fileModel.FileName = Path.GetFileName(file);


                            fileModel.FileDirectoryName = "pho_fotos/" + _diretorioBaseUsuario + path + Path.GetFileName(file);
                            fileModel.FileAccessed = f.LastAccessTime;
                            fileModel.FileSizeText = (f.Length < 1024) ? f.Length.ToString() + " B" : f.Length / 1024 + " KB";
                            fileModel.FileExtension = f.Extension.Replace(@".", @"").ToLower();

                            fileListModel.Add(fileModel);

                            _contFile++;
                        }
                    }
                    if (_contFolder == 0 && _contFile == 0)
                    {
                        if (path == "")
                        {
                            ViewBag.MessageError = "Para iniciar crie suas pastas e faça upload de suas imagens e vídeos.";
                        }
                        else
                        {
                            if (_contFile == 0)
                            {
                                ViewBag.MessageError = "Pasta vazia.";
                            }
                        }
                   
                        return PartialView();
                    }

                    FileTreeModel explorerModel = new FileTreeModel(dirListModel, fileListModel);

                    return PartialView(explorerModel);
                }
                catch (Exception ex)
                {
                   ViewBag.MessageError = realPath;
                     return PartialView();
                }
            }
            else
            {
              //  ViewBag.MessageError = "O parâmetro de entrada " + path + " não é um arquivo ou diretório válido.";
                ViewBag.MessageError = realPath + ": não é um arquivo ou diretório válido.";
                return PartialView();
              //  return Content(path + " não é um arquivo ou diretório válido.");
            }

        }
        
    }
}
