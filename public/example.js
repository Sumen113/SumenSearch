const urlInput = document.getElementById("urlInput");
const inpu = document.querySelector(".input-wrapper");
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


// Toggle input visibility when the icon is clicked
toggleIcon.addEventListener("click", toggleInput);
