using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddOwnerIdFKtoAuction : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Auctions_Users_OwnerUserId",
                table: "Auctions");

            migrationBuilder.RenameColumn(
                name: "OwnerUserId",
                table: "Auctions",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Auctions_OwnerUserId",
                table: "Auctions",
                newName: "IX_Auctions_OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Auctions_Users_OwnerId",
                table: "Auctions",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Auctions_Users_OwnerId",
                table: "Auctions");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Auctions",
                newName: "OwnerUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Auctions_OwnerId",
                table: "Auctions",
                newName: "IX_Auctions_OwnerUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Auctions_Users_OwnerUserId",
                table: "Auctions",
                column: "OwnerUserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
