using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FeatureFlags.APIs.ViewModels.FeatureFlagsViewModels
{
    public class RuleJsonContentViewModel
    {
        [JsonProperty("property")]
        public string Property { get; set; }
        [JsonProperty("operation")]
        public string Operation { get; set; }
        [JsonProperty("value")]
        public string Value { get; set; }
    }


    public enum RuleTypeOfValueEnum
    {
        Boolean,
        Number,
        String,
        ListString
    }

    public enum RuleTypeEnum
    {
        IsTrue,
        IsFalse,
        Equal,
        NotEqual,
        LessThan,
        BiggerThan,
        LessEqualThan,
        BiggerEqualThan,
        IsOneOf,
        NotOneOf,
        Contains,
        NotContain,
        StartsWith,
        EndsWith,
        MatchRegex,
        NotMatchRegex
    }

    public class RuleTypeValueMapping
    {
        public static Dictionary<RuleTypeEnum, List<RuleTypeOfValueEnum>> MappingDic = new Dictionary<RuleTypeEnum, List<RuleTypeOfValueEnum>>() {

            {
                RuleTypeEnum.Equal,
                new List<RuleTypeOfValueEnum>(){
                    RuleTypeOfValueEnum.Boolean,
                    RuleTypeOfValueEnum.Number,
                    RuleTypeOfValueEnum.String
                } 
            },
            {
                RuleTypeEnum.NotEqual,
                new List<RuleTypeOfValueEnum>(){
                    RuleTypeOfValueEnum.Boolean,
                    RuleTypeOfValueEnum.Number,
                    RuleTypeOfValueEnum.String
                }
            },
            {
                RuleTypeEnum.LessThan,
                new List<RuleTypeOfValueEnum>(){
                    RuleTypeOfValueEnum.Number
                }
            },
            {
                RuleTypeEnum.BiggerThan,
                new List<RuleTypeOfValueEnum>(){
                    RuleTypeOfValueEnum.Number
                }
            },
            {
                RuleTypeEnum.LessEqualThan,
                new List<RuleTypeOfValueEnum>(){
                    RuleTypeOfValueEnum.Number
                }
            },
            {
                RuleTypeEnum.BiggerEqualThan,
                new List<RuleTypeOfValueEnum>(){
                    RuleTypeOfValueEnum.Number
                }
            },
            {
                RuleTypeEnum.IsOneOf,
                new List<RuleTypeOfValueEnum>(){
                    RuleTypeOfValueEnum.ListString
                }
            },
            {
                RuleTypeEnum.NotOneOf,
                new List<RuleTypeOfValueEnum>(){
                    RuleTypeOfValueEnum.ListString
                }
            },
            {
                RuleTypeEnum.Contains,
                new List<RuleTypeOfValueEnum>(){
                    RuleTypeOfValueEnum.String
                }
            },
            {
                RuleTypeEnum.NotContain,
                new List<RuleTypeOfValueEnum>(){
                    RuleTypeOfValueEnum.String
                }
            },
            {
                RuleTypeEnum.StartsWith,
                new List<RuleTypeOfValueEnum>(){
                    RuleTypeOfValueEnum.String
                }
            },
            {
                RuleTypeEnum.EndsWith,
                new List<RuleTypeOfValueEnum>(){
                    RuleTypeOfValueEnum.String
                }
            },


        };
    }

}
