import CartContentRequest from './CartContentRequest'
import OrdersRequest from './OrdersRequest'
import WishlistRequest from './WishlistRequest'
import AuthTokensRequest from './AuthTokensRequest'
import ProductsRequest from './ProductsRequest'
import BmLayoutsRequest from './BmLayoutsRequest'
import CategoriesRequest from './CategoriesRequest'
import ProfileRequest from './ProfileRequest'

const EntityHandler: any = {
  CartContentRequest: CartContentRequest,
  WishlistRequest: WishlistRequest,
  OrdersRequest: OrdersRequest,
  AuthTokensRequest: AuthTokensRequest,
  ProductsRequest: ProductsRequest,
  BmLayoutsRequest: BmLayoutsRequest,
  CategoriesRequest: CategoriesRequest,
  ProfileRequest: ProfileRequest,
}

export default EntityHandler
