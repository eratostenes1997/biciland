if ('serviceWorker' in navigator) {
    console.log('Service Worker is available');
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./scripts/serviceWork.js')
            .then(response => console.log('Service Worker registered: ', response))
            .catch(err => console.error('Service Worker registration failed: ', err));
    });
}