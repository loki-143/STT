document.addEventListener("DOMContentLoaded", () => {
    const recordButton = document.getElementById("record");
    const output = document.getElementById("output");
    const downloadButton = document.getElementById("download");

    recordButton.addEventListener("click", () => {
        output.textContent = "Listening...";
        fetch("/recognize", { method: "POST" })
            .then(response => response.json())
            .then(data => {
                output.textContent = data.transcription;
            })
            .catch(error => {
                console.error("Error:", error);
                output.textContent = "Error recognizing speech.";
            });
    });

    downloadButton.addEventListener("click", () => {
        const text = output.textContent;
        if (text === "Your transcribed text will appear here..." || text === "Listening..." || text === "") {
            alert("No text available to download.");
            return;
        }

        const blob = new Blob([text], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "transcription.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});