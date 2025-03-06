document.addEventListener('DOMContentLoaded', async function () {
    const container = document.getElementById('h5p-container');

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const activity = getQueryParam('activity');

    if (activity) {
        const baseGitHubRaw = "https://raw.githubusercontent.com/efolwell/mindfulness-course/main";
        const h5pUrl = `${baseGitHubRaw}/my-h5p-content/${activity}/h5p.json`; // ✅ Correct URL
        const librariesUrl = `${baseGitHubRaw}/my-h5p-content/${activity}/libraries/`;

        try {
            console.log("Fetching H5P JSON from:", h5pUrl); // ✅ Debugging
            const response = await fetch(h5pUrl);
            if (!response.ok) throw new Error("H5P JSON File not found");

            new H5PStandalone.H5P(container, {
                h5pJsonPath: h5pUrl, // ✅ Ensure this does not append another /h5p.json
                frameJs: `${baseGitHubRaw}/h5p-standalone/dist/frame.bundle.js`,
                frameCss: `${baseGitHubRaw}/h5p-standalone/dist/styles/h5p.css`,
                librariesPath: librariesUrl
            });

            console.log("H5P Activity Loaded Successfully! 🎉"); // ✅ Debugging Success Message

        } catch (error) {
            container.innerHTML = `<p>Error loading H5P activity: ${error.message}</p>`;
            console.error("Error loading H5P:", error); // ❌ Debugging Error Message
        }
    } else {
        container.innerHTML = '<p>Error: Activity not found.</p>';
    }
});
