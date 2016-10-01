
function notifyMe(name, message, picture) {
  if (!Notification) {
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else if (!document.hasFocus()) {
    var notification = new Notification(name, {
      icon: picture,
      body: message
    });

    notification.onshow = function() { setTimeout(() => notification.close(), 5000); };
    notification.onclick = function () {
      window.focus();
      this.close();
    };

  }

}

export default notifyMe;
