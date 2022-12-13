import { notificationEl } from './variables.js';

export default function showNotification(msg) {
  notificationEl.innerHTML = msg;
  notificationEl.classList.add('notif-enter');
  setTimeout(() => {
    notificationEl.classList.remove('notif-enter');
  }, 2000);
}
