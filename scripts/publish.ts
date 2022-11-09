import { join } from 'node:path'
import { execa, execaCommand } from 'execa'
import chalk from 'chalk'
import { versionBump } from 'bumpp'

const root = join(__dirname, '..')
const step = (msg: string) => console.log(chalk.magenta(msg))

async function publish() {
  step('bump version\n')
  const { newVersion } = await versionBump()

  step('generate CHANGELOG\n')
  await execaCommand('pnpm changelog')

  step('generate git commit\n')
  await execaCommand('git add .')
  await execa('git', ['commit', '-m', `"chore: release ${newVersion}"`])

  step('push to GitHub\n')
  await execaCommand(`git tag -a ${newVersion} -m v${newVersion}`)
  await execaCommand('git push origin main')

  step('push to VS Code extensions marketplace\n')
  await execaCommand('vsce publish --no-dependencies', { cwd: root })
}

publish()
