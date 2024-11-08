import {RequestHandler} from "express";
let axios = require("axios")

export const relayAPIRequest:RequestHandler = ((req,res, next) => {
    const urlPattern1 = /https?:\/\/re\.jrc\.ec\.europa\.eu.+/;
    const urlPattern2 = /https?:\/\/nominatim\.openstreetmap\.org.+/;

    if (!urlPattern1.test(req.body.url) && !urlPattern2.test(req.body.url)) {
        console.log('Forbidden, wrong request url: ' + req.body.url);
        return res.sendStatus(403);
    }
    
    if(req.body.method == "GET"){
        axios({
            url: req.body.url,
            method: 'GET',
            params: {
                'url': req.body.url,
            },
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
                "Accept": "application/json",
                "Accept-Encoding": "gzip, deflate, br",
                'Referer': 'https://pvgis.sunny5.de',
            },
        })
            .then((result:any) => res.json(result.data))
            .catch((error:any) => console.error(error))
    } else {
        return res.send(403)
    }
})




