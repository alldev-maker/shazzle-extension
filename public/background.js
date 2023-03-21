/*global chrome*/
chrome.runtime.onInstalled.addListener(() => {
  console.log("Chrome extension successfully installed!");
  return;
});

chrome.runtime.onMessage.addListener((request) => {
  console.log("Message received in background.js!", request);
});
