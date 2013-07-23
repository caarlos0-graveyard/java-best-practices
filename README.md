# Java Best Practices

A practical guide through all sort of nonsense things people should not do
while coding Java.

## Why private?

It will private until it's madure enough to go to the public. Meanwhile,
let's do this.

## Contributing

- Create a branch in this repository;
- Made your changes;
- Commit;
- Pull-request.


## Syntax

Some good practices related to syntax.

### Brackets

In general, it is good to always use brackets.

Right:

```java
if (someVar != null) {
  someVar = new SomeClass();
}
```

Also Right:

```java
if (someVar != null)
  someVar = new SomeClass();
```

Wrong:

```java
if (someVar != null)
  someVar = new SomeClass();
  anotherVar = new AnotherClass(someVar);
```


### Loops and Conditionals

Always leave a space between the command and the first parentesis, as well
between the last parentesis and the brackets.

Wrong:

```java
if(someVar != null){
  someVar = new SomeClass();
}
```

Right:

```java
if (someVar != null) {
  someVar = new SomeClass();
}
```

Also, in for-each statements, always put spaces around the `:`.

Wrong:

```java
for(SomeClass someVar:someVars){
  someVar.doSomething();
}
```

Right:

```java
for (SomeClass someVar : someVars) {
  someVar.doSomething();
}
```

### Method declarations

Methods should do one thing. Only one. For example, if your method is called
`save`, it should **save**. This is what everyone what will read the code
will expect to.

Method name should say what it do. When other developers read your code, they
should be able to understand what any given method call will do, without read
the method source code.

Be succinct: dont use a lot of words in your method name. For example:
`saveDocumentAndBuildSomethingAndReturnThatThing`. Also, if you have or feel like
you should put a `and` noun in your method name, it is already wrong.

Javadoc: Please, doesn't matter how much stupid the method may look like, fill
the javadoc.

### Class declarations

### Deprecating things

Wrong:

```java
public void doSomething()
  throw Exception("This method is deprecated");
}
```

Wrong:

```java
/**
 * please dont use this method anymore.
 **/
public void doSomething()
}
```

Right:

```java
/**
 *
 * @Deprecated: due to "some reason", this method is now
 *  deprecated, please use {@link #thisMethod()} instead.
 *
 **/
public void doSomething()
  // leave the old code if possible, or adapt it to call the
  // new method.
}
```

### Sort members

### Trailing withespaces

Whatever editor you use, configure it to automatically remove trailing whitespaces.
No one deserves a messed diff because of it.

If you use git, you can also add a commit hook to do this.

### TAB vs SPACEs and TAB size

Is a convention in Java-world to use **4 spaces sized TAB**, even if a lot of other
laguages uses, in general, 2 spaces.

## Naming things

- Try not to name things like `acf`, `dsg`, `sirfs` and things like that;
- A object which will be used to log things is a `logger`, because it `logs`
this. `log` is what the `logger` writes;
- Constants should be `WRITTEN_LIKE_THIS`;
- It is obvious that a property named `color` inside a `car` object is the
`color` of the `car`. You don't need to name the property `carColor`. Avoid
unneeded verbosity;

## Columns

While most languages prefer to respect the "old" 80c rule, in Java, usually,
we respect the 120c rule.

This happens due to the language verbosity. 80c in Java is really nothing.
120c is enough.

I will not enter in details about that. You could just Google about the 80c/120c
rules.

## Booleans

You don't need to do conditionals to, for example, return `true` or `false`.
The expression itself is a boolean already:

```java
// before
private boolean hasContent(String field) {
  return (field != null && !field.trim().isEmpty()) ? true : false;
}
```

```java
// after
private boolean hasContent(String field) {
  return field != null && !field.trim().isEmpty();
}
```

## String Concatenations

You should avoid the use of the `+` operator while dealing with Strings.
Yes, the JVM itself will turn it into a `StringBuilder`, but, not in the
best way.

If you just concat two Strings, it's OK (I recommend you to always use
`StringBuilder` anyway, since other dev could just do another `+ "some str"`
later otherwise). But if you concat three or more, JVM will instantiate
one `StringBuilder` for every `+` operator. In other words, a code like

```java
String var3 = var0 + " - " + var1;
```

will be translated to something like

```java
String var3 = new StringBuilder(new StringBuilder(var0).append(" - ").toString()).append(var1).toString();
```
instead of something like:

```java
String var3 = new StringBuilder(var0).append(" - ").append(var1).toString();
```

The problem is even worse if you concat Strings inside a loop. Example:

```java
// before
if (result != null && (!result.isEmpty())) {
  String message = I18nService.translate("some message.\n");
  message += I18nService.translate("another message.\n");
  for (int c = 0; c < result.size(); c++) {
    SomeObj obj = result.get(c);
    message += obj.getPK().getId();
    message += " - ";
    message += obj.getPK().getVersion();
    message += " - ";
    message += obj.getDescription();
    message += "\n";
  }
  logger.error(message);
}
```

```java
// after
if (result != null && !result.isEmpty()) {
  StringBuilder message = new StringBuilder();
  message.append(I18nService.translate("some message.\n"));
  message.append(I18nService.translate("another message.\n"));
  for (SomeObj obj : result) {
    SomeObjPK pk = obj.getPK();
    message.append(pk.getId()).append(" - ");
    message.append(pk.getVersion()).append(" - ");
    message.append(obj.getDescription()).append("\n");
  }
  logger.error(message.toString());
}
```

And just don't do this kind of nonsense things:


```java
new StringBuilder("str").append(var2 + " ");
```



> **PROTIP**: There is also this thing called `String Pool`. You may want to read about it.


## Exception Handling

#### Don't log and throw

Please, just don't do that. You will log the exception, probably somewhere another catch will
the same, in the end, you will have 2Mb of logs from the same exception.

```java
// before
catch (Exception ex) {
  logger.warn("I got an exception!", ex);
  throw ex;
}
```

```java
// after
catch (Exception ex) {
  logger.warn("I got an exception!", ex);
}
```

#### Don't log just the message

The stack is probably important.

```java
// before
catch (Exception ex) {
  logger.warn("I got an exception: " + ex.getMessage());
}
```

```java
// after
catch (Exception ex) {
  logger.warn("I got an exception!", ex);
}
```

#### Don't do nonsense things like

```java
catch (Exception e) {
  e.printStackTrace();
  throw new Exception(e);
}
```

#### Always do something with the exception

If you can somehow recover from the exception, **do it**.


## JPA

#### Use `TypedQuery` instead of `Query`

`TypedQuery` is just faster, and you don't need to cast.


```java
// before
Query q = em.createQuery("SELECT t FROM Type t where xyz = :xyz");
q.setParemeter("xyz", xyz);
List<Type> types = (List<Type>) q.getResultList();
```

```java
// after
TypedQuery<Type> q = em.createQuery("SELECT t FROM Type t where xyz = :xyz", Type.class);
q.setParemeter("xyz", xyz);
List<Type> types = q.getResultList();
```

#### Use fluent interface in queries

```java
// before
TypedQuery<Type> q = em.createQuery("SELECT t FROM Type t where xyz = :xyz and abc = :abc", Type.class);
q.setParemeter("xyz", xyz);
q.setParemeter("abc", abc);
List<Type> types = q.getResultList();
```

```java
// after
List<Type> types = em.createQuery("SELECT t FROM Type t where xyz = :xyz and abc = :abc", Type.class)
.setParemeter("xyz", xyz)
.setParemeter("abc", abc)
.getResultList();
```

## Contributors

- [Carlos Alexandro Becker](http://carlosbecker.com/about)
