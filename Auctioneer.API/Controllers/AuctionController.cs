using Auctioneer.Application.DTOs;
using Auctioneer.Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Auctioneer.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuctionController : ControllerBase
{

    private readonly AuctionService _service;

    public AuctionController(AuctionService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AuctionDto>>> GetAllAuctions()
    {
        return Ok(await _service.GetAllAuctionsAsync());
    }
}
