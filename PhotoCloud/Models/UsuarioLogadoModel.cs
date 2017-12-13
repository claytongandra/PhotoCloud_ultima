using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PhotoCloud.Models
{
    public class UsuarioLogadoModel
    {

        public int idUsuario { get; set; }
        public string nomeUsuario { get; set; }
        public string sobrenomeUsuario { get; set; }
        public string diretorioUsuario { get; set; }
        public string emailUsuario { get; set; }
        public string loginUsuario { get; set; }
    }
}