const notifications = [...document.querySelectorAll(".notification")];
const unread_notifications = notifications.filter((elem) =>
  elem.classList.contains("unread")
);
const unread_notifications_badge = document.querySelector(
  ".notification_count"
);
let unread_notifications_count = unread_notifications.length;

const controllers = [];
unread_notifications.forEach((elem, idx) => {
  const controller = new AbortController();
  controllers.push(controller);
  elem.addEventListener(
    "click",
    () => {
      if (elem.classList.contains("unread")) {
        elem.classList.remove("unread");
        unread_notifications_count--;
        unread_notifications_badge.textContent = unread_notifications_count;
      }
      controller.abort();
    },
    { signal: controller.signal }
  );
});

document.querySelector(".mark_read").addEventListener("click", () => {
  unread_notifications.forEach((elem, idx) => {
    if (elem.classList.contains("unread")) {
      elem.classList.remove("unread");
      unread_notifications_count--;
      unread_notifications_badge.textContent = unread_notifications_count;
    }
    controllers.forEach((cntrler) => {
      cntrler.abort();
    });
  });
});

unread_notifications_badge.textContent = unread_notifications_count;
