function wordCount(text) {
    function countWords(str) {
        var matches = str.match(/[\w\d\’\'-]+/gi);
        return matches ? matches.length : 0;
    }
}
module.exports = wordCount;