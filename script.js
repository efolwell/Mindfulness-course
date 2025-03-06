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
            console.log("Fetching H5P JSON from:", h5pUrl); // ✅ Debugging
            const response = await fetch(h5pUrl);
            if (!response.ok) throw new Error("H5P JSON File not found");

            new H5PStandalone.H5P(container, {
                h5pJsonPath: h5pUrl,
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

// ✅ Additional Debugging Check to See if H5PStandalone is Defined
document.addEventListener("DOMContentLoaded", function () {
    console.log("H5PStandalone script loaded"); // ✅ Debugging step

    if (typeof H5PStandalone !== "undefined") {
        console.log("Initializing H5PStandalone..."); // ✅ Debugging step

        new H5PStandalone.H5P(document.getElementById('h5p-container'), {
            h5pJsonPath: "https://raw.githubusercontent.com/efolwell/mindfulness-course/main/my-h5p-content/activity1/h5p.json",
            frameJs: "https://raw.githubusercontent.com/efolwell/mindfulness-course/main/h5p-standalone/dist/frame.bundle.js",
            frameCss: "https://raw.githubusercontent.com/efolwell/mindfulness-course/main/h5p-standalone/dist/styles/h5p.css",
            librariesPath: "https://raw.githubusercontent.com/efolwell/mindfulness-course/main/my-h5p-content/activity1/libraries/"
        });

        console.log("H5PStandalone initialized successfully! 🎉"); // ✅ Success Message

    } else {
        console.error("❌ ERROR: H5PStandalone is not defined!"); // ❌ Error message if H5P isn't loading
    }
});
