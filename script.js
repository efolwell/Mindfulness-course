document.addEventListener("DOMContentLoaded", function () {
    // Get activity from URL (if available)
    const urlParams = new URLSearchParams(window.location.search);
    const activity = urlParams.get("activity") || "activity1"; // Default to activity1 if none provided

    // 🔹 Correct JSON and libraries folder paths
    const h5pFolderUrl = `https://efolwell.github.io/Mindfulness-course/my-h5p-content/${activity}`;
    const librariesUrl = `${h5pFolderUrl}/libraries`; // 🔹 Manually define libraries path

    console.log("🔍 DEBUG: Fetching H5P JSON from:", `${h5pFolderUrl}/h5p.json`);

    fetch(`${h5pFolderUrl}/h5p.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`H5P JSON File not found (HTTP ${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            console.log("✅ H5P JSON Loaded Successfully:", data);

            // Find the H5P container in the HTML
            const h5pContainer = document.getElementById("h5p-container");
            if (!h5pContainer) {
                console.error("❌ No #h5p-container found in HTML!");
                return;
            }

            // 🔹 Fix library paths dynamically for all dependencies
            const fixedLibrariesPath = (library) => `${librariesUrl}/${library}/library.json`;

            // 🔹 Override paths manually for known libraries
            const fixedDependencies = data.preloadedDependencies.map(dep => ({
                ...dep,
                path: fixedLibrariesPath(dep.machineName + '-' + dep.majorVersion + '.' + dep.minorVersion),
            }));

            console.log("🛠 Fixing dependencies:", fixedDependencies);

            // 🔹 Fix CORB issue by using CORS-compliant H5P scripts
            const corsSafeFrameJs = "https://cdn.jsdelivr.net/npm/h5p-standalone@1.3.0/dist/main.bundle.js";
            const corsSafeFrameCss = "https://cdn.jsdelivr.net/npm/h5p-standalone@1.3.0/dist/styles/h5p.css";

            // 🔹 Tell H5P exactly where to find its library files
            new H5PStandalone.H5P(h5pContainer, {
                h5pJsonPath: h5pFolderUrl,  
                librariesPath: librariesUrl, // 🔹 Explicitly set the correct libraries path
                frameJs: corsSafeFrameJs, // ✅ CORS-SAFE SCRIPT
                frameCss: corsSafeFrameCss, // ✅ CORS-SAFE STYLES
                preloadedDependencies: fixedDependencies, // 🔹 Inject the correct paths for dependencies
            });

            console.log("🎉 H5P content should now be displayed!");
        })
        .catch(error => {
            console.error("❌ Error loading H5P:", error);
        });
});
