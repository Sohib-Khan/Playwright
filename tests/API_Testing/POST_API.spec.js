import { test, expect } from '@playwright/test';

const baseURL = 'https://restful-booker.herokuapp.com';

test.describe('Restful Booker - POST /auth API Tests', () => {

  // TC-AUTH-001: Generate token with valid credentials
  test('TC-AUTH-001 - Generate token with valid username and password', async ({ request }) => {

    const response = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);

    console.log('Token:', body.token);
  });


  // TC-AUTH-002: Verify token data type
  test('TC-AUTH-002 - Verify token is returned as a string', async ({ request }) => {

    const response = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token).not.toBe('');

    console.log('Token Type:', typeof body.token);
  });


  // TC-AUTH-003: Verify JSON request
  test('TC-AUTH-003 - Authenticate using JSON request body', async ({ request }) => {

    const response = await request.post(`${baseURL}/auth`, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.token).toBeTruthy();

    console.log('Authentication successful');
  });


  // TC-AUTH-004: Additional JSON field
  test('TC-AUTH-004 - Send valid credentials with additional field', async ({ request }) => {

    const response = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123',
        extra: 'test'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('token');

    console.log('Response:', body);
  });


  // TC-AUTH-005: Verify token can authenticate another request
  test('TC-AUTH-005 - Verify generated token', async ({ request }) => {

    // Step 1: Generate token
    const authResponse = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'admin',
        password: 'password123'
      }
    });

    expect(authResponse.status()).toBe(200);

    const authBody = await authResponse.json();

    expect(authBody.token).toBeTruthy();

    const token = authBody.token;

    console.log('Generated Token:', token);

    // Token can be used for authenticated endpoints.
    // Example: PUT /booking/{id}
    expect(token).toBeTruthy();
  });


  // TC-AUTH-006: Incorrect password
  test('TC-AUTH-006 - Authenticate with incorrect password', async ({ request }) => {

    const response = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'admin',
        password: 'wrongPassword'
      }
    });

    console.log('Status:', response.status());

    const body = await response.json();

    console.log('Response:', body);

    // Authentication should fail
    expect(response.status()).toBe(200);

    expect(body).toHaveProperty('reason');

    expect(body.token).toBeUndefined();
  });


  // TC-AUTH-007: Incorrect username
  test('TC-AUTH-007 - Authenticate with incorrect username', async ({ request }) => {

    const response = await request.post(`${baseURL}/auth`, {
      data: {
        username: 'invalidUser',
        password: 'password123'
      }
    });

    console.log('Status:', response.status());

    const body = await response.json();

    console.log('Response:', body);

    expect(response.status()).toBe(200);

    expect(body).toHaveProperty('reason');

    expect(body.token).toBeUndefined();
  });


  // TC-AUTH-008: Empty username and password
  test('TC-AUTH-008 - Authenticate with empty username and password', async ({ request }) => {

    const response = await request.post(`${baseURL}/auth`, {
      data: {
        username: '',
        password: ''
      }
    });

    console.log('Status:', response.status());

    const body = await response.json();

    console.log('Response:', body);

    // Should not generate a token
    expect(body.token).toBeUndefined();
    expect(body).toHaveProperty('reason');
  });


  // TC-AUTH-009: Missing username and password
  test('TC-AUTH-009 - Authenticate without username and password', async ({ request }) => {

    const response = await request.post(`${baseURL}/auth`, {
      data: {}
    });

    console.log('Status:', response.status());

    const body = await response.json();

    console.log('Response:', body);

    expect(body.token).toBeUndefined();
    expect(body).toHaveProperty('reason');
  });


  // TC-AUTH-010: Malformed JSON
  test('TC-AUTH-010 - Send malformed JSON request', async ({ request }) => {

    const response = await request.post(`${baseURL}/auth`, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: '{"username":"admin","password":"password123"'
    });

    console.log('Status:', response.status());

    const responseText = await response.text();

    console.log('Response:', responseText);

    // Should not successfully authenticate
    expect(response.status()).not.toBe(200);
  });

});