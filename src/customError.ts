class CustomError extends Error {
  public message: string
  public identifier: string
  public args: string[]
  public code: number
  public status: number

  constructor(message: string, status = 500, code = 400, args: string[] = [], identifier: string = '') {
      super(message)
      this.message = message
      this.status = status
      this.code = code
      this.args = args
      this.identifier = identifier
      Object.setPrototypeOf(this, CustomError.prototype)
  }

  public getData(identifier: string) {
      return {
          error: {
              args: this.args,
              code: this.code,
              defaultMessage: this.message,
              identifier,
          },
      }
  }

  public getStatus() {
      return this.status
  }
}

export { CustomError }