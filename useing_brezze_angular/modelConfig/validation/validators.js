define([], validators);

function validators() {
    function required(variable) {
        if (typeof variable == 'string')
            return variable.length > 0;
        return validation != null;
    }

    function minLength(variable, length) {
        if (variable == null)
            return true;

        return !(variable.length < length);
    }

    function maxLength(variable,length) {
        if (variable == null)
            return true;

        return !(variable.length > length);
    }

    function stringLength(variable,minLength,maxLength) {
        if (variable == null)
            return true;
        if (variable.length < minLength)
            return false;
        if (variable.length > maxLength)
            return false;
        return true;
    }

    function emainAddress(variable) {
        var regularExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regularExp.test(variable);
    }

    function url(variable) {
        var regularExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regularExp.test(variable);
    }

    return {
        required: required,
        minLength: minLength,
        maxLength: maxLength,
        stringLength: stringLength,
        emainAddress: emainAddress,
        url: url
    }
}