modules.promptManager = {
    // Initialize with dialogues and the current dialogue key
    start: function (dialogues) {
        this.dialogues = dialogues;
        this.currentDialogueKey = Object.keys(dialogues)[0]; // Start with the first dialogue
        this.displayDialogue(this.currentDialogueKey);
    },

    // Display the dialogue and options dynamically
    displayDialogue: function (dialogueKey) {
        const dialogue = this.dialogues[dialogueKey];

        // Display question text
        document.getElementById("prompt").textContent = dialogue.text;

        // Clear the previous answers and prepare new ones
        const answersElement = document.getElementById("answers");
        answersElement.innerHTML = "";

        // Create buttons for each answer
        dialogue.options.forEach((answer) => {
            const button = document.createElement("button");
            button.textContent = answer.text;
            button.onclick = () => {
                // Call the main dialogue function
                if (dialogue.func) {
                    dialogue.func(answer.data); // Execute the dialogue's function with the option data
                }
                // Handle the next prompt logic
                this.handleNext(answer, dialogueKey); // Proceed to the next dialogue
            };

            answersElement.appendChild(button);
        });
    },

    // Handle the next dialogue logic based on the selected option
    handleNext: function (answer, currentDialogueKey) {
        let nextDialogueKey = answer.next;

        // If no next is specified in the option, use the next dialogue in sequence
        if (!nextDialogueKey) {
            nextDialogueKey = this.getNextDialogueKey();
        }

        console.log("Next Dialogue Key:", nextDialogueKey); // Debugging transition

        // Update currentDialogueKey to the next dialogue
        if (nextDialogueKey) {
            this.currentDialogueKey = nextDialogueKey; // Update current dialogue key
            this.displayDialogue(nextDialogueKey); // Show the next specified dialogue
        }
    },

    // Logic to determine the next dialogue (sequentially) if 'next' is not specified
    getNextDialogueKey: function () {
        const keys = Object.keys(this.dialogues);
        const currentIndex = keys.indexOf(this.currentDialogueKey);
        return keys[currentIndex + 1] || null; // Return null if no more dialogues
    }
};
