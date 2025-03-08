document.addEventListener('DOMContentLoaded', async function () {
    const container = document.getElementById('h5p-container');

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const activity = getQueryParam('activity');

    if (activity) {
        const baseGitHubPages = "https://efolwell.github.io/Mindfulness-course"; // ✅ Correct Repo Capitalization
        let h5pUrl = `${baseGitHubPages}/my-h5p-content/${activity}/h5p.json`; // ✅ Fixed URL (No double `/h5p.json`)

        console.log("🔍 DEBUG: Fetching H5P JSON from:", h5pUrl);

        try {
            const response = await fetch(h5pUrl);
            if (!response.ok) {
                throw new Error(`H5P JSON File not found (HTTP ${response.status})`);
            }

            const h5pData = await response.json(); // ✅ Ensure response is valid JSON

            new H5PStandalone.H5P(container, {
                h5pJsonPath: `${baseGitHubPages}/my-h5p-content/${activity}`, // ✅ Use only folder path (No double `h5p.json`)
                frameJs: `${baseGitHubPages}/h5p-standalone/dist/frame.bundle.js`,
                frameCss: `${baseGitHubPages}/h5p-standalone/dist/styles/h5p.css`,
                librariesPath: `${baseGitHubPages}/my-h5p-content/${activity}/libraries/`
            });

            console.log("🎉 H5P Activity Loaded Successfully!");

        } catch (error) {
            console.error("❌ Error loading H5P:", error);
            container.innerHTML = `<p>Error loading H5P activity: ${error.message}</p>`;
        }
    } else {
        container.innerHTML = '<p>Error: Activity not found.</p>';
    }
});
