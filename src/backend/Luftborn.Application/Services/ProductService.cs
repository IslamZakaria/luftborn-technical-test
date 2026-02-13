using Luftborn.Application.DTOs;
using Luftborn.Application.Interfaces;
using Luftborn.Application.Mapping;
using Luftborn.Domain.Entities;
using Luftborn.Domain.Interfaces;

namespace Luftborn.Application.Services;

public class ProductService : IProductService
{
    private readonly IUnitOfWork _unitOfWork;

    public ProductService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<PagedResult<ProductDto>> GetAllAsync(int pageNumber, int pageSize)
    {
        var repository = _unitOfWork.Repository<Product>();
        
        var allProducts = await repository.GetAllAsync();
        var activeProducts = allProducts.Where(p => !p.IsDeleted).OrderByDescending(p => p.CreatedAt);
        
        var totalCount = activeProducts.Count();
        var items = activeProducts
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(ProductMapper.ToDto)
            .ToList();

        return new PagedResult<ProductDto>
        {
            Items = items,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize
        };
    }

    public async Task<ProductDto?> GetByIdAsync(int id)
    {
        var repository = _unitOfWork.Repository<Product>();
        var product = await repository.GetByIdAsync(id);

        if (product == null || product.IsDeleted)
            return null;

        return ProductMapper.ToDto(product);
    }

    public async Task<ProductDto> CreateAsync(CreateProductDto createDto)
    {
        var repository = _unitOfWork.Repository<Product>();
        var product = ProductMapper.ToEntity(createDto);

        var createdProduct = await repository.AddAsync(product);
        await _unitOfWork.SaveChangesAsync();

        return ProductMapper.ToDto(createdProduct);
    }

    public async Task<ProductDto> UpdateAsync(int id, UpdateProductDto updateDto)
    {
        var repository = _unitOfWork.Repository<Product>();
        var product = await repository.GetByIdAsync(id);

        if (product == null || product.IsDeleted)
            throw new KeyNotFoundException($"Product with ID {id} not found");

        ProductMapper.UpdateEntity(product, updateDto);
        await repository.UpdateAsync(product);
        await _unitOfWork.SaveChangesAsync();

        return ProductMapper.ToDto(product);
    }

    public async Task DeleteAsync(int id)
    {
        var repository = _unitOfWork.Repository<Product>();
        await repository.DeleteAsync(id);
        await _unitOfWork.SaveChangesAsync();
    }

    public async Task<IEnumerable<ProductDto>> SearchAsync(string searchTerm)
    {
        var repository = _unitOfWork.Repository<Product>();
        var allProducts = await repository.GetAllAsync();

        var searchResults = allProducts
            .Where(p => !p.IsDeleted &&
                       (p.Name.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
                        p.Description.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
                        p.Sku.Contains(searchTerm, StringComparison.OrdinalIgnoreCase)))
            .Select(ProductMapper.ToDto);

        return searchResults;
    }
}
