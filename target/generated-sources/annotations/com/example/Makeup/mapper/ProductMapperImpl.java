package com.example.Makeup.mapper;

import com.example.Makeup.dto.ProductDTO;
import com.example.Makeup.entity.Product;
import com.example.Makeup.entity.SubCategory;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-06T19:00:32+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.2 (Oracle Corporation)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public ProductDTO toProductDTO(Product product) {
        if ( product == null ) {
            return null;
        }

        ProductDTO productDTO = new ProductDTO();

        productDTO.setSubCategoryId( productSubCategoryId( product ) );
        productDTO.setId( product.getId() );
        productDTO.setNameProduct( product.getNameProduct() );
        productDTO.setSize( product.getSize() );
        productDTO.setPrice( product.getPrice() );
        productDTO.setStatus( product.isStatus() );
        productDTO.setImage( product.getImage() );
        productDTO.setRentalCount( product.getRentalCount() );
        productDTO.setCreatedAt( product.getCreatedAt() );

        setFirstImage( productDTO, product );
        setSubCategoryName( productDTO, product );

        return productDTO;
    }

    @Override
    public Product toProductEntity(ProductDTO productDTO) {
        if ( productDTO == null ) {
            return null;
        }

        Product product = new Product();

        product.setSubCategory( productDTOToSubCategory( productDTO ) );
        product.setId( productDTO.getId() );
        product.setNameProduct( productDTO.getNameProduct() );
        product.setSize( productDTO.getSize() );
        product.setPrice( productDTO.getPrice() );
        product.setStatus( productDTO.isStatus() );
        product.setImage( productDTO.getImage() );
        product.setRentalCount( productDTO.getRentalCount() );
        product.setCreatedAt( productDTO.getCreatedAt() );

        return product;
    }

    private int productSubCategoryId(Product product) {
        if ( product == null ) {
            return 0;
        }
        SubCategory subCategory = product.getSubCategory();
        if ( subCategory == null ) {
            return 0;
        }
        int id = subCategory.getId();
        return id;
    }

    protected SubCategory productDTOToSubCategory(ProductDTO productDTO) {
        if ( productDTO == null ) {
            return null;
        }

        SubCategory subCategory = new SubCategory();

        subCategory.setId( productDTO.getSubCategoryId() );

        return subCategory;
    }
}
