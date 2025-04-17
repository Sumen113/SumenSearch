const urlInput = document.getElementById("urlInput");
const toggleIcon = document.querySelector(".toggle-icon");
const iframeWindow = document.getElementById("iframeWindow");

function toggleInputVisibility(forceState = null) {
    const isHidden = urlInput.style.display === "none";
    const shouldShow = forceState !== null ? forceState : isHidden;

    if (shouldShow) {
        urlInput.style.display = "block";
        toggleIcon.classList.add("open");
    } else {
        urlInput.style.display = "none";
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

        // Collapse input after search
        toggleInputVisibility(false);
        toggleIcon.style.display = "block";
    }
});

toggleIcon.addEventListener("click", () => {
    toggleInputVisibility();
});
