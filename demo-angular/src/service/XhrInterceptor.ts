import {HttpHandler, HttpRequest, HttpInterceptor} from "@angular/common/http/index";
import {Injectable} from "@angular/core";
import {AuthenticateService} from "./authenticate.service";
/**
 * Created by fenggu on 2023/6/7.
 */
@Injectable()
export class XhrInterceptor implements HttpInterceptor {


    constructor(private authService: AuthenticateService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
      const access_token = this.authService.access_token;
      const auth_header = 'Bearer ' + access_token;

      let xhr = req.clone({
        headers: req.headers
          // .set('X-Requested-With', 'XMLHttpRequest')
          // .set('Content-Type', 'application/x-www-form-urlencoded')
      });

      if (access_token && access_token.length > 0) {
        xhr = xhr.clone({
          headers: xhr.headers.set('Authorization', auth_header)
        });
      }
      return next.handle(xhr);
  }
}
