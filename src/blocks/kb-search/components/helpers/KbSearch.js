import axios from 'axios';

export function searchKb(query, page = null, limit, type, exact, mode, sort) {
    let s, st;
   
    if ( page != null ) {
        s = `${page.href}&size=${limit}`;
    } else {
        switch (type) {
            case "Articles":
                st = '';
                break;
            case "Help Desk":
                st = 'helpdesk/';
                break;
            default:
                st = '';
        }
        s = `https://kb.wisc.edu/${st}api/v1/articles?query=${query}&sort=${sort}&mode=${mode}&exact=${exact}&size=${limit}`;
    }
    console.log(page);
    console.log(s);

    return axios
        .get(s)
        .catch(err => {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.reponse.status);
                console.log(err.response.headers);
            }
        })
        .then((res) => {
            return res.data;
        })
}