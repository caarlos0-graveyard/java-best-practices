# Java Best Practices

A practical guide through all sort of nonsense things people should not do
while coding Java.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


-------------------------------------------

## Syntax

Some good practices related to syntax.

### Brackets

In general, it is good to always use brackets.

Bad:

```java
if (someVar != null)
  someVar = new SomeClass();
  anotherVar = new AnotherClass(someVar);

if (someVar != null)
{
  someVar = new SomeClass();
  anotherVar = new AnotherClass(someVar);
}

if (someVar != null){
  someVar = new SomeClass();
  anotherVar = new AnotherClass(someVar);
}
```

Better:

```java
if (someVar != null) {
  someVar = new SomeClass();
}

if (someVar != null)
  someVar = new SomeClass();
```

### Loops and Conditionals

Always leave a space between the command and the first parenthesis, as well
between the last parenthesis and the brackets.

Bad:

```java
if(someVar != null){
  someVar = new SomeClass();
}

if(someVar != null)
{
  someVar = new SomeClass();
}
```

Better:

```java
if (someVar != null) {
  someVar = new SomeClass();
}
```

Also, in for-each statements, always put spaces around the `:`.

Bad:

```java
for(SomeClass someVar:someVars){
  someVar.doSomething();
}

for(SomeClass someVar:someVars)
{
  someVar.doSomething();
}
```

Better:

```java
for (SomeClass someVar : someVars) {
  someVar.doSomething();
}

for (SomeClass someVar : someVars)
  someVar.doSomething();
```

### Method declarations

Methods should do one thing. Only one. For example, if your method is called
`save`, it should **save**. This is what everyone what will read the code
will expect to.

Method name should say what it do. When other developers read your code, they
should be able to understand what any given method call will do, without read
the method source code.

Be succinct: Don't use a lot of words in your method name. For example:
`saveDocumentAndBuildSomethingAndReturnThatThing`. Also, if you have or feel like
you should put a `and` noun in your method name, maybe it's time to split your method into a more single-responsibility way.

Javadoc: Please, doesn't matter how much stupid the method may look like, fill
the javadoc.

### Class declarations

### Deprecating things

Bad:

```java
public void doSomething()
  throw Exception("This method is deprecated");
}
```

Wrong:

```java
/**
 * please don't use this method anymore.
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

Is a convention in Java-world to ident with **4 spaces sized hard tabs**, even if
a lot of other laguages uses, in general, 2 spaces soft tabs.

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

## This is for disambiguation only

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

## Classes

`Classes` (objects) must contain `data` (attributes) and `behaviors` (methods). 
Also, `Classes` must be named using `CamelCase`.

Simple example:

```java
// before
class Account() {
	
	// data
	private Long id;
	private Integer number;
	private Client owner;
}
```

```java
class Operation {

	// behaviors
	void draw(Account account, BigDecimal value) {
		//logic	
	}
}
```

Don't you ever separate the behaviour in another class.

do:

```java
// after
class Account() {
	
	// data
	private Long id;
	private Integer number;
	private Client owner;
        
        // behavior
	void draw(Account account, BigDecimal value) {
		//logic	
	}
}
```




## [Contributors](https://github.com/caarlos0/java-best-practices/graphs/contributors)

