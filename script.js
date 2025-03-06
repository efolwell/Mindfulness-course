document.addEventListener('DOMContentLoaded', async function () {
    const container = document.getElementById('h5p-container');

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const activity = getQueryParam('activity');

    if (activity) {
        const baseGitHubPages = "https://efolwell.github.io/mindfulness-course"; // ✅ GitHub Pages URL
        let h5pUrl = `${baseGitHubPages}/my-h5p-content/${activity}/h5p.json`;

        console.log("🔍 DEBUG: Initial Generated h5pUrl =", h5pUrl);

        try {
            console.log("Fetching H5P JSON from:", h5pUrl);
            const response = await fetch(h5pUrl);
            if (!response.ok) throw new Error("H5P JSON File not found");

            new H5PStandalone.H5P(container, {
                h5pJsonPath: h5pUrl,
                frameJs: `${baseGitHubPages}/h5p-standalone/dist/frame.bundle.js`,
                frameCss: `${baseGitHubPages}/h5p-standalone/dist/styles/h5p.css`,
                librariesPath: `${baseGitHubPages}/my-h5p-content/${activity}/libraries/`
            });

            console.log("🎉 H5P Activity Loaded Successfully!");

            // ✅ Manually Inject CSS if not loaded
            const cssUrl = `${baseGitHubPages}/my-h5p-content/${activity}/libraries/H5P.InteractiveBook-1.11/dist/h5p-interactive-book.css`;
            console.log("🔍 DEBUG: Checking if CSS exists:", cssUrl);

            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = cssUrl;
            document.head.appendChild(link);
            console.log("✅ CSS Injected:", cssUrl);

        } catch (error) {
            console.error("❌ Error loading H5P:", error);
            container.innerHTML = `<p>Error loading H5P activity: ${error.message}</p>`;
        }
    } else {
        container.innerHTML = '<p>Error: Activity not found.</p>';
    }
});
