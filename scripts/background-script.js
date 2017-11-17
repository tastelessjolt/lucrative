function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function newTabCreated(tabs) {
	console.log(tabs);
	console.log(tabs[0]);

	messagesURL = browser.extension.getURL("content/messages.json");

	loadJSON(messagesURL, function(data) {
		console.log(data);
		var creating = browser.notifications.create(
			"positive-message", // id
			{ // NotificationOptions
				"type": "basic",
				"iconUrl": browser.extension.getURL("icons/lucrative-48.png"), 
				"title": "Lucrative mind",
				"message": data[Math.floor(Math.random() * data.length)]
			}
		);
	},
	function(error) {
		console.log(error);
	});	
}

browser.tabs.onCreated.addListener(newTabCreated);