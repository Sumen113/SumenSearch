const urlInput = document.getElementById("urlInput");
const toggleIcon = document.querySelector(".toggle-icon");

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

        // Hide input and show toggle arrow
        urlInput.style.display = "none";
        toggleIcon.style.display = "block";
    }
});

toggleIcon.addEventListener("click", () => {
    // Show input and hide arrow
    urlInput.style.display = "block";
    toggleIcon.style.display = "none";
});
