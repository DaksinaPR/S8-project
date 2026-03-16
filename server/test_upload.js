const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

async function testSubmit() {
    try {
        // Authenticate to get token
        const authRes = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'roobansridhar@gmail.com',  // Try a known email, let's assume it exists or register one, wait, I can just use any user token from DB.
            password: 'password123'
        });
        const token = authRes.data.token;
        console.log('Login successful');

        // Create a dummy file
        fs.writeFileSync('dummy.jpg', 'fake image content');

        const data = new FormData();
        data.append('applicationId', 'APP-TEST');
        data.append('businessName', 'AI Test');
        data.append('businessType', 'IT Company');
        data.append('address', 'Test Addr');
        data.append('founderEmail', 'test@test.com');
        data.append('documents', fs.createReadStream('dummy.jpg'));

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                ...data.getHeaders()
            }
        };

        console.log('Submitting application...');
        const res = await axios.post('http://localhost:5000/api/applications', data, config);
        console.log('Success:', res.data);
    } catch (err) {
        console.error('Server error:', err.response?.data || err.message);
    } finally {
        if (fs.existsSync('dummy.jpg')) fs.unlinkSync('dummy.jpg');
    }
}

testSubmit();
