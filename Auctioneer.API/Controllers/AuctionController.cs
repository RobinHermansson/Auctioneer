using Auctioneer.Application.DTOs;
using Auctioneer.Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Auctioneer.API.Controllers;

[Authorize]
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

    [HttpGet("{userId}")]
    public async Task<ActionResult<IEnumerable<AuctionDto?>>> GetAllAuctionsForUser(UserDto user)
    {
        var auctions = await _service.GetAllAuctionsForUserAsync(user);
        if (auctions == null || !auctions.Any())
        {
            return NotFound();
        }
        return Ok(auctions);
    }
}
