# 快速发布，秒级纠错

传统的可持续性行交付流程(CI/CD)，实现了从代码合并到功能上线的自动化发布流程，且一定程度上提高了交付的可靠性。但其仍然有如下弱点:

1. 无法快速的发布指定的功能给指定的用户群。例如族群APP的虚拟祠堂中更新了大门的颜色，为了避免新的设计会造成不同地方的习俗冲突，我们只将新版发布给族群中小部分的负责人。
2. 因为预算和交付期限，无法在CI/CD中集成自动测试环节，使局部功能的BUG率上升。需要整体回退到上一版本并重新发步。此时常常会严重影响用户体验导致用户流失。
3. 一个代码分支含A、B两个功能模块，其中只有B完成。必须等待A也完成后，才可以整体合并发布。在与竞品的时间赛跑中，错时关键战役。

下面的文章，将描述如何使用敏捷开关解决上面传统CI/CD中出现的问题。


## 建立一个敏捷开关
1. 登录https://portal.feature-flags.co网站，进入登录页面，点击注册"注册账户"按钮进入注册页面
    
    ![](/img/quickstart/login-page.png)

    如下图所示，填入邮箱、密码和一个手机号，然后点击"注册"。

    ![](/img/quickstart/register-page.png)

2. 注册后，重新回到登录页面，使用邮箱和密码登录敏捷开关后台。
    ![](/img/quickstart/login-page2.png)

3. 登录后，点击左侧菜单下方的"Project管理"按钮，进入"Project管理"。切换到"Projects"切换到Projects管理的Tab页
    ![](/img/quickstart/projects-mgr-page.png)

4. 点击上图中的按钮"+ 添加 Project"创建一个新的项目。如下图所示，输入"Project 名称"和"Project 描述"，点击"创建"按钮
    ![](/img/quickstart/create-project-page.png)

5. 在Project列表中，在刚刚创建的项目右侧点击"编辑"按钮，弹出项目的设执行系。复制Secret下面的字符串。此字符串会在后面的地方用到。
    ![](/img/quickstart/edit projects .png)
    ![](/img/quickstart/edit-project-detail.png)

6. 在左上角切换当至新建的当前项目，然后点击左侧菜单中的"开关管理"。
    ![](/img/quickstart/switch-project.png)

    > BUG提示: 左上角应该显示当前项目的名字，如果切换后没有显示，请刷新页面。

7. 输入开关名称，创建一个新的开关，命名为"展示中国国潮按钮"。
    ![](/img/quickstart/create-new-ff.png)

    建立成功后，进入刚创建的开关页面，点击"设置"按钮。将设置tab中的KeyName进行复制。此字符串会在后面的地方用到。
    ![](/img/quickstart/copy-ff-keyname.png)

## 集成敏捷开关到Angular项目中

**此步骤完成后的完整代码示例**: 
[https://github.com/feature-flags-co/ffc-angular-demo](https://github.com/feature-flags-co/ffc-angular-demo)

1. 初始化一个空的angualrJs项目
    
        ng new projectName

2. 安装敏捷开关的angular sdk
        
        npm install
        npm install ffc-js-client-sdk --save
        npm install ffc-angular-sdk --save
        
3. 在项目中初始化敏捷开关。在项目的AppModule中引入FfcAngularSdkModule，然后将其放入imports中如下图
    ![](/img/quickstart/angular-integration-module.png)

4. 使用.initialize()方法在main component中初始化SDK，与敏捷开关服务建立连接。
        ![](/img/quickstart/angular-integration-init.png)
    - .initialize()方法中的第一个参数为Project Key。将上一个章节"建立一个敏捷开关"中第5步复制的字符串传入即可。
    - .initialize()方法中的第一个参数为终端用户信息。可根据如下表格传入所需的用户信息:

        | 变量名 | 描述 | 
        | -- | -- | 
        | key | 【必填项】用户在开关工作控件中的唯一Id，类型为string |
        | email | 【可选项】用户的邮箱，类型为string |
        | userName | 【可选项】用户名，类型为string |
        | customizeProperties | 【可选项】可以自由配置的自定义属性数组，数组中的每个元素由name与value组成。name为属性名，value为该属性对应的值 |

    根据项目实际情况，选择合适的地方初始化敏捷开关sdk即可。**通常，我们只需要在项目中初始化一次即可**。

6. 在Angular项目中，添加一个"+ Angular Ant Design"按钮。
        ![](/img/quickstart/angular-integration-demo-button-html.png)
        ![](/img/quickstart/angular-integration-demo-button.png)

7. Ant Design作为Angular大家庭中的新成员，我们希望先让来自中国的程序员进行试用。看看效果再造福全人类。所以我们需要对这个功能进行标记，使得我们可以在敏捷开关的后端对其进行线上的发布、回退。我们需要对此功能进行如下的代码埋点
        ![](/img/quickstart/angular-integration-demo-button-mjkg.png)

    其中.variation()方法中的参数为在"建立一个敏捷开关"章节中第7步创建的开关的KeyName。

8. 目前为止，我们已经在项目中完成了新功能模块的创建，以及对新功能模块的开关标记。在下面的章节，我们将使用敏捷开关后台，远程操作新功能的发布与回退。

**此步骤完成后的完整代码示例**: https://github.com/feature-flags-co/ffc-angular-demo

## 新功能模块的发布与回退

我们这里不进行CI/CD的具体演示描述，并假设我们的项目已经部署到了线上。查看线上版本，我们会发现新的版本虽然已经上线，但是"+ Angular Ant Design"功能并没有被发布。我们将进行如下操作来发布功能

### 发布
1. 点击左侧菜单的"开关用户管理"，进入"开关用户管理"页面，点击"属性管理"按钮。
        ![](/img/quickstart/mgr-properties.png)

    因为我们希望把"Angular Ant Design"功能先发给中国用户，所以我们需要对用户的国家进行筛选。在Angular的代码中，我们将用户的"国家"属性传入了sdk。所以我们需要添加此属性进入我们的管理后台，方便做匹配设置。
        ![](/img/quickstart/create-new-property.png)

2. 点击左侧菜单的"开关管理", 进入开关管理页面。点击开关"展示中国国潮按钮", 进入开关"目标条件"设置页面
        ![](/img/quickstart/mubiaotiaojian.png)
        
3. 将页面下滚至"使用匹配条件找到目标用户"部分，点击"添加规则"按钮。
    ![](/img/quickstart/add-new-rule.png)

    如图上所示，"规则1"中我们设置的逻辑为: 终端用户的国家为"中国"或"中国台湾省"时，返回true。
    即在Angular项目中的.variation()方法，当user的"国家"属性为"中国"或"中国台湾省"时，方法返回true。

4. 保存设置。
    ![](/img/quickstart/save-ff.png)

5. 我们回到产品并刷新页面，我们会发现此时"+ Angular Ant Design"按钮出现在了页面。即，我们通过配置和设置开关，在线上动态的发布了这个功能给我们制定的人群。
    ![](/img/quickstart/published-page.png)

    > 同理，我们可以通过配置这些条件，在未来将功能发布给其他人。

### 回退

很不幸，我们发现"+ Angular Ant Design"功能还存在一定的BUG，希望尽快下线功能以最大的避免用户体验损失。我们最快的回退方案就是关闭开关。

![](/img/quickstart/close-ff.png)

刷新前端，我们会发现"+ Angular Ant Design"功能已经从用户界面中消失。
![](/img/quickstart/published-page.png)

> 同理，我们可以通过配置开关的条件，将功能对部分人群回退(即对这些人隐藏功能)


## 总结

> 前情提示: **CI/CD的缺陷**
>
> 1. 无法快速的发布指定的功能给指定的用户群。例如族群APP的虚拟祠堂中更新了大门的颜色，为了避免新的设计会造成不同地方的习俗冲突，我们只将新版发布给族群中小部分的负责人。
> 2. 因为预算和交付期限，无法在CI/CD中集成自动测试环节，使局部功能的BUG率上升。需要整体回退到上一版本并重新发步。此时常常会严重影响用户体验导致用户流失。
> 3. 一个代码分支含A、B两个功能模块，其中只有B完成。必须等待A也完成后，才可以整体合并发布。在与竞品的时间赛跑中，错时关键战役。


### 解决方案

我们使用敏捷开关SDK，对功能模块进行标记、包裹。在敏捷开关的后台设置开关的筛选条件。当终端用户与开关条件匹配时，则将被包裹的功能展示给终端用户。

1. 这种代码标记，可以指向最小维度的功能，进行控制。
2. 通过远程控制、配置开关，在线上动态的热分配/隐藏功能给指定用户群。
3. 当有BUG出现时，可以通过关闭开关，实现秒级切换功能版本。如果只有特定用户有BUG，则可只对这些特定用户进行版本切换。

    > 我们可以将新旧版本同时放在代码中，如果满足开关则执行新功能代码，如果不满足则执行旧功能代码

4. 只要开关不打开，没有完成的功能就不会被执行。A功能即使没有完成，也可以安然的与B功能一起合并发布。因为对于功能A，部署上线并不等于发布。











