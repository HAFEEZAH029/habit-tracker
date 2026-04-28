import { STORAGE_KEYS } from "./constants";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "./storage";
import { Session, User } from "../types/auth";

function generateId() {
  return crypto.randomUUID();
}

export function getUsers(): User[] {
  return getStorageItem<User[]>(STORAGE_KEYS.USERS, []);
}

export function getSession(): Session | null {
  return getStorageItem<Session | null>(STORAGE_KEYS.SESSION, null);
}

export function signupUser(email: string, password: string) {
  const users = getUsers();

  const exists = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (exists) {
    return {
      success: false,
      error: "User already exists",
    };
  }

  const user: User = {
    id: generateId(),
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [...users, user];

  setStorageItem(STORAGE_KEYS.USERS, updatedUsers);

  const session: Session = {
    userId: user.id,
    email: user.email,
  };

  setStorageItem(STORAGE_KEYS.SESSION, session);

  return {
    success: true,
    user,
  };
}

export function loginUser(email: string, password: string) {
  const users = getUsers();

  const user = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() &&
      u.password === password
  );

  if (!user) {
    return {
      success: false,
      error: "Invalid email or password",
    };
  }

  const session: Session = {
    userId: user.id,
    email: user.email,
  };

  setStorageItem(STORAGE_KEYS.SESSION, session);

  return {
    success: true,
    user,
  };
}

export function logoutUser() {
  removeStorageItem(STORAGE_KEYS.SESSION);
}