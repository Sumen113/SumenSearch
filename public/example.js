const urlInput = document.getElementById("urlInput");
const toggleIcon = document.querySelector(".toggle-icon");
const urlBar = document.querySelector(".url-bar");
const iframeWindow = document.getElementById("iframeWindow");

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
        const searchUrl = "https://www.ecosia.org/search?method=index&q=";

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

        // Encode the URL for Ultraviolet proxy
        const encodedUrl = __uv$config.encodeUrl(url);

        // Ensure the prefix is correct for the proxy
        iframeWindow.src = __uv$config.prefix + encodedUrl;

        // Wait for the iframe to load and handle errors
        iframeWindow.onload = function () {
            console.log("Iframe loaded successfully.");
        };

        // Retry mechanism in case the iframe is stuck on loading
        setTimeout(function () {
            if (iframeWindow.src === __uv$config.prefix + encodedUrl) {
                console.log("Iframe failed to load, retrying...");
                iframeWindow.src = __uv$config.prefix + encodedUrl; // Retry loading the page
            }
        }, 5000); // Retry after 5 seconds

        // Set headers to avoid 403 errors
        iframeWindow.setAttribute('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
        iframeWindow.setAttribute('Referrer', 'https://www.ecosia.org');

        // Show the toggle icon after the first search
        if (!hasSearched) {
            toggleIcon.style.display = "block"; // Show arrow after first search
            hasSearched = true;
        }

        // Hide the input after the search
        hideInput();
    }
});

// Toggle input visibility when the icon is clicked
toggleIcon.addEventListener("click", toggleInput);
