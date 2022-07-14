#  Spring Security 涉及的认证方法与实践

## [整体结构](https://docs.spring.io/spring-security/reference/servlet/architecture.html)

Spring Security中针对Servlet的支持是基于Servlet Filter实现的。客户端的请求在被Servlet处理前会有由多个Filter组成的FilterChain进行过滤。

  FilterChain的管理是由Servlet Container进行的。为了将Spring的上下文和Servlet Ccontainer关联起来，Spring提供了一个Filter的实现类DelegatingFilterProxy，并注册到Servlet Container的FilterChain中，由它来调用Spring Application Context中所有实现了Filter类的Spring Bean。

  Spring Security提供了一个特殊的Filter，FilterChainProxy来支持基于Servlet的安全机制。在其中会调用SecurityFilterChain。FilterChainProxy提供了一个所有安全相关Filter的集合，方便安全相关的调试。其次，FilterChainProxy作为Spring Security的核心组件，拥有更多的权限，例如：清空SecurityContext,使用HttpFirewall等。

  Security filters: Spring Security提供的安全相关的Filter，会按顺序进行各种安全功能的检查。

## [认证](https://docs.spring.io/spring-security/reference/servlet/authentication/index.html)

Spring Security支持多种认证方式，接下来对常用和自己可能选用的认证方式进行部分阅读理解。

###     [用户名密码方式](https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/index.html#servlet-authentication-unpwd)

​    最基础的认证方法是使用用户名和密码的方式进行认证。Spring Security提供了三种内置的从HttpServletRequest中读取用户名密码的方式：[Form](https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/form.html) 、[Basic](https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/basic.html) 、[Digist](https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/digest.html)。

1. Form认证方式： 
   - 用户发起未授权的请求
   - Spring Security重定向到登录页面

用于登录的Form需要具备如下关键点：

发起的是POST请求、需要由CSRF Token、使用参数username传递用户名、使用password传递密码、error参数用于表征无法提供用户名密码、logout参数用于表征登出成功。

2. Basic认证方式

   Spring Security提供基于[RFC7617](https://datatracker.ietf.org/doc/html/rfc7617)的Basic HTTP Authentication。

   - 用户发起未授权的请求
   - Spring Security发送一个WWW-Authenticate header表示需要认证

3. Digist认证方式

   Spring Security提供基于[RFC2617](https://datatracker.ietf.org/doc/html/rfc2617)的Digest Authentication。
