export class ProductViewModel {
  id: number
  category: string
  description: string
  image: string
  price:number
  title: string
  rating: ProductRateViewModel = new ProductRateViewModel()
}
class ProductRateViewModel {
  rate: number
  count:number
}