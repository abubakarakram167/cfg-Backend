module.exports = {

    requiredVariables: [],

    /**
     * Get value of specified environment variable. If it is not set return defaultValue.
     * Throw an error if it's required bur not set.
     *
     * By default, all .env variables are handled as strings, hence the switch() at the bottom to
     * prevent possible issues due to inconsistent types.
     *
     * @param {string} variableName - The variable being requested
     * @param {string|number|boolean} [defaultValue] - The default value to be used in case the variable has not been set
     * @param {type} [castAs] - As what the given variable should be casted
     * @returns {string|number|boolean}
     */
    get(variableName, defaultValue, castAs) {
        if (this.requiredVariables.indexOf(variableName) >= 0 && process.env[variableName] === undefined) {
            throw new Error(`Environment variable "${variableName}" is required`);
        }

        const envVariable = process.env[variableName] === undefined ? defaultValue : process.env[variableName];

        switch (castAs) {
        case Boolean:
            return (envVariable === 'true' || envVariable === true);

        case Number:
            return parseInt(envVariable, 10);
        default:
            // code block
        }

        return envVariable;
    },

    required(variable) {
        if (Array.isArray(variable)) {
            this.requiredVariables = this.requiredVariables.concat(variable);
        } else {
            this.requiredVariables.push(variable);
        }
    },
};
