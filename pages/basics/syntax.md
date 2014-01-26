# Syntax

Some good practices related to syntax.

## Brackets

In general, it's good to always use brackets.

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

## Loops and Conditionals

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

