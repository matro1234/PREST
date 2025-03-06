import { NextFunction, Request, Response } from "express";
import Debug from "debug";
import jwt from "jsonwebtoken";
import { cfg } from "../../config";
import { merge } from "lodash";
import { getEvaluadorByTokenSrv } from "../services/evaluador.service";

const debug = Debug("postapp:middle_root");

export const isAuthenticated = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            const decodedToken = jwt.verify(token, cfg.SECRET_KEY) as { id_evaluador: string, [key: string]: any };
            if (
                typeof decodedToken === "object" &&
                decodedToken.hasOwnProperty("id_evaluador")
            ) {
                const existingEvaluador = await getEvaluadorByTokenSrv(decodedToken.token);
                if (!existingEvaluador) {
                    debug(`Evaluador does not exist`);
                    return res.sendStatus(403);
                }
                const evaluadorIdFromUrl = req.params.id_evaluador;
                if (evaluadorIdFromUrl !== decodedToken.id_evaluador) {
                    debug(`User ID mismatch: Token ID (${decodedToken.id_evaluador}) does not match URL ID (${evaluadorIdFromUrl})`);
                    return res.sendStatus(403);
                }
                
                merge(req, { identity: existingEvaluador });
                return next();
            } else {
                debug(`Token: ${token}`);
                return res.sendStatus(403);
            }
        } else {
            return res.sendStatus(401);
        }
    } catch (error) {
        debug(`${error}`);
    }
    return res.sendStatus(400);
};
