document.addEventListener("DOMContentLoaded", function () {
    // Get activity from URL (if available)
    const urlParams = new URLSearchParams(window.location.search);
    const activity = urlParams.get("activity") || "activity1"; // Default to activity1 if none provided

    // Correct H5P JSON URL
    const h5pJsonUrl = `https://efolwell.github.io/Mindfulness-course/my-h5p-content/${activity}/h5p.json`;

    console.log("🔍 DEBUG: Fetching H5P JSON from:", h5pJsonUrl);

    fetch(h5pJsonUrl)
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

            // 🔹 FIX: Ensure correct path to H5P JSON folder
            const h5pFolderUrl = `https://efolwell.github.io/Mindfulness-course/my-h5p-content/${activity}`;

            new H5PStandalone.H5P(h5pContainer, {
                h5pJsonPath: h5pFolderUrl, // This is the directory path, NOT the file itself
                frameJs: "https://cdn.jsdelivr.net/npm/h5p-standalone@1.3.0/dist/main.bundle.js",
                frameCss: "https://cdn.jsdelivr.net/npm/h5p-standalone@1.3.0/dist/styles/h5p.css"
            });

            console.log("🎉 H5P content should now be displayed!");
        })
        .catch(error => {
            console.error("❌ Error loading H5P:", error);
        });
});
