import { AxiosInstance } from 'axios'

import Config from '../config/Config'
import AbstractRequest from './AbstractRequest'

export default class NotificationRequest extends AbstractRequest {
  entityPath: string = 'unviewed_notifications';
  prefix: string = 'sra_';
  handlerParams: any;
  params: any;

  constructor(client: AxiosInstance, config: Config) {
    super(client, config)
    this.handlerParams = {};
    this.params = {};
  }

  /**
   * Mark user notifications as viewed
   *
   * @param lastNotificationDate - all notifications before specified time will be marked as viewed
   */
  markAsViewed(lastNotificationDate: string) {
    return this.client.get(
      this.buildUrl() + 'mark_as_viewed',
      {
        params: {
          ...this.params,
          time: lastNotificationDate,
        }
      }
    )
  }

  protected setParams(): void {
    this.params = {
      ...this.params,
      language:   this.config.language,
      sl:         this.config.language,
      lang_code:  this.config.language,
    }
  }
}
