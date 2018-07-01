
let commentsSection = 'comments';

function toggleElementRemoval(remove) {
	if (remove) {
		removeElement();
	} else {
		addBackElement();
	}
}

function removeElement() {
	// Removes an element from the document.
	let element = document.getElementById(commentsSection);
	if (element) {
		removedElement = element.parentNode.removeChild(element);	
	}
}

function addBackElement() {
	if(window.location.href.indexOf("watch") > -1) {
       window.location.reload();
    }
}

var interval = null;
var manageIntervalForRemoveElement = function() {
	let element = document.getElementById(commentsSection);
	if (element) {
		interval = setInterval(removeElement(commentsSection), 2000);
	} else {
		clearInterval(interval);
	}
}

// connect
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	if (msg.commentsTurnedOff === 1) {
      	toggleElementRemoval(true);
      	document.addEventListener('DOMSubtreeModified', manageIntervalForRemoveElement, false);
    }
    else if (msg.commentsTurnedOff === 0) {
      	toggleElementRemoval(false);
      	document.removeEventListener('DOMSubtreeModified', manageIntervalForRemoveElement, false);
    }
});

// for first time
chrome.storage.sync.get('comments', function(result) {
    if (result.commentsTurnedOff === 1) {
    	document.addEventListener('DOMSubtreeModified', manageIntervalForRemoveElement, false);
    } else {
	document.removeEventListener('DOMSubtreeModified', manageIntervalForRemoveElement, false);
    }
});



