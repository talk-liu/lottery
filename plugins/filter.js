import Vue from 'vue';
const filters = {
    userInformation(value) {
        if (!value) {
            return value
        }
        const s = value.substring(0, 6)
        const e = value.substring(value.length - 3, value.length)
        return s + ' ... ' + e
    },

};

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});