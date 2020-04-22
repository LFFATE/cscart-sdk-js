import { IApiRequestConfig } from './IApiRequestConfig';
import { IConfig } from '../config/IConfig';
import AbstractRequest from './AbstractRequest';
export default class NotificationRequest extends AbstractRequest {
    entityPath: string;
    prefix: string;
    constructor(handlerParams: any, params: IApiRequestConfig, config: IConfig);
    /**
     * Mark user notifications as viewed
     *
     * @param lastNotificationDate - all notifications before specified time will be marked as viewed
     */
    markAsViewed(lastNotificationDate: string): any;
    protected setParams(): void;
}
