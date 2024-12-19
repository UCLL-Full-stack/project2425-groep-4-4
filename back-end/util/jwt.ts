import jwt from 'jsonwebtoken'
import { Role } from '../types';

const generateJwtToken = ({email, role}: {email: string, role: Role}): string => {
    const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'Cineflex'};

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }
        return jwt.sign({email, role}, process.env.JWT_SECRET, options);
    } catch (error) {
        console.error("Error generating JWT token:", error);
        throw new Error("Error generating JWT token. See server log for details.");
    }
}

export { generateJwtToken };