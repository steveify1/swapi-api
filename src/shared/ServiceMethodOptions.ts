/**
 * This contains a set of properties for the optional `options` parameter of
 * the public methods in the service class of a component.
 */
export interface ServiceMethodOptions {
  /**
   * An IP address representing the current user
   */
  currentUser?: string;

  /**
   * The request query object
   */
  query?: any
}
