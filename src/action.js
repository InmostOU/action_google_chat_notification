const core = require('@actions/core');
const axios = require('axios');

const WEBHOOK_URL = core.getInput('WEBHOOK_URL') || process.env.WEBHOOK_URL;
const APPLICATION_TYPE = core.getInput('APPLICATION_TYPE') || process.env.APPLICATION_TYPE;
const BRANCH_REF = core.getInput('BRANCH_REF') || process.env.BRANCH_REF;
const HEAD_COMMIT = core.getInput('HEAD_COMMIT') ? JSON.parse(core.getInput('HEAD_COMMIT')) : JSON.parse(process.env.HEAD_COMMIT);
if (HEAD_COMMIT === undefined) {
    throw new Error('HEAD_COMMIT not found');
}

let serverType;
if (BRANCH_REF.includes('main')) {
    serverType = '<font color=\"#e20f0f\">Prod</font>';
} else if (BRANCH_REF.includes('dev')) {
    serverType = '<font color=\"#0fe279\">Dev</font>';
} else {
    throw new Error('git ref branch is incorrect:', github.context.ref);
}

let message;
switch (APPLICATION_TYPE) {
    case 'MOBILE':
        message = `Новая версия <font color=\"#0090ff\">мобильного приложения</font>\n доступна для тестирования`;
        break;
    case 'SERVER':
        message = `Новая версия <font color=\"#0090ff\">бекенда</font> доступна для\n тестирования`;
        break;
    case 'WEB':
        message = `Новая версия <font color=\"#0090ff\">сайта</font> доступна для\n тестирования`;
        break;
    default:
        throw new Error('APPLICATION_TYPE not found');
}

async function sendCardMessage() {
    await axios.post(WEBHOOK_URL, {
        "cards": [
            {
                "sections": [
                    {
                        "widgets": [
                            {
                                "keyValue": {
                                    "content": serverType,
                                }
                            },
                            {
                                "keyValue": {
                                    "content": message,
                                    "icon": "STAR",
                                },
                            },
                        ]
                    }
                ]
            }
        ]
    }, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    });
}

async function main() {
    await sendCardMessage();

    console.log('HEAD_COMMIT:', HEAD_COMMIT);
    console.log('github.context.ref:', github.context.ref);
}

main()
    .then(() => console.log('inserted row in Excel successfully'))
    .catch((err) => core.setFailed(`Failed -> ${err}`));
