document.addEventListener("DOMContentLoaded", () => {
  const targetsEl = document.getElementById("targets");
  const limitEl = document.getElementById("limitSeconds");
  const saveBtn = document.getElementById("save");
  const statusEl = document.getElementById("status");

  // 加载配置
  chrome.storage.local.get("config", (result) => {
    const config = result.config || { targets: [], limitSeconds: 300 };
    targetsEl.value = config.targets.join("\n");
    limitEl.value = config.limitSeconds;
  });

  // 保存配置
  saveBtn.addEventListener("click", () => {
    const targets = targetsEl.value
      .split("\n")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    const limitSeconds = parseInt(limitEl.value, 10) || 300;

    chrome.storage.local.set({ config: { targets, limitSeconds } }, () => {
      statusEl.style.display = "block";
      setTimeout(() => {
        statusEl.style.display = "none";
      }, 1500);
    });
  });
});
