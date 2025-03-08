document.addEventListener('DOMContentLoaded', async function () {
    const container = document.getElementById('h5p-container');

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    const activity = getQueryParam('activity');

    if (activity) {
        const baseGitHubPages = "https://efolwell.github.io/mindfulness-course"; // ✅ GitHub Pages Base URL
        let h5pUrl = `${baseGitHubPages}/my-h5p-content/${activity}/h5p.json`; // ✅ Corrected path

        console.log("🔍 DEBUG: Generated h5pUrl =", h5pUrl);

        try {
            console.log("Fetching H5P JSON from:", h5pUrl);
            const response = await fetch(h5pUrl);
            if (!response.ok) throw new Error("H5P JSON File not found");

            const h5pInstance = new H5PStandalone.H5P(container, {
                h5pJsonPath: h5pUrl,
                frameJs: `${baseGitHubPages}/h5p-standalone/dist/frame.bundle.js`,
                frameCss: `${baseGitHubPages}/h5p-standalone/dist/styles/h5p.css`,
                librariesPath: `${baseGitHubPages}/my-h5p-content/${activity}/libraries/`
            });

            console.log("🎉 H5P Activity Loaded Successfully!");

            // ✅ Manually Load Missing `questionset.js`
            const questionSetScript = document.createElement("script");
            questionSetScript.src = `${baseGitHubPages}/my-h5p-content/${activity}/libraries/H5P.QuestionSet-1.20/questionset.js`;
            questionSetScript.onload = () => console.log("✅ H5P.QuestionSet Loaded!");
            questionSetScript.onerror = () => console.error("❌ Failed to Load H5P.QuestionSet!");
            document.head.appendChild(questionSetScript);

            // ✅ Delay H5P Initialization to Ensure All Dependencies Load
            setTimeout(() => {
                if (!window.H5P) {
                    console.error("❌ H5P core did not load properly.");
                    return;
                }

                if (!H5P.QuestionSet) {
                    console.error("❌ H5P.QuestionSet is missing.");
                    return;
                }

                console.log("✅ H5P and all dependencies are loaded!");

                h5pInstance.init();
            }, 3000); // Delay to allow assets to load

        } catch (error) {
            console.error("❌ Error loading H5P:", error);
            container.innerHTML = `<p>Error loading H5P activity: ${error.message}</p>`;
        }
    } else {
        container.innerHTML = '<p>Error: Activity not found.</p>';
    }
});
