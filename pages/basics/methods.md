# Method declarations

## Single Responsibility

Methods should do one thing. Only one. For example, if your method is called
`save`, it should **save** something. This is what everyone what will read the code
will expect to.

Method name should say what it do. When other developers read your code, they
should be able to understand what any given method call will do, without read
the method source code.

Be succinct: Don't use a lot of words in your method name. For example:
`saveDocumentAndBuildSomethingAndReturnThatThing`. Also, if you have or feel like
you should put a `and` noun in your method name, maybe it's time to split your method into a more single-responsibility way.

## Javadoc

Please, doesn't matter how much stupid the method might look like, fill
the javadoc the best you can.

## Deprecating things

Bad:

```java
public void doSomething()
  throw Exception("This method is deprecated");
}

/**
 * please don't use this method anymore.
 **/
public void doSomething2()
}
```

Better:

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
