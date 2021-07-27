using FFs.SDKs.CSharp;
using System;
using System.Threading.Tasks;

namespace FFs.SDKs.Test
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var agileToggle = new AgileToggle("YWFiM2I5YzUtZmY1MS00ZWMyLTkzZjAtNDc0YzY4MWMyYzUz")     // environment secret作为身份验证（必填）
                                        .AddUserKeyId("hu-beau@feature-flags.co")                     // 设置用户唯一标识（必填）
                                        .AddEmail("hu-beau@feature-flags.co")                         // 设置用户邮箱（可选）
                                        .AddName("hu-beau")                                           // 设置用户名称（可选）
                                        .AddCustomizedProperty("age", "36");                          // 设置自定义的属性（可选）

            // 下面代码通过使用agileToggle.IsInConditionAsync函数，向敏捷开关控制中心发送请求
            // 如果开关"show-welcom"返回了true，则显示"Welcom"，否则显示原版本代码"Hello World!"
            if (await agileToggle.IsInConditionAsync("Mg==__show-welcom"))
            {
                Console.WriteLine("Welcom!");
            }
            else
            {
                Console.WriteLine("Hello World!");
            }
        }
    }
}
