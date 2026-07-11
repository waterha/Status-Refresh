// 默认配置
const DEFAULT_CONFIG = {
  targets: ["douyin.com", "抖音"],
  limitSeconds: 300
};

// 当前计时状态
let activeTabId = null;
let startTime = null;

// 初始化：加载配置并启动定时检测
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get("config", (result) => {
    if (!result.config) {
      chrome.storage.local.set({ config: DEFAULT_CONFIG });
    }
  });
  chrome.alarms.create("check", { periodInMinutes: 1 / 60 }); // 每秒检测
});

chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create("check", { periodInMinutes: 1 / 60 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "check") {
    checkActiveTab();
  }
});

function getConfig() {
  return new Promise((resolve) => {
    chrome.storage.local.get("config", (result) => {
      resolve(result.config || DEFAULT_CONFIG);
    });
  });
}

async function checkActiveTab() {
  const config = await getConfig();
  if (!config.targets || config.targets.length === 0 || config.limitSeconds <= 0) {
    return;
  }

  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tabs || tabs.length === 0) {
    resetTimer();
    return;
  }

  const tab = tabs[0];
  const url = (tab.url || "").toLowerCase();
  const title = (tab.title || "").toLowerCase();

  const matched = config.targets.some(
    (target) => url.includes(target.toLowerCase()) || title.includes(target.toLowerCase())
  );

  if (!matched) {
    resetTimer();
    return;
  }

  // 命中目标
  if (activeTabId !== tab.id) {
    activeTabId = tab.id;
    startTime = Date.now();
    return;
  }

  const elapsed = (Date.now() - startTime) / 1000;
  if (elapsed >= config.limitSeconds) {
    chrome.tabs.remove(tab.id);
    resetTimer();
  }
}

function resetTimer() {
  activeTabId = null;
  startTime = null;
}

// 切换标签页时重置计时
chrome.tabs.onActivated.addListener(() => {
  resetTimer();
});
