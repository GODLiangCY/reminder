export interface RoutineInfo {
  /**
   * Name for routine, will be shown as the title of infomation
   */
  name: string

  /**
   * Interval for routine.
   *
   * If it's a number, then the unit is minutes.
   * And if it's a plain string, the unit is also minutes.
   * Otherwise, the unit must be one of ['ms', 's', 'sec', 'secs', 'm', 'min', 'mins',
   * 'h', 'hr', 'hrs']
   */
  interval: number | string

  /**
   * Description of routine, will be shown as the main content of infomation
   */
  description?: string

  /**
   * Remind in silent version
   *
   * By default, notification will be shown in a modal.
   * Setting true will notify as a message.
   * @default false
   */
  silent?: boolean
}
