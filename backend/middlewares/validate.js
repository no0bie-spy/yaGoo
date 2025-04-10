const validate = function (validationSchemas = {}) {
    return function (req, res, next) {
        const { body, params, query, headers } = validationSchemas;
  
        let validationResult;
  
        // Perform validation for each schema if it exists
        if (body) {
            validationResult = body.validate(req.body, { abortEarly: false });
        }
        if (params) {
            validationResult = params.validate(req.params, { abortEarly: false });
        }
        if (query) {
            validationResult = query.validate(req.query, { abortEarly: false });
        }
        if (headers) {
            validationResult = headers.validate(req.headers, { abortEarly: false });
        }
  
        // Ensure validationResult is defined and has an error
        if (validationResult && validationResult.error) {
            return res.status(400).send({ error: validationResult.error.message });
        } else {
            return next();
        }
    };
  };
  
  export default validate;
  