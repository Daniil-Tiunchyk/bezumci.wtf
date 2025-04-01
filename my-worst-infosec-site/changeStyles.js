function changeStyle(filename) {
    let existingLink = document.getElementById('theme-style');
    if (existingLink) {
        existingLink.href = filename;
    } else {
        let link = document.createElement('link');
        link.id = 'theme-style';
        link.rel = 'stylesheet';
        link.href = filename;
        document.head.appendChild(link);
    }
}