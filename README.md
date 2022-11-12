<br>

<p align="center">
<img src="https://raw.githubusercontent.com/GODLiangCY/reminder/main/reminder.png" style="width:100px;" height="128" />
</p>

<h1 align="center">Reminder</h1>

<p align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=GODLiangCY.routine-reminder" target="__blank"><img src="https://img.shields.io/visual-studio-marketplace/v/GODLiangCY.routine-reminder.svg?color=eee&amp;label=VS%20Code%20Marketplace&logo=visual-studio-code" alt="Visual Studio Marketplace Version" /></a></p>


<p align="center">
<a href="https://github.com/GODLiangCY/reminder/blob/main/README.md">English</a>
|
<a href="https://github.com/GODLiangCY/reminder/blob/main/README-zh.md">中文</a>
</p>


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
  ]
}
```

And for every 15 minutes, you'll have a notification as below

![](https://raw.githubusercontent.com/GODLiangCY/reminder/main/preview.png)

## Config

After setting up some simple configurations, you can start using Reminder as you see fit.

1. `reminder.disable`

   - Type: `boolean`
   - Default: `false`

   Even if you have a Reminder, sometimes you don't want it to bother you. Setting `reminder.disable: true` will disable Reminder totally.

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
     ```
     
   - Default: `[]`
   
     Routines that Reminder will remind you of what you need to do at specific intervals.

## Command

Reminder also provides some simple commands for you, like stop or recover Reminder and so on. Feel free to explore it.

## Credits

+ Thanks to [flaticon.com](https://www.flaticon.com/free-icon/reminder_1886913?term=reminder&page=1&position=31&page=1&position=31&related_id=1886913&origin=tag) for providing this icon.

## License

MIT License &copy; 2022-PRESENT [Young Liang](https://github.com/GODLiangCY)
