// File Type: Store

import firebase from 'firebase/app';
import 'firebase/database';

import { DB_CONFIG } from '../config/config';

// Constant for firebase database
const app = firebase.initializeApp(DB_CONFIG);

export default app;