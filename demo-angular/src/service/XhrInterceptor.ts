import {HttpHandler, HttpRequest, HttpInterceptor} from "@angular/common/http/index";
import {Injectable} from "@angular/core";
/**
 * Created by fenggu on 2023/6/7.
 */
@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}
