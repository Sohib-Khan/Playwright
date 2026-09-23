import { test, expect } from '@playwright/test';

const baseURL = 'https://restful-booker.herokuapp.com';

test.describe('Restful Booker - GET /booking API Tests', () => {

  // TC-GET-001: Get all booking IDs
  test('TC-GET-001 - Get all booking IDs', async ({ request }) => {

    const response = await request.get(`${baseURL}/booking`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);

    console.log('Booking IDs:', body);
  });


  // TC-GET-002: Filter booking by First Name
  test('TC-GET-002 - Get booking using First Name filter', async ({ request }) => {

    const response = await request.get(`${baseURL}/booking`, {
      params: {
        firstname: 'Jim'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();

    console.log('First Name Filter Result:', body);
  });


  // TC-GET-003: Filter booking by Last Name
  test('TC-GET-003 - Get booking using Last Name filter', async ({ request }) => {

    const response = await request.get(`${baseURL}/booking`, {
      params: {
        lastname: 'Brown'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();

    console.log('Last Name Filter Result:', body);
  });


  // TC-GET-004: Filter by First Name + Last Name
  test('TC-GET-004 - Get booking using First Name and Last Name', async ({ request }) => {

    const response = await request.get(`${baseURL}/booking`, {
      params: {
        firstname: 'Jim',
        lastname: 'Brown'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();

    console.log('Name Filter Result:', body);
  });


  // TC-GET-005: Filter booking by Check-in and Check-out dates
  test('TC-GET-005 - Get booking using date filters', async ({ request }) => {

    const response = await request.get(`${baseURL}/booking`, {
      params: {
        checkin: '2022-01-01',
        checkout: '2022-01-31'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();

    console.log('Date Filter Result:', body);
  });


  // TC-GET-006: Search non-existing First Name
  test('TC-GET-006 - Search booking with non-existing First Name', async ({ request }) => {

    const response = await request.get(`${baseURL}/booking`, {
      params: {
        firstname: 'XYZNonExisting'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBe(0);

    console.log('Non-existing First Name Result:', body);
  });


  // TC-GET-007: Search non-existing Last Name
  test('TC-GET-007 - Search booking with non-existing Last Name', async ({ request }) => {

    const response = await request.get(`${baseURL}/booking`, {
      params: {
        lastname: 'XYZNonExisting'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBe(0);

    console.log('Non-existing Last Name Result:', body);
  });


  // TC-GET-008: Invalid date format
  test('TC-GET-008 - Send invalid date format', async ({ request }) => {

    const response = await request.get(`${baseURL}/booking`, {
      params: {
        checkin: '01-01-2022'
      }
    });

    console.log('Status:', response.status());

    const body = await response.json();

    console.log('Invalid Date Response:', body);

    // API should not return a server error
    expect(response.status()).toBeLessThan(500);
  });


  // TC-GET-009: Unsupported query parameter
  test('TC-GET-009 - Send invalid query parameter', async ({ request }) => {

    const response = await request.get(`${baseURL}/booking`, {
      params: {
        invalidparam: 'test'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();

    console.log('Invalid Parameter Result:', body);
  });


  // TC-GET-010: Send POST instead of GET
  test('TC-GET-010 - Verify unsupported HTTP method', async ({ request }) => {

    const response = await request.post(`${baseURL}/booking`);

    console.log('POST Status:', response.status());

    // POST without valid booking body should not be treated as GET
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

});