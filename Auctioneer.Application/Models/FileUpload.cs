
namespace Auctioneer.Application.Models;

public class FileUpload
{
    public byte[] Content { get; set; }
    public string FileName { get; set; }
    public string ContentType { get; set; }
}