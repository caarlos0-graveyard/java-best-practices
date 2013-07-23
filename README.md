# Java Best Practices

A practical guide through all sort of nonsense things people should not do
while coding Java.

## Why private?

It will be private until it's mature enough to go public. Meanwhile,
let's do this.

## Contributing

- Create a branch in this repository;
- Make your changes (respecting 80c rule, please);
- Add your name as contributor in the end of this file;
- Commit;
- Pull-request;
- Once merged, delete your branch.


## Naming things

- Try not to name things like `acf`, `dsg`, `sirfs` and things like that;
- An object which will be used to log things is a `logger`, because it `logs`
this. `log` is what the `logger` writes;
- Constants should be `WRITTEN_LIKE_THIS`;
- It is obvious that a property named `color` inside a `car` object is the
`color` of the `car`. You don't need to name the property `carColor`. Avoid
unneeded verbosity;
- Use names that show your purpose, if you need comments to explain about
a variable, then the name does not show your purpose.
Example: `int dayPeriod = 5;` rather than `int day = 5; // day period`

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

Bad:

```java
private boolean hasContent(String field) {
  return (field != null && !field.trim().isEmpty()) ? true : false;
}
```

Better:

```java
private boolean hasContent(String field) {
  return field != null && !field.trim().isEmpty();
}
```

## String Concatenations

You should avoid the use of the `+` operator while dealing with Strings.
Yes, the JVM itself will turn it into a `StringBuilder`, but, it could not
be in the best way. In general, use `StringBuilder` will be more readable
and will save you some runtime. You can see some examples regarding this
[here][concat-tests].

As you may have seen in the [previous link][concat-tests], concatenating
Strings inside a loop will lead to a not-so-good-implementation. For
example, the following code:

```java
String out = "";
for( int i = 0; i < 10000 ; i++ ) {
    out = out + i;
}
return out;
```

will be "translated" to something like:

```java
String out = "";
for( int i = 0; i < 10000; i++ ) {
    out = new StringBuilder().append(out).append(i).toString();
}
return out;
``` 

which is not the best implementation, since it creates "useless" `StringBuilder`
instances (one per iteration). The best implementation will probably be:

```java
StringBuilder out = new StringBuilder();
for( int i = 0 ; i < 10000; i++ ) {
    out.append(i);
}
return out.toString();
```

One more example:

Bad:

```java
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

Better:

```java
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



> **PROTIP**: There is also this thing called `String Pool`. You may want to
read about it.


## Exception Handling

#### Don't log and throw

Please, just don't do that. You will log the exception, probably another catch
will do the same. You will end up having 2Mb of logs about the same exception.

Bad:

```java
catch (Exception ex) {
  logger.warn("I got an exception!", ex);
  throw ex;
}
```

Better:

```java
catch (Exception ex) {
  logger.warn("I got an exception!", ex);
}
```

#### Don't log just the message

The stack is probably important.

Bad:

```java
catch (Exception ex) {
  logger.warn("I got an exception: " + ex.getMessage());
}
```

Better:

```java
catch (Exception ex) {
  logger.warn("I got an exception!", ex);
}
```

#### Don't do nonsense things like

Bad:

```java
catch (Exception e) {
  e.printStackTrace();
  throw new Exception(e);
}
```

#### Use try-with-resources for closeable objects (prior to Java 7)

Good:

```java
BufferedReader br = new BufferedReader(new FileReader(path));
try {
  return br.readLine();
} finally {
  if (br != null) br.close();
}
```

Better:

```java
try (BufferedReader br = new BufferedReader(new FileReader(path))) {
  return br.readLine();
}
```

#### Always do something with the exception

If you can somehow recover from an exception, **do it**.


## JPA

#### Use `TypedQuery` instead of `Query`

`TypedQuery` is just faster, and you don't need to cast.

Bad:

```java
Query q = em.createQuery("SELECT t FROM Type t where xyz = :xyz");
q.setParemeter("xyz", xyz);
List<Type> types = (List<Type>) q.getResultList();
```

Better:

```java
TypedQuery<Type> q = em.createQuery("SELECT t FROM Type t where xyz = :xyz",
  Type.class);
q.setParemeter("xyz", xyz);
List<Type> types = q.getResultList();
```

#### Use fluent interface in queries

Good:

```java
TypedQuery<Type> q = em.createQuery(
  "SELECT t FROM Type t where xyz = :xyz and abc = :abc",
  Type.class);
q.setParemeter("xyz", xyz);
q.setParemeter("abc", abc);
List<Type> types = q.getResultList();
```

Better:

```java
List<Type> types = em.createQuery(
  "SELECT t FROM Type t where xyz = :xyz and abc = :abc",
  Type.class)
.setParemeter("xyz", xyz)
.setParemeter("abc", abc)
.getResultList();
```

## Contributors

- [Carlos Alexandro Becker](http://carlosbecker.com/about)
- [Diego Aguir Selzlein](http://nerde.github.io/about)
 





[concat-tests]: https://github.com/caarlos0/string-concat-tests
