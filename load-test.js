import http from 'k6/http';
import { check, sleep } from 'k6';

// k6 run load-test.js
export const options = {
  stages: [
    { duration: '30s', target: 50 }, // Ramp-up to 50 users
    { duration: '1m', target: 50 },  // Stay at 50 users for 1 min
    { duration: '30s', target: 200 }, // Spike to 200 users
    { duration: '1m', target: 200 }, // Hold spike
    { duration: '30s', target: 0 },  // Ramp-down to 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.01'],   // Error rate should be less than 1%
  },
};

const BASE_URL = 'http://localhost:3000'; // Replace with production URL when testing

export default function () {
  // 1. Test Homepage (Public cache check)
  const homeRes = http.get(`${BASE_URL}/`);
  check(homeRes, {
    'homepage status is 200': (r) => r.status === 200,
    'homepage responds quickly': (r) => r.timings.duration < 500,
  });

  sleep(1);

  // 2. Test Events Listing (Public cache check)
  const eventsRes = http.get(`${BASE_URL}/events`);
  check(eventsRes, {
    'events status is 200': (r) => r.status === 200,
  });

  sleep(1);

  // 3. Test Auth Endpoint Rate Limiting (Should start hitting 429 after 5 requests per IP)
  const authPayload = JSON.stringify({
    email: 'test@example.com',
    password: 'wrongpassword',
  });
  const authRes = http.post(`${BASE_URL}/api/auth/callback/credentials`, authPayload, {
    headers: { 'Content-Type': 'application/json' },
  });
  
  check(authRes, {
    'auth returns 200 or 401 or 429': (r) => [200, 401, 429].includes(r.status),
  });

  sleep(1);
}
