# JPA

### Use `TypedQuery` instead of `Query`

`TypedQuery` is just faster, and you don't need to cast.

Bad:

```java
Query q = em.createQuery("SELECT t FROM Type t where xyz = :xyz");
q.setParemeter("xyz", xyz);
List<Type> types = (List<Type>) q.getResultList();
```

Better:

```java
TypedQuery<Type> q = em.createQuery("SELECT t FROM Type t where xyz = :xyz", Type.class)
  .setParemeter("xyz", xyz);
List<Type> types = q.getResultList();
```

### Use fluent interface in queries

Good:

```java
TypedQuery<Type> q = em.createQuery(
  "SELECT t FROM Type t where xyz = :xyz and abc = :abc", Type.class);
  q.setParemeter("xyz", xyz);
  q.setParemeter("abc", abc);
  List<Type> types = q.getResultList();
```

Better:

```java
List<Type> types = em.createQuery(
  "SELECT t FROM Type t where xyz = :xyz and abc = :abc", Type.class)
  .setParemeter("xyz", xyz)
  .setParemeter("abc", abc)
  .getResultList();
```

### Use `FetchType.LAZY` on relations 

Sometimes you need to relate two entities, and when you use annotations like `@ManyToOne` and `@OneToOne` the default property is `FetchType.EAGER`.

* `EAGER` collections are fetched fully at the time their parent is fetched. Even if you don't need them
* `LAZY` on the other hand, means that the collection is fetched only when you try to access them (It's LAZY hum?)

There's a HUGE slow down performance when you use `EAGER`. Only use if you have a good reason to do.

```java
@ManyToOne(fetch = FetchType.LAZY)
private Client clients;
```