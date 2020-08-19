import { AppConfig } from 'blockstack';
export const appConfig = new AppConfig(['store_write', 'publish_data']);
export const STATUS = 'local';
export const BASE_URL = {
    'local': 'http://127.0.0.1:3000/',
    'dev': 'https://',
    'production': 'https://',
};
export const API_URL = BASE_URL[STATUS] ;


