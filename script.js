document.addEventListener("DOMContentLoaded", function () {
    // Get activity from URL (if available)
    const urlParams = new URLSearchParams(window.location.search);
    const activity = urlParams.get("activity") || "activity1"; // Default to activity1 if none provided

    // Correct JSON folder path (DO NOT include h5p.json)
    const h5pFolderUrl = `https://efolwell.github.io/Mindfulness-course/my-h5p-content/${activity}`;

    console.log("🔍 DEBUG: Fetching H5P JSON from:", `${h5pFolderUrl}/h5p.json`);

    fetch(`${h5pFolderUrl}/h5p.json`)
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

            // 🔹 FIX: Use correct folder path (no extra /h5p.json)
            new H5PStandalone.H5P(h5pContainer, {
                h5pJsonPath: h5pFolderUrl, // This should be the directory ONLY
                frameJs: "https://cdn.jsdelivr.net/npm/h5p-standalone@1.3.0/dist/main.bundle.js",
                frameCss: "https://cdn.jsdelivr.net/npm/h5p-standalone@1.3.0/dist/styles/h5p.css"
            });

            console.log("🎉 H5P content should now be displayed!");
        })
        .catch(error => {
            console.error("❌ Error loading H5P:", error);
        });
});
