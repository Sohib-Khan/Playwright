import { test, expect } from '@playwright/test';

const baseURL = 'https://restful-booker.herokuapp.com';

let token;
let bookingId;

test.beforeAll(async ({ request }) => {

  // Generate authentication token
  const authResponse = await request.post(`${baseURL}/auth`, {
    data: {
      username: 'admin',
      password: 'password123'
    }
  });

  expect(authResponse.status()).toBe(200);

  const authBody = await authResponse.json();

  token = authBody.token;

  expect(token).toBeTruthy();

  // Create a booking
  const bookingResponse = await request.post(`${baseURL}/booking`, {
    data: {
      firstname: 'Sohib',
      lastname: 'Khan',
      totalprice: 300,
      depositpaid: true,
      bookingdates: {
        checkin: '2026-10-01',
        checkout: '2026-10-05'
      },
      additionalneeds: 'Breakfast'
    }
  });

  expect(bookingResponse.status()).toBe(200);

  const bookingBody = await bookingResponse.json();

  bookingId = bookingBody.bookingid;

  expect(bookingId).toBeTruthy();

  console.log('Booking ID:', bookingId);
  console.log('Token:', token);
});


test.describe('DELETE /booking/{id} API Tests', () => {

  // TC-DELETE-001
  test('TC-DELETE-001 - Delete booking with valid ID and authentication', async ({ request }) => {

    const response = await request.delete(
      `${baseURL}/booking/${bookingId}`,
      {
        headers: {
          'Cookie': `token=${token}`
        }
      }
    );

    console.log('Status:', response.status());

    expect(response.status()).toBe(201);
  });


  // TC-DELETE-002
  test('TC-DELETE-002 - Verify deleted booking is no longer accessible', async ({ request }) => {

    // Create a fresh booking for this test
    const createResponse = await request.post(`${baseURL}/booking`, {
      data: {
        firstname: 'Delete',
        lastname: 'Test',
        totalprice: 200,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-10-01',
          checkout: '2026-10-05'
        },
        additionalneeds: 'Breakfast'
      }
    });

    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    const id = createBody.bookingid;

    // Delete booking
    const deleteResponse = await request.delete(
      `${baseURL}/booking/${id}`,
      {
        headers: {
          'Cookie': `token=${token}`
        }
      }
    );

    expect(deleteResponse.status()).toBe(201);

    // Verify booking no longer exists
    const getResponse = await request.get(
      `${baseURL}/booking/${id}`
    );

    expect(getResponse.status()).toBe(404);
  });


  // TC-DELETE-003
  test('TC-DELETE-003 - Delete booking using valid authentication cookie', async ({ request }) => {

    const createResponse = await request.post(`${baseURL}/booking`, {
      data: {
        firstname: 'Cookie',
        lastname: 'Delete',
        totalprice: 250,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-10-01',
          checkout: '2026-10-05'
        },
        additionalneeds: 'Breakfast'
      }
    });

    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();
    const id = createBody.bookingid;

    const response = await request.delete(
      `${baseURL}/booking/${id}`,
      {
        headers: {
          'Cookie': `token=${token}`
        }
      }
    );

    console.log('Delete Status:', response.status());

    expect(response.status()).toBe(201);
  });


  // TC-DELETE-004
  test('TC-DELETE-004 - Delete newly created booking', async ({ request }) => {

    // Create booking
    const createResponse = await request.post(`${baseURL}/booking`, {
      data: {
        firstname: 'New',
        lastname: 'Booking',
        totalprice: 400,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-11-01',
          checkout: '2026-11-05'
        },
        additionalneeds: 'Breakfast'
      }
    });

    expect(createResponse.status()).toBe(200);

    const createBody = await createResponse.json();

    const id = createBody.bookingid;

    expect(id).toBeTruthy();

    // Delete booking
    const deleteResponse = await request.delete(
      `${baseURL}/booking/${id}`,
      {
        headers: {
          'Cookie': `token=${token}`
        }
      }
    );

    expect(deleteResponse.status()).toBe(201);

    console.log('Deleted Booking ID:', id);
  });


  // TC-DELETE-005
  test('TC-DELETE-005 - Delete booking using valid numeric ID', async ({ request }) => {

    // Create fresh booking
    const createResponse = await request.post(`${baseURL}/booking`, {
      data: {
        firstname: 'Numeric',
        lastname: 'ID',
        totalprice: 250,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-10-01',
          checkout: '2026-10-05'
        },
        additionalneeds: 'Breakfast'
      }
    });

    const createBody = await createResponse.json();

    const id = createBody.bookingid;

    expect(typeof id).toBe('number');

    // Delete
    const deleteResponse = await request.delete(
      `${baseURL}/booking/${id}`,
      {
        headers: {
          'Cookie': `token=${token}`
        }
      }
    );

    expect(deleteResponse.status()).toBe(201);
  });


  // TC-DELETE-006
  test('TC-DELETE-006 - Delete booking without authentication', async ({ request }) => {

    // Create fresh booking
    const createResponse = await request.post(`${baseURL}/booking`, {
      data: {
        firstname: 'Unauthorized',
        lastname: 'Delete',
        totalprice: 200,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-10-01',
          checkout: '2026-10-05'
        },
        additionalneeds: 'Breakfast'
      }
    });

    const createBody = await createResponse.json();

    const id = createBody.bookingid;

    // Try deleting without token
    const deleteResponse = await request.delete(
      `${baseURL}/booking/${id}`
    );

    console.log('Status:', deleteResponse.status());

    expect(deleteResponse.status()).toBe(403);

    // Verify booking still exists
    const getResponse = await request.get(
      `${baseURL}/booking/${id}`
    );

    expect(getResponse.status()).toBe(200);
  });


  // TC-DELETE-007
  test('TC-DELETE-007 - Delete booking using invalid ID', async ({ request }) => {

    const invalidId = 99999999;

    const response = await request.delete(
      `${baseURL}/booking/${invalidId}`,
      {
        headers: {
          'Cookie': `token=${token}`
        }
      }
    );

    console.log('Status:', response.status());

    expect(response.status()).toBe(405);
  });


  // TC-DELETE-008
  test('TC-DELETE-008 - Delete same booking twice', async ({ request }) => {

    // Create booking
    const createResponse = await request.post(`${baseURL}/booking`, {
      data: {
        firstname: 'Double',
        lastname: 'Delete',
        totalprice: 300,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-10-01',
          checkout: '2026-10-05'
        },
        additionalneeds: 'Breakfast'
      }
    });

    const createBody = await createResponse.json();

    const id = createBody.bookingid;

    // First DELETE
    const firstDelete = await request.delete(
      `${baseURL}/booking/${id}`,
      {
        headers: {
          'Cookie': `token=${token}`
        }
      }
    );

    expect(firstDelete.status()).toBe(201);

    // Second DELETE
    const secondDelete = await request.delete(
      `${baseURL}/booking/${id}`,
      {
        headers: {
          'Cookie': `token=${token}`
        }
      }
    );

    console.log('Second DELETE Status:', secondDelete.status());

    expect(secondDelete.status()).toBe(405);
  });


  // TC-DELETE-009
  test('TC-DELETE-009 - Delete booking using invalid ID format', async ({ request }) => {

    const response = await request.delete(
      `${baseURL}/booking/abc`,
      {
        headers: {
          'Cookie': `token=${token}`
        }
      }
    );

    console.log('Status:', response.status());

    expect(response.status()).not.toBe(201);
  });


  // TC-DELETE-010
  test('TC-DELETE-010 - Delete booking with invalid authentication token', async ({ request }) => {

    // Create booking
    const createResponse = await request.post(`${baseURL}/booking`, {
      data: {
        firstname: 'Invalid',
        lastname: 'Token',
        totalprice: 300,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-10-01',
          checkout: '2026-10-05'
        },
        additionalneeds: 'Breakfast'
      }
    });

    const createBody = await createResponse.json();

    const id = createBody.bookingid;

    // Try deleting with invalid token
    const deleteResponse = await request.delete(
      `${baseURL}/booking/${id}`,
      {
        headers: {
          'Cookie': 'token=invalid_token_12345'
        }
      }
    );

    console.log('Status:', deleteResponse.status());

    expect(deleteResponse.status()).toBe(403);

    // Verify booking still exists
    const getResponse = await request.get(
      `${baseURL}/booking/${id}`
    );

    expect(getResponse.status()).toBe(200);
  });

});