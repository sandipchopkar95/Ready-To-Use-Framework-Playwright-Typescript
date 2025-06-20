import { testConfig } from '../config/testConfig';
import fs from 'fs';

async function clearAllSessions() {
    try {
        const storagePaths = Object.values(testConfig.storagePaths);

        storagePaths.forEach((path) => {
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
                console.log(`Session storage removed: ${path}`);
            }
        });

        console.log('All session storage files have been removed.');
    } catch (error) {
        console.error('Error while removing session storage:', error);
    }
}

export default clearAllSessions;



