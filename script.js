document.addEventListener('DOMContentLoaded', async function () {
    const container = document.getElementById('h5p-container');

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const activity = getQueryParam('activity');

    if (activity) {
        const baseGitHubRaw = "https://raw.githubusercontent.com/efolwell/mindfulness-course/main";
        let h5pUrl = `${baseGitHubRaw}/my-h5p-content/${activity}/h5p.json`;

        console.log("🔍 DEBUG: Initial Generated h5pUrl =", h5pUrl);

        // ✅ Force Remove Any Double /h5p.json Issue
        h5pUrl = h5pUrl.replace(/\/h5p\.json\/h5p\.json$/, "/h5p.json");
        console.log("🔍 DEBUG: Corrected h5pUrl =", h5pUrl);

        try {
            console.log("Fetching H5P JSON from:", h5pUrl);
            const response = await fetch(h5pUrl);
            if (!response.ok) throw new Error("H5P JSON File not found");

            // ✅ Ensure H5PStandalone does NOT modify `h5pJsonPath`
            const sanitizedH5PUrl = h5pUrl.endsWith("/h5p.json") ? h5pUrl.slice(0, -9) : h5pUrl;
            console.log("🔍 DEBUG: Final sanitized H5P URL =", sanitizedH5PUrl);

            new H5PStandalone.H5P(container, {
                h5pJsonPath: sanitizedH5PUrl,
                frameJs: `${baseGitHubRaw}/h5p-standalone/dist/frame.bundle.js`,
                frameCss: `${baseGitHubRaw}/h5p-standalone/dist/styles/h5p.css`,
                librariesPath: `${baseGitHubRaw}/my-h5p-content/${activity}/libraries/`
            });

            console.log("🎉 H5P Activity Loaded Successfully!");

            // ✅ Manually add the CSS if it's missing
            const cssUrl = `${baseGitHubRaw}/my-h5p-content/${activity}/libraries/H5P.InteractiveBook-1.11/dist/h5p-interactive-book.css`;
            console.log("🔍 DEBUG: Checking if CSS exists:", cssUrl);
            
            const cssTest = await fetch(cssUrl);
            if (cssTest.ok) {
                console.log("✅ CSS File Exists, Injecting into the Page...");
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = cssUrl;
                document.head.appendChild(link);
            } else {
                console.error("❌ CSS File is Missing:", cssUrl);
            }

        } catch (error) {
            console.error("❌ Error loading H5P:", error);
            container.innerHTML = `<p>Error loading H5P activity: ${error.message}</p>`;
        }
    } else {
        container.innerHTML = '<p>Error: Activity not found.</p>';
    }
});
