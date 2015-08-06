let localStorageFactory = function() {

	return {
		set(key, value) {
				window.localStorage[key] = value;
			},
			get(key, defaultValue) {
				return window.localStorage[key] || defaultValue;
			},
			removeItem(key) {
				window.localStorage.removeItem(key);
			},
			setObject(key, value) {
				window.localStorage[key] = JSON.stringify(value);
			},
			getObject(key) {
				return JSON.parse(window.localStorage[key] || '{}');
			}
	};


};

export default localStorageFactory;
