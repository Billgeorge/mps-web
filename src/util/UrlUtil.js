export const getIdFromUrl = () =>{
    const url = window.location.href
    const urlParts = url.split('/')
    return urlParts[urlParts.length-1]
}

export const getQueyParamFromUrl = (name, url = window.location.href) =>{
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}