import Controller from '@ember/controller';
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from '@tauri-apps/api/notification';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @action
  async sendNotification() {
    if (await isPermissionGranted()) {
      sendNotification({
        title: 'Hello from Tauri!',
        body: 'This is a notification',
        icon: 'https://tauri.studio/img/favicon.png',
      });
    } else {
      const permission = await requestPermission();
      if (permission === 'granted') {
        sendNotification({
          title: 'Hello from Tauri!',
          body: 'This is a notification',
          icon: 'https://tauri.studio/img/favicon.png',
        });
      }
    }
  }
}
