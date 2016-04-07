# consul-bootstrap

This is a really simple library for bootstrapping the Consul KV store from a JSON or JavaScript file.

## Usage

You can execute the utility from the command line:

```bash
node index.js --host 192.168.33.11 --input ./test/config.json
```

The total number of options include:

* `--host`: Host of the Consul server (default 127.0.0.1).
* `--port`: Port of the Consul server (default 8500).
* `--input`: JSON or JavaScript file with the KV's to bootstrap.
* `--debug`: Output debug messages to the console.

## JSON/JavaScript to Consul KV Pairs

It's important to mention that this utility flattens the JavaScript object structure so that it's hierarchical nature is reflected in the Consul key structure.  For example:

```json
{
  "foo": "bar",
  "colors": {
    "red": "#ff0000",
    "blue": "#0000ff",
    "green": "#00ff00"
  },
  "services": {
    "email": {
      "host": "http://email.svcs.youeye.com"
    }
  }
}
```

Gets translated to:

```bash
foo -> bar
colors/red -> #ff0000
colors/blue -> #0000ff
colors/green -> #00ff00
services/email/host -> http://email.svcs.youeye.com
```

OK, but let's say you want an object in the hierarchy to be preserved.  You can inform the utility simply by adding a property called `@preserve` under that object:

```json
{
  "services": {
    "email": {
      "host": "http://email.svcs.youeye.com",
      "backend": {
        "@preserve": true,
        "pool": true,
        "host": "smtp.gmail.com",
        "port": 465,
        "secure": true,
        "auth": {
          "user": "user@gmail.com",
          "pass": "pass"
        }
      }
    }
  }
}
```

Gets translated to:

```bash
services/email/host -> http://email.svcs.youeye.com
services/email/backend -> {
                            "pool": true,
                            "host": "smtp.gmail.com",
                            "port": 465,
                            "secure": true,
                            "auth": {
                              "user": "user@gmail.com",
                              "pass": "pass"
                            }
                          }
```

## License

The MIT License (MIT)
Copyright (c) 2016 YouEye, a UserZoom Company

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.