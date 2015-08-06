let authInterceptorFactory = function($q, $injector) {

  return {
    request(config) {
        var token = window.localStorage.auth_token;
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      responseError(response) {
        if (response.status === 401 || response.status === 403) {
          window.localStorage.removeItem('auth_token');
          $injector.get('$state').go('about');
        }
        return $q.reject(response);
      }
  };
};

export default authInterceptorFactory;
