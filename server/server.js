import express from 'express'; 
import { promises as fs } from 'fs';


const PORT = 3000; 
const app = express(); 

app.getCharacter('/character', async (req, res) => { 
    try{
    const data = await fetch("http://localhost:9001/api/characters"); 
    const jsonObj = JSON.parse(data);
    res.json(jsonObj);} 
    catch (err) { 
        console.log("Error reading ");
        res.status(500); 
    }
}); 