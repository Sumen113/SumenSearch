document.getElementById("urlInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        let url = document.getElementById("urlInput").value;
        let searchUrl = "https://www.google.com/search?q=";

        if (!url.includes(".")) {
            url = searchUrl + encodeURIComponent(url);
        } else {
            if (!url.startsWith("http://") && !url.startsWith("https://")) {
                url = "https://" + url;
            }
        }

        iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(url);
    }
});
