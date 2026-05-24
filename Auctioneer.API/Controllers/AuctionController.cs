using Auctioneer.Application.DTOs;
using Auctioneer.Application.Models;
using Auctioneer.Application.Services;
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
        var auctions = await _service.GetAllAuctionsForUserAsync(userId);
        if (auctions == null || !auctions.Any())
        {
            return NotFound();
        }
        return Ok(auctions);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AuctionDto?>> GetAuctionById(int id)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }

        var auction = await _service.GetAuctionByIdAsync(id);
        if (auction == null)
        {
            return NotFound();
        }
        return Ok(auction);
    }

    [HttpGet("highest/{id}")]
    public async Task<ActionResult<decimal?>> GetHighestBidForAuctionById(int id) 
    { 
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }
        try
        {
            var response = await _service.GetHighestBidByAuctionId(id);
            return response;
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("bid")]
    public async Task<ActionResult<BidChangeResponseDto>> AddBid(AddBidDto bidDto)
    {
        
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }
        try
        {
            Console.WriteLine(bidDto.Amount);
            var  response = await _service.AddBidAsync(bidDto);
            if (response.Success)
            {
                return Ok(response);
            }
            return NotFound(response);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [HttpPost("create")]
    public async Task<ActionResult<AuctionDto>> CreateAuction([FromForm] CreateAuctionDto dto, IFormFile? image)
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdClaim, out var userId))
            return Unauthorized();

        try
        {
             FileUpload fileUpload = null;

            if (image != null)
            {
                using var ms = new MemoryStream();
                await image.CopyToAsync(ms);
                fileUpload = new FileUpload
                {
                    Content = ms.ToArray(),
                    FileName = image.FileName,
                    ContentType = image.ContentType
                };
            }
            Console.WriteLine(dto);
            var result = await _service.CreateAuctionAsync(dto, fileUpload, userId);
            return CreatedAtAction(nameof(GetAuctionById), new { id = result.AuctionId }, result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
