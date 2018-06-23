using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ProjetoVarejo.Migrations
{
    public partial class ModificacaoVendedor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Bairro",
                table: "Vendedor",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Cidade",
                table: "Vendedor",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Uf",
                table: "Vendedor",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Bairro",
                table: "Vendedor");

            migrationBuilder.DropColumn(
                name: "Cidade",
                table: "Vendedor");

            migrationBuilder.DropColumn(
                name: "Uf",
                table: "Vendedor");
        }
    }
}
