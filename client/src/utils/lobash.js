//This is used as replacement fro lodash functions
const lobash = {};
export default lobash

lobash.isEmpty = (str) => {

    if (typeof str === 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g, "") === "") {
        return true;
    } else {
        return false;
    }
}

lobash.isUndefined = (value) => {
    return value === undefined;
}


lobash.debounce = (func, wait, immediate) => {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};
