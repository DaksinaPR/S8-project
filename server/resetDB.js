const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Application = require('./models/Application');

async function resetDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');
        const result = await Application.deleteMany({});
        console.log(`Deleted ${result.deletedCount} applications.`);

        // Let's also delete notifications to be clean 
        const Notification = require('./models/Notification');
        const notifResult = await Notification.deleteMany({});
        console.log(`Deleted ${notifResult.deletedCount} notifications.`);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

resetDB();
