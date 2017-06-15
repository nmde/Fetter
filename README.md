# Fetter
Manages and extends variables and types.

### Why?
Fetter was created to be used in my other projects to enforce rules on myself and the user.

### Features
- Force users to supply good arguments
- Force yourself to write good code
- Get cutting-edge features instantly
- Use helpful built-in utilities

### Usage
Simply load Fetter, then access your desired data type through the main object.
```
const f = require('fetter');
const myNumber = new f.Number(5);
```

The contents of every Fetter object must be accessed through either their "value" property or their "get" method. They can be changed by setting their "value" property or using their "set" method. The exact behavior changes depending on which data type you are using. All Fetter objects also include a .equals method for easily testing if two Fetter objects are equal.

### Creating New Types
Fetter provides two extensible classes for creating new types, "Class" and "Simple". The simple class should be used to make simple types that only store data, like "String", "Number" and "Boolean". For more complex types, the generic "Class" should be used. "Array" and "Object" both use Class.
