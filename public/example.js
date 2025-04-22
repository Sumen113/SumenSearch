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

        // If it's not a full URL, treat it as a search query
        if (!url.includes(".")) {
            // Encode the search query
            url = searchUrl + encodeURIComponent(url);
        } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
            // If it's a URL without protocol, prepend https://
            url = "https://" + url;
        }

        // Log the URL to check the final structure
        console.log("Loading URL:", url);

        // Encode the URL for Ultraviolet proxy
        const encodedUrl = __uv$config.encodeUrl(url);

        // Set the iframe src with the proxy URL
        iframeWindow.src = __uv$config.prefix + encodedUrl;

        // Add a timeout to check if the iframe is stuck on loading
        setTimeout(function() {
            if (iframeWindow.src === __uv$config.prefix + encodedUrl) {
                console.log("Iframe failed to load, retrying...");
                iframeWindow.src = __uv$config.prefix + encodedUrl; // Retry to load the page
            }
        }, 5000); // Retry after 5 seconds

        // Check for iframe loading success
        iframeWindow.onload = function() {
            console.log("Iframe loaded successfully.");
        };

        // Show the toggle icon after the first search
        if (!hasSearched) {
            toggleIcon.style.display = "block";
            hasSearched = true;
        }

        // Hide the input after the search
        hideInput();
    }
});

// Toggle input visibility when the icon is clicked
toggleIcon.addEventListener("click", toggleInput);


