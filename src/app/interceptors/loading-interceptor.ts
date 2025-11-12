import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../loading/loading.service';
import { finalize, tap } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  return next(req).pipe(
    tap(() => loadingService.loadingToggleOn()),
    finalize(() => loadingService.loadingToggleOff())
  );
};
