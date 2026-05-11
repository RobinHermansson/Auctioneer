using Auctioneer.Application.DTOs;
using Auctioneer.Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

    [HttpGet("my")]
    public async Task<ActionResult<IEnumerable<AuctionDto?>>> GetMyAuctions()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }
        Console.WriteLine($"User id is: {userId}");
        var auctions = await _service.GetAllAuctionsForUserAsync(userId);
        if (auctions == null || !auctions.Any())
        {
            return NotFound();
        }
        return Ok(auctions);
    }
}
