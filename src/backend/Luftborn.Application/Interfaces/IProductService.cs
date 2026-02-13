using Luftborn.Application.DTOs;

namespace Luftborn.Application.Interfaces;

public interface IProductService
{
    Task<PagedResult<ProductDto>> GetAllAsync(int pageNumber, int pageSize);
    Task<ProductDto?> GetByIdAsync(int id);
    Task<ProductDto> CreateAsync(CreateProductDto createDto);
    Task<ProductDto> UpdateAsync(int id, UpdateProductDto updateDto);
    Task DeleteAsync(int id);
    Task<IEnumerable<ProductDto>> SearchAsync(string searchTerm);
}
