package com.example.Makeup.mapper;

import com.example.Makeup.dto.*;
import com.example.Makeup.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")

public interface CartItemMapper {
    @Mapping(source = "cart.id", target = "cartId")
    CartItemDTO toCartItemDTO(CartItem cartItem);

    @Mapping(source = "cartId", target = "cart.id")
    CartItem toCartItemEntity(CartItemDTO cartItemDTO);

}
