import { DB_CONFIG } from '../config/config';
import firebase from 'firebase/app';
import 'firebase/database';

const app = firebase.initializeApp(DB_CONFIG);

export default app;