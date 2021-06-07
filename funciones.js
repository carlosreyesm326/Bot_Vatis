exports.normalizar = (str) => {
    let iso=str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let upper = iso.toUpperCase();
    return upper;
} 