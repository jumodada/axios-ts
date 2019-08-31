export default class Cancel {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

export const isCancel = (value: any): boolean => value instanceof Cancel
