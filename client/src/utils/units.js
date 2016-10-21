const units = (bytes) => {
    if (bytes >= 1000000000) {
        bytes = (bytes / 1000000000).toFixed(2) + ' GB';
    } else if (bytes >= 1000000) {
        bytes = (bytes / 1000000).toFixed(1) + ' MB';
    } else if (bytes >= 1000) {
        bytes = (bytes / 1000).toFixed(2) + ' KB';
    } else if (bytes > 1) {
        bytes += ' B';
    } else if (bytes === 1) {
        bytes += ' B';
    } else {
        bytes = '0 B';
    }
    return bytes;
}


export const chart = (bytes) => {
    bytes = (bytes / 1000).toFixed(2);
    return bytes;
}
export default units;
