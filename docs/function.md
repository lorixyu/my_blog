# function介绍

## C++ 中的 `std::function` 全面解析

### 一、引言

在现代 C++ 中，函数不再仅仅是“可以调用的一段代码”。
 我们可以把函数作为变量、参数、返回值来传递，这就需要一种通用的“函数包装器”——这就是 `std::function`。

------

### 二、什么是 `std::function`

`std::function` 是一个模板类，定义在头文件 `<functional>` 中，用于**封装可调用对象（Callable Object）**。

可调用对象包括：

- 普通函数（如 `void f()`）
- 函数指针
- lambda 表达式
- 仿函数（重载了 `operator()` 的类）
- `std::bind` 绑定后的对象

它的声明形式通常是：

```c++
#include <functional>

std::function<返回类型(参数类型...)> func;
```

例子：

```c++
std::function<int(int, int)> add = [](int a, int b) {
    return a + b;
};

std::cout << add(2, 3);  // 输出 5
```

------

### 三、与函数指针的区别

| 对比点       | 函数指针           | `std::function`                    |
| ------------ | ------------------ | ---------------------------------- |
| 可存储对象   | 仅普通函数         | 任意可调用对象（lambda、仿函数等） |
| 类型安全性   | 需严格匹配函数签名 | 支持类型擦除，自动适配             |
| 灵活性       | 较低               | 很高                               |
| 典型使用场景 | 传统 C 风格回调    | C++ 回调、事件系统、函数封装       |

例如：

```c++
int add(int a, int b) { return a + b; }

std::function<int(int,int)> f1 = add;       // ok
std::function<int(int,int)> f2 = [](int a, int b){ return a - b; }; // ok
```

------

### 四、类型擦除（Type Erasure）

`std::function` 的强大之处在于它的**类型擦除机制**：

- 无论是函数指针、lambda 还是仿函数，它们的类型各不相同。
- `std::function` 通过在内部隐藏具体类型，只暴露一个统一的“调用接口”。

简单理解就是：

> “你给我一个能调用的东西，我不管它是什么类型，我只知道可以用 `()` 调用它。”

这使得代码更灵活、更模块化。

------

### 五、常见用法示例

#### 1. 存储普通函数

```c++
int add(int a, int b) { return a + b; }
std::function<int(int,int)> func = add;
std::cout << func(2, 3);
```

#### 2. 存储 lambda 表达式

```c++
std::function<void()> f = [](){ std::cout << "Hello lambda\n"; };
f();
```

#### 3. 存储仿函数

```c++
struct Print {
    void operator()(const std::string& s) const {
        std::cout << s << std::endl;
    }
};
std::function<void(std::string)> f = Print();
f("Hello functor");
```

#### 4. 与 `std::bind` 配合

```c++
#include <functional>

void greet(const std::string& name, int age) {
    std::cout << "Hi " << name << ", age " << age << std::endl;
}

auto f = std::bind(greet, "Tom", 18);
f();  // Hi Tom, age 18
```

------

### 六、性能与注意事项

1. `std::function` 会进行类型擦除和动态分配，**比函数指针略慢**。
    在高性能场景中，建议使用模板或 lambda 直接传递。

2. 若未赋值，`std::function` 是空的：

   ```c++
   std::function<void()> f;
   if (!f) std::cout << "empty\n";
   ```

3. 可以用 `target_type()` 和 `target()` 来查看其内部存储的类型（调试用）。

------

### 七、应用场景

- 回调机制（如事件触发）
- 线程池任务封装
- 信号与槽系统（如 Qt）
- 函数式编程（map/filter 风格）
- 异步任务与调度框架

------

### 八、小结

`std::function` 是现代 C++ 的重要组成部分，它让函数成为“一等公民”：

 ✅ 可存储
 ✅ 可传递
 ✅ 可组合

它体现了 **C++ 从面向对象到泛型与函数式编程的演进**。

# myfunction实现

> 该实现的底层使用的还是函数指针
>
> Std::function的底层实现是**类型擦除** + **多态封装** + **小对象优化**实现的。

```c++
#include <iostream>
#include <string>

using namespace std;

void func(string str) {
    cout << str << endl;
}

// 前置声明
template <typename Fty>
class myfunction {};

template <typename R, typename A1>
class myfunction<R(A1)> {
public:
    using pFunc = R (*)(A1); // 底层依旧是使用函数指针

    // Constructor
    myfunction(pFunc func) : _pfunc(func) {}

    // Operator() overload
    R operator()(A1 arg) {
        return _pfunc(arg);
    }

private:
    pFunc _pfunc;
};

int main() {
    myfunction<void(string)> pfunc = func;

    pfunc("hello world");

    return 0;
}
```

