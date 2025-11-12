import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  #isLoading = signal(false);

  loading = this.#isLoading.asReadonly();

  loadingToggleOn() {
    this.#isLoading.set(true);
  }

  loadingToggleOff() {
    this.#isLoading.set(false);
  }
}
