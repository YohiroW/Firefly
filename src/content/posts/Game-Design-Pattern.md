---
title: "游戏设计模式"
published: 2020-09-07
author: "Yohiro"
category: "Game & Engine Development"
tags: ["design-patterns", "object-oriented", "programming"]
draft: true
---
## 软件的设计模式

- 解决反复出现的问题
- 解决问题的方案和问题核心的关键点
- 可复用的解决方案

## 面向对象的设计原则

### 单一职责原则 (SRP: Single Responsibility Priciple)

当设计、封装一个类时，应该让一个类只做一件事情。

### 开闭原则 (OCP: Open Closed Priciple)

对扩展开放，对修改关闭。

### 里氏替换原则 (LSP: Liskov Substitution Priciple)

子类必须能够替换掉它们的父类。

### 依赖倒置原则 (DIP: Dependency Inversion Priciple)

该原则包含两个主题：

1. 高层模块不应该依赖于低层模块，二者都应该依赖于抽象。
2. 抽象接口不应该依赖于具体实现。而具体实现则应该依赖于抽象接口。

### 接口隔离原则 (ISP: Interface Segregation Priciple)

客户端不应该被迫使用它们用不到的接口方法。

### 其他

除了上述 5 个设计原则外，还有一些其他的设计原则：

- **最少知识原则** (LKP: Least Knowledge Priciple)
    当设计一个类时，这个类使用的其他类的提供的功能越少越好。

- **少继承多组合原则**
    一个类应该尽量少的继承，多使用组合。

## 设计模式大类

- **生成模式**
  产生对象的过程以及方式。

- **结构模式**
  类或对象之间的组合方式。

- **行为模式**
  类或对象之间交互方式。

## 状态模式

> 适用于切换不同场景，说明各状态间的迁移条件以及转换流程。

### 背景

刚打开一个新的游戏，可能会存在下面的状态：
```c#
enum State
{
    LOGIN,
    TITLESCREEN,
    GAMESCENE,
    ...
}
```
为了使用该状态，通常会有下面的接口：
```c#
public class StateManager
{
    public void ChangeState(State state){
        m_state = state;
        switch(m_state){
            case State.TITLESCREEN:
                // do something
                break;
            case State.GAMESCENE:
                // do something
                break;
            ...
        }
    }

    public void Update(){
        switch(m_state){
            case State.LOGIN:
                // do something
                break;
            case State.TITLESCREEN:
                // do something
        }
    }
}
```
这种做法有这样一些不足之处：
1. 每增加一个状态，switch 代码块中都要增加相应的代码。
2. 与每个状态有关的对象，都必须在 StateManager 中注册，当这些对象被多个状态共享时，会造成混淆。
3. 每个状态可能使用不同的类对象，容易使 StateManager 过度依赖其他的类。

### 实现

> 让一个对象的行为随着内部状态的改变而改变，而该对象也如同换了一个类一样。

当某个对象的状态改变时，它表现的行为也随着改变，但是对于客户端而言，并不会因此改变它的行为和信息交互。也就是说，该对象与外界的交互方式并不会产生变化。当状态对象变换为另一个类时，对象会通过新的状态类来表现出应有的行为。

### 参与者

- **Context** 或 **StateController**
    持有状态的对象，可定制相关接口，使外界知道状态的改变或通过操作改变状态。
- **State**
    状态接口类。指定状态的接口，规范 Context 在特定状态下的行为。
- **ConcreteState**
    具体状态类，实现特定状态下的具体行为。

#### 实现参考
```c#
public class Context
{
    private State m_state;

    // 通过 Request 方法来表现当前状态下的行为
    public void Request(int Value){
        m_state.Handle(Value);
    }

    public void SetState(State state){
        m_state = state;
    }
}

public abstract class State
{
    protected Context m_context = null;

    public State(Context context){
        m_context = context;
    }

    public abstract void Handle(int Value);
}

public class ConcreteStateA : State
{
    public ConcreteStateA(Context context) : base(context)
    {
    }

    public override void Handle(int Value)
    {
        if (Value > 10)
        {
            m_context.SetState(new ConcreteStateB(m_context));
        }
    }
}

public class ConcreteStateB : State
{
    public ConcreteStateB(Context context) : base(context)
    {
    }

    public override void Handle(int Value)
    {
        if (Value > 20)
        {
            m_context.SetState(new ConcreteStateC(m_context));
        }
    }
}

public class ConcreteStateC : State
{
    public ConcreteStateC(Context context) : base(context)
    {
    }

    public override void Handle(int Value)
    {
        if (Value > 30)
        {
            m_context.SetState(new ConcreteStateA(m_context));
        }
    }
}

```

Context 类中提供了 SetState 的方法，用于改变当前的状态。在这个实现上，状态的转换可能发生在：

- Context 类自身，按条件在各个状态间转换。
- 构造 Context 时，指定初始状态，随后便将状态的转换交给 State 类负责，Context 不再介入。

### 优缺点

- 减少错误的发生并降低维护难度
- 简化状态执行的环境
- 当游戏项目变得庞大时，存在类爆炸的问题

### 应用场景

- 关卡切换
- 游戏 AI
- 网络状态处理
- 关卡进行状态

## 外观模式

为子系统定义一组统一的接口，这个高级的接口会让子系统更容易使用。

比如整合子系统，并提供界面供客户端使用。

### 优缺点

- 节省时间
- 便于分工开发
- 增加系统的安全性

### 应用场景

- 网络引擎
- 数据库引擎

## 单例模式

确认类只有一个对象，并提供一个全局的方法来获取这个对象。

## 中介者模式

处理内部子系统间的沟通。

### 优缺点

- 不会引入太多其他心痛
- 系统的被依赖程度降低

### 应用场景

- 网络引擎
- 数据库引擎

## 游戏循环

### Unity 中的游戏循环
