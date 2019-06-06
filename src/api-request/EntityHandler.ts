import CartContentRequest from './CartContentRequest'
import OrdersRequest from './OrdersRequest'
import WishlistRequest from './WishlistRequest'
import AuthTokensRequest from './AuthTokensRequest'
import ProductsRequest from './ProductsRequest'
import BmLayoutsRequest from './BmLayoutsRequest'
import CategoriesRequest from './CategoriesRequest'

const EntityHandler: any = {
  CartContentRequest: CartContentRequest,
  WishlistRequest: WishlistRequest,
  OrdersRequest: OrdersRequest,
  AuthTokensRequest: AuthTokensRequest,
  ProductsRequest: ProductsRequest,
  BmLayoutsRequest: BmLayoutsRequest,
  CategoriesRequest: CategoriesRequest,
}

export default EntityHandler
