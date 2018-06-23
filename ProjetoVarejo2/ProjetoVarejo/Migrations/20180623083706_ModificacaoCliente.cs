using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ProjetoVarejo.Migrations
{
    public partial class ModificacaoCliente : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Bairro",
                table: "Cliente",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Cidade",
                table: "Cliente",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Uf",
                table: "Cliente",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Bairro",
                table: "Cliente");

            migrationBuilder.DropColumn(
                name: "Cidade",
                table: "Cliente");

            migrationBuilder.DropColumn(
                name: "Uf",
                table: "Cliente");
        }
    }
}
