import { Preferences } from "@capacitor/preferences";
const KEY = "chat_history";
export const saveChat = async (messages) =>
  Preferences.set({ key: KEY, value: JSON.stringify(messages) });
export const loadChat = async () => {
  const { value } = await Preferences.get({ key: KEY });
  return value ? JSON.parse(value) : [];
};
