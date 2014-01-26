# Other Language Basics

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

## `this` is for disambiguation only

That's it. Don't use `this` keyword with the purpose to make it more readable,
you are doing the opposite.

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

[concat-tests]: https://github.com/caarlos0/string-concat-tests
