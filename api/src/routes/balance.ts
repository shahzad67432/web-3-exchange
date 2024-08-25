import { response } from "express";
import { RedisManager } from "../RedisManager";
import { GET_BALANCE } from "../types";

const express = require('express');
export const balanceRouter = express.Router();

const balance = [1, 2, 1, 1, 1, 1];
balanceRouter.get('/', async (req: any, res: any)=>{
    const {userId} = req.query;
    const response = await RedisManager.getInstance().sendAndAwait({
        type: GET_BALANCE,
        data: {
            userId: userId as string
        }
    })
    res.json(response.payload)
})

// this will push to the queue that it needs the balance and balance is stored in tthe internal memory also api server will subs to specific queue
// engine will picj it up and send the balance to api through the pub subs 