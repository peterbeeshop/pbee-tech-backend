import {Request, Response} from "express";
import Address from "../models/Address";


export const getAddress = async (req: Request, res: Response) => {
    try {
        const addresses = await Address.find({});
        res.json(addresses);

      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

export const createAddress = async (req: Request, res: Response) => {
    try {
        const {fullName, street, city, province, phoneNumber} = req.body;
        const address = await Address.create({fullName, street, city, province, phoneNumber});
        res.json(address)
    } catch (error) {
        res.status(500).json({ error: 'Error occured while creating address. Please try again!' });
    }
}