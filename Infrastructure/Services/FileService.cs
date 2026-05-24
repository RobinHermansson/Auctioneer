using Auctioneer.Application.Interfaces;
using Auctioneer.Application.Models;
namespace Auctioneer.Infrastructure.Services;

public class FileService : IFileService
{
    private readonly string _webRootPath;

    public FileService(string env)
    {
        _webRootPath = env;
    }

    public async Task<string> SaveFileAsync(FileUpload file, string folder)
    {
        var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        var folderPath = Path.Combine(_webRootPath, "images", folder);
        Directory.CreateDirectory(folderPath);
        var fullPath = Path.Combine(folderPath, fileName);
        await File.WriteAllBytesAsync(fullPath, file.Content);
        return $"/images/{folder}/{fileName}"; 
    }

    public async void DeleteFile(string filePath)
    {
        var fullPath = Path.Combine(_webRootPath, filePath);
        try
        {
            File.Delete(fullPath);
        }
        catch (Exception ex) {
            Console.WriteLine($"Could not delete file due to: {ex.Message}");
        }
        
        

    }
}