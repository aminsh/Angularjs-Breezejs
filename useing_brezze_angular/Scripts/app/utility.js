
    Array.prototype.removeAll = function () {
        while (this.length != 0) {
            this.shift();
        }
    };

    Array.prototype.remove = function () {
        var what,
            args = arguments,
            len = args.length,
            i;
        while (len && this.length) {
            what = args[--len];
            while ((i = this.indexOf(what)) !== -1) {
                this.splice(i, 1);
            }
        }
        return this;
    };
    
    Array.prototype.count = function (callback) {
        if (callback == undefined)
            return this.length;
        var filters = this.filter(callback);
        return filters.length;
    };

    Array.prototype.any = function (callback) {
        if (callback == undefined)
            return this.count() != 0;
        var filters = this.filter(callback);
        return filters.count() != 0;
    };

    Array.prototype.foreach = function (callback) {
        for (var i = 0; i < this.count() ; i++) {
            var item = this[i];
            callback(item);
        }
    };

    Array.prototype.filter = function (callback) {
        var filters = [];

        this.foreach(function (item) {
            if (callback(item))
                filters.push(item);
        });

        return filters;
    };

    Array.prototype.first = function (callback) {
        if (!this.any())
            return null;

        if (callback == undefined)
            return this[0];

        var filters = this.filter(callback);

        return filters.any() ? filters[0] : null;
    };

    Array.prototype.last = function (callback) {
        if (!this.any())
            return null;

        if (callback == undefined)
            return this[this.count() - 1];

        var filters = this.filter(callback);

        return filters.any() ? filters[filters.count() - 1] : null;
    };

    Array.prototype.select = function (callback) {
        if (!this.any())
            return [];

        var target = [];

        this.foreach(function (item) {
            target.push(callback(item));
        });

        return target;
    };

    Array.prototype.contains = function (param) {
        var source = this;
        var isValid = false;

        source.foreach(function (item) {
            if (item == param)
                isValid = true;
        });

        return isValid;
    };

    String.prototype.startsWith = function (str) {
        return this.indexOf(str) == 0;
    };

    String.prototype.contains = function (str) {
        return this.indexOf(str) != -1;
    };

    window.isNullOrEmpty = function(value) {

        if (value == undefined)
            return true;

        if (value == null)
            return true;

        if (value == '')
            return true;
        
        return false;
    };
    
    String.prototype.replaceAll = function (token, newToken, ignoreCase) {
        var _token;
        var str = this + "";
        var i = -1;

        if (typeof token === "string") {

            if (ignoreCase) {

                _token = token.toLowerCase();

                while ((
                    i = str.toLowerCase().indexOf(
                        token, i >= 0 ? i + newToken.length : 0
                    )) !== -1
                ) {
                    str = str.substring(0, i) +
                        newToken +
                        str.substring(i + token.length);
                }

            } else {
                return this.split(token).join(newToken);
            }

        }
        return str;
    };

    window.newGuid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    
    window.startWaiting = function () {
        var newId = newGuid();

        var waitingTag = '<div id="' + newId + '" class="isloading-overlay waiting" ' +
            'style="position:fixed; left:0; top:0; z-index: 10010;  width: 100%; height: 100%;" />';
        $("body").prepend(waitingTag);
        $('.isloading-overlay').html('<div class="ui large active dimmer"><div class="ui large text loader">لطفا چند لحظه صبر کنید</div></div>');

        setTimeout(function () {
            $('#' + newId).remove();
        }, 60000);
    };

    window.endWaiting = function() {
        $('.waiting').remove();
    };
