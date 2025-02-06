import { Request, Response } from 'express';
import { generateToken } from '../Utility/jwt';

// In-memory storage for auth codes
export const authCodes = new Map<string, string>();
export const authStates = new Map<string, string>(); 

export function authorize(req: Request, res: Response) {
    const { response_type, client_id, redirect_uri, state } = req.query;
    if (response_type !== 'code' || client_id !== 'upfirst' || redirect_uri !== 'http://localhost:8081/process') {
        return res.status(400).send('Invalid parameters');
    }

    const code = generateAuthCode();
    authCodes.set(code,client_id, );

    // Store the state
    if (state) {
        authStates.set(code, state as string);
    }

    let redirectUrl = `${redirect_uri}?code=${code}`;
    if (state) {
        redirectUrl += `&state=${state}`;
    }
    res.redirect(302, redirectUrl);
}

export async function token(req: Request, res: Response) {
    const { grant_type, code, client_id, redirect_uri } = req.body;
    
    if (grant_type !== 'authorization_code' || client_id !== 'upfirst' || redirect_uri !== 'http://localhost:8081/process') {
        return res.status(400).send('Invalid request');
    }
    console.log('code', authCodes);

    if (!authCodes.has(code)) {
        return res.status(400).send('Invalid code');
    }

    const storedState = authStates.get(code);
    if (storedState && storedState !== req.body.state) {
        authCodes.delete(code);
        authStates.delete(code);
        return res.status(400).send('State mismatch');
    }

    const accessToken = await generateToken({ client_id });
    const refreshToken = await generateToken({ client_id }, true); // for refresh_token

    // Clean up stored state and code after successful token exchange
    authCodes.delete(code);
    authStates.delete(code);

    res.json({
        access_token: accessToken,
        token_type: "bearer",
        expires_in: 3600, // 1 hour token lifetime
        refresh_token: refreshToken,
        state: req.body.state || undefined // return back the state if provided
    });
}

function generateAuthCode(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}