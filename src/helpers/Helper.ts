export class Helpers {
  public static someHelper(
    email: string,
    something: string
  ): { email: string; something: string } {
    return { email, something };
  }
}
