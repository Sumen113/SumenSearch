const urlInput = document.getElementById("urlInput");
const toggleIcon = document.querySelector(".toggle-icon");
const urlBar = document.querySelector(".url-bar");
const iframeWindow = document.getElementById("iframeWindow");

function toggleInputVisibility(forceShow = null) {
    const isHidden = urlBar.classList.contains("hidden");
    const shouldShow = forceShow !== null ? forceShow : isHidden;

    if (shouldShow) {
        urlBar.classList.remove("hidden");
        toggleIcon.classList.add("open");
    } else {
        urlBar.classList.add("hidden");
        toggleIcon.classList.remove("open");
    }
}

urlInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        let url = urlInput.value;
        let searchUrl = "https://www.google.com/search?q=";

        if (!url.includes(".")) {
            url = searchUrl + encodeURIComponent(url);
        } else {
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                url = "https://" + url;
            }
        }

        iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(url);

        toggleInputVisibility(false); // collapse input
    }
});

toggleIcon.addEventListener("click", () => {
    toggleInputVisibility();
});
