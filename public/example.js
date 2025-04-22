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

        // Handle query without a dot in the URL (search query)
        if (!url.includes(".")) {
            url = searchUrl + encodeURIComponent(url);
        } else if (!url.startsWith("http://") && !url.startsWith("https://")) {
            // Ensure URL starts with https://
            url = "https://" + url;
        }

        // Encode the URL for the Ultraviolet proxy
        const encodedUrl = __uv$config.encodeUrl(url);
        
        // Ensure the prefix is correct for the proxy
        iframeWindow.src = __uv$config.prefix + encodedUrl;

        if (!hasSearched) {
            toggleIcon.style.display = "block"; // Show arrow after first search
            hasSearched = true;
        }

        hideInput(); // Hide input after searching
    }
});

// Toggle input visibility when the icon is clicked
toggleIcon.addEventListener("click", toggleInput);
