# springboot-gulp-webpack

下载项目源码。

进入 springboot-gulp-webpack\web\src\main\resources 目录。



1.安装nodejs、cnpm。

2.将node_modules.rar 解压到当前文件夹（即 springboot-gulp-webpack\web\src\main\resources）。

3.安装依赖包：

cnpm install

注：执行cnpm的路径为： springboot-gulp-webpack\web\src\main\resources

4.上一步执行成功后可执行打包命令：

gulp dev

5.打包完成后dist下面会生成打包文件，此时启动springboot项目，启动方式非常多，可参考 http://projects.spring.io/spring-boot/。

6.访问 http://localhost:8080/web/index.htm 查看结果。

==========================

发布时执行如下命令：

gulp


==========================

前端部分由 https://github.com/fwon/gulp-webpack-demo 改造而来，想了解更多请移步至此。
