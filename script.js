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
            const response = await fetch(h5pUrl);
            if (!response.ok) throw new Error("File not found");

            new H5PStandalone.H5P(container, {
                h5pJsonPath: h5pUrl,
                frameJs: `${baseGitHubRaw}/h5p-standalone/dist/frame.bundle.js`,
                frameCss: `${baseGitHubRaw}/h5p-standalone/dist/styles/h5p.css`,
                librariesPath: librariesUrl,
                contentJsonPath: h5pUrl, // ✅ Ensure content JSON is loaded
                frameJsCss: {
                    js: [
                        `${librariesUrl}H5P.InteractiveBook-1.11/dist/h5p-interactive-book.js` // ✅ Added JS
                    ],
                    css: [
                        `${librariesUrl}H5P.InteractiveBook-1.11/dist/h5p-interactive-book.css` // ✅ Added CSS
                    ]
                }
            });

        } catch (error) {
            container.innerHTML = `<p>Error loading H5P activity: ${error.message}</p>`;
        }
    } else {
        container.innerHTML = '<p>Error: Activity not found.</p>';
    }
});
