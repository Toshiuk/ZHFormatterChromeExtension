chrome.contextMenus.create({
    'id': 'formatAndCopy',
    'title': 'Copy formatted text to clipboard',
    'contexts': ['selection'],
});

chrome.contextMenus.onClicked.addListener(function(clickData) {
    if (clickData.menuItemId === 'formatAndCopy' && clickData.selectionText) {
        chrome.tabs.query({
            active: true,
            currentWindow: true,
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'formatAndCopy',
            });
        });
    }
});

chrome.commands.onCommand.addListener(function (command) {
    if (command === 'formatAndCopy' ) {
        chrome.tabs.query({
            active: true,
            currentWindow: true,
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'formatAndCopy',
            });
        });
    }
});
