const request = require('supertest');
const app = require('../src/server'); // Import your Express app
const mongoose = require('mongoose');
const Assignment = require('../src/models/Assignment');
const User = require('../src/models/User');

// Setup MongoDB memory server for testing (you can use jest-mongodb if needed)
beforeAll(async () => {
  // Connect to test database
  const dbURI = process.env.TEST_DB_URI || 'mongodb://localhost:27017/submissiox_test';
  await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  // Clear the test database after each test
  await Assignment.deleteMany();
  await User.deleteMany();
});

describe('Assignment API', () => {
  
  let userToken;
  let adminToken;

  beforeEach(async () => {
    // Create test user and admin
    await request(app).post('/register').send({
      username: 'user1',
      password: 'password123',
      role: 'user',
    });

    await request(app).post('/register').send({
      username: 'admin1',
      password: 'password123',
      role: 'admin',
    });

    // Login as user and admin to get tokens
    const userLogin = await request(app).post('/login').send({
      username: 'user1',
      password: 'password123',
    });
    userToken = userLogin.body.token;

    const adminLogin = await request(app).post('/login').send({
      username: 'admin1',
      password: 'password123',
    });
    adminToken = adminLogin.body.token;
  });

  test('User can upload an assignment', async () => {
    const response = await request(app)
      .post('/upload')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        userId: 'user1',
        task: 'My first assignment',
        admin: 'admin1',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Assignment uploaded successfully');
    expect(response.body.assignment).toHaveProperty('_id');
  });

  test('Admin can view assignments tagged to them', async () => {
    // Upload assignment first
    await request(app)
      .post('/upload')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        userId: 'user1',
        task: 'Test assignment',
        admin: 'admin1',
      });

    // Admin retrieves the assignments
    const response = await request(app)
      .get('/assignments')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.assignments).toHaveLength(1);
    expect(response.body.assignments[0].task).toBe('Test assignment');
  });

  test('Admin can accept an assignment', async () => {
    // Upload an assignment
    const uploadResponse = await request(app)
      .post('/upload')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        userId: 'user1',
        task: 'Assignment to be accepted',
        admin: 'admin1',
      });

    const assignmentId = uploadResponse.body.assignment._id;

    // Admin accepts the assignment
    const response = await request(app)
      .post(`/assignments/${assignmentId}/accept`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Assignment accepted');
    const updatedAssignment = await Assignment.findById(assignmentId);
    expect(updatedAssignment.status).toBe('accepted');
  });

  test('Admin can reject an assignment', async () => {
    // Upload an assignment
    const uploadResponse = await request(app)
      .post('/upload')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        userId: 'user1',
        task: 'Assignment to be rejected',
        admin: 'admin1',
      });

    const assignmentId = uploadResponse.body.assignment._id;

    // Admin rejects the assignment
    const response = await request(app)
      .post(`/assignments/${assignmentId}/reject`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Assignment rejected');
    const updatedAssignment = await Assignment.findById(assignmentId);
    expect(updatedAssignment.status).toBe('rejected');
  });
});
