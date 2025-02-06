import { authorize, token } from '../../Controllers/oauthController';
import { Request, Response } from 'express';
import * as jwt from '../../Utility/jwt'; // Assuming you export generateToken from here

jest.mock('../../Utility/jwt');

const mockResponse = (): Response => {
    const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        redirect: jest.fn(),
        json: jest.fn()
    };
    return res as Response;
};

const mockRequest = (query: any = {}, body: any = {}): Request => ({
    query,
    body,
} as unknown as Request);

describe('OAuth Controller', () => {
    let res: Response;

    beforeEach(() => {
        res = mockResponse();
        jest.clearAllMocks(); // Clear all mocks before each test to ensure clean state
    });

    describe('authorize', () => {
        test('authorize with correct parameters', () => {
            const req = mockRequest({
                response_type: 'code',
                client_id: 'upfirst',
                redirect_uri: 'http://localhost:8081/process',
                state: 'some_state'
            });
            
            authorize(req, res);
            expect(res.redirect).toHaveBeenCalledWith(302, expect.stringContaining('http://localhost:8081/process?code=')); // Check if redirect was called with correct url
            expect(res.redirect).toHaveBeenCalledWith(302, expect.stringContaining('&state=some_state')); // Check if state was included
        });

        test('authorize with incorrect parameters', () => {
            const req = mockRequest({
                response_type: 'code',
                client_id: 'wrong',
                redirect_uri: 'http://localhost:8081/process'
            });
            
            authorize(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Invalid parameters');
        });
    });
});