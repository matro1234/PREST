import db from "../models/index.model";
import { Evaluador } from "../models/evaluador.model";

export const findUserByEmail = async (
	email: string
): Promise<Evaluador> => {
	const result = await db.evaluador.getEvaluadorByemail(email);
	return result;
};
