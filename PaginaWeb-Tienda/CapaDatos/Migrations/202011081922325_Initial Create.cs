namespace CapaDatos.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Categoria",
                c => new
                    {
                        Id_Categoria = c.Int(nullable: false, identity: true),
                        Nombre = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.Id_Categoria);
            
            CreateTable(
                "dbo.Consulta",
                c => new
                    {
                        Id_Consulta = c.Int(nullable: false, identity: true),
                        Nombre = c.String(nullable: false, maxLength: 50),
                        Correo = c.String(nullable: false, maxLength: 50),
                        Asunto = c.String(nullable: false, maxLength: 50),
                        Mensaje = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.Id_Consulta);
            
            CreateTable(
                "dbo.Producto",
                c => new
                    {
                        Id_Producto = c.Int(nullable: false, identity: true),
                        Nombre = c.String(nullable: false, maxLength: 50),
                        Precio = c.Single(nullable: false),
                        Url_Imagen = c.String(nullable: false, maxLength: 100),
                        EsOferta = c.Boolean(nullable: false),
                        EsDestacado = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id_Producto);
            
            CreateTable(
                "dbo.SubCategoria",
                c => new
                    {
                        Id_SubCategoria = c.Int(nullable: false, identity: true),
                        Fk_Id_Categoria = c.Int(nullable: false),
                        Nombre = c.String(nullable: false, maxLength: 50),
                    })
                .PrimaryKey(t => t.Id_SubCategoria)
                .ForeignKey("dbo.Categoria", t => t.Fk_Id_Categoria, cascadeDelete: false)
                .Index(t => t.Fk_Id_Categoria);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.SubCategoria", "Fk_Id_Categoria", "dbo.Categoria");
            DropIndex("dbo.SubCategoria", new[] { "Fk_Id_Categoria" });
            DropTable("dbo.SubCategoria");
            DropTable("dbo.Producto");
            DropTable("dbo.Consulta");
            DropTable("dbo.Categoria");
        }
    }
}
