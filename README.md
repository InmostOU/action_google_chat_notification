# action_google_chat_notification

Sends a message about the availability of a new build to a chat

## Usage Example

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Send message to google chat
        uses: InmostOU/action_google_chat_notification@main
        with:
          WEBHOOK_URL: ${{ secrets.WEBHOOK_URL }}
          APPLICATION_TYPE: ${{ secrets.APPLICATION_TYPE }}
          HEAD_COMMIT: ${{ toJSON(github.event.head_commit) }}
          BRANCH_REF: ${{ github.ref }}
```

## Inputs

#### WEBHOOK_URL [Required]

- Open any group chat in Google Chat.
- Find Manage webhooks in the settings.
- Generate a new hook and add to Git.

#### HEAD_COMMIT [Required]

Commit info

#### APPLICATION_TYPE [Required]

The type of application you will create. Can be: [MOBILE, SERVER, WEB]

#### BRANCH_REF [Required]

The branch from which you create a commit
