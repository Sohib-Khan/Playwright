import { test, expect } from '@playwright/test';

const baseURL = 'https://restful-booker.herokuapp.com';

let token;
let bookingId;

// Create token and booking before running tests
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
      totalprice: 200,
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


test.describe('PUT /booking/{id} API Tests', () => {

  // TC-PUT-001
  test('TC-PUT-001 - Update booking with all valid details', async ({ request }) => {

    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}`
      },

      data: {
        firstname: 'SohibUpdated',
        lastname: 'KhanUpdated',
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-10-10',
          checkout: '2026-10-15'
        },
        additionalneeds: 'Breakfast'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.firstname).toBe('SohibUpdated');
    expect(body.lastname).toBe('KhanUpdated');
    expect(body.totalprice).toBe(500);
    expect(body.depositpaid).toBe(true);

    console.log('Updated Booking:', body);
  });


  // TC-PUT-002
  test('TC-PUT-002 - Update firstname and lastname', async ({ request }) => {

    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`
      },

      data: {
        firstname: 'NewFirstName',
        lastname: 'NewLastName',
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-10-01',
          checkout: '2026-10-05'
        },
        additionalneeds: 'Breakfast'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.firstname).toBe('NewFirstName');
    expect(body.lastname).toBe('NewLastName');

    console.log('Updated Name:', body.firstname, body.lastname);
  });


  // TC-PUT-003
  test('TC-PUT-003 - Update total price', async ({ request }) => {

    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`
      },

      data: {
        firstname: 'Sohib',
        lastname: 'Khan',
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-10-01',
          checkout: '2026-10-05'
        },
        additionalneeds: 'Breakfast'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.totalprice).toBe(500);

    console.log('Updated Price:', body.totalprice);
  });


  // TC-PUT-004
  test('TC-PUT-004 - Update deposit status', async ({ request }) => {

    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`
      },

      data: {
        firstname: 'Sohib',
        lastname: 'Khan',
        totalprice: 500,
        depositpaid: false,
        bookingdates: {
          checkin: '2026-10-01',
          checkout: '2026-10-05'
        },
        additionalneeds: 'Breakfast'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.depositpaid).toBe(false);

    console.log('Deposit Status:', body.depositpaid);
  });


  // TC-PUT-005
  test('TC-PUT-005 - Update booking dates', async ({ request }) => {

    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`
      },

      data: {
        firstname: 'Sohib',
        lastname: 'Khan',
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-11-01',
          checkout: '2026-11-10'
        },
        additionalneeds: 'Breakfast'
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.bookingdates.checkin).toBe('2026-11-01');
    expect(body.bookingdates.checkout).toBe('2026-11-10');

    console.log('Updated Dates:', body.bookingdates);
  });


  // TC-PUT-006
  test('TC-PUT-006 - Update booking with invalid Booking ID', async ({ request }) => {

    const invalidBookingId = 99999999;

    const response = await request.put(
      `${baseURL}/booking/${invalidBookingId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `token=${token}`
        },

        data: {
          firstname: 'Sohib',
          lastname: 'Khan',
          totalprice: 500,
          depositpaid: true,
          bookingdates: {
            checkin: '2026-10-01',
            checkout: '2026-10-05'
          },
          additionalneeds: 'Breakfast'
        }
      }
    );

    console.log('Status:', response.status());

    expect(response.status()).toBe(405);
  });


  // TC-PUT-007
  test('TC-PUT-007 - Update booking without authentication', async ({ request }) => {

    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json'
      },

      data: {
        firstname: 'Unauthorized',
        lastname: 'User',
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
          checkin: '2026-10-01',
          checkout: '2026-10-05'
        },
        additionalneeds: 'Breakfast'
      }
    });

    console.log('Status:', response.status());

    expect(response.status()).toBe(403);
  });


  // TC-PUT-008
  test('TC-PUT-008 - Update booking with invalid totalprice', async ({ request }) => {

    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`
      },

      data: {
        firstname: 'Sohib',
        lastname: 'Khan',
        totalprice: 'ABC',
        depositpaid: true,
        bookingdates: {
          checkin: '2026-10-01',
          checkout: '2026-10-05'
        },
        additionalneeds: 'Breakfast'
      }
    });

    console.log('Status:', response.status());

    const body = await response.json();

    console.log('Response:', body);

    // API should not return a server error
    expect(response.status()).toBeLessThan(500);
  });


  // TC-PUT-009
  test('TC-PUT-009 - Update booking with invalid date format', async ({ request }) => {

    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`
      },

      data: {
        firstname: 'Sohib',
        lastname: 'Khan',
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
          checkin: '01-10-2026',
          checkout: '05-10-2026'
        },
        additionalneeds: 'Breakfast'
      }
    });

    console.log('Status:', response.status());

    const body = await response.json();

    console.log('Response:', body);

    expect(response.status()).toBeLessThan(500);
  });


  // TC-PUT-010
  test('TC-PUT-010 - Send malformed JSON', async ({ request }) => {

    const response = await request.put(`${baseURL}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`
      },

      data: '{"firstname":"Sohib","lastname":"Khan"'
    });

    console.log('Status:', response.status());

    const responseText = await response.text();

    console.log('Response:', responseText);

    expect(response.status()).not.toBe(200);
  });

});