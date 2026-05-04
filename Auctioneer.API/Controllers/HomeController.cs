using Microsoft.AspNetCore.Mvc;

namespace Auctioneer.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class HomeController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<string>> GetHomepageData()
    {
        return Ok("hello");
    }
}
