# asset-tracker-back
Asset tracker app back end

### config file

create a folder named "config" in root directory.
create file "config.json" with the following structure:
```javascript
  {
    "development": {
      "username": "admin",
      "password": "p0stgr3s4dm1n",
      "database": "asset-tracker",
      "host": "192.168.99.100",
      "port": 32769,
      "dialect": "postgres"
    },
    "test": {
      "username": "admin",
      "password": "p0stgr3s4dm1n",
      "database": "asset-tracker-test",
      "host": "192.168.1.104",
      "dialect": "postgres"
    },
    "production": {
      "username": "admin",
      "password": "p0stgr3s4dm1n",
      "database": "database_production",
      "host": "192.168.1.104",
      "dialect": "postgres"
    }
  }
```

