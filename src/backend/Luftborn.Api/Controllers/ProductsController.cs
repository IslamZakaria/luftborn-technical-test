using Luftborn.Application.DTOs;
using Luftborn.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Luftborn.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(IProductService productService, ILogger<ProductsController> logger)
    {
        _productService = productService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResult<ProductDto>>> GetProducts(
        [FromQuery] int pageNumber = 1, 
        [FromQuery] int pageSize = 10)
    {
        _logger.LogInformation("Fetching products - Page: {PageNumber}, Size: {PageSize}", pageNumber, pageSize);
        
        var result = await _productService.GetAllAsync(pageNumber, pageSize);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetProduct(int id)
    {
        _logger.LogInformation("Fetching product with ID: {ProductId}", id);
        
        var product = await _productService.GetByIdAsync(id);
        
        if (product == null)
        {
            _logger.LogWarning("Product not found with ID: {ProductId}", id);
            return NotFound(new { message = $"Product with ID {id} not found" });
        }

        return Ok(product);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] CreateProductDto createDto)
    {
        _logger.LogInformation("Creating new product: {ProductName}", createDto.Name);
        
        var product = await _productService.CreateAsync(createDto);
        
        _logger.LogInformation("Product created successfully with ID: {ProductId}", product.Id);
        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<ProductDto>> UpdateProduct(int id, [FromBody] UpdateProductDto updateDto)
    {
        _logger.LogInformation("Updating product with ID: {ProductId}", id);
        
        try
        {
            var product = await _productService.UpdateAsync(id, updateDto);
            _logger.LogInformation("Product updated successfully: {ProductId}", id);
            return Ok(product);
        }
        catch (KeyNotFoundException ex)
        {
            _logger.LogWarning(ex, "Product not found for update: {ProductId}", id);
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        _logger.LogInformation("Deleting product with ID: {ProductId}", id);
        
        await _productService.DeleteAsync(id);
        
        _logger.LogInformation("Product deleted successfully: {ProductId}", id);
        return NoContent();
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<ProductDto>>> SearchProducts([FromQuery] string q)
    {
        _logger.LogInformation("Searching products with term: {SearchTerm}", q);
        
        var results = await _productService.SearchAsync(q);
        return Ok(results);
    }
}
