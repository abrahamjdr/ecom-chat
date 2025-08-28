import { LocalNotifications } from "@capacitor/local-notifications";

export async function notifyAdded(productTitle) {
  try {
    await LocalNotifications.requestPermissions();
    await LocalNotifications.schedule({
      notifications: [
        {
          id: Date.now() % 1e9,
          title: "Añadido al carrito",
          body: productTitle,
          schedule: { at: new Date(Date.now() + 300) },
        },
      ],
    });
  } catch {
    console.error("Error occurred while scheduling notification");
  }
}
