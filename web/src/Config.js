const IS_DEV = false;
const DEV_URL = 'http://localhost:5555';
const PROD_URL = 'https://athenaapi.kaluba.tech';

const Config = {
    apiUrl: IS_DEV ? DEV_URL : PROD_URL
};

export default Config;