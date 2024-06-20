import jwt from 'jsonwebtoken';
import TokenBlacklist from '../features/user/tokenBlacklist.model.js'; // Import the TokenBlacklist model
// import { ApplicationError } from '../../error-handler/applicationError.js'; // Adjust the import based on your project structure

const jwtAuth = (req, res, next)=>{
    // 1. Read the token.
    const token = req.headers['authorization'];

    // 2. if no token, return the error.
    if(!token){
        return res.status(401).send('Unauthorized');
    }
    // 3. check if token is valid.
    try{
        // const blacklistedToken = TokenBlacklist.findOne({ token });
        // // console.log("blacklisted token ",blacklistedToken);
        // if (blacklistedToken) {
        //     return res.status(401).send('Unauthorized');
        // }
        const payload = jwt.verify(
            token,
            "e7TQj6kzHJNcIpX6truwBDusC0Ny7Y4K"
        );
        req.userID = payload.userID;
        console.log(payload);
    } catch(err){
        // 4. return error.
        console.log(err);
        return res.status(401).send('Unauthorized');
    }

    // 5. call next middleware.
    next();
};

export default jwtAuth;