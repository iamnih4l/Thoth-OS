# GitLab MCP Integration

## Why It Exists
Integrate with GitLab to manage repositories, CI pipelines, and merge requests.

## Setup Steps
1. Navigate to the MCP settings in your Antigravity workspace.
2. Add a new server configuration for GitLab.
3. Obtain necessary API keys or credentials.
4. Add the credentials to your environment variables or secure vault.

## Authentication
- **Type**: API Key / OAuth / Token
- **Required Scopes/Permissions**: Read, Write (adjust as needed)

## Example Workflows
- **Workflow 1**: Automating routine tasks using GitLab tools.
- **Workflow 2**: Querying GitLab for context during agent interactions.

## Tools Available
- read_repo, create_mr, trigger_pipeline
