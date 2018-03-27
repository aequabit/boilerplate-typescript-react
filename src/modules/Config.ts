import * as config from './../../config.json';

export default class Config {
    /**
     * Checks if a config key exists.
     * @param {string} key
     * @returns {boolean}
     */
    public static exists(key: string): boolean {
        return key in config;
    }

    /**
     * Gets a config parameter.
     * @param {string} key
     * @returns {any}
     */
    public static get(key: string): any {
        if (!Config.exists(key)) return null;

        return config[key];
    }
}
