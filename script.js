document.addEventListener("DOMContentLoaded", function () {
    // Corrected URL with case-sensitive fix
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

            // 🔹 Find the H5P container in the HTML
            const h5pContainer = document.getElementById("h5p-container");
            if (!h5pContainer) {
                console.error("❌ No #h5p-container found in HTML!");
                return;
            }

            // 🔹 Initialize H5P content
            new H5PStandalone.H5P(h5pContainer, {
                h5pJsonPath: h5pUrl, // JSON file path
                frameJs: "https://cdn.jsdelivr.net/npm/h5p-standalone@1.3.0/dist/main.bundle.js",
                frameCss: "https://cdn.jsdelivr.net/npm/h5p-standalone@1.3.0/dist/styles/h5p.css",
                contentJson: data // Load the fetched JSON data directly
            });

            console.log("🎉 H5P content should now be displayed!");

        })
        .catch(error => {
            console.error("❌ Error loading H5P:", error);
        });
});
