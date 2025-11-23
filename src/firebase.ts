import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getRemoteConfig } from 'firebase/remote-config';

const firebaseConfig = {
    apiKey: "AIzaSyAe2FrCf5nIOebw-MCbxkfepXnLk3aJz0w",
    authDomain: "novvapps-wedding-invitation.firebaseapp.com",
    projectId: "novvapps-wedding-invitation",
    storageBucket: "novvapps-wedding-invitation.firebasestorage.app",
    messagingSenderId: "384448324612",
    appId: "1:384448324612:web:232358f59e3d5076c70151",
    measurementId: "G-MMZ26F6XG1"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const realtimeDb = getDatabase(firebaseApp, 'https://novvapps-wedding-invitation-default-rtdb.asia-southeast1.firebasedatabase.app');
export const remoteConfig = getRemoteConfig(firebaseApp);
remoteConfig.settings.minimumFetchIntervalMillis = 60000;
