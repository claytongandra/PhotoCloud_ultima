
USE photocloud
GO

--drop TABLE pho_usuarios
CREATE TABLE dbo.pho_usuarios (
       usu_id				INT IDENTITY,
       usu_nome				VARCHAR(100) NOT NULL,
       usu_sobrenome		VARCHAR(100) NOT NULL,
       usu_datanascimento	DATETIME NOT NULL,
       usu_nivel			INT NOT NULL,
       usu_diretoriobase	VARCHAR(100) NOT NULL,
       usu_status			CHAR(1)NOT NULL,
	   usu_datacadastro		DATETIME NOT NULL
       CONSTRAINT XPKpho_usuarios
              PRIMARY KEY (usu_id)
)
GO

USE photocloud
GO
GRANT execute,select,insert,update,delete TO pho_operador


--drop TABLE pho_usuario_acesso
USE photocloud
GO
CREATE TABLE dbo.pho_usuario_acesso (
       usa_id				INT IDENTITY,
       usa_fk_usuario		INT NOT NULL,
       usa_login			VARCHAR(100) NOT NULL,
       usa_senha			VARCHAR(100) NOT NULL,
       usa_email			VARCHAR(100) NOT NULL,
       usa_dataexpiracao	DATETIME NOT NULL
       CONSTRAINT XPKpho_usuario_acesso
              PRIMARY KEY (usa_id)
)
GO

ALTER TABLE pho_usuario_acesso
       ADD CONSTRAINT usu_usa_id
              FOREIGN KEY (usa_fk_usuario)
                             REFERENCES pho_usuarios
GO





select * from photocloud.dbo.pho_usuarios
																																			 		
INSERT INTO pho_usuarios (usu_nome,usu_sobrenome,usu_datanascimento,usu_status,usu_nivel,usu_diretoriobase,usu_datacadastro)VALUES('Administrador','PhotoCloud','','A',1,'EE3D6C0FB00CA585DA8E9CE1FAE38F3E',GETDATE())
INSERT INTO pho_usuario_acesso (usa_fk_usuario,usa_login,usa_senha,usa_email,usa_dataexpiracao)VALUES(1,'photocloud','21232F297A57A5A743894A0E4A801FC3','photocloud.sistema@photocloud.com.br',GETDATE())


INSERT INTO pho_usuarios (usu_nome,usu_sobrenome,usu_datanascimento,usu_status,usu_nivel,usu_diretoriobase,usu_datacadastro)VALUES('Clayton','Gandra','1982-06-03 00:00:00.000','A',1,'D95842FA930EF4CA22CCF910FEF4FE54',GETDATE())
INSERT INTO pho_usuario_acesso (usa_fk_usuario,usa_login,usa_senha,usa_email,usa_dataexpiracao)VALUES(2,'claytongandra','E10ADC3949BA59ABBE56E057F20F883E','clayton.gandra@photocloud.com.br',GETDATE())



SELECT * FROM photocloud.dbo.pho_usuarios AS a 
INNER JOIN photocloud.dbo.pho_usuario_acesso AS b ON a.usu_id = b.usa_fk_usuario

UPDATE pho_usuarios SET usu_nome = 'Administrador', usu_sobrenome = 'PhotoCloud' Where usu_id = 1
UPDATE pho_usuarios SET usu_diretoriobase = 'EE3D6C0FB00CA585DA8E9CE1FAE38F3E' Where usu_id = 1
UPDATE pho_usuarios SET usu_diretoriobase = 'D95842FA930EF4CA22CCF910FEF4FE54' Where usu_id = 2