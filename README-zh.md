## 关于

提醒你一些事情

如果你的 `settings.json` 像下面这样

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

那么每隔 15 分钟，你会收到如下提醒

![](https://raw.githubusercontent.com/GODLiangCY/reminder/main/preview.png)

## 配置

设置一些简单的配置后,你就能按自己所需使用 Reminder

1. `reminder.disable`

   - Type: `boolean`

   - Default: `false`

     即使你有一个 Reminder, 有时候你也不希望它打扰你.设置 `reminder.disable` 会彻底禁用 Reminder

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
   
     每隔一段特定的时间, Reminder 会提醒你这些事情

## 命令

Reminder 也为你提供了一些命令.

1. `reminder.stopReminding`

   Reminder 会停止提醒你, 直到你输入 `reminder.recover` 命令或重新启动该拓展

2. `reminder.recover`

   恢复 Reminder

## 致谢

+ 感谢 [flaticon.com](https://www.flaticon.com/free-icon/reminder_1886913?term=reminder&page=1&position=31&page=1&position=31&related_id=1886913&origin=tag) 提供此 icon

## License

MIT License &copy; 2022-PRESENT [Young Liang](https://github.com/GODLiangCY)
