const formatText = (text) => {
    let quoteCount = 0;
    let singleQuoteCount = 0;

    let formattedText = text.replace(/(\r\n|\n|\r)/gm, "");

    if(!(/[.!?。！？]/g.test(formattedText.at(-1)))) {
        formattedText += '.';
    }

    formattedText = formattedText.replace(/[.!?,"()\[\]{};:<>~/'、『]|(?<!\w) (?!\w)/g, function (m) {
        m === '"' && quoteCount++;
        m === "'" && singleQuoteCount++;
        return {
            ' ': '',
            '.': '。',
            '!': '！',
            '?': '？',
            ',': '，',
            '(': '（',
            ')': '）',
            '[': '【',
            ']': '】',
            '{': '｛',
            '}': '｝',
            ':': '：',
            ';': '；',
            '<': '《',
            '>': '》',
            '~': '～',
            '/': '／',
            '『': '『 ',
            '、': '，',
            '"': (quoteCount % 2) ? '『 ' : '』',
            "'": (singleQuoteCount % 2) ? '「' : '」'
        }[m];
    });

    formattedText = formattedText.replace(/。{2,}/g, "...");
    formattedText = formattedText.replace(/\.{3,}(?=.+)/g, "... ");

    return formattedText;
}

const getSelectedText = () => {
    let selection = window.getSelection && window.getSelection().toString();
    selection = selection.trim();
    return selection;
}

const formatAndCopy = () => {
    const selectedText = getSelectedText();
    if (selectedText === '') {
        return false;
    }

    const formattedText = formatText(selectedText);
    console.log(`Copied to your clipboard: ${formattedText}`);

    navigator.clipboard.writeText(formattedText);
}




$(document).on('ready', function() {
    chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
        if (msg.action === 'formatAndCopy') {
            formatAndCopy();
            sendResponse('accepted');
        }
    });
});