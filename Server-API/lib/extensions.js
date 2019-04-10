Array.prototype.matchInArray = function(string) {

    var len = this.length,
        i = 0;

    for (; i < len; i++) {
        if (string.match(this[i])) {
            return true;
        }
    }

    return false;
};
