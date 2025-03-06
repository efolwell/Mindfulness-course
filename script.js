document.addEventListener('DOMContentLoaded', async function () {
    const container = document.getElementById('h5p-container');

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const activity = getQueryParam('activity');

    if (activity) {
        const baseGitHubRaw = "https://raw.githubusercontent.com/efolwell/mindfulness-course/main";
        const h5pUrl = `${baseGitHubRaw}/my-h5p-content/${activity}/h5p.json`;
        const librariesUrl = `${baseGitHubRaw}/my-h5p-content/${activity}/libraries/`;

        try {
            console.log("Fetching H5P JSON from:", h5pUrl);
            const response = await fetch(h5pUrl);
            if (!response.ok) throw new Error("H5P JSON File not found");

            new H5PStandalone.H5P(container, {
                h5pJsonPath: h5pUrl,
                frameJs: `${baseGitHubRaw}/h5p-standalone/dist/frame.bundle.js`,
                frameCss: `${baseGitHubRaw}/h5p-standalone/dist/styles/h5p.css`,
                librariesPath: librariesUrl,
                frameJsCss: {
                    js: [
                        `${librariesUrl}H5P.InteractiveBook-1.11/dist/h5p-interactive-book.js`, // ✅ Load Interactive Book JS
                        `${librariesUrl}H5P.Video-1.6/dist/h5p-video.js` // ✅ Load Video Library
                    ],
                    css: [
                        `${librariesUrl}H5P.InteractiveBook-1.11/dist/h5p-interactive-book.css`, // ✅ Load Interactive Book CSS
                        `${librariesUrl}H5P.Video-1.6/dist/h5p-video.css` // ✅ Load Video Library CSS
                    ]
                }
            });

            console.log("H5P Activity Loaded Successfully! 🎉");

        } catch (error) {
            container.innerHTML = `<p>Error loading H5P activity: ${error.message}</p>`;
            console.error("Error loading H5P:", error);
        }
    } else {
        container.innerHTML = '<p>Error: Activity not found.</p>';
    }
});
