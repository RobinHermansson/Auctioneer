using Auctioneer.API.Extensions;
using Auctioneer.Application.DTOs;
using Auctioneer.Application.Models;
using Auctioneer.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

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

    [Authorize]
    [HttpGet("my")]
    public async Task<ActionResult<IEnumerable<AuctionDto?>>> GetMyAuctions()
    {
        var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }
        var auctions = await _service.GetAllAuctionsForUserAsync(userId);
        return Ok(auctions);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AuctionDto?>> GetAuctionById(int id)
    {
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

    [Authorize]
    [HttpPost("bid")]
    public async Task<ActionResult<GenericResponseDto>> AddBid(AddBidDto bidDto)
    {
        
        var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        if (!int.TryParse(userIdClaim, out var userId))
        {
            return Unauthorized();
        }
        try
        {
            var  response = await _service.AddBidAsync(bidDto, userId);
            return response.Success ? Ok(response) : BadRequest(response);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [Authorize]
    [HttpPost("create")]
    public async Task<ActionResult<AuctionDto>> CreateAuction([FromForm] CreateAuctionDto dto, IFormFile? image)
    {
        var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
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
            var result = await _service.CreateAuctionAsync(dto, fileUpload, userId);
            return CreatedAtAction(nameof(GetAuctionById), new { id = result.AuctionId }, result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult<GenericResponseDto>> DeleteAuction(int id) 
    {

        var userClaimId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
        if (!int.TryParse(userClaimId, out var userId))
            return Unauthorized();
        
        var response = await _service.DeleteAuctionAsync(id, userId);
        return response.Success ? Ok(response) : BadRequest(response);
    }
    [HttpGet("bids/{id}")]
    public async Task<ActionResult<IEnumerable<BidFlatDto?>>> GetAllBidsForAuctionByAuctionId(int id) {

        var bids = await _service.GetAllBidsForAuctionIdAsync(id);
        return Ok(bids);

    }
    [Authorize]
    [HttpDelete("retract/{bidId}")]
    public async Task<ActionResult<GenericResponseDto>> RetractBid(int bidId)
    {
        if (User.GetUserId() is not int userId) return Unauthorized();
        
        var response = await _service.RetractBidAsync(bidId, userId);
        return response.Success ? Ok(response) : BadRequest(response);
    }
    [Authorize(Roles = "Admin")]
    [HttpPatch("admin/deactivate/{id}")]
    public async Task<ActionResult<GenericResponseDto>> DeactivateAuction(int id) 
    {
        

        var result = await _service.DeactivateAuctionByIdAsync(id);
        return result.Success ? Ok(result) : BadRequest(result);


        
    }
}
