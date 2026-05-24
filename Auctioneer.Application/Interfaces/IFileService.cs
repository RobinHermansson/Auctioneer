using Auctioneer.Application.Models;

namespace Auctioneer.Application.Interfaces;

public interface IFileService
{
    Task<string> SaveFileAsync(FileUpload file, string folder);
    void DeleteFile(string filePath);
}