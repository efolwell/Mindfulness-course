document.addEventListener("DOMContentLoaded", function () {
    // Corrected URL with proper capitalization
    const h5pUrl = "https://efolwell.github.io/Mindfulness-course/my-h5p-content/activity1/h5p.json";

    console.log("🔍 DEBUG: Fetching H5P JSON from:", h5pUrl);

    fetch(h5pUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`H5P JSON File not found (HTTP ${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ H5P JSON Loaded:", data);
            // Handle the loaded H5P data here
        })
        .catch(error => {
            console.error("❌ Error loading H5P:", error);
        });
});
