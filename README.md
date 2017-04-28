# Fetter
Manages variables and types.

### Why?
I created Fetter to be used in my other libraries to enforce rules on the user.


### Usage
Simply load Fetter, then access your desired data type through the main object.
```
const f = require('fetter');
const myNumber = new f.Number(5);
```

The contents of every Fetter object must be accessed through either their "value" property or their "get" method. They can be changed by setting their "value" property or using their "set" method. The exact behavior changes depending on which data type you are using. All Fetter objects also include a .equals method for easily testing if two Fetter objects are equal.

### Types

#### Any
The Any type will accept any value.

Example:
```
const any = new f.Any(5);
any.set('Five');
```

#### Array
The Array type is the most complex. Fetter Arrays can have a subtype specified to restrict the types of data that can be added.

To define a subtype, pass the constructor as the second argument to f.Array. If no subtype is specified, "Any" will be the default.

Example:
```
const arr = new f.Array([], f.Number);

// Valid
arr.push(5);
arr.push(new f.Number(4));

// Invalid
arr.push('Five');
arr.push(new f.String('Five'));
```

Arrays can also contain arrays.

```
const matrix = new f.Array([[], [], []], f.Array, f.Number)
```

Unlike built-in arrays, items must be accessed through the .get and .set methods. The .set method, when passed a single array, will replace the current array with the new one. When passed an index and an object, it will set the index in the current array to the object.


```
const arr = new f.Array([1,2,3]);
// Sets the array to [2,3,4]
arr.set([2,3,4]);
// Replaces '3' with '5'
arr.set(1, 5);
```

#### Boolean
Booleans are identical to the standard JavaScript booleans, but with many logic gates already included.

Example:
```
const bool = new f.Boolean(true);
bool.not(); // bool is now false
bool.or(new f.Boolean(false)); // Returns false
bool.nand(new f.Boolean(false)); // Returns true
bool.equals(false); // Returns true
```

Fetter Booleans include the following utility methods:

- .not
- .and
- .or
- .xor
- .nand
- .nor
- .xnor

#### Date
Dates are identical to JavaScript date objects.

#### Function
Fetter Functions are created by passing a standard function to f.Function. They must be called either using `func.value()`, `func.call()` or `func.apply()`.

Example:
```
const func = new f.Function((a,b)=>a+b);
func.value(1,2); // Returns 3
func.call(2,3); // Returns 5
func.apply([3,4]); // Returns 7
```


#### Number
Fetter Numbers are identical to JavaScript numbers.


#### String
Fetter Strings are identical to JavaScript strings.
