## Classes

Classes are the building blocks of any Java application and if these building blocks are not written carefully, it could lead to design issues in production or maintenance. 

## 5 recommended design principles

The 5 design principles can be referred to as `SOLID` in short.

They are: 

```
1. Single Responsibility Principle
2. Open Closed Principle
3. Liskov’s Substitution Principle
4. Interface Segregation Principle
5. Dependency Inversion Principle
```

Let's discuss them one by one:

```
1. Single Responsibility Principle: One class, one responsibility
```

A class should be written for only one purpose. All its services should be narrowly aligned with that responsibility. If it is model class, then it should represent only one entity. This will give you the flexibility to make changes in future without worrying about the impact of changes on other entities.

 For example, consider a module that compiles and prints a report. Such a module can be changed for two reasons. First, the content of the report can change. Second, the format of the report can change. These two things change for very different causes; one substantive, and one cosmetic. The single responsibility principle says that these two aspects of the problem are really two separate responsibilities, and should therefore be in separate classes or modules. It would be a bad design to couple two things that change for different reasons at different times.

```
2. Open Closed Principle: Software components should be open for extension, but closed for modification
```

Classes should be designed in such a way that whenever fellow developers wants to change the flow of control in specific conditions in application, all they need to extend your class and override some functions. Design of a class should be in such a way that it allows its behaviour to be extended without modifying its source code.

For example, if you take a look into any good framework like struts or spring, you will notice that you can't change their core logic and request processing, but you can modify the desired application flow just by extending some classes and putting them in configuration files.

```
3. Liskov’s Substitution Principle: Objects should be replaceable with instances of their subtypes
```

Classes created by extending your class should be able to fit in the application without altering the correctness of the program. It can be achieved by strictly adhering to the single responsibility principle.

For example, if S is a subtype of T, then objects of type T may be replaced with objects of type S without causing any fatal exceptions.

```
4. Interface Segregation Principle: Many specific interfaces are better than one general interface
```

Interface Segregation Principle is applicable to interfaces as single responsibility principle holds to classes. Clients should not be forced to implement unnecessary methods which they will not use. 

For example, a developer created an interface and added two methods. Now a client wants to use this interface, but he intends to use only one method. In such cases, two interfaces should be created by breaking the existing one.

```
5. Dependency Inversion Principle: Depend on abstractions, not on concretions
```

It is a specific form of decoupling software modules, where all modules expose only abstraction which is useful in extending the functionality in another module. You should design your software in such a way that various modules can be separated from each other using an abstract layer to bind them together. 

For example, in spring framework, all modules are provided as separate components which can work together by simply injected dependencies in other module. They are so well closed in their boundaries that you can use them in other software modules apart from spring with same ease.