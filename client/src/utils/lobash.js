//This is used as replacement fro lodash functions
const lobash = {};
export default lobash

lobash.isEmpty = (str) => {

    if (typeof str == 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g,"") === "")
    {
        return true;
    }
    else
    {
        return false;
    }
}

lobash.isUndefined = (value) =>  {
   return value === undefined;
 }
