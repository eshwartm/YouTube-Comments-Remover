document.getElementById('yesno').addEventListener('click', handleClick);

function handleClick() {
	var checkbox = document.getElementById('yesno');
	if (checkbox.checked) {
		chrome.storage.sync.set({'commentsTurnedOff': 1}, function() {});
  			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		    	var tab = tabs[0];
		    	chrome.tabs.sendMessage(tab.id, {commentsTurnedOff: 1}, function handler(response) {});
			});
	} else {
		chrome.storage.sync.set({'commentsTurnedOff': 0}, function() {});
    	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		    var tab = tabs[0];
		    chrome.tabs.sendMessage(tab.id, {commentsTurnedOff: 0}, function handler(response) {});
		});
	}
}

chrome.storage.sync.get('commentsTurnedOff', function(result) {
    let checkbox = document.getElementById('yesno');
    checkbox.checked = result.commentsTurnedOff === 1 ? true : false;
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
          var storageChange = changes[key];
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
        }
      });