import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { cfg } from "../../config";
import { authentication, random } from "../helpers/security";
import { findUserByEmail } from "../services/auth.service";
import { updateFullEvaluadorSrv } from "../services/evaluador.service";

export const loginEvaluador = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Usuario o contraseña inválidos" });
  }
  const evaluador = await findUserByEmail(email);
  if (!evaluador) {
    return res
      .status(404)
      .json({ success: false, message: "Usuario no encontrado" });
  }

  const expectedHash = authentication(evaluador.salt || "DEFAULT_SALT", password);
  if (evaluador.password !== expectedHash) {
    return res
      .status(401)
      .json({ success: false, message: "Contraseña incorrecta" });
  }

  const salt = random();
  evaluador.sessionToken = authentication(
    salt,
    evaluador.id_evaluador?.toString() || "DEFAULT_EVALUADOR"
  );

  const updatedEvaluador = await updateFullEvaluadorSrv(evaluador);
  if (!updatedEvaluador) {
    return res
      .status(500)
      .json({ success: false, message: "Error al actualizar el usuario" });
  }

  const jwtPayload = {
    token: evaluador.sessionToken,
    id_evaluador: evaluador.id_evaluador,
    name_evaluador: evaluador.name_evaluador,
    rol: evaluador.rol,
    area: evaluador.area
  };

  const jwtToken = jwt.sign(jwtPayload, cfg.SECRET_KEY, { expiresIn: "1d" });

  return res.status(200).json({ success: true, jwt_token: jwtToken });
};
