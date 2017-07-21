# gulp-clear-enviorment v1.0 {}

---

使用 webpack v3.3版本,

外部導入

```
// ver15.1.0
react.js / react-with-addons.js / react-dom.js
```

## 安裝方式

- 初次使用方式：

    * 安裝全域 **gulp**及**node-sass**

        ```
        $> npm install -g gulp


        $> npm install -g node-sass

        ```

- 安裝套件方式：

    ```
    $> npm install
    ```

---

## 執行gulp開發任務：

```
//執行local server 開發環境
$> gulp server

//執行build動作，產生dist包
$> gulp build
```

## React教學：


[JSX 是啥](#什麼是JSX)

[Babel 是啥](#什麼是Babel)

### 什麼是JSX

jsx 就是在 js 裡面，可以直接寫 html tag，但是需要轉譯成 js，會比較好維護 你也可以直接寫 javascript，只是官方會建議是寫 jsx

```javascript
\\原始碼
React.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);

\\轉譯成Javascript
ReactDOM.render(
  React.createElement('h1', null, 'Hello, world!'),
  document.getElementById('example')
);

```

### 什麼是Babel

abel 是一個轉譯器，是由澳大利亞的開發者Sebastian McKenzie創建的

官網在這邊：[https://babeljs.io/](https://babeljs.io/)

它的用途是讓你可以直接用JavaScript ECMAScript 6的語法來寫code，不需要等待瀏覽器支援

同時他也支援了React與JSX，據說此人目前已被挖角到 facebook react 開發團隊
