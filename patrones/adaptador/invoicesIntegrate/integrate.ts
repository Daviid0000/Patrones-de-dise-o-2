interface NewSystemInterface {
  request(): string;
}

export class OldSystem {
  specificRequest(): string {
      return 'Response from the old system';
  }
}

export class Adapter implements NewSystemInterface {
  private oldSystem: OldSystem;

  constructor(oldSystem: OldSystem) {
      this.oldSystem = oldSystem;
  }

  request(): string {
      return this.oldSystem.specificRequest();
  }
}
