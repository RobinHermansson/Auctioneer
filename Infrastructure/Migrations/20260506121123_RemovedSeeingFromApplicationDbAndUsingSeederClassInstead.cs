using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RemovedSeeingFromApplicationDbAndUsingSeederClassInstead : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumn: "UserRoleId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumn: "UserRoleId",
                keyValue: 2);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "UserRoleId", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "Administrator role, able to do anything. Possibly fly.", "Admin" },
                    { 2, "Your bogstandard User role. Can do just about anything, but not as much as its better part admin.", "User" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Email", "FirstName", "LastName", "Password", "UserRoleId" },
                values: new object[,]
                {
                    { 1, "robin.hermansson@iths.se", "Robin", "Hermansson", "", 1 },
                    { 2, "mikaeltobiasson@hotmail.com", "Mikael", "Tobiasson", "", 2 }
                });
        }
    }
}
