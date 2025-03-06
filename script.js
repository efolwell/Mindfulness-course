document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('h5p-container');

    // Function to get URL parameters
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Get the selected activity from the URL
    const activity = getQueryParam('activity');

    if (activity) {
        new H5PStandalone.H5P(container, {
            h5pJsonPath: `my-h5p-content/${activity}`,
            frameJs: 'h5p-standalone/dist/frame.bundle.js',
            frameCss: 'h5p-standalone/dist/styles/h5p.css'
        });
    }
});
