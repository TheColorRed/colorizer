namespace colorshop.filters {
  export abstract class filter extends util.imageUtility {
    public abstract apply(options?: any): void
  }
}