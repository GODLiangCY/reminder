## About

remind you about some routines.

If you have a `settings.json` like

```json
{
  "reminder.routine": [
    {
      "name": "Drink Water!",
      "interval": "15min",
      "description": "Drink 100ml of water"
    }
  ],
}
```

And for every 15 minutes, you'll have a notify as below

![](https://github.com/GODLiangCY/reminder/blob/main/preview.png)

## Config

After setting up some simple configurations, you can start using Reminder as you see fit.

1. `reminder.disable`

   - Type: `boolean`
   - Default: `false`

   Even if you have a Reminder, sometimes you don't want it to bother you. By setting `reminder.disable: true` will disable Reminder totally.

2. `reminder.routine`

   - Type: `RoutineInfo[]`

     ```typescript
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
        * Otherwise, the unit must be one of ['ms', 'sec', 'secs', 'min', 'mins', 'hr',
        * 'hrs']
        */
       interval: number | string
     
       /**
        * Description of routine, will be shown as the main content of infomation
        */
       description?: string
     }
     ```
     
   - Default: `[]`
   
     Routines that Reminder will remind you of what you need to do at specific intervals.

## Command

Reminder also provides some simple commands for you.

1. `reminder.stopReminding`

   Reminder will stop reminding until you command `reminder.recover` or restart this extension.

2. `reminder.recover`

   Recover Reminder.

## Credits

+ Thanks to [flaticon.com](https://www.flaticon.com/free-icon/reminder_1886913?term=reminder&page=1&position=31&page=1&position=31&related_id=1886913&origin=tag) for providing this icon.

## License

MIT License &copy; 2022-PRESENT [Young Liang](https://github.com/GODLiangCY)
