using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
                .ForMember(p => p.ProductBrand,
                    o => o.MapFrom(s => s.ProductBrand.Name))
                .ForMember(p => p.ProductType,
                    o => o.MapFrom(s => s.ProductType.Name))
                .ForMember(p => p.PictureUrl,
                    o => o.MapFrom<ProductUrlResolver>())
                ;
            CreateMap<Address, AddressDto>()
                .ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
        }
    }
}