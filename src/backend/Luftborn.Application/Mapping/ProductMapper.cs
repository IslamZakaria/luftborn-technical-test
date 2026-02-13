using Luftborn.Application.DTOs;
using Luftborn.Domain.Entities;

namespace Luftborn.Application.Mapping;

public static class ProductMapper
{
    public static ProductDto ToDto(Product product)
    {
        return new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            Sku = product.Sku,
            Price = product.Price,
            StockQuantity = product.StockQuantity,
            Category = product.Category,
            CategoryName = product.Category.ToString(),
            ImageUrl = product.ImageUrl,
            IsActive = product.IsActive,
            CreatedAt = product.CreatedAt,
            UpdatedAt = product.UpdatedAt
        };
    }

    public static Product ToEntity(CreateProductDto createDto)
    {
        return new Product
        {
            Name = createDto.Name,
            Description = createDto.Description,
            Sku = createDto.Sku,
            Price = createDto.Price,
            StockQuantity = createDto.StockQuantity,
            Category = createDto.Category,
            ImageUrl = createDto.ImageUrl,
            IsActive = createDto.IsActive,
            CreatedAt = DateTime.UtcNow
        };
    }

    public static void UpdateEntity(Product product, UpdateProductDto updateDto)
    {
        product.Name = updateDto.Name;
        product.Description = updateDto.Description;
        product.Sku = updateDto.Sku;
        product.Price = updateDto.Price;
        product.StockQuantity = updateDto.StockQuantity;
        product.Category = updateDto.Category;
        product.ImageUrl = updateDto.ImageUrl;
        product.IsActive = updateDto.IsActive;
        product.UpdatedAt = DateTime.UtcNow;
    }
}
