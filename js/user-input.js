window.onload = function() {
    var container = document.getElementById("custom-input-area");
    if (container) {
        container.innerHTML = `
            <center>
            <a>Please enter your name</a>
            <input type="text" id="username-input" placeholder="Enter your name">
            <button id="submit-btn">Submit</button>
            <div id="personal-message"></div>
            </center>
        `;

        document.getElementById("submit-btn").onclick = showPersonalWelcome;
    }
};

function showPersonalWelcome() {
    var name = document.getElementById("username-input").value;
    var messageDiv = document.getElementById("personal-message");
    if (name.trim() !== "") {
        messageDiv.innerHTML = `<p><b>${escapeHtml(name)}</b>, Nice to meet you!</p>`;
    } else {
        messageDiv.innerHTML = `<p style="color:red;">Please enter a valid name.</p>`;
    }
}

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
