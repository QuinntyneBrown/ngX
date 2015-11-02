module ngX {
    
    export var getFunctionName = (fun) => {
        var ret = fun.toString();
        ret = ret.substr('function '.length);
        ret = ret.substr(0, ret.indexOf('('));
        return ret[0].toLowerCase() + ret.substr(1);
    }
} 