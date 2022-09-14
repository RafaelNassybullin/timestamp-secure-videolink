import fs from "fs";
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { IData, ITime } from "../interface"
import { ExpiredModel, TimeModel } from "../model";
import { directory } from '../../assets';

export default class Service {

    static async getAllVideo(req: Request, res: Response) {
        try {
            const data: IData[] | null = await ExpiredModel.find().sort({ _id: -1 }).lean();
            res.status(200).json(data)
        } catch (e) {
            res.status(400).json({ message: (e as Error).message });
        }
    }

    static async getVideoId(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const data: IData | null = await ExpiredModel.findById(id);
            res.status(200).json(data)
        } catch (e) {
            res.status(400).json({ message: (e as Error).message });
        }
    }

    static async getVideo(req: Request, res: Response) {

        const { id } = req.params;
        const { exp, expkey } = req.query;

        if (exp && expkey) {
            try {
                const times: ITime[] | null = await TimeModel.find({ key: expkey });
                const expiretime: number | undefined = times[0]!.date

                if (expiretime > Date.now()) {
                    fs.readFile(`${directory}/videos/${id}`, (err) => {
                        if (err) {
                            res.status(404).json({ message: "404 error" });
                        } else {
                            res.status(200).sendFile(`${directory}/videos/${id}`);
                        }
                    });

                } else {
                    res.status(404).json({ message: "404 error" });
                }

            } catch (e) {
                res.status(404).json({ message: "404 error" });
            }
        } else {
            res.status(404).json({ message: "404 error" });
        }
    }

    static async getImage(req: Request, res: Response) {
        const { id } = req.params;
        try {
            fs.readFile(`${directory}/images/${id}`, (err) => {
                if (err) {
                    res.status(404).json({ message: "404 error" });
                } else {
                    res.status(200).sendFile(`${directory}/images/${id}`);
                }
            });
        } catch (e) {
            res.status(500).json({ message: "500 bad request" });
        }
    }

    static async generateTimeLink(req: Request, res: Response) {
        const { dataid } = req.query;

        try {
            const imageData: IData | null = await ExpiredModel.findById(dataid)
            const video = imageData?.video;
            const key = uuidv4();
            const date = Date.now() + 300000; //5 минут
            const data = new TimeModel({ key, date });
            const insertedData = await data.save();
            res.status(201).json({
                link: `${process.env["API"]}/assets/videos/${video}?exp=${insertedData.date}&expkey=${insertedData.key}`,
            });
        } catch (e) {
            res.status(404).json({ message: "404 error" });
        }
    }

    static async deleteExpiredLink(req: Request, res: Response) {
        try {
            const count = await TimeModel.countDocuments();
            if (count > 1500) {
                const deleteDatas = await TimeModel.deleteMany();
                res.status(200).json(deleteDatas);
            } else {
                res.status(200).json({ count });
            }
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    static async deleteVideo(req: Request<{ id: string }, {}, {}, {}>, res: Response) {

        try {
            const deleteMovieData = await ExpiredModel.deleteOne({
                _id: req.params.id,
            });
            res.status(200).json(deleteMovieData);
        } catch (error) {
            res.status(400).json(["error"]);
        }
    }

    static async saveVideo(req: Request, res: Response) {
        const data = new ExpiredModel(req.body);
        try {
            const insertedData = await data.save();
            res.status(201).json(insertedData);
        } catch (e) {
            res.status(400).json({ message: (e as Error).message });
        }
    }
}