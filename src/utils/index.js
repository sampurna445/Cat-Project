import Toast from "react-native-root-toast";

const showToast = (message) => {
  let toast = Toast.show(message, {
    duration: Toast.durations.LONG,
  });

  // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
  setTimeout(function hideToast() {
    Toast.hide(toast);
  }, 500);
};

export { showToast };
