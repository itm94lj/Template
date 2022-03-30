login module problems:
    1.login status code 401
    	try to fix:
	1. the problem occurred after xhrInterceptor added try to roll back. Not Work.
	2. disable http basic authentication. It works. We need to figure out why basic authentication not work. Add withCredentials option to xhrInterceptor fix this,but meet new problems.
	3. in springboot add .allowedOrigins("*")
	4. the console output 'The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.'
	5. try to add allowCredentials(true) to corsConfigurer. meet a new problem: ' No 'Access-Control-Allow-Origin' header is present on the requested resource.
	6. delete allowCredentials(true). console log 'The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. '.Try to change allowedOrigins to particular url:http://localhost:4200
	cannot fix it.Try to revert to simplest sample, with no authentication.
	1.'The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.'==> In the server doFilter set response with Access-Control-Allow-Origin to http://localhost:4200
	2. 'The value of the 'Access-Control-Allow-Credentials' header in the response is '' which must be 'true' when the request's credentials mode is 'include'.' ==> In the server set response with Access-Control-Allow-Credentials to true.
	3. Try to add basic authentication.
	   1. Add authorization: 'Basic' + btoa(username+':'+password)
	   problem:'Access to XMLHttpRequest at 'http://localhost:8080/signin' from origin 'http://localhost:4200' has been blocked by CORS policy: Request header field authorization is not allowed by Access-Control-Allow-Headers in preflight response.'
	   fix:in server doFilter add response.setHeader with "Access-Control-Allow-Origin", "request origin" and "Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS,PATCH", "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"
	   problem:signin response null
	   fix:in Server configure add http related configure:
	   	  http.httpBasic().and()
		  .authorizeRequestes()
		  .antMatchers("/", "/signin").permitAll()
		  .anyRequest().authenticated()
		  .and()
		  .csrf()
		  .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse());
	  problem:'Access to XMLHttpRequest at 'http://localhost:8080/signin' from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.'
	  fix:Add Access-Control-Allow-Headers to doFilter
	  problem:401 after pop login form submit
	  fix:add X-Requested-With to XhrInterceptor
	     add Access-Control-Allow-Origin with http://localhost:4200 to doFilter
	 fix2: according to wireshark the localhost use ipv6 try to modify to iipv4 address,not work.
	 fix3: try to figure if the authorization part is not right.
	       the authorization change from 'Basic' to 'Basic '
    try to remove unnecessary part:
    	Server side:
	       1. addCorsMappings
	          allowOrigins cannot be * must be a specific url.
	       	  need allowCredentials(true)
	       2. doFilter not set response Header.
       Angular side:
       	       1. Basic authentication no need to remove.


post method with basic authentication not pass need to figure out why.