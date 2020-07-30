## 说明文档

## 安装typescript

- 安装
npm i -g typescript
- 编译
tsc [source]
- 生成ts默认配置文件
tsc --init
- 第三方工具
ts-node     再内存中编译，同时运行
nodemon     检测文件变化    nodemon --exec ts-node ./src/index.ts ts为扩展名的文件变化后，执行后边的命令



## 接口类型

### 扩展类型： 类型名称、枚举、接口、类

TypeScript的接口的作用： 用于约束类型，对象、函数的契约；
