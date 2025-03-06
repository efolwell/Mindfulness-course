document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('h5p-container');
    const selector = document.getElementById('h5p-selector');

    function loadActivity(activity) {
        container.innerHTML = ''; // Clear previous content
        if (activity) {
            new H5PStandalone.H5P(container, {
                h5pJsonPath: `https://raw.githubusercontent.com/efolwell/Mindfulness-course/refs/heads/main/my-h5p-content/activity1/h5p.json`, 
                frameJs: 'h5p-standalone/dist/frame.bundle.js',
                frameCss: 'h5p-standalone/dist/styles/h5p.css'
            });
        }
    }

    // Auto-load the first activity
    const defaultActivity = 'activity1'; // Change if you want a different default
    selector.value = defaultActivity;
    loadActivity(defaultActivity);

    // Change activity when user selects one
    selector.addEventListener('change', function () {
        loadActivity(selector.value);
    });
});
