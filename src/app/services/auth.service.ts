import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { environment } from "../../environments/environment";
import { User } from "../models/user.model";

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  #userSignal = signal<User | null>(null);

  user = this.#userSignal.asReadonly();
  isLoggedIn = computed(() => !!this.user());

  constructor() {
    this.loadUserFromStorage();

    effect(() => {
      const user = this.user();
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      }
    });
  }

  async login(email: string, password: string): Promise<User> {
    const login$ = this.http.post<User>(`${environment.baseUrl}/login`, {email, password});
    const user = await firstValueFrom(login$);
    this.#userSignal.set(user);
    return user;
  }

  logout(): void {
    this.#userSignal.set(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  }

  loadUserFromStorage(): void {
    const userJson = localStorage.getItem(USER_STORAGE_KEY);
    if (userJson) {
      const user: User = JSON.parse(userJson);
      this.#userSignal.set(user);
    }
  }
}
