## Configuring Your Application

Your application uses a hierarchical configuration file, which can be loaded from either an environment variables or a JSON file.

### Environment Variables

You can set the following environment variables to customize your config:

* `CONFIG_FILE`: The path to your custom config file (default: `config.json`)

### Config File

Your application expects a JSON file with the following structure:

```json
{
  "log": {
    "path": ""
  },
  "store": {},
  "lmStudio": {
    "endpoint": ""
  }
}