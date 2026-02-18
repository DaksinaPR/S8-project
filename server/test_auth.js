const axios = require('axios');

const testRegister = async () => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
            name: 'Test User',
            email: `test${Date.now()}@example.com`,
            password: 'password123',
            mobile: '1234567890',
            role: 'entrepreneur'
        });
        console.log('Success:', res.data);
    } catch (error) {
        if (error.response) {
            console.log('Error Status:', error.response.status);
            console.log('Error Data:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
    }
};

testRegister();
