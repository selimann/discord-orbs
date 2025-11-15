(function () {
  "use strict";
  function findVideoElements() {
    return document.querySelectorAll("video");
  }
  function fastForwardVideo(video) {
    if (video && !video.ended) {
      video.currentTime = video.duration;
    }
  }
  function processVideos() {
    const videos = findVideoElements();
    console.log(`Found ${videos.length} video elements`);
    videos.forEach((video) => {
      if (video.duration > 0 && !video.ended) {
        fastForwardVideo(video);
      }
    });
  }
  function startVideoMonitoring() {
    setInterval(processVideos, 3000);
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) {
            const videos = node.querySelectorAll("video");
            videos.forEach((video) => {
              if (video.duration > 0) {
                setTimeout(() => fastForwardVideo(video), 1000);
              }
            });
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    processVideos();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startVideoMonitoring);
  } else {
    startVideoMonitoring();
  }
})();
