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

Wrong:

```java
private boolean hasContent(String field) {
  return (field != null && !field.trim().isEmpty()) ? true : false;
}
```

Right:

```java
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
String var3 = new StringBuilder(
  new StringBuilder(var0).append(" - ").toString()).append(var1).toString();
```
instead of something like:

```java
String var3 = new StringBuilder(var0).append(" - ").append(var1).toString();
```

The problem is even worse if you concat Strings inside a loop. Example:

Wrong:

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

Right:

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

Wrong:

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

Wrong:

```java
catch (Exception ex) {
  logger.warn("I got an exception: " + ex.getMessage());
}
```

Right:

```java
catch (Exception ex) {
  logger.warn("I got an exception!", ex);
}
```

#### Don't do nonsense things like

Wrong:

```java
catch (Exception e) {
  e.printStackTrace();
  throw new Exception(e);
}
```

#### Use try-with-resources for closeable objects (prior to Java 7)

Wrong:

```java
BufferedReader br = new BufferedReader(new FileReader(path));
try {
  return br.readLine();
} finally {
  if (br != null) br.close();
}
```

Right:

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

Wrong:

```java
Query q = em.createQuery("SELECT t FROM Type t where xyz = :xyz");
q.setParemeter("xyz", xyz);
List<Type> types = (List<Type>) q.getResultList();
```

Right:

```java
TypedQuery<Type> q = em.createQuery("SELECT t FROM Type t where xyz = :xyz",
  Type.class);
q.setParemeter("xyz", xyz);
List<Type> types = q.getResultList();
```

#### Use fluent interface in queries

Wrong:

```java
TypedQuery<Type> q = em.createQuery(
  "SELECT t FROM Type t where xyz = :xyz and abc = :abc",
  Type.class);
q.setParemeter("xyz", xyz);
q.setParemeter("abc", abc);
List<Type> types = q.getResultList();
```
Right:

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
