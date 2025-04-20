// ! Este middleware se encarga de validar los schemas de los requests
// ? Con esta función le pasamos un schema ya previamente hecho y lo validamos con los datos del request
// ? si no es valido se le manda un error al cliente
// ? si es valido se continua con el siguiente middleware o controlador

export const validateSchema =
  (schema) =>
  async (req, res, next) => {
    try {
      const data = req.body;
      schema.parse(data);
      
      next();
      
    } catch (err) {
      console.log(err);

      res.status(400).json({
        error: err.errors.map((error) => ({
          field: error.path[0],
          message: error.message,
        })),
        message: 'Error de validación',
      });
    }
  };
