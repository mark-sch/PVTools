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
        req.headers['user-agent'] = "Think5, PVgis Open Source Tool";
        axios.get(req.body.url)
            .then((result:any) => res.json(result.data))
            .catch((error:any) => console.error(error))
    } else {
        return res.send(403)
    }


})




