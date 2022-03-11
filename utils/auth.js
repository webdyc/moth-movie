import defaultSettings from "@/settings.js";

const TokenKey = `${defaultSettings.systemTitle}_token`;

// localStorage存储
export function setLocalStorage (key, val) {
  return uni.setStorageSync(`${defaultSettings.systemTitle}${key}`,
    JSON.stringify(val));
}
export function getLocalStorage (key) {
	if(uni.getStorageSync(`${defaultSettings.systemTitle}${key}`)){
		return JSON.parse(uni.getStorageSync(`${defaultSettings.systemTitle}${key}`))
	}else{
		return []
	}
}
export function removeLocalStorage (key) {
  return uni.removeStorageSync(`${defaultSettings.systemTitle}${key}`);
}
export function clearLocalStorage () {
  return uni.clearStorageSync();
}

