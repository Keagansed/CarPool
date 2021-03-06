// File Type: Utility, General use functions

/**
 * Purpose: Functions to retrieve and store session key inside local storage of browser
 */
export function getFromStorage(key) {
    if(!key){
        return null;
    }
    
    try{
        const valueStr = localStorage.getItem(key);

        if(valueStr) {
            return JSON.parse(valueStr);
        }

        return null;
    }catch(err) {
        return null;
    }
}

export function setInStorage(key,obj) {
    if(!key) {
        console.error("error: Missing Key!");
    }

    try {
        localStorage.setItem(key, JSON.stringify(obj));
    }catch(err) {
        console.error(err);
    }
}
