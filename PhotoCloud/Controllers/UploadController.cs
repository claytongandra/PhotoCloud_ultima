using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using PhotoCloud.Models;
using PhotoCloud.Repositories;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;


namespace PhotoCloud.Controllers
{


    public class UploadController : VerificaEstadoLogin
    {
        ConvertMD5 objMD5 = new ConvertMD5();

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult CriarFormPasta(FormCollection PostFormFolder)
        {
            var pastaDir = new CriateFolderModel();
            pastaDir.Diretorio = PostFormFolder["pastapai"];

            var pastaAtual = PostFormFolder["pastapai"];

            if ((pastaAtual.LastIndexOf("/") - 1) > 1)
            {
                string _formataBreadcrumb = pastaAtual.Substring(1, pastaAtual.LastIndexOf("/") - 1);
                string[] _breadcrumb = _formataBreadcrumb.Split('/');
                ViewData["breadcrumb"] = _breadcrumb;
                ViewData["formataBreadcrumb"] = _formataBreadcrumb;
            }


            pastaAtual = pastaAtual.Substring(0, pastaAtual.LastIndexOf("/"));
            pastaAtual = pastaAtual.Substring(pastaAtual.LastIndexOf("/") + 1);

            if (pastaAtual == "" || pastaAtual == null)
            {
                pastaAtual = "[photoCloud]:";
                
            }

            pastaDir.Pasta = pastaAtual;
            
            return PartialView(pastaDir);



        }

        [HttpPost]
        public ActionResult CriarPasta(FormCollection PostFolder)
        {
            string _caminho = PostFolder["hidcaminho"];
            string _pasta = PostFolder["txtpasta"]; //.Replace(@" ", @"_");
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
            //  ViewData["pathX"] = _caminho;
            //  ViewData["folderX"] = _pasta;

            var path = Server.MapPath("~/pho_fotos/" + _diretorioBaseUsuario + _caminho + _pasta);
            var pathmini = Server.MapPath("~/pho_fotos_miniatura/" + _diretorioBaseUsuario + _caminho + _pasta);

            // ViewData["path"] = path;
            try
            {
                // Determine whether the directory exists. 
                if (Directory.Exists(path))
                {
                    ViewBag.Message = "A pasta " + _pasta + " já existe.";
                    return PartialView();
                }

                // Try to create the directory.
                DirectoryInfo di = Directory.CreateDirectory(path);
                DirectoryInfo dimini = Directory.CreateDirectory(pathmini);

                // Delete the directory.
                // di.Delete();
                ViewBag.Message = "A pasta: " + _pasta + " foi criada com sucesso.";
                return PartialView();
            }
            catch (Exception e)
            {
                // return Content("Falha ao criar a pasta: {0}", e.ToString());
                ViewBag.Message = "Falha ao criar a pasta: " + _pasta;
               
                return PartialView();
            }
            finally { }
        }

        [HttpPost]
        public ActionResult FileUploadForm(FormCollection PostFormFolder)
        {
            var pastaDir = new CriateFolderModel();
          
            pastaDir.Diretorio = PostFormFolder["pastapai"];

            var pastaAtual = PostFormFolder["pastapai"];

            if ((pastaAtual.LastIndexOf("/") - 1) > 1)
            {
                string _formataBreadcrumb = pastaAtual.Substring(1, pastaAtual.LastIndexOf("/") - 1);
                string[] _breadcrumb = _formataBreadcrumb.Split('/');
                ViewData["breadcrumb"] = _breadcrumb;
                ViewData["formataBreadcrumb"] = _formataBreadcrumb;
            }


            pastaAtual = pastaAtual.Substring(0, pastaAtual.LastIndexOf("/"));
            pastaAtual = pastaAtual.Substring(pastaAtual.LastIndexOf("/") + 1);

            if (pastaAtual == "" || pastaAtual == null)
            {
                pastaAtual = "[photoCloud]:";
            }

            pastaDir.Pasta = pastaAtual;

            return PartialView(pastaDir);
        }


        [HttpPost]
        public JsonResult FileUpload(IEnumerable<HttpPostedFileBase> file_upload, FormCollection PostFile)
        {
            string _caminho = PostFile.Get("hidcaminho");
            //  string _caminho = PostFile["hidcaminho"];
            string _arquivo = "";
            string _retorno = "";
            string _extencao = "";
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
            try
            {

                if (file_upload != null && _caminho != null)
                {
                    foreach (var file in file_upload)
                    {
                        if (file.ContentLength > 0)
                        {
                            var serverPath = Server.MapPath("~/pho_fotos/" + _diretorioBaseUsuario + _caminho + (file.FileName).Replace(@"+", @"plus"));
                            var serverPathMini = Server.MapPath("~/pho_fotos_miniatura/" + _diretorioBaseUsuario + _caminho + (file.FileName).Replace(@"+", @"plus"));

                            FileInfo f = new FileInfo(serverPath);
                            _extencao = f.Extension.Replace(@".", @"").ToLower();
                            if (_extencao != "jpg" && _extencao != "png" && _extencao != "gif" && _extencao != "mp4" && _extencao != "wmv" && _extencao != "mpg")
                            {
                                Response.Status = "8004 Tipo de arquivo não permitido";

                            }
                            else
                            {
                                if (System.IO.File.Exists(serverPath))
                                {
                                    // ViewBag.Message = "O Arquivo Já existe na pasta: " +_caminho;
                                    Response.Status = "8001 O Arquivo Já existe na pasta";
                                }
                                else
                                {

                                    file.SaveAs(serverPath);
                                    _arquivo = _arquivo + file.FileName;

                                    //System.Drawing.Image img = System.Drawing.Image.FromFile(serverPath);
                                    //System.Drawing.Image thumb = img.GetThumbnailImage(175, 175, null, IntPtr.Zero);
                                    //img.Dispose();
                                    //thumb.Save(serverPathMini);


                                    int thumbHeight = 175;
                                    int thumbWidth = 175;
                                    ImageFormat image_format = null;

                                    //Stream objStream = new StreamReader(serverPath).BaseStream;
                                    //BinaryReader objBinaryReader = new BinaryReader(objStream);
                                    //int i = (int)objStream.Length;
                                    //byte[] arrBytes = objBinaryReader.ReadBytes(i);
                                    //System.IO.MemoryStream memoryStream = new System.IO.MemoryStream(arrBytes);
                                    //System.Drawing.Image image = System.Drawing.Image.FromStream(memoryStream);

                                    System.Drawing.Image image = System.Drawing.Image.FromFile(serverPath);

                                    System.Drawing.Image thumbnail = image.GetThumbnailImage(thumbWidth, thumbHeight, null, IntPtr.Zero);
                                    //System.Drawing.Image thumbnail = new Bitmap(thumbWidth, thumbHeight);
                                    
                                    System.Drawing.Graphics graphic = System.Drawing.Graphics.FromImage(thumbnail);

                                    // Melhoria da nova imagem
                                   // graphic.Clear(Color.White);
                                    graphic.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                                    graphic.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                                    graphic.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
                                    graphic.CompositingQuality = System.Drawing.Drawing2D.CompositingQuality.HighQuality;

                                    // Desenha a nova imagem
                                    graphic.DrawImage(image, 0, 0, thumbWidth, thumbHeight);


                                    // Aplica a codificação necessária
                                    System.Drawing.Imaging.ImageCodecInfo[] info = System.Drawing.Imaging.ImageCodecInfo.GetImageEncoders();
                                    System.Drawing.Imaging.EncoderParameters encoderParameters;
                                    encoderParameters = new System.Drawing.Imaging.EncoderParameters(3);
                                    encoderParameters.Param[0] = new System.Drawing.Imaging.EncoderParameter(System.Drawing.Imaging.Encoder.ColorDepth, 24);
                                    encoderParameters.Param[1] = new System.Drawing.Imaging.EncoderParameter(System.Drawing.Imaging.Encoder.Compression, 0);
                                    encoderParameters.Param[2] = new System.Drawing.Imaging.EncoderParameter(System.Drawing.Imaging.Encoder.Quality, 100L);

                                    // Exibe a imagem em forma de JPG

                                    switch (_extencao)
                                    {
                                        case "png":
                                            Response.AddHeader("Response-Type", "image/png");
                                            Response.ContentType = "image/png";
                                            image_format = ImageFormat.Png;
                                            thumbnail.Save(serverPathMini, image_format);
                                            break;
                                        case "gif":
                                            Response.AddHeader("Response-Type", "image/gif");
                                            Response.ContentType = "image/gif";
                                         //   image_format = ImageFormat.Gif;
                                            thumbnail.Save(serverPathMini);
                                            break;
                                        case "jpg":
                                            Response.AddHeader("Response-Type", "image/jpeg");
                                            Response.ContentType = "image/jpeg";
                                            thumbnail.Save(serverPathMini, info[1], encoderParameters);
                                            break;
                                        default:
                                            thumbnail.Save(serverPathMini);
                                            break;
                                    }


                                    thumbnail.Dispose();
                                    image.Dispose();
                                    graphic.Dispose();

                                }
                            }


                        }
                        else
                        {
                            //   ViewBag.Message = "O Arquivo ContentLength 0 ";
                            // _retorno = "0";
                            Response.Status = "8002 O Conteudo do Arquivo esta 0";
                        }
                    }
                    //  ViewBag.Message = "O Arquivo: " + _arquivo + " foi carregado com sucesso.";
                    // _retorno = true;
                }
                else
                {
                    //ViewBag.Message = "O Arquivo é nullo.";
                    Response.Status = "8003 O Arquivo é nullo.";

                }

            }
            catch (Exception ex)
            {
                //    ViewBag.Message = "Erro "+ ex.Message;
                //  _retorno = ex.Message;
            }

            ViewBag.file = "Bag Arquivo: " + _arquivo;
            ViewBag.path = "Bag Caminho: " + _caminho;

            return Json(_extencao);
            // return PartialView();
        }

        [HttpPost]
        public ActionResult CheckExistFileUpload(IEnumerable<HttpPostedFileBase> file_upload, FormCollection PostFile)
        {
            string _caminho = PostFile.Get("hidcaminho");

            ViewBag.ExistFile = 1;

            return PartialView();
        }


    }
}
