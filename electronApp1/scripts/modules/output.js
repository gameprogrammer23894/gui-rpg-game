modules.outputManager = {
    // Method to update the text log with a message
    updateLog: function (message) {
        const textLogPanel = document.getElementById('text-log-panel');
        if (!textLogPanel) return;

        const p = document.createElement('p');
        p.textContent = message;
        textLogPanel.appendChild(p);
        textLogPanel.scrollTop = textLogPanel.scrollHeight;
    }
};