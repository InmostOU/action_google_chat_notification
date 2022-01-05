const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const WEBHOOK_URL = core.getInput('WEBHOOK_URL') || process.env.WEBHOOK_URL;
const HEAD_COMMIT = core.getInput('HEAD_COMMIT') ? JSON.parse(core.getInput('HEAD_COMMIT')) : JSON.parse(process.env.HEAD_COMMIT);
if (HEAD_COMMIT === undefined) {
    throw new Error('HEAD_COMMIT not found');
}

const data = {
    'text': 'Hello from a Node script! <users/105666000256702527739>',
};

async function main() {
    await axios.post(WEBHOOK_URL, data, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    });

    console.log('HEAD_COMMIT:', HEAD_COMMIT);
    console.log('github.context.ref:', github.context.ref);
}

main()
    .then(() => console.log('inserted row in Excel successfully'))
    .catch((err) => core.setFailed(`Failed -> ${err}`));
