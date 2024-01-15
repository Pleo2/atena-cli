import { setTimeout } from 'node:timers/promises'
import { exec } from 'node:child_process'
// ---
import * as p from '@clack/prompts'
import color from 'picocolors'
import fl from 'figlet'

async function main() {
    console.clear()
    const options = []
    exec('ollama list', (err, stdout) => {
        if (err) throw err.message
        const output = stdout.split('\n')
        return output
                .slice(1, output.length - 1)
                .forEach(item => {
                    const model = item.substring(0, item.indexOf(':'))
                    options.push({value: model, label: model} 
)                })
    })
    const s = p.spinner()
    await setTimeout(500)
    p.intro(`${color.bgCyan(color.black("Hi there I'm Atena!\n"))}`)
    const selectmodel = await p.select({
        message: `select model that you want use \n ${color.gray(
            'Remenber you can install more models available in https://ollama.ai/library',
        )}`,
        options: options, 
    })
    await setTimeout(500)
    fl(`${selectmodel} is run`, (err, data) => {
        if (err) console.error(err)
        console.log(color.yellow(data))
    })
    await setTimeout(500)

    const text = await p.text({
        message: `What do you know about`,
        placeholder: 'Which the capital of france',
        validate(value) {
            if (value.length === 0) return `Write something first...`
        },
    })

    s.start('thinking about the capital of france')
    await setTimeout(2000)
    s.stop('thinking about the capital of france')
    p.outro(`${color.bgMagenta(color.black('See you later'))}`)
}

function execShellCommand(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error)
            }
            resolve(stdout ? stdout : stderr)
        })
    })
}

main().catch(console.error)
