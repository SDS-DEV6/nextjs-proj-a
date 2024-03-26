export class UsernameNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UsernameNotFoundError";
  }
}
