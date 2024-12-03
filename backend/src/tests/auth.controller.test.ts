import request from 'supertest';
import app from '../app'; // Asumiendo que tienes un archivo app.ts donde instancias Express
import { getUserByEmail } from '../services/user.service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock de las dependencias
jest.mock('../services/user.service');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Login User Controller', () => {
  const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: 'hashedPassword',
    nickname: 'testuser',
  };

  // TC1.0 Verificar que el usuario pueda iniciar sesión con un correo y contraseña válidos.
  it('TC1.0 should login successfully with valid credentials', async () => {
    (getUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    bcrypt.compare = jest.fn().mockResolvedValue(true);
    jwt.sign = jest.fn().mockReturnValue('fake-jwt-token');
  
    const response = await request(app)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'password123' });
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Login successful',
      token: 'fake-jwt-token',
    });
  });
});