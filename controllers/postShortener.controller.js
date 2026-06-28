import crypto from "crypto";
import { getLinkByShortCode, loadLinks, saveLinks } from "../models/shortener.model.js";

export const getShortenerPage = async(request, response)=>{
    try{
        const links = await loadLinks();
        return response.render("index", {links, host: request.host});

    }catch(error){
        console.log(error);
        return response.status(500).send("Internal Server Error");
    }
};

export const postURLShortener = async(request, response)=>{
    try{
        const {url, shortCode} = request.body;

        const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

        const links = await loadLinks();
        if(links[finalShortCode]){
            return response.status(400).send("Short code already exists. Please use another");
        }
      
        await saveLinks({url, shortCode:finalShortCode});

        return response.redirect("/");

    }catch(error){
        console.log(error);
        return response.status(500).send("Internal Server error");
    }
};

export const redirectShortLink = async(request, response) =>{
    try{
        const {shortCode} = request.params;

        const link = await getLinkByShortCode(shortCode);

        if(!link) return response.redirect("/404");

        return response.redirect(link.url); 
    }catch(error){
        return response.status(500).send("Internal Server Error");
    }
};
