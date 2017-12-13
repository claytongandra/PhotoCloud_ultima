using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PhotoCloud.Models
{
    public class UploadFileModel
    {
        public string DirBase { get; set; }
        public string Pasta { get; set; }
       public HttpPostedFileBase Arquivo { get; set; }
    }

    public class CriateFolderModel
    {
        public string DirBase { get; set; }
        public string Diretorio { get; set; }
        public string Pasta { get; set; }
    }
}