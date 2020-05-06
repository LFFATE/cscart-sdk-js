import { AxiosInstance } from 'axios';
import Config from '../config/Config';
import AbstractRequest from './AbstractRequest';
export default class ProductsRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    handlerParams: any;
    params: any;
    constructor(client: AxiosInstance, config: Config);
    protected buildUrl(): string;
    forOptions(options: Array<selectedOption>): this;
    forCategory(categoryId: number): this;
    vendorProducts(productId: number): ProductsRequest;
    withFilters(appliedFiltersHash?: string): this;
    setParams(): void;
}
interface selectedOption {
    optionId: number;
    value: any;
}
export {};
