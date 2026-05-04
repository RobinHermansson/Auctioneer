using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangedFromIntToStringNameAndFixedAuctionAndAuctionItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Auctions_AuctionItemId",
                table: "Auctions");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Auctions",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Auctions_AuctionItemId",
                table: "Auctions",
                column: "AuctionItemId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Auctions_AuctionItemId",
                table: "Auctions");

            migrationBuilder.AlterColumn<int>(
                name: "Name",
                table: "Auctions",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Auctions_AuctionItemId",
                table: "Auctions",
                column: "AuctionItemId");
        }
    }
}
