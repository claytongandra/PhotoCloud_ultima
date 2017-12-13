using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PhotoCloud.Models
{
    public class AcessoModel
    {
      
        [Required(ErrorMessage = "Informe o seu Usuário ou E-mail.")]
        public string usuario { get; set; }

        [Required(ErrorMessage = "Informe a Senha.")]
        public string senha { get; set; }

        public bool lembrarUsuario { get; set; }
        public bool manterConectado { get; set; }
    }
}