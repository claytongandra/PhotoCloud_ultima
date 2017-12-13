; (function (a) { a.fn.aeImageResize = function (b) { var c = 0, d = a.browser.msie && 6 == ~ ~a.browser.version; return !b.height && !b.width ? this : (b.height && b.width && (c = b.width / b.height), this.one("load", function () { this.removeAttribute("height"), this.removeAttribute("width"), this.style.height = this.style.width = ""; var a = this.height, d = this.width, e = d / a, f = b.height, g = b.width, h = c; h || (f ? h = e + 1 : h = e - 1); if (f && a > f || g && d > g) e > h ? f = ~ ~(a / d * g) : g = ~ ~(d / a * f), this.height = f, this.width = g }).each(function () { (this.complete || d) && a(this).trigger("load"), this.src = this.src })) } })(jQuery);


if (Modernizr.geolocation) {
  //  alert("Aceita a feature");
} else {
   // alert("Não aceita a feature testada. ");
}

// jQuery Document
$(document).ready(function () {
    $('body').show();
    NProgress.start();
    NProgress.done();



    function fnInicioConteudo() {
        $.ajax({
            type: 'POST',
            //  url: 'Home/InicioConteudo',
            url: 'Home/ListaArquivos/',
            contentType: 'application/x-www-form-urlencoded;',
            data: { 'pasta': '/' },
            cache: false,
            global: true,
            dataType: 'html',
            beforeSend: function () {
                $('#container_contents').empty().append("<div class='acc_container border_radius5'><img src='Content/pho_images/phoimg_carregando/loading_circular.gif' /><span class='text_carregando'>Carregando...</span></div>");

            },
            success: function (html) {
                $('#container_contents').empty().html(html);
                fnCriaMenuHorizontal('/');
            },
            error: function (xhr, errorMessage, thrownError) {
                $('#container_contents').empty().append("<div class='acc_container border_radius5'><ul id='erro_post'><li>Ocorreu um erro ao carregar as informações.</li><li>Erro: " + xhr.status + "</li><li>Descrição: " + xhr.statusText + "</li><li>Erro Response Text:" + xhr.responseText + "</li><li>Caso o problema persista, contate o administrador do sistema.</li></ul></div>");
            }
        });
    };

    fnCriaMenuHorizontal('/');

    function fnInitializeFileTree() {
        //alert('fnInitializeFileTree');
        $('#sidebar_left').fileTree({
            root: '',
            script: '/FileTree/Index/',
            expandSpeed: 1000,
            collapseSpeed: 1000,
            multiFolder: false,
            loadMessage: 'Carragando...'
        },
        function (file) { // function h()
            //alert(file); 
            fnReinitializePrettyPhoto();
        },
        function (file) { // function i()
            // alert('Pasta: ' + file);
            //------------------- Carrega os Conteudos
            //var Parameters = "{'pasta':"+file+"}";
            $.ajax({
                type: 'POST',
                url: 'Home/ListaArquivos',
                contentType: 'application/x-www-form-urlencoded;',
                data: { 'pasta': file },
                cache: false,
                global: true,
                dataType: 'html',
                beforeSend: function () {
                    $('#container_contents').empty().append("<div class='acc_container border_radius5'><img src='Content/pho_images/phoimg_carregando/loading_circular.gif' /><span class='text_carregando'>Carregando...</span></div>");
                },
                success: function (html) {
                    $('#container_contents').empty().html(html);
                    fnCriaMenuHorizontal(file);
                    fnReinitializePrettyPhoto();
                    fnReinitializeCycle();
                },
                error: function (xhr, errorMessage, thrownError) {
                    $('#container_contents').empty().append("<div class='acc_container border_radius5'><ul id='erro_post'><li>Ocorreu um erro ao carregar as informações.</li><li>Erro: " + xhr.status + "</li><li>Descrição: " + xhr.statusText + "</li><li>Erro Response Text:" + xhr.responseText + "</li><li>Caso o problema persista, contate o administrador do sistema.</li></ul></div>");
                }
            });
            //-------------------  
        },
        function (file, url) { // function j()
            //	alert(file); 
            //	alert(url); 
            if (file == url) {
                fnInicioConteudo();
            } else {
                $.ajax({
                    type: 'POST',
                    url: 'Home/ListaArquivos',
                    contentType: 'application/x-www-form-urlencoded;',
                    data: { 'pasta': file },
                    cache: false,
                    global: true,
                    dataType: 'html',
                    beforeSend: function () {
                        $('#container_contents').empty().append("<div class='acc_container border_radius5'><img src='Content/pho_images/phoimg_carregando/loading_circular.gif' /> <span class='text_carregando'>Carregando...</span></div>");
                    },
                    success: function (html) {
                        $('#container_contents').empty().html(html);
                        fnCriaMenuHorizontal(file);
                        fnReinitializePrettyPhoto();
                        fnReinitializeCycle();
                    },
                    error: function (xhr, errorMessage, thrownError) {
                        $('#container_contents').empty().append("<div class='acc_container border_radius5'><ul id='erro_post'><li>Ocorreu um erro ao carregar as informações.</li><li>Erro: " + xhr.status + "</li><li>Descrição: " + xhr.statusText + "</li><li>Erro Response Text:" + xhr.responseText + "</li><li>Caso o problema persista, contate o administrador do sistema.</li></ul></div>");
                    }
                });
            }
        }
      );
    }

    fnInitializeFileTree();


    // thumb imagem effect				   
    $("ul.thumb li").live('mouseover mouseout', function (e) {
        if (e.type == 'mouseover') {
            $(this).css({ 'z-index': '999' });
            $(this).find('img').addClass("hover").stop() /* Add class of "hover", then stop animation queue buildup*/
			.animate({
			    marginTop: '-110px', /* -110px The next 4 lines will vertically align this image */
			    marginLeft: '-110px', /*-110px */
			    top: '50%',
			    left: '50%',
			    width: '154px', /* Set new width  174*/
			    height: '154px', /* Set new height  174*/
			    padding: '25px'

			}, 500); /* this value of "200" is the speed of how fast/slow this hover animates */

        }
        else if (e.type == 'mouseout') {

            $(this).find('img').removeClass("hover").stop()  /* Remove the "hover" class , then stop animation queue buildup*/
			.animate({
			    marginTop: '0', /* Set alignment back to default */
			    marginLeft: '0',
			    top: '0',
			    left: '0',
			    width: '140px', /* Set width back to default */
			    height: '140px', /* Set height back to default */
			    padding: '5px'
			}, 400);
            $(this).css({ 'z-index': '99' }); /* Set z-index back to 0 */
        }
    });
    //---------------------------------------------------------------------------------------
    $("div.folders").live('mouseover mouseout', function (e) {
        if (e.type == 'mouseover') {
            $(this).addClass("foldersHover");
            $(this).find(".folders_select_chkbox").css('display', 'block');
        }
        else if (e.type == 'mouseout') {
            $(this).removeClass("foldersHover");

            if (!$(this).find(".folders_select_chkbox input:checkbox").attr("checked")) {
                $(this).find(".folders_select_chkbox").css('display', 'none');
            }
        }
    });
    //---------------------------------------------------------------------------------------


    $(".folders a, #abrirpasta").live('click', function () {
        //	alert($(this).attr('rel'));
        var vjsPastaUrl = $(this).attr('rel');
        //------------------- Carrega os Conteudos
        $('.jqueryFileTree').find('.directory').find('a').each(function () {
            //		alert($(this).attr('url'));
            if ($(this).attr('url') == vjsPastaUrl) {
                //	$(".jqueryFileTree.start").remove();
                //$(this).parent().find('UL').slideUp({ duration: 1000, easing: 1000 });
                //	$(this).text('xxx');
                showMyTree($(this).parent(), vjsPastaUrl);
                return false;
            }

        });

        //alert($('.jqueryFileTree').find('a').text(vjsPastaUrl).html());
        $.ajax({
            type: 'POST',
            url: 'Home/ListaArquivos',
            contentType: 'application/x-www-form-urlencoded;',
            data: { 'pasta': $(this).attr('rel') },
            cache: false,
            global: true,
            dataType: 'html',
            beforeSend: function () {
                $('#container_contents').empty().append("<div class='acc_container border_radius5'><img src='Content/pho_images/phoimg_carregando/loading_circular.gif' /><span class='text_carregando'>Carregando...</span></div>");
                NProgress.start();
                NProgress.done();
            },
            success: function (html) {
                $('#container_contents').empty().html(html);
                fnCriaMenuHorizontal(vjsPastaUrl);
                fnReinitializePrettyPhoto();
                fnReinitializeCycle();
                fnReinitializeMenuSubFolders();
                fnReinitializeSelectFolders();

            },
            error: function (xhr, errorMessage, thrownError) {
                $('#container_contents').empty().append("<div class='acc_container border_radius5'><ul id='erro_post'><li>Ocorreu um erro ao carregar as informações.</li><li>Erro: " + xhr.status + "</li><li>Descrição: " + xhr.statusText + "</li><li>Erro Response Text:" + xhr.responseText + "</li><li>Caso o problema persista, contate o administrador do sistema.</li></ul></div>");
            }
        });
        //-------------------  
    });

    $(".breadcrumb li a").live('click', function () {
        // alert($(this).attr('rel'));
        var vjsPastaUrl = $(this).attr('rel');
        //------------------- Carrega os Conteudos
        //  alert("original: "+vjsPastaUrl);
        $('.jqueryFileTree').find('.directory').find('a').each(function () {
            if ($(this).attr('url') == vjsPastaUrl) {
                $(this).parent().find('.expanded').find('UL').slideUp({ duration: 1000, easing: null });
                $(this).parent().find('.expanded').removeClass('expanded').addClass('collapsed');
                return false;
            }

        });

        //alert($('.jqueryFileTree').find('a').text(vjsPastaUrl).html());
        $.ajax({
            type: 'POST',
            url: 'Home/ListaArquivos',
            contentType: 'application/x-www-form-urlencoded;',
            data: { 'pasta': $(this).attr('rel') },
            cache: false,
            global: true,
            dataType: 'html',
            beforeSend: function () {
                $('#container_contents').empty().append("<div class='acc_container border_radius5'><img src='Content/pho_images/phoimg_carregando/loading_circular.gif' /><span class='text_carregando'>Carregando...</span></div>");
                NProgress.start();
                NProgress.done();
            },
            success: function (html) {
                $('#container_contents').empty().html(html);
                fnCriaMenuHorizontal(vjsPastaUrl);
                fnReinitializePrettyPhoto();
                fnReinitializeCycle();
                fnReinitializeMenuSubFolders();
                fnReinitializeSelectFolders();

            },
            error: function (xhr, errorMessage, thrownError) {
                $('#container_contents').empty().append("<div class='acc_container border_radius5'><ul id='erro_post'><li>Ocorreu um erro ao carregar as informações.</li><li>Erro: " + xhr.status + "</li><li>Descrição: " + xhr.statusText + "</li><li>Erro Response Text:" + xhr.responseText + "</li><li>Caso o problema persista, contate o administrador do sistema.</li></ul></div>");
            }
        });
        //-------------------  
    });
    //------Meu File Tree --------------------------------------------------------

    function showMyTree(c, t) {
        //  alert('My t: ' + t);
        $(c).addClass('wait');
        $(".jqueryFileTree.start").remove();

        $(c).parent().find('UL').remove(); // cleanup
        $(c).closest('.collapsed').removeClass('collapsed').addClass('expanded');

        $.post('FileTree/Index/', { dir: t }, function (data) {
            $(c).find('.start').html('');
            $(c).removeClass('wait').append(data);
            $(c).find('UL:hidden').slideDown({ duration: 1000, easing: null });
            bindMyTree(c);
            /*------------------------*/
        }).fail(function (data, textStatus, jqXHR) {
            $(c).html('<ul class="jqueryFileTree start"><li class="warning">Erro ao Carregar Arquivos:</li><li class="file">' + t + '</li><li class="file">' + jqXHR + '</li><li class="file">' + statusText + '</li></ul>');

        }).always(function (data, textStatus, jqXHR) {
            //  alert("finished ---- " + "data: " + $(data).html() + ' - textStatus: ' + textStatus + ' - jqXHR: ' + jqXHR);
            /*-----------------------*/
        });
    }
    function bindMyTree(t) {

        fnReinitializePrettyPhoto();
        //        $(t).find('LI A').each(function () {
        //            alert($(this).attr('url'));  fnCriaMenuHorizontal(file);
        //        });
        $(t).find('LI A').bind('click', function () {

            if ($(this).parent().hasClass('directory')) {
                if ($(this).parent().hasClass('collapsed')) {
                    // Expand
                    if (!false) {
                        $(this).parent().parent().find('UL').slideUp({ duration: 1000, easing: null });
                        $(this).parent().parent().find('LI.directory').removeClass('expanded').addClass('collapsed');
                    }
                    $(this).parent().find('UL').remove(); // cleanup
                    showMyTree($(this).parent(), escape($(this).attr('url').match(/.*\//)));
                    $(this).parent().removeClass('collapsed').addClass('expanded');
                    fnCriaMenuHorizontal($(this).attr('url'));
                    $.ajax({
                        type: 'POST',
                        url: 'Home/ListaArquivos',
                        contentType: 'application/x-www-form-urlencoded;',
                        data: { 'pasta': $(this).attr('url') },
                        cache: false,
                        global: true,
                        dataType: 'html',
                        beforeSend: function () {
                            $('#container_contents').empty().append("<div class='acc_container border_radius5'><img src='Content/pho_images/phoimg_carregando/loading_circular.gif' /><span class='text_carregando'>Carregando...</span></div>");
                        },
                        success: function (html) {
                            $('#container_contents').empty().html(html);
                            fnReinitializePrettyPhoto();
                            fnReinitializeCycle();
                        },
                        error: function (xhr, errorMessage, thrownError) {
                            $('#container_contents').empty().append("<div class='acc_container border_radius5'><ul id='erro_post'><li>Ocorreu um erro ao carregar as informações.</li><li>Erro: " + xhr.status + "</li><li>Descrição: " + xhr.statusText + "</li><li>Erro Response Text:" + xhr.responseText + "</li><li>Caso o problema persista, contate o administrador do sistema.</li></ul></div>");
                        }
                    });

                } else {
                    // Collapse
                    $(this).parent().find('UL').slideUp({ duration: 1000, easing: null });
                    $(this).parent().removeClass('expanded').addClass('collapsed');

                    var file = $(this).parent().closest('.jqueryFileTree').parent().find('a').attr('url');
                    var url = $(this).attr('url');

                    fnCriaMenuHorizontal(file);

                    if (file == url) {
                        fnInicioConteudo();
                    } else {
                        $.ajax({
                            type: 'POST',
                            url: 'Home/ListaArquivos',
                            contentType: 'application/x-www-form-urlencoded;',
                            data: { 'pasta': file },
                            cache: false,
                            global: true,
                            dataType: 'html',
                            beforeSend: function () {
                                $('#container_contents').empty().append("<div class='acc_container border_radius5'><img src='Content/pho_images/phoimg_carregando/loading_circular.gif' /><span class='text_carregando'>Carregando...</span></div>");
                            },
                            success: function (html) {
                                $('#container_contents').empty().html(html);
                                fnReinitializePrettyPhoto();
                                fnReinitializeCycle();

                            },
                            error: function (xhr, errorMessage, thrownError) {
                                $('#container_contents').empty().append("<div class='acc_container border_radius5'><ul id='erro_post'><li>Ocorreu um erro ao carregar as informações.</li><li>Erro: " + xhr.status + "</li><li>Descrição: " + xhr.statusText + "</li><li>Erro Response Text:" + xhr.responseText + "</li><li>Caso o problema persista, contate o administrador do sistema.</li></ul></div>");
                            }
                        });
                    }
                }
            }
            return false;
        });
    }

    $('#sidebar_left').ajaxComplete(function (e, xhr, settings) {
        //	alert();
    });

    //------menu Horizontal --------------------------------------------------------
    function fnCriaMenuHorizontal(vprmPastaPai) {

        //   alert(vprmPastaPai);
        var vjsHtml = "";
        vjsHtml = vjsHtml + "<li>";
        vjsHtml = vjsHtml + "<a id='rootfolder' href='#' rel='/' title='Pasta Raiz'>";
        vjsHtml = vjsHtml + "<img src='Content/pho_images/phoimg_botoes/imgbtn_cloudfolder.png' />";
        //  vjsHtml = vjsHtml + "<span>Pasta Raiz</span>";
        vjsHtml = vjsHtml + "</a>";
        vjsHtml = vjsHtml + "</li>";

        vjsHtml = vjsHtml + "<li>";
        vjsHtml = vjsHtml + "<a id='criarpasta' href='#' rel='" + vprmPastaPai + "' title='Criar Pasta'>";
        vjsHtml = vjsHtml + "<img src='Content/pho_images/phoimg_botoes/imgbtn_criar_branco.png' />";
        vjsHtml = vjsHtml + "<span>Criar Pasta</span>";
        vjsHtml = vjsHtml + "</a>";
        vjsHtml = vjsHtml + "</li>";

        vjsHtml = vjsHtml + "<li>";
        vjsHtml = vjsHtml + "<a id='carregararquivos' href='#' rel='" + vprmPastaPai + "' title='Carregar Arquivos'>";
        vjsHtml = vjsHtml + "<img src='Content/pho_images/phoimg_botoes/imgbtn_carregar_branco.png' />";
        vjsHtml = vjsHtml + "<span>Carregar Arquivos</span>";
        vjsHtml = vjsHtml + "</a>";
        vjsHtml = vjsHtml + "</li>";

        if (vprmPastaPai != "/") {
            vjsHtml = vjsHtml + "<li id='OpcaoAcoespasta'>";
            vjsHtml = vjsHtml + "<a id='acoespasta' href='#' rel='" + vprmPastaPai + "' title='Ações de Pasta'>";
            vjsHtml = vjsHtml + "<span>Ações de Pasta</span>";
            vjsHtml = vjsHtml + "</a>";
            vjsHtml = vjsHtml + "</li>";
        }
        vjsHtml = vjsHtml + " <li><input type='hidden' name='hidQtdSelect' id='hidQtdSelect' value='0' /></li>";
        // vjsHtml = vjsHtml + vprmPastaPai
        $("#menuhorizontal").empty().append(vjsHtml);
    }

    $(".folders_select_chkbox input:checkbox").live('click', function () {
       //  alert($(this).attr("checked"));
        if (!$(this).attr("checked")) {
            fnComplementaMenuHorizontal($(this).attr("value"), false);
        } else {
            fnComplementaMenuHorizontal($(this).attr("value"), true);
        }
    });
    function fnComplementaMenuHorizontal(vprmPasta, vprmChecked) {
        var vjsQtdSelect = parseInt($("#hidQtdSelect").val());
        var vjsHtml = "";

        $("#OpcaoGerenciar").remove();
        $("#OpcaoLimparSelecao").remove();

        if (vprmChecked) {
            vjsQtdSelect++;
            $("#hidQtdSelect").val(vjsQtdSelect);
            vjsPasta = vprmPasta;
        }
        else {
            vjsQtdSelect--;
            $("#hidQtdSelect").val(vjsQtdSelect);
            // alert($(".chkselectfolders:checked").val());
            vjsPasta = $(".chkselectfolders:checked").val();

        }
        // alert(vjsQtdSelect);

        if (vjsQtdSelect > 0) {
            $("#OpcaoAcoespasta").hide();
            if (vjsQtdSelect == 1) {

                vjsHtml = vjsHtml + "<li id='OpcaoAbrirPasta'>";
                vjsHtml = vjsHtml + "<a id='abrirpasta' href='#' rel='" + vjsPasta + "' title='Abrir'>";
                vjsHtml = vjsHtml + "<span>Abrir</span>";
                vjsHtml = vjsHtml + "</a>";
                vjsHtml = vjsHtml + "</li>";
            }
            else {

                $("#OpcaoAbrirPasta").remove();
            }
            vjsHtml = vjsHtml + "<li id='OpcaoGerenciar'>";
            vjsHtml = vjsHtml + "<a id='gerenciarpasta' href='#' rel='" + vjsPasta + "' title='Gerenciar'>";
            vjsHtml = vjsHtml + "<span>Gerenciar</span>";
            vjsHtml = vjsHtml + "</a>";
            vjsHtml = vjsHtml + "</li>";

            vjsHtml = vjsHtml + "<li id='OpcaoLimparSelecao'>";
            vjsHtml = vjsHtml + "<a id='limparselecao' href='#' title='Limpar Seleção'>";
            vjsHtml = vjsHtml + "<span>Limpar Seleção</span>";
            vjsHtml = vjsHtml + "</a>";
            vjsHtml = vjsHtml + "</li>";
        }
        else {
            $("#OpcaoAcoespasta").show();
            $("#OpcaoAbrirPasta").remove();
            $("#OpcaoGerenciar").remove();
            $("#OpcaoLimparSelecao").remove();

        }
        //   alert(vprmChecked);


        $("#menuhorizontal").append(vjsHtml);
    }

    /******* Menu Drop ******************/
    $("body").on('click', function () {
        var vjsmenuConta = $("#topusuario").find(".sub_menu_conta_active");
       // alert(vjsmenuConta.attr('class'));
        if (vjsmenuConta.attr('class') == "sub_menu_conta_active")
        {
            vjsmenuConta.removeClass("sub_menu_conta_active");
            $(this).find("ul.sub_menu_conta").stop(true, true).slideUp(300);
        }
    });
    $("#menuhorizontal_conta li span").parent().on('click', function (event) {
        if ($(this).attr('class') == "sub_menu_conta_active") {
            event.stopPropagation();
            $(this).removeClass("sub_menu_conta_active");
            $(this).parent().find("ul.sub_menu_conta").stop(true, true).slideUp(300);
       //     $(this).find('span').css({ background: 'url(Content/con_images/img_button/nav_btn.gif) no-repeat  center top' });
        }
        else {
            event.stopPropagation();
            $(this).addClass("sub_menu_conta_active");
            $(this).find("ul.sub_menu_conta").stop(true, true).slideDown(300).show();
          //  $(this).find('span').css({ background: 'url(Content/con_images/img_button/nav_btn.gif) no-repeat center -44px' });
        }
       
    });

    $("#limparselecao").live('click', function () {
        $(".chkselectfolders:checked").each(function () {
            $(this).attr("checked", false)
            $(this).closest('.folders').find('.folders_select').removeClass('folders_selected');
            $(this).parent().removeClass('folders_selected_chkbox');
            $(this).parent().css('display', 'none');
            $("#hidQtdSelect").val(1);
            fnComplementaMenuHorizontal('', false);
        });
    });
    $("#criarpasta").live('click', function () {
        // alert($(this).attr('rel'));
        var folder = $(this).attr('rel')
        $.ajax({
            type: 'POST',
            url: 'Upload/CriarFormPasta',
            contentType: 'application/x-www-form-urlencoded;',
            data: { 'pastapai': folder },
            cache: false,
            global: true,
            dataType: 'html',
            beforeSend: function () {
                $('#container_contents').empty().append("<div class='acc_container border_radius5'><img src='Content/pho_images/phoimg_carregando/loading_circular.gif' /><span class='text_carregando'>Carregando...</span></div>");
                NProgress.start();
                NProgress.done();
            },
            success: function (html) {
                
                $('#container_contents').empty().html(html);

            },
            error: function (xhr, errorMessage, thrownError) {
                $('#container_contents').empty().append("<div class='acc_container border_radius5'><ul id='erro_post'><li>Ocorreu um erro ao carregar as informações.</li><li>Erro: " + xhr.status + "</li><li>Descrição: " + xhr.statusText + "</li><li>Erro Response Text:" + xhr.responseText + "</li><li>Caso o problema persista, contate o administrador do sistema.</li></ul></div>");
            }
        });
    });

    $("#carregararquivos").live('click', function () {
        // alert($(this).attr('rel'));
        var folder = $(this).attr('rel')
        $.ajax({
            type: 'POST',
            url: 'Upload/FileUploadForm',
            contentType: 'application/x-www-form-urlencoded;',
            data: { 'pastapai': folder },
            cache: false,
            global: true,
            dataType: 'html',
            beforeSend: function () {
                $('#container_contents').empty().append("<div class='acc_container border_radius5'><img src='Content/pho_images/phoimg_carregando/loading_circular.gif' /><span class='text_carregando'>Carregando...</span></div>");
                NProgress.start();
                NProgress.done();
            },
            success: function (html) {
                $('#container_contents').empty().html(html);
                fnReinitializeUploadiFy();
            },
            error: function (xhr, errorMessage, thrownError) {
                $('#container_contents').empty().append("<div class='acc_container border_radius5'><ul id='erro_post'><li>Ocorreu um erro ao carregar as informações.</li><li>Erro: " + xhr.status + "</li><li>Descrição: " + xhr.statusText + "</li><li>Erro Response Text:" + xhr.responseText + "</li><li>Caso o problema persista, contate o administrador do sistema.</li></ul></div>");
            }
        });
    });

    $("#rootfolder").live('click', function () {
        //  alert($(this).attr('rel'));
        var folder = $(this).attr('rel')
        $.ajax({
            type: 'POST',
            url: 'Home/ListaArquivos',
            contentType: 'application/x-www-form-urlencoded;',
            data: { 'pasta': folder },
            cache: false,
            global: true,
            dataType: 'html',
            beforeSend: function () {
                $('#container_contents').empty().append("<div class='acc_container border_radius5'><img src='Content/pho_images/phoimg_carregando/loading_circular.gif' /> <span class='text_carregando'>Carregando...</span></div>");
                NProgress.start();
                NProgress.done();
            },
            success: function (html) {
                $('#container_contents').empty().html(html);
                fnCriaMenuHorizontal(folder);
                fnInitializeFileTree();
                fnReinitializePrettyPhoto();
                fnReinitializeCycle();
                fnReinitializeMenuSubFolders();
                fnReinitializeSelectFolders();


            },
            error: function (xhr, errorMessage, thrownError) {
                $('#container_contents').empty().append("<div class='acc_container border_radius5'><ul id='erro_post'><li>Ocorreu um erro ao carregar as informações.</li><li>Erro: " + xhr.status + "</li><li>Descrição: " + xhr.statusText + "</li><li>Erro Response Text:" + xhr.responseText + "</li><li>Caso o problema persista, contate o administrador do sistema.</li></ul></div>");
            }
        });
    });
    //------prettyPhoto--------------------------------------------------------

    function fnReinitializeCycle() {
     //   alert('Cycle');
        $('.folders_slide').cycle({
            fx: 'uncover',
            delay: -2000,
            before: function (curr, next, opts) {
                opts.animOut.opacity = 0;
            }
        })
    }
    function fnReinitializePrettyPhoto() {
     //   alert('Reinitialize');
        $("a[rel^='prettyPhoto']").prettyPhoto({
            animation_speed: 'fast', /* fast/slow/normal */
            slideshow: 5000, /* false OR interval time in ms */
            autoplay_slideshow: false, /* true/false */
            opacity: 0.80, /* Value between 0 and 1 */
            show_title: true, /* true/false */
            allow_resize: true, /* Resize the photos bigger than viewport. true/false */
            default_width: 500,
            default_height: 344,
            counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
            theme: 'white_shadow', /*pp_default / light_rounded / dark_rounded / light_square / dark_square / facebook / white_shadow*/
            horizontal_padding: 20, /* The padding on each side of the picture */
            hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
            wmode: 'opaque', /* Set the flash wmode attribute */
            autoplay: true, /* Automatically start videos: True/False */
            modal: false, /* If set to true, only the close button will close the window */
            deeplinking: false, /* Allow prettyPhoto to update the url to enable deeplinking. */
            overlay_gallery: true, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
            keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
            changepicturecallback: function () { }, /* Called everytime an item is shown/changed */
            callback: function () { }, /* Called when prettyPhoto is closed */
            ie6_fallback: true,
            social_tools: false/* html or false to disable */
        });

        //$(".gallery: a[rel^='prettyPhoto']").prettyPhoto({
        //    animation_speed: 'fast', /* fast/slow/normal */
        //    slideshow: 5000, /* false OR interval time in ms */
        //    autoplay_slideshow: false, /* true/false */
        //    opacity: 0.80, /* Value between 0 and 1 */
        //    show_title: true, /* true/false */
        //    allow_resize: true, /* Resize the photos bigger than viewport. true/false */
        //    default_width: 500,
        //    default_height: 344,
        //    counter_separator_label: '/', /* The separator for the gallery counter 1 "of" 2 */
        //    theme: 'white_shadow', /*pp_default / light_rounded / dark_rounded / light_square / dark_square / facebook / white_shadow*/
        //    horizontal_padding: 20, /* The padding on each side of the picture */
        //    hideflash: false, /* Hides all the flash object on a page, set to TRUE if flash appears over prettyPhoto */
        //    wmode: 'opaque', /* Set the flash wmode attribute */
        //    autoplay: true, /* Automatically start videos: True/False */
        //    modal: false, /* If set to true, only the close button will close the window */
        //    deeplinking: false, /* Allow prettyPhoto to update the url to enable deeplinking. */
        //    overlay_gallery: true, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
        //    keyboard_shortcuts: true, /* Set to false if you open forms inside prettyPhoto */
        //    changepicturecallback: function () { }, /* Called everytime an item is shown/changed */
        //    callback: function () { }, /* Called when prettyPhoto is closed */
        //    ie6_fallback: true,
        //    /*	markup: '<div class="pp_pic_holder"> \
        //    <div class="ppt">&nbsp;</div> \
        //    <div class="pp_top"> \
        //    <div class="pp_left"></div> \
        //    <div class="pp_middle"></div> \
        //    <div class="pp_right"></div> \
        //    </div> \
        //    <div class="pp_content_container"> \
        //    <div class="pp_left"> \
        //    <div class="pp_right"> \
        //    <div class="pp_content"> \
        //    <div class="pp_loaderIcon"></div> \
        //    <div class="pp_fade"> \
        //    <a href="#" class="pp_expand" title="Expand the image">Expand</a> \
        //    <div class="pp_hoverContainer"> \
        //    <a class="pp_next" href="#">next</a> \
        //    <a class="pp_previous" href="#">previous</a> \
        //    </div> \
        //    <div id="pp_full_res"></div> \
        //    <div class="pp_details"> \
        //    <div class="pp_nav"> \
        //    <a href="#" class="pp_arrow_previous">Previous</a> \
        //    <p class="currentTextHolder">0/0</p> \
        //    <a href="#" class="pp_arrow_next">Next</a> \
        //    </div> \
        //    <p class="pp_description"></p> \
        //    {pp_social} \
        //    <a class="pp_close" href="#">Close</a> \
        //    </div> \
        //    </div> \
        //    </div> \
        //    </div> \
        //    </div> \
        //    </div> \
        //    <div class="pp_bottom"> \
        //    <div class="pp_left"></div> \
        //    <div class="pp_middle"></div> \
        //    <div class="pp_right"></div> \
        //    </div> \
        //    </div> \
        //    <div class="pp_overlay"></div>',
        //    gallery_markup: '<div class="pp_gallery"> \
        //    <a href="#" class="pp_arrow_previous">Previous</a> \
        //    <div> \
        //    <ul> \
        //    {gallery} \
        //    </ul> \
        //    </div> \
        //    <a href="#" class="pp_arrow_next">Next</a> \
        //    </div>',
        //    image_markup: '<img id="fullResImage" src="{path}" />',
        //    flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
        //    quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
        //    iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
        //    inline_markup: '<div class="pp_inline">{content}</div>',
        //    custom_markup: '',
        //    */
        //    social_tools: false/* html or false to disable */
        //});
    }
  //  fnReinitializePrettyPhoto();

    $(function () {
        $(".resized").aeImageResize({ height: 80, width: 80 });
    });



    $("#formSerialize").live('click', function () {
     //    alert($(this).closest('form').attr('id'));
        var formpasta = $(this).closest('form').find('#txtpasta').val();
        var formcaminho = $(this).closest('form').find('#hidcaminho').val();

        //alert(formcaminho + formpasta);
        // alert(formpasta.replace(/\ /g, '_'));
        $.ajax({
            type: 'POST',
            url: 'Upload/CriarPasta',
            contentType: 'application/x-www-form-urlencoded;',
            data: { 'txtpasta': formpasta, 'hidcaminho': formcaminho },
            cache: false,
            global: true,
            dataType: 'html',
            beforeSend: function () {
                $('#container_contents').empty().append("<div class='acc_container border_radius5'><img src='Content/pho_images/phoimg_carregando/loading_circular.gif' /><span class='text_carregando'>Carregando...</span></div>");
                NProgress.start();
                NProgress.done();
            },
            success: function (html) {
                $('#container_contents').empty().html(html);
                var vjsPastaPaiUrl = formcaminho;
                var vjsPastaNova = formpasta.replace(/\ /g, '_');
                var vjsObjetoPaiPastaNova;
                var vjsQtdBusca = 0;
                //  alert(vjsPastaPaiUrl);
                $('.jqueryFileTree').find('.directory').find('a').each(function () {
                    //  alert($(this).attr('url'));
                    if ($(this).attr('url') == vjsPastaPaiUrl) {
                        //  alert($(this).parent().prop('tagName'));
                        showMyTree($(this).parent(), vjsPastaPaiUrl);
                        vjsObjetoPaiPastaNova = $(this).parent()
                        vjsQtdBusca = 1;
                        return false;
                    }
                });
                // alert(vjsQtdBusca);
                if (vjsQtdBusca <= 0) {
                    fnInitializeFileTree();

                }

                //--Abre a pasta criada e a pasta no menu ------------------------------
                //                $.ajax({
                //                    type: 'POST',
                //                    url: 'Home/ListaArquivos',
                //                    contentType: 'application/x-www-form-urlencoded;',
                //                    data: { 'pasta': vjsPastaPaiUrl + vjsPastaNova + "/" },
                //                    cache: false,
                //                    global: true,
                //                    dataType: 'html',
                //                    beforeSend: function () {
                //                        $('#container_contents').empty().append("<div class='acc_container border_radius5'><img src='Content/pho_images/phoimg_carregando/loading_circular.gif' /><span class='text_carregando'>Carregando...</span></div>");
                //                    },
                //                    success: function (html) {
                //                        $('#container_contents').empty().html(html);
                //                        fnReinitializePrettyPhoto();
                //                        $('.acc_trigger a').append("<span style='color:#999;width: 250px; border:none #000 1px;'>  Pasta criada com sucesso!</span>");
                //                        vjsObjetoPaiPastaNova.find('.jqueryFileTree').find('.directory').find('a').each(function () {

                //                            if ($(this).attr('url') == vjsPastaPaiUrl + vjsPastaNova + "/") {
                //                                fnCriaMenuHorizontal(vjsPastaPaiUrl + vjsPastaNova + "/")
                //                                showMyTree($(this).parent(), vjsPastaPaiUrl + vjsPastaNova + "/");
                //                            }

                //                        });


                //                    },
                //                    error: function (xhr, errorMessage, thrownError) {
                //                        $('#container_contents').empty().append("<div class='acc_container border_radius5'><ul id='erro_post'><li>Ocorreu um erro ao carregar as informações.</li><li>Erro: " + xhr.status + "</li><li>Descrição: " + xhr.statusText + "</li><li>Erro Response Text:" + xhr.responseText + "</li><li>Caso o problema persista, contate o administrador do sistema.</li></ul></div>");
                //                    }
                //                });

                //--Abre o conteudo com a pasta fechada ------------------------------
                $.ajax({
                    type: 'POST',
                    url: 'Home/ListaArquivos',
                    contentType: 'application/x-www-form-urlencoded;',
                    data: { 'pasta': vjsPastaPaiUrl },
                    cache: false,
                    global: true,
                    dataType: 'html',
                    beforeSend: function () {
                        $('#container_contents').empty().append("<div class='acc_container border_radius5'><img src='Content/pho_images/phoimg_carregando/loading_circular.gif' /><span class='text_carregando'>Carregando...</span></div>");
                    },
                    success: function (html) {
                        $('#container_contents').empty().html(html);
                        fnReinitializePrettyPhoto();
                        fnReinitializeCycle();
                        fnReinitializeMenuSubFolders();
                        fnReinitializeSelectFolders();
                        $('.acc_trigger a').append("<span style='color:#999;width: 250px; border:none #000 1px;'>  Pasta " + formpasta + " criada com sucesso!</span>");
                    },
                    error: function (xhr, errorMessage, thrownError) {
                        $('#container_contents').empty().append("<div class='acc_container border_radius5'><ul id='erro_post'><li>Ocorreu um erro ao carregar as informações.</li><li>Erro: " + xhr.status + "</li><li>Descrição: " + xhr.statusText + "</li><li>Erro Response Text:" + xhr.responseText + "</li><li>Caso o problema persista, contate o administrador do sistema.</li></ul></div>");
                    }
                });
                //****************************************


            },
            error: function (xhr, errorMessage, thrownError) {
                $('#container_contents').empty().append("<div class='acc_container border_radius5'><ul id='erro_post'><li>Ocorreu um erro ao carregar as informações.</li><li>Erro: " + xhr.status + "</li><li>Descrição: " + xhr.statusText + "</li><li>Erro Response Text:" + xhr.responseText + "</li><li>Caso o problema persista, contate o administrador do sistema.</li></ul></div>");
            }
        });
    });
    //---------------------------
    function fnReinitializeUploadiFy() {
        // alert('Reinitialize UploadiFy');
        $('#file_upload').uploadify({
            debug: false,
            'fileObjName': 'file_upload',
            'method': 'POST',
            /*'checkScript': '/Upload/CheckExistFileUpload',*/
            'swf': '/Content/uploadify.swf',
            'uploader': '/Upload/FileUpload',
            /* 'swf': '/Content/uploadify.swf',
             'uploader': '/Upload/FileUpload',*/
            'cancelImg': '/Content/pho_images/phoimg_botoes/uploadify-cancel.png',
            'buttonText': "<img src='Content/pho_images/phoimg_botoes/imgbtn_selecionararquivo_branco.png' />Selecione os Arquivos",
            'fileDesc': 'Arquivos de Imagem',
            'width': 370,
            'fileExt': '*.jpg;*.gif;*.png;*.mp4',
            'sizeLimit': '4000000',
            'removeCompleted': false,
            'formData': { 'hidcaminho': $("#hidcaminho").val() },
            'scriptData': { 'hidcaminho': $("#hidcaminho").val() },
            /*  'onCheck': function(file, exists) {
            if (exists) {
            alert('upload failed because the file is a duplicate');
            }
            },
            'onInit': function () {
            alert('O Caminho é: ' + $("#hidcaminho").val());
            
            'onComplete': function (event, queueID, fileObj, response, data) {
            if (data == true) {
            alert('ok!');
            }
            else {
            alert('Error: ' + data);
            } 

            
            },
            },*/
            'onUploadSuccess': function (file, data, response) {

                $('#' + file.id).find('.data').html(' - Completo.');
                $('#' + file.id).find('.cancel').remove();
                setTimeout(function () {
                    $('#' + file.id).fadeOut(500, function () {
                        $(this).remove();
                    });
                }, 3 * 1000);
            },
            'onSelect': function (file) {
                $('.uploadify-button-text').html('Aguarde...')
                $('#file_upload').uploadify('disable', true);
                $("#menuhorizontal").hide();
                $("#menuhorizontal_conta").hide();
                $("#msgaguarde").show();
                $(".aguarde_overlay").show().fadeTo('fast', 0.50);
                $("#linkHome").attr({ 'href': '#', 'title': 'Aguarde.' });
            },
            //'onDialogClose': function (queueData) {
            //    alert(queueData.uploadQueue);
            //    alert(queueData.filesQueued + ' files were queued of ' + queueData.filesSelected + ' selected files. There are ' + queueData.queueLength + ' total files in the queue.');
            //},

            'onCancel': function () {
                alert('The file ' + file.name + ' was cancelled!');
            },
            'onSelectError': function (file, errorCode, errorMsg) {
                alert('The file ' + file.name + ' returned an error: ' + errorMsg);
            },
            'onUploadError': function (file, errorCode, errorMsg, errorString) {
                var MyErrorString = "";
                $('#' + file.id).find('.cancel').remove();
                switch (errorMsg) {
                    case '8001':
                        //  alert("O arquivo" + file.name + " já existe na pasta selecionada.");
                        MyErrorString = "O arquivo \"" + file.name + "\" já existe na pasta selecionada.";
                        break;
                    case '8002':
                        //  alert("O Conteudo do Arquivo " + file.name + " está vazio.");
                        MyErrorString = "O Conteudo do Arquivo \"" + file.name + "\" está vazio.";
                        break;
                    case '8003':
                        //  alert("O arquivo" + file.name + " é nullo.");
                        MyErrorString = "O arquivo \"" + file.name + "\" é nullo.";
                        break;
                    case '8004':
                        //   alert("Extenção não permitida.");
                        MyErrorString = "Tipo de arquivo não permitido.";
                        break;
                    default:
                        MyErrorString = errorMsg + " Erro não identificado.";
                        break;

                }
                $('#' + file.id).find('.data').html(' - ' + MyErrorString);

            },
            'onDialogOpen': function () {
                $("#topbarra_menu").append("<ul id='msgaguarde' style='display:none;'><li><img src='Content/pho_images/phoimg_botoes/imgbtn_cloudwait_load.gif' /><span>Carregando Arquivos. Aguarde...</span></li><ul>");
                $("#sidebar_left").append("<div class='aguarde_overlay border_radius5'><span></span></div>");

                $(".aguarde_overlay").height($("#sidebar_left").height() + 10).css({ opacity: 0.5 });


                //  alert($("#sidebar_left").height() + " x " + $("#sidebar_left").width());

                $('.uploadify-queue-item').each(function () {
                    $(this).fadeOut(500, function () {
                        $(this).remove();
                    });

                });


                //  alert('open');
            },
            'onDialogClose': function (queueData) {
                //  alert(queueData.uploadsErrored);

                //  alert(queueData.filesQueued + ' files were queued of ' + queueData.filesSelected + ' selected files. There are ' + queueData.queueLength + ' total files in the queue.');
            },
            'onQueueComplete': function (queueData) {

                var vjsPastaUrl = $("#hidcaminho").val();
                var vjsQtdBusca = 0;
                //   alert(queueData.uploadsSuccessful);
                //   alert(queueData.uploadsErrored);
                if (queueData.uploadsSuccessful > 0) {
                    $('.jqueryFileTree').find('.expanded').find('a').each(function () {
                        //  alert($(this).attr('url') + "  =  " + vjsPastaUrl);
                        if ($(this).attr('url') == vjsPastaUrl) {
                            //  alert('showMyTree ' + vjsPastaUrl);
                            showMyTree($(this).parent(), vjsPastaUrl);
                            vjsQtdBusca = 1;
                            return false;
                        }

                    }); //****** $('.jqueryFileTree')*/
                    if (queueData.uploadsErrored <= 0) {
                        if (vjsQtdBusca <= 0) {
                            fnInitializeFileTree();
                            fnInicioConteudo();
                        }
                        else {
                            //   alert('post Lista '+vjsPastaUrl);
                            $.ajax({
                                type: 'POST',
                                url: 'Home/ListaArquivos',
                                contentType: 'application/x-www-form-urlencoded;',
                                data: { 'pasta': vjsPastaUrl },
                                cache: false,
                                global: true,
                                dataType: 'html',
                                beforeSend: function () {
                                    $('#container_contents').empty().append("<div class='acc_container border_radius5'><img src='Content/pho_images/phoimg_carregando/loading_circular.gif' /><span class='text_carregando'>Carregando...</span></div>");
                                    NProgress.start();
                                    NProgress.done();
                                },
                                success: function (html) {
                                    $('#container_contents').empty().html(html);
                                    fnReinitializePrettyPhoto();
                                    fnReinitializeCycle();
                                    fnReinitializeMenuSubFolders();
                                    fnReinitializeSelectFolders();

                                },
                                error: function (xhr, errorMessage, thrownError) {
                                    $('#container_contents').empty().append("<div class='acc_container border_radius5'><ul id='erro_post'><li>Ocorreu um erro ao carregar as informações.</li><li>Erro: " + xhr.status + "</li><li>Descrição: " + xhr.statusText + "</li><li>Erro Response Text:" + xhr.responseText + "</li><li>Caso o problema persista, contate o administrador do sistema.</li></ul></div>");
                                }
                            }); //************$.ajax*/
                        }
                    } //queueData.uploadsErrored > 0

                }
                $('#file_upload').uploadify('disable', false);
                $('.uploadify-button-text').html('Selecione os Arquivos');
                $("#menuhorizontal").show();
                $("#menuhorizontal_conta").show();
                $("#msgaguarde").remove();
                $(".aguarde_overlay").remove();
                $("#linkHome").attr({ 'href': 'Home', 'title': 'Início.' });
                fnReinitializeUploadiFy();
            },

            'onError': function (a, b, c, d) {
                $('#file_upload').uploadify('disable', false);
                $('.uploadify-button-text').html('Selecione os Arquivos');
                $("#menuhorizontal").show();
                $("#menuhorizontal_conta").show();
                $("#msgaguarde").remove();
                $(".aguarde_overlay").remove();
                $("#linkHome").attr({ 'href': 'Home', 'title': 'Início.' });
                fnReinitializeUploadiFy();

                if (d.status == 404)
                    alert("Could not find upload script. Use a path relative to: " + "<?= getcwd() ?>");
                else if (d.type === "HTTP")
                    alert("error " + d.type + ": " + d.status);
                else if (d.type === "File Size")
                    alert(c.name + " " + d.type + " Limit: " + Math.round(d.info / (1024 * 1024)) + "MB");
                else
                    alert("error " + d.type + ": " + d.text);
            },

            auto: true
        });

    }
    //---------------------------
    /******* Menu Drop ******************/
    function fnReinitializeMenuSubFolders() {
        ////   alert($(".folder_titulo li span").parent().prop("tagName"));

        //$(".folder_titulo li span").parent().hover(function () {
        //    //      alert('ent');

        //    $(this).find("ul.children").stop(true, true).slideDown(300).show();
        //    $(this).find("ul.children").css('z-index', '999');

        //    //   alert($(this).find("ul.children").css('z-index'));
        //    //     $(this).find('span').css({ background: 'url(Content/con_images/img_button/nav_btn.gif) no-repeat center -44px' });
        //}, function () {
        //    //     alert('sai');
        //    $(this).parent().find("ul.children").stop(true, true).slideUp(300);
        //    //    $(this).find('span').css({ background: 'url(Content/con_images/img_button/nav_btn.gif) no-repeat  center top' });
        //});
    }
    /*********************************/

    /******* folders_select_chkbox ******************/
    function fnReinitializeSelectFolders() {
     //   alert("fnReinitializeSelectFolders");
        $(".folders_select_chkbox input").live('click', function () {
      //      alert($(this).attr('checked'));
            if ($(this).attr('checked')) {
                $(this).closest('.folders').find('.folders_select').addClass('folders_selected');
                $(this).parent().addClass('folders_selected_chkbox');
            }
            else {
                $(this).closest('.folders').find('.folders_select').removeClass('folders_selected');
                $(this).parent().removeClass('folders_selected_chkbox');
            }
        });
    }
    /*********************************/

    
});