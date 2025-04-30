const urlInput = document.getElementById("urlInput");
const inpu = document.querySelector(".input-wrapper");
const toggleIcon = document.querySelector(".toggle-icon");
const urlBar = document.querySelector(".url-bar");
const iframeWindow = document.getElementById("iframeWindow");
iframeWindow.style.display = "none"; // 🚀 Hide initially

let hasSearched = false;
let inputVisible = true; // Tracks if the input is visible

function showInput() {
    urlBar.classList.remove("hidden");
    toggleIcon.classList.add("open");
    inputVisible = true;
}

function hideInput() {
    urlBar.classList.add("hidden");
    toggleIcon.classList.remove("open");
    inputVisible = false;
}

function toggleInput() {
    if (inputVisible) {
        hideInput();
    } else {
        showInput();
    }
}

urlInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();

        let url = urlInput.value.trim();
        const searchUrl = "https://google.com/search?method=index&q=";

        // If it's not a full URL, treat it as a search query.
        if (!url.includes(".")) {
            // Encode the search query
            url = searchUrl + encodeURIComponent(url);
        } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
            // If it's a URL without protocol, prepend https://
            url = "https://" + url;
        }

        // Log the URL being loaded to check if it's correct
        console.log("Loading URL:", url);

        try {
            // Ensure the URL is encoded before passing it to the proxy
            const encodedUrl = __uv$config.encodeUrl(url);
            iframeWindow.src = __uv$config.prefix + encodedUrl;
            iframeWindow.style.display = "block"; // 🔥 Show iframe after search
        } catch (error) {
            console.error("Error encoding URL:", error);
        }

        // Show the toggle icon after the first search
        if (!hasSearched) {
            inpu.style.top = "6%";
            toggleIcon.style.display = "block"; // Show arrow after first search
            hasSearched = true;
        }

        // Hide the input after the search
        hideInput();
    }
});

const submitBtn = document.querySelector(".youtube-button");
submitBtn.addEventListener("click", () => {
    window.open("https://inv.nadeko.net/feed/popular", "_blank");
});

const szvy = document.querySelector(".szvy-button");
szvy.addEventListener("click", () => {
    let win = window.open("", "_blank");

    let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Home</title>
            <link rel="icon" href="https://ssl.gstatic.com/classroom/favicon.ico" type="image/x-icon">
            <style>
                html, body {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                }
                iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                }
            </style>
        </head>
        <body>
            <iframe src="https://weezer.global.ssl.fastly.net"></iframe>
        </body>
        </html>
    `;

    // Open the document, write HTML, and close it to render
    win.document.open();
    win.document.write(html);
    win.document.close();

    // Ensure the favicon loads correctly after the content
    win.onload = () => {
        let link = win.document.querySelector('link[rel="icon"]');
        if (link) {
            link.href = "https://ssl.gstatic.com/classroom/favicon.ico"; // Ensure the favicon is correctly loaded
        }
    };
});


