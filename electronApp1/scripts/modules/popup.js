modules.popupManager = {
    // Properties
    popupElement: document.getElementById("custom-popup-container"),
    noticeMessageElement: document.getElementById("notice-message"),
    confirmMessageElement: document.getElementById("confirm-message"),
    okButton: document.getElementById("ok-btn"),
    yesButton: document.getElementById("yes-btn"),
    noButton: document.getElementById("no-btn"),
    noticeContent: document.getElementById("custom-notice-content"),
    confirmContent: document.getElementById("custom-confirm-content"),

    // Function to show a custom notice with an OK button
    showNotice: function (message, callback = null) {
        this.noticeContent.style.display = "block"; // Show notice content
        this.confirmContent.style.display = "none"; // Hide confirm content

        this.noticeMessageElement.textContent = message;
        this.popupElement.style.display = "flex"; // Show the entire popup

        this.okButton.onclick = () => {
            this.popupElement.style.display = "none";
            if (callback) {
                callback();
            }
        };
    },

    // Function to show a custom confirmation dialog with Yes/No buttons
    showConfirm: function (message, yesCallback, noCallback) {
        this.noticeContent.style.display = "none"; // Hide notice content
        this.confirmContent.style.display = "block"; // Show confirm content

        this.confirmMessageElement.textContent = message;
        this.popupElement.style.display = "flex"; // Show the entire popup

        // Disable buttons while waiting for response
        this.yesButton.disabled = false;
        this.noButton.disabled = false;

        this.yesButton.onclick = () => {
            this.yesButton.disabled = true;  // Disable button to prevent further clicks
            this.noButton.disabled = true;
            this.popupElement.style.display = "none";
            yesCallback();  // Executes the "Yes" callback
        };

        this.noButton.onclick = () => {
            this.yesButton.disabled = true;  // Disable button to prevent further clicks
            this.noButton.disabled = true;
            this.popupElement.style.display = "none";
            noCallback();  // Executes the "No" callback
        };
    }
};
