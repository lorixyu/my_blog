# 实现简易的std::bind1st绑定器

## std::bind1st介绍

> `std::bind1st` 是早期 C++（C++98）里很重要的一个工具，虽然现在被 `std::bind` 和 lambda 取代，但理解它能帮助我们明白函数对象、适配器的底层机制。

它的作用是：

> 将一个二元函数对象（即接收两个参数的函数）绑定第一个参数为一个固定值，返回一个只需要第二个参数的函数对象。

## 示例

```c++
#include <iostream>
#include <functional>
#include <vector>
#include <algorithm>

using namespace std;

int main() {

    vector<int> v = {3, 1};

    std::vector<int>::iterator targetIt = std::find_if(v.begin(), v.end(), std::bind1st(greater<int>(), 2));

    for (std::vector<int>::iterator it = v.begin(); it != v.end(); ++ it) {
        if (it == targetIt) {
            v.insert(it, 2);
            break;
        }
    }

    for (auto i : v) {
        cout << i << " ";
    }
    cout << '\n';

    return 0;
}
```

这段程序简单地展示了bind1st的作用：std::find_if()需要接收三个参数，两个迭代器类型以及一个一元函数对象类型，程序需要找到数组中第一个小于2的数，但是greater<>()是一个二元函数对象，此时bind1st就派上了用场，它将一个固定值绑定在一个参数上，返回一个只需要第二个参数的函数对象，即生成的一个一元函数对象，目的达成。

## 简易实现

```c++
#include <iostream>

using namespace std;

// 自定义 std::find_if() 函数
template <typename Iterator, typename FuncObj>
Iterator my_find_if(Iterator first, Iterator last, FuncObj func) {
    for ( ; first != last; ++ first) {
        if (func(*first)) { // 在此处调用 _mybind1st的 Operator() overload
            return first;
        }
    }
    return last;
}

template <typename FuncObj, typename T>
class _mybind1st {
public:
    // Constructor
    _mybind1st(FuncObj func, T val) : _func(func), _val(val) {}

    // 特指该例子--需要返回bool
    bool operator()(const T &second) { // Core !
        return _func(_val, second); // Calling greater<>() (arg1, arg2);
    }
private:
    FuncObj _func;
    T _val;
};

// my_find_if() 函数第三个参数需要接收一个一元函数对象，所以需要返回一个一元函数对象
template <typename FuncObj, typename T>
_mybind1st<FuncObj, T> mybind1st(FuncObj func, const T &val) {
    return _mybind1st<FuncObj, T>(func, val);
}

int main() {

    vector<int> v = {3, 1};

    std::vector<int>::iterator targetIt = my_find_if(v.begin(), v.end(), mybind1st(greater<int>(), 2));

    for (std::vector<int>::iterator it = v.begin(); it != v.end(); ++ it) {
        if (it == targetIt) {
            v.insert(it, 2);
            break;
        }
    }

    for (auto i : v) {
        cout << i << " ";
    }
    cout << '\n';


    return 0;
}
```

