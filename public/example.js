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

        // Log the final URL being loaded
        console.log("Loading search URL:", url);

        // Encode the URL for the Ultraviolet proxy
        const encodedUrl = __uv$config.encodeUrl(url);

        // Ensure the prefix is correct for the proxy
        iframeWindow.src = __uv$config.prefix + encodedUrl;

        // Force a refresh in case the iframe is stuck
        iframeWindow.onload = function() {
            console.log("Iframe loaded successfully.");
        };

        // Retry mechanism (if needed) to load the content
        setTimeout(function() {
            if (iframeWindow.src !== __uv$config.prefix + encodedUrl) {
                console.log("Retrying to load the URL...");
                iframeWindow.src = __uv$config.prefix + encodedUrl;
            }
        }, 5000); // Retry after 5 seconds if the iframe is still blank

        if (!hasSearched) {
            toggleIcon.style.display = "block"; // Show arrow after first search
            hasSearched = true;
        }

        hideInput(); // Hide input after searching
    }
});

// Toggle input visibility when the icon is clicked
toggleIcon.addEventListener("click", toggleInput);


