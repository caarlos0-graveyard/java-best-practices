# Exception Handling

## Don't log and throw

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

## Don't log just the message

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

## Don't catch and throw

Bad:

```java
catch (Exception e) {
  e.printStackTrace();
  throw new Exception(e);
}
```

## Use try-with-resources for closeable objects (prior to Java 7)

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

## Always do something with the exception

If you can somehow recover from an exception, **do it**.

The golden rule is: **never catch an exception that you can't recover from**.
