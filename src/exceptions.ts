export class CardError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CardError";
  }
}

export class ConfigError extends CardError {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}

export class ParseError extends CardError {
  constructor(message: string) {
    super(message);
    this.name = "ParseError";
  }
}
