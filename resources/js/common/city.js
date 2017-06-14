/**
 * Created by 向麒 on 2017/1/14.
 * 城配置文件
 */ 
'use strict';
var city = angular.module('city',[]);
city.constant('cityJson',{
    "provincesList": [
        {

            "Id": 1,
            "Name": "广西"
        },
        {
            "Id": 2,
            "Name": "澳门"
        },
        {
            "Id": 3,
            "Name": "海南"
        },
        {
            "Id": 4,
            "Name": "宁夏"
        },
        {
            "Id": 5,
            "Name": "青海"
        },
        {
            "Id": 6,
            "Name": "浙江"
        },
        {
            "Id": 7,
            "Name": "香港"
        },
        {
            "Id": 8,
            "Name": "贵州"
        },
        {
            "Id": 9,
            "Name": "陕西"
        },
        {
            "Id": 10,
            "Name": "云南"
        },
        {
            "Id": 11,
            "Name": "上海"
        },
        {
            "Id": 12,
            "Name": "黑龙江"
        },
        {
            "Id": 13,
            "Name": "新疆"
        },
        {
            "Id": 14,
            "Name": "北京"
        },
        {
            "Id": 15,
            "Name": "广东"
        },
        {
            "Id": 16,
            "Name": "西藏"
        },
        {
            "Id": 17,
            "Name": "山东"
        },
        {
            "Id": 18,
            "Name": "江西"
        },
        {
            "Id": 19,
            "Name": "河南"
        },
        {

            "Id": 20,
            "Name": "河北"
        },
        {
            "Id": 21,
            "Name": "台湾"
        },
        {
            "Id": 22,
            "Name": "湖北"
        },
        {
            "Id": 23,
            "Name": "重庆"
        },
        {
            "Id": 24,
            "Name": "内蒙古"
        },
        {
            "Id": 25,
            "Name": "天津"
        },
        {
            "Id": 26,
            "Name": "甘肃"
        },
        {
            "Id": 27,
            "Name": "安徽"
        },
        {
            "Id": 28,
            "Name": "福建"
        },
        {
            "Id": 29,
            "Name": "四川"
        },
        {
            "Id": 30,
            "Name": "江苏"
        },
        {
            "Id": 31,
            "Name": "吉林"
        },
        {
            "Id": 32,
            "Name": "辽宁"
        },
        {
            "Id": 33,
            "Name": "山西"
        },
        {
            "Id": 34,
            "Name": "湖南"
        }
    ],
    "Citys": [
        {
            "Id": 1,
            "Name": "钦州",
            "ProvinceId": 1
        },
        {
            "Id": 2,
            "Name": "崇左",
            "ProvinceId": 1
        },
        {
            "Id": 3,
            "Name": "河池",
            "ProvinceId": 1
        },
        {
            "Id": 4,
            "Name": "北海",
            "ProvinceId": 1
        },
        {
            "Id": 5,
            "Name": "梧州",
            "ProvinceId": 1
        },
        {
            "Id": 6,
            "Name": "南宁",
            "ProvinceId": 1
        },
        {
            "Id": 7,
            "Name": "百色",
            "ProvinceId": 1
        },
        {
            "Id": 8,
            "Name": "桂林",
            "ProvinceId": 1
        },
        {
            "Id": 9,
            "Name": "来宾",
            "ProvinceId": 1
        },
        {
            "Id": 10,
            "Name": "贺州",
            "ProvinceId": 1
        },
        {
            "Id": 11,
            "Name": "玉林",
            "ProvinceId": 1
        },
        {
            "Id": 12,
            "Name": "柳州",
            "ProvinceId": 1
        },
        {
            "Id": 13,
            "Name": "防城港",
            "ProvinceId": 1
        },
        {
            "Id": 14,
            "Name": "贵港",
            "ProvinceId": 1
        },
        {
            "Id": 15,
            "Name": "澳门",
            "ProvinceId": 2
        },
        {
            "Id": 16,
            "Name": "直辖县级行政单位",
            "ProvinceId": 3
        },
        {
            "Id": 17,
            "Name": "海口",
            "ProvinceId": 3
        },
        {
            "Id": 18,
            "Name": "三亚",
            "ProvinceId": 3
        },
        {
            "Id": 19,
            "Name": "银川",
            "ProvinceId": 4
        },
        {
            "Id": 20,
            "Name": "吴忠",
            "ProvinceId": 4
        },
        {
            "Id": 21,
            "Name": "固原",
            "ProvinceId": 4
        },
        {
            "Id": 22,
            "Name": "石嘴山",
            "ProvinceId": 4
        },
        {
            "Id": 23,
            "Name": "中卫",
            "ProvinceId": 4
        },
        {
            "Id": 24,
            "Name": "海北",
            "ProvinceId": 5
        },
        {
            "Id": 25,
            "Name": "黄南",
            "ProvinceId": 5
        },
        {
            "Id": 26,
            "Name": "果洛",
            "ProvinceId": 5
        },
        {
            "Id": 27,
            "Name": "西宁",
            "ProvinceId": 5
        },
        {
            "Id": 28,
            "Name": "玉树",
            "ProvinceId": 5
        },
        {
            "Id": 29,
            "Name": "海西",
            "ProvinceId": 5
        },
        {
            "Id": 30,
            "Name": "海南",
            "ProvinceId": 5
        },
        {
            "Id": 31,
            "Name": "海东",
            "ProvinceId": 5
        },
        {
            "Id": 32,
            "Name": "舟山",
            "ProvinceId": 6
        },
        {
            "Id": 33,
            "Name": "湖州",
            "ProvinceId": 6
        },
        {
            "Id": 34,
            "Name": "嘉兴",
            "ProvinceId": 6
        },
        {
            "Id": 35,
            "Name": "衢州",
            "ProvinceId": 6
        },
        {
            "Id": 36,
            "Name": "金华",
            "ProvinceId": 6
        },
        {
            "Id": 37,
            "Name": "台州",
            "ProvinceId": 6
        },
        {
            "Id": 38,
            "Name": "宁波",
            "ProvinceId": 6
        },
        {
            "Id": 39,
            "Name": "杭州",
            "ProvinceId": 6
        },
        {
            "Id": 40,
            "Name": "丽水",
            "ProvinceId": 6
        },
        {
            "Id": 41,
            "Name": "温州",
            "ProvinceId": 6
        },
        {
            "Id": 42,
            "Name": "绍兴",
            "ProvinceId": 6
        },
        {
            "Id": 43,
            "Name": "香港",
            "ProvinceId": 7
        },
        {
            "Id": 44,
            "Name": "黔南",
            "ProvinceId": 8
        },
        {
            "Id": 45,
            "Name": "铜仁",
            "ProvinceId": 8
        },
        {
            "Id": 46,
            "Name": "黔西南",
            "ProvinceId": 8
        },
        {
            "Id": 47,
            "Name": "黔东南",
            "ProvinceId": 8
        },
        {
            "Id": 48,
            "Name": "安顺",
            "ProvinceId": 8
        },
        {
            "Id": 49,
            "Name": "贵阳",
            "ProvinceId": 8
        },
        {
            "Id": 50,
            "Name": "毕节",
            "ProvinceId": 8
        },
        {
            "Id": 51,
            "Name": "遵义",
            "ProvinceId": 8
        },
        {
            "Id": 52,
            "Name": "六盘水",
            "ProvinceId": 8
        },
        {
            "Id": 53,
            "Name": "延安",
            "ProvinceId": 9
        },
        {
            "Id": 54,
            "Name": "渭南",
            "ProvinceId": 9
        },
        {
            "Id": 55,
            "Name": "宝鸡",
            "ProvinceId": 9
        },
        {
            "Id": 56,
            "Name": "安康",
            "ProvinceId": 9
        },
        {
            "Id": 57,
            "Name": "铜川",
            "ProvinceId": 9
        },
        {
            "Id": 58,
            "Name": "西安",
            "ProvinceId": 9
        },
        {
            "Id": 59,
            "Name": "榆林",
            "ProvinceId": 9
        },
        {
            "Id": 60,
            "Name": "汉中",
            "ProvinceId": 9
        },
        {
            "Id": 61,
            "Name": "咸阳",
            "ProvinceId": 9
        },
        {
            "Id": 62,
            "Name": "商洛",
            "ProvinceId": 9
        },
        {
            "Id": 63,
            "Name": "昭通",
            "ProvinceId": 10
        },
        {
            "Id": 64,
            "Name": "怒江",
            "ProvinceId": 10
        },
        {
            "Id": 65,
            "Name": "临沧",
            "ProvinceId": 10
        },
        {
            "Id": 66,
            "Name": "文山",
            "ProvinceId": 10
        },
        {
            "Id": 67,
            "Name": "西双版纳",
            "ProvinceId": 10
        },
        {
            "Id": 68,
            "Name": "楚雄",
            "ProvinceId": 10
        },
        {
            "Id": 69,
            "Name": "丽江",
            "ProvinceId": 10
        },
        {
            "Id": 70,
            "Name": "德宏",
            "ProvinceId": 10
        },
        {
            "Id": 71,
            "Name": "保山",
            "ProvinceId": 10
        },
        {
            "Id": 72,
            "Name": "大理",
            "ProvinceId": 10
        },
        {
            "Id": 73,
            "Name": "迪庆",
            "ProvinceId": 10
        },
        {
            "Id": 74,
            "Name": "玉溪",
            "ProvinceId": 10
        },
        {
            "Id": 75,
            "Name": "红河",
            "ProvinceId": 10
        },
        {
            "Id": 76,
            "Name": "曲靖",
            "ProvinceId": 10
        },
        {
            "Id": 77,
            "Name": "思茅",
            "ProvinceId": 10
        },
        {
            "Id": 78,
            "Name": "昆明",
            "ProvinceId": 10
        },
        {
            "Id": 79,
            "Name": "上海",
            "ProvinceId": 11
        },
        {
            "Id": 80,
            "Name": "大庆",
            "ProvinceId": 12
        },
        {
            "Id": 81,
            "Name": "大兴安岭",
            "ProvinceId": 12
        },
        {
            "Id": 82,
            "Name": "双鸭山",
            "ProvinceId": 12
        },
        {
            "Id": 83,
            "Name": "鹤岗",
            "ProvinceId": 12
        },
        {
            "Id": 84,
            "Name": "鸡西",
            "ProvinceId": 12
        },
        {
            "Id": 85,
            "Name": "佳木斯",
            "ProvinceId": 12
        },
        {
            "Id": 86,
            "Name": "七台河",
            "ProvinceId": 12
        },
        {
            "Id": 87,
            "Name": "伊春",
            "ProvinceId": 12
        },
        {
            "Id": 88,
            "Name": "哈尔滨",
            "ProvinceId": 12
        },
        {
            "Id": 89,
            "Name": "牡丹江",
            "ProvinceId": 12
        },
        {
            "Id": 90,
            "Name": "黑河",
            "ProvinceId": 12
        },
        {
            "Id": 91,
            "Name": "齐齐哈尔",
            "ProvinceId": 12
        },
        {
            "Id": 92,
            "Name": "绥化",
            "ProvinceId": 12
        },
        {
            "Id": 93,
            "Name": "喀什",
            "ProvinceId": 13
        },
        {
            "Id": 94,
            "Name": "巴音郭楞",
            "ProvinceId": 13
        },
        {
            "Id": 95,
            "Name": "吐鲁番",
            "ProvinceId": 13
        },
        {
            "Id": 96,
            "Name": "克孜勒苏",
            "ProvinceId": 13
        },
        {
            "Id": 97,
            "Name": "昌吉",
            "ProvinceId": 13
        },
        {
            "Id": 98,
            "Name": "伊犁",
            "ProvinceId": 13
        },
        {
            "Id": 99,
            "Name": "阿勒泰",
            "ProvinceId": 13
        },
        {
            "Id": 100,
            "Name": "塔城",
            "ProvinceId": 13
        },
        {
            "Id": 101,
            "Name": "阿克苏",
            "ProvinceId": 13
        },
        {
            "Id": 102,
            "Name": "哈密",
            "ProvinceId": 13
        },
        {
            "Id": 103,
            "Name": "乌鲁木齐",
            "ProvinceId": 13
        },
        {
            "Id": 104,
            "Name": "直辖行政单位",
            "ProvinceId": 13
        },
        {
            "Id": 105,
            "Name": "博尔塔拉",
            "ProvinceId": 13
        },
        {
            "Id": 106,
            "Name": "克拉玛依",
            "ProvinceId": 13
        },
        {
            "Id": 107,
            "Name": "和田",
            "ProvinceId": 13
        },
        {
            "Id": 108,
            "Name": "北京",
            "ProvinceId": 14
        },
        {
            "Id": 109,
            "Name": "汕尾",
            "ProvinceId": 15
        },
        {
            "Id": 110,
            "Name": "中山",
            "ProvinceId": 15
        },
        {
            "Id": 111,
            "Name": "韶关",
            "ProvinceId": 15
        },
        {
            "Id": 112,
            "Name": "东莞",
            "ProvinceId": 15
        },
        {
            "Id": 113,
            "Name": "江门",
            "ProvinceId": 15
        },
        {
            "Id": 114,
            "Name": "茂名",
            "ProvinceId": 15
        },
        {
            "Id": 115,
            "Name": "佛山",
            "ProvinceId": 15
        },
        {
            "Id": 116,
            "Name": "广州",
            "ProvinceId": 15
        },
        {
            "Id": 117,
            "Name": "珠海",
            "ProvinceId": 15
        },
        {
            "Id": 118,
            "Name": "湛江",
            "ProvinceId": 15
        },
        {
            "Id": 119,
            "Name": "深圳",
            "ProvinceId": 15
        },
        {
            "Id": 120,
            "Name": "云浮",
            "ProvinceId": 15
        },
        {
            "Id": 121,
            "Name": "河源",
            "ProvinceId": 15
        },
        {
            "Id": 122,
            "Name": "惠州",
            "ProvinceId": 15
        },
        {
            "Id": 123,
            "Name": "阳江",
            "ProvinceId": 15
        },
        {
            "Id": 124,
            "Name": "汕头",
            "ProvinceId": 15
        },
        {
            "Id": 125,
            "Name": "揭阳",
            "ProvinceId": 15
        },
        {
            "Id": 126,
            "Name": "清远",
            "ProvinceId": 15
        },
        {
            "Id": 127,
            "Name": "潮州",
            "ProvinceId": 15
        },
        {
            "Id": 128,
            "Name": "肇庆",
            "ProvinceId": 15
        },
        {
            "Id": 129,
            "Name": "梅州",
            "ProvinceId": 15
        },
        {
            "Id": 130,
            "Name": "昌都",
            "ProvinceId": 16
        },
        {
            "Id": 131,
            "Name": "那曲",
            "ProvinceId": 16
        },
        {
            "Id": 132,
            "Name": "林芝",
            "ProvinceId": 16
        },
        {
            "Id": 133,
            "Name": "阿里",
            "ProvinceId": 16
        },
        {
            "Id": 134,
            "Name": "日喀则",
            "ProvinceId": 16
        },
        {
            "Id": 135,
            "Name": "拉萨",
            "ProvinceId": 16
        },
        {
            "Id": 136,
            "Name": "山南",
            "ProvinceId": 16
        },
        {
            "Id": 137,
            "Name": "诸城",
            "ProvinceId": 17
        },
        {
            "Id": 138,
            "Name": "聊城",
            "ProvinceId": 17
        },
        {
            "Id": 139,
            "Name": "济宁",
            "ProvinceId": 17
        },
        {
            "Id": 140,
            "Name": "临沂",
            "ProvinceId": 17
        },
        {
            "Id": 141,
            "Name": "威海",
            "ProvinceId": 17
        },
        {
            "Id": 142,
            "Name": "德州",
            "ProvinceId": 17
        },
        {
            "Id": 143,
            "Name": "东营",
            "ProvinceId": 17
        },
        {
            "Id": 144,
            "Name": "济南",
            "ProvinceId": 17
        },
        {
            "Id": 145,
            "Name": "潍坊",
            "ProvinceId": 17
        },
        {
            "Id": 146,
            "Name": "烟台",
            "ProvinceId": 17
        },
        {
            "Id": 147,
            "Name": "荷泽",
            "ProvinceId": 17
        },
        {
            "Id": 148,
            "Name": "枣庄",
            "ProvinceId": 17
        },
        {
            "Id": 149,
            "Name": "淄博",
            "ProvinceId": 17
        },
        {
            "Id": 150,
            "Name": "滨州",
            "ProvinceId": 17
        },
        {
            "Id": 151,
            "Name": "日照",
            "ProvinceId": 17
        },
        {
            "Id": 152,
            "Name": "青岛",
            "ProvinceId": 17
        },
        {
            "Id": 153,
            "Name": "泰安",
            "ProvinceId": 17
        },
        {
            "Id": 154,
            "Name": "莱芜",
            "ProvinceId": 17
        },
        {
            "Id": 155,
            "Name": "九江",
            "ProvinceId": 18
        },
        {
            "Id": 156,
            "Name": "鹰潭",
            "ProvinceId": 18
        },
        {
            "Id": 157,
            "Name": "上饶",
            "ProvinceId": 18
        },
        {
            "Id": 158,
            "Name": "南昌",
            "ProvinceId": 18
        },
        {
            "Id": 159,
            "Name": "抚州",
            "ProvinceId": 18
        },
        {
            "Id": 160,
            "Name": "宜春",
            "ProvinceId": 18
        },
        {
            "Id": 161,
            "Name": "吉安",
            "ProvinceId": 18
        },
        {
            "Id": 162,
            "Name": "景德镇",
            "ProvinceId": 18
        },
        {
            "Id": 163,
            "Name": "赣州",
            "ProvinceId": 18
        },
        {
            "Id": 164,
            "Name": "萍乡",
            "ProvinceId": 18
        },
        {
            "Id": 165,
            "Name": "新余",
            "ProvinceId": 18
        },
        {
            "Id": 166,
            "Name": "漯河",
            "ProvinceId": 19
        },
        {
            "Id": 167,
            "Name": "新乡",
            "ProvinceId": 19
        },
        {
            "Id": 168,
            "Name": "许昌",
            "ProvinceId": 19
        },
        {
            "Id": 169,
            "Name": "信阳",
            "ProvinceId": 19
        },
        {
            "Id": 170,
            "Name": "安阳",
            "ProvinceId": 19
        },
        {
            "Id": 171,
            "Name": "洛阳",
            "ProvinceId": 19
        },
        {
            "Id": 172,
            "Name": "三门峡",
            "ProvinceId": 19
        },
        {
            "Id": 173,
            "Name": "平顶山",
            "ProvinceId": 19
        },
        {
            "Id": 174,
            "Name": "焦作",
            "ProvinceId": 19
        },
        {
            "Id": 175,
            "Name": "周口",
            "ProvinceId": 19
        },
        {
            "Id": 176,
            "Name": "濮阳",
            "ProvinceId": 19
        },
        {
            "Id": 177,
            "Name": "南阳",
            "ProvinceId": 19
        },
        {
            "Id": 178,
            "Name": "驻马店",
            "ProvinceId": 19
        },
        {
            "Id": 179,
            "Name": "郑州",
            "ProvinceId": 19
        },
        {
            "Id": 180,
            "Name": "鹤壁",
            "ProvinceId": 19
        },
        {
            "Id": 181,
            "Name": "开封",
            "ProvinceId": 19
        },
        {
            "Id": 182,
            "Name": "商丘",
            "ProvinceId": 19
        },
        {
            "Id": 183,
            "Name": "沧州",
            "ProvinceId": 20
        },
        {
            "Id": 184,
            "Name": "石家庄",
            "ProvinceId": 20
        },
        {
            "Id": 185,
            "Name": "唐山",
            "ProvinceId": 20
        },
        {
            "Id": 186,
            "Name": "邢台",
            "ProvinceId": 20
        },
        {
            "Id": 187,
            "Name": "邯郸",
            "ProvinceId": 20
        },
        {
            "Id": 188,
            "Name": "衡水",
            "ProvinceId": 20
        },
        {
            "Id": 189,
            "Name": "承德",
            "ProvinceId": 20
        },
        {
            "Id": 190,
            "Name": "保定",
            "ProvinceId": 20
        },
        {
            "Id": 191,
            "Name": "张家口",
            "ProvinceId": 20
        },
        {
            "Id": 192,
            "Name": "秦皇岛",
            "ProvinceId": 20
        },
        {
            "Id": 193,
            "Name": "廊坊",
            "ProvinceId": 20
        },
        {
            "Id": 194,
            "Name": "襄樊",
            "ProvinceId": 22
        },
        {
            "Id": 195,
            "Name": "直辖行政单位",
            "ProvinceId": 22
        },
        {
            "Id": 196,
            "Name": "黄冈",
            "ProvinceId": 22
        },
        {
            "Id": 197,
            "Name": "武汉",
            "ProvinceId": 22
        },
        {
            "Id": 198,
            "Name": "随州",
            "ProvinceId": 22
        },
        {
            "Id": 199,
            "Name": "孝感",
            "ProvinceId": 22
        },
        {
            "Id": 200,
            "Name": "恩施",
            "ProvinceId": 22
        },
        {
            "Id": 201,
            "Name": "鄂州",
            "ProvinceId": 22
        },
        {
            "Id": 202,
            "Name": "十堰",
            "ProvinceId": 22
        },
        {
            "Id": 203,
            "Name": "荆门",
            "ProvinceId": 22
        },
        {
            "Id": 204,
            "Name": "黄石",
            "ProvinceId": 22
        },
        {
            "Id": 205,
            "Name": "宜昌",
            "ProvinceId": 22
        },
        {
            "Id": 206,
            "Name": "荆州",
            "ProvinceId": 22
        },
        {
            "Id": 207,
            "Name": "咸宁",
            "ProvinceId": 22
        },
        {
            "Id": 208,
            "Name": "重庆",
            "ProvinceId": 23
        },
        {
            "Id": 209,
            "Name": "乌海",
            "ProvinceId": 24
        },
        {
            "Id": 210,
            "Name": "乌兰察布",
            "ProvinceId": 24
        },
        {
            "Id": 211,
            "Name": "呼和浩特",
            "ProvinceId": 24
        },
        {
            "Id": 212,
            "Name": "鄂尔多斯",
            "ProvinceId": 24
        },
        {
            "Id": 213,
            "Name": "锡林郭勒",
            "ProvinceId": 24
        },
        {
            "Id": 214,
            "Name": "呼伦贝尔",
            "ProvinceId": 24
        },
        {
            "Id": 215,
            "Name": "巴彦淖尔",
            "ProvinceId": 24
        },
        {
            "Id": 216,
            "Name": "阿拉善盟",
            "ProvinceId": 24
        },
        {
            "Id": 217,
            "Name": "包头",
            "ProvinceId": 24
        },
        {
            "Id": 218,
            "Name": "赤峰",
            "ProvinceId": 24
        },
        {
            "Id": 219,
            "Name": "通辽",
            "ProvinceId": 24
        },
        {
            "Id": 220,
            "Name": "兴安盟",
            "ProvinceId": 24
        },
        {
            "Id": 221,
            "Name": "天津",
            "ProvinceId": 25
        },
        {
            "Id": 222,
            "Name": "酒泉",
            "ProvinceId": 26
        },
        {
            "Id": 223,
            "Name": "临夏",
            "ProvinceId": 26
        },
        {
            "Id": 224,
            "Name": "天水",
            "ProvinceId": 26
        },
        {
            "Id": 225,
            "Name": "白银",
            "ProvinceId": 26
        },
        {
            "Id": 226,
            "Name": "定西",
            "ProvinceId": 26
        },
        {
            "Id": 227,
            "Name": "兰州",
            "ProvinceId": 26
        },
        {
            "Id": 228,
            "Name": "甘南",
            "ProvinceId": 26
        },
        {
            "Id": 229,
            "Name": "张掖",
            "ProvinceId": 26
        },
        {
            "Id": 230,
            "Name": "陇南",
            "ProvinceId": 26
        },
        {
            "Id": 231,
            "Name": "嘉峪关",
            "ProvinceId": 26
        },
        {
            "Id": 232,
            "Name": "庆阳",
            "ProvinceId": 26
        },
        {
            "Id": 233,
            "Name": "武威",
            "ProvinceId": 26
        },
        {
            "Id": 234,
            "Name": "金昌",
            "ProvinceId": 26
        },
        {
            "Id": 235,
            "Name": "平凉",
            "ProvinceId": 26
        },
        {
            "Id": 236,
            "Name": "铜陵",
            "ProvinceId": 27
        },
        {
            "Id": 237,
            "Name": "亳州",
            "ProvinceId": 27
        },
        {
            "Id": 238,
            "Name": "巢湖",
            "ProvinceId": 27
        },
        {
            "Id": 239,
            "Name": "黄山",
            "ProvinceId": 27
        },
        {
            "Id": 240,
            "Name": "安庆",
            "ProvinceId": 27
        },
        {
            "Id": 241,
            "Name": "宿州",
            "ProvinceId": 27
        },
        {
            "Id": 242,
            "Name": "六安",
            "ProvinceId": 27
        },
        {
            "Id": 243,
            "Name": "蚌埠",
            "ProvinceId": 27
        },
        {
            "Id": 244,
            "Name": "合肥",
            "ProvinceId": 27
        },
        {
            "Id": 245,
            "Name": "池州",
            "ProvinceId": 27
        },
        {
            "Id": 246,
            "Name": "芜湖",
            "ProvinceId": 27
        },
        {
            "Id": 247,
            "Name": "宣城",
            "ProvinceId": 27
        },
        {
            "Id": 248,
            "Name": "淮南",
            "ProvinceId": 27
        },
        {
            "Id": 249,
            "Name": "阜阳",
            "ProvinceId": 27
        },
        {
            "Id": 250,
            "Name": "滁州",
            "ProvinceId": 27
        },
        {
            "Id": 251,
            "Name": "马鞍山",
            "ProvinceId": 27
        },
        {
            "Id": 252,
            "Name": "淮北",
            "ProvinceId": 27
        },
        {
            "Id": 253,
            "Name": "厦门",
            "ProvinceId": 28
        },
        {
            "Id": 254,
            "Name": "南平",
            "ProvinceId": 28
        },
        {
            "Id": 255,
            "Name": "三明",
            "ProvinceId": 28
        },
        {
            "Id": 256,
            "Name": "宁德",
            "ProvinceId": 28
        },
        {
            "Id": 257,
            "Name": "莆田",
            "ProvinceId": 28
        },
        {
            "Id": 258,
            "Name": "福州",
            "ProvinceId": 28
        },
        {
            "Id": 259,
            "Name": "漳州",
            "ProvinceId": 28
        },
        {
            "Id": 260,
            "Name": "龙岩",
            "ProvinceId": 28
        },
        {
            "Id": 261,
            "Name": "泉州",
            "ProvinceId": 28
        },
        {
            "Id": 262,
            "Name": "广安",
            "ProvinceId": 29
        },
        {
            "Id": 263,
            "Name": "阿坝",
            "ProvinceId": 29
        },
        {
            "Id": 264,
            "Name": "广元",
            "ProvinceId": 29
        },
        {
            "Id": 265,
            "Name": "遂宁",
            "ProvinceId": 29
        },
        {
            "Id": 266,
            "Name": "乐山",
            "ProvinceId": 29
        },
        {
            "Id": 267,
            "Name": "凉山",
            "ProvinceId": 29
        },
        {
            "Id": 268,
            "Name": "泸州",
            "ProvinceId": 29
        },
        {
            "Id": 269,
            "Name": "南充",
            "ProvinceId": 29
        },
        {
            "Id": 270,
            "Name": "内江",
            "ProvinceId": 29
        },
        {
            "Id": 271,
            "Name": "宜宾",
            "ProvinceId": 29
        },
        {
            "Id": 272,
            "Name": "资阳",
            "ProvinceId": 29
        },
        {
            "Id": 273,
            "Name": "巴中",
            "ProvinceId": 29
        },
        {
            "Id": 274,
            "Name": "攀枝花",
            "ProvinceId": 29
        },
        {
            "Id": 275,
            "Name": "自贡",
            "ProvinceId": 29
        },
        {
            "Id": 276,
            "Name": "雅安",
            "ProvinceId": 29
        },
        {
            "Id": 277,
            "Name": "眉山",
            "ProvinceId": 29
        },
        {
            "Id": 278,
            "Name": "绵阳",
            "ProvinceId": 29
        },
        {
            "Id": 279,
            "Name": "德阳",
            "ProvinceId": 29
        },
        {
            "Id": 280,
            "Name": "成都",
            "ProvinceId": 29
        },
        {
            "Id": 281,
            "Name": "甘孜",
            "ProvinceId": 29
        },
        {
            "Id": 282,
            "Name": "达州",
            "ProvinceId": 29
        },
        {
            "Id": 283,
            "Name": "无锡",
            "ProvinceId": 30
        },
        {
            "Id": 284,
            "Name": "常州",
            "ProvinceId": 30
        },
        {
            "Id": 285,
            "Name": "盐城",
            "ProvinceId": 30
        },
        {
            "Id": 286,
            "Name": "苏州",
            "ProvinceId": 30
        },
        {
            "Id": 287,
            "Name": "宿迁",
            "ProvinceId": 30
        },
        {
            "Id": 288,
            "Name": "徐州",
            "ProvinceId": 30
        },
        {
            "Id": 289,
            "Name": "淮安",
            "ProvinceId": 30
        },
        {
            "Id": 290,
            "Name": "连云港",
            "ProvinceId": 30
        },
        {
            "Id": 291,
            "Name": "南京",
            "ProvinceId": 30
        },
        {
            "Id": 292,
            "Name": "镇江",
            "ProvinceId": 30
        },
        {
            "Id": 293,
            "Name": "南通",
            "ProvinceId": 30
        },
        {
            "Id": 294,
            "Name": "扬州",
            "ProvinceId": 30
        },
        {
            "Id": 295,
            "Name": "泰州",
            "ProvinceId": 30
        },
        {
            "Id": 296,
            "Name": "吉林",
            "ProvinceId": 31
        },
        {
            "Id": 297,
            "Name": "松原",
            "ProvinceId": 31
        },
        {
            "Id": 298,
            "Name": "四平",
            "ProvinceId": 31
        },
        {
            "Id": 299,
            "Name": "延边",
            "ProvinceId": 31
        },
        {
            "Id": 300,
            "Name": "长春",
            "ProvinceId": 31
        },
        {
            "Id": 301,
            "Name": "白城",
            "ProvinceId": 31
        },
        {
            "Id": 302,
            "Name": "白山",
            "ProvinceId": 31
        },
        {
            "Id": 303,
            "Name": "辽源",
            "ProvinceId": 31
        },
        {
            "Id": 304,
            "Name": "通化",
            "ProvinceId": 31
        },
        {
            "Id": 305,
            "Name": "本溪",
            "ProvinceId": 32
        },
        {
            "Id": 306,
            "Name": "丹东",
            "ProvinceId": 32
        },
        {
            "Id": 307,
            "Name": "大连",
            "ProvinceId": 32
        },
        {
            "Id": 308,
            "Name": "阜新",
            "ProvinceId": 32
        },
        {
            "Id": 309,
            "Name": "抚顺",
            "ProvinceId": 32
        },
        {
            "Id": 310,
            "Name": "铁岭",
            "ProvinceId": 32
        },
        {
            "Id": 311,
            "Name": "锦州",
            "ProvinceId": 32
        },
        {
            "Id": 312,
            "Name": "沈阳",
            "ProvinceId": 32
        },
        {
            "Id": 313,
            "Name": "葫芦岛",
            "ProvinceId": 32
        },
        {
            "Id": 314,
            "Name": "鞍山",
            "ProvinceId": 32
        },
        {
            "Id": 315,
            "Name": "朝阳",
            "ProvinceId": 32
        },
        {
            "Id": 316,
            "Name": "盘锦",
            "ProvinceId": 32
        },
        {
            "Id": 317,
            "Name": "辽阳",
            "ProvinceId": 32
        },
        {
            "Id": 318,
            "Name": "营口",
            "ProvinceId": 32
        },
        {
            "Id": 319,
            "Name": "阳泉",
            "ProvinceId": 33
        },
        {
            "Id": 320,
            "Name": "晋城",
            "ProvinceId": 33
        },
        {
            "Id": 321,
            "Name": "晋中",
            "ProvinceId": 33
        },
        {
            "Id": 322,
            "Name": "太原",
            "ProvinceId": 33
        },
        {
            "Id": 323,
            "Name": "大同",
            "ProvinceId": 33
        },
        {
            "Id": 324,
            "Name": "忻州",
            "ProvinceId": 33
        },
        {
            "Id": 325,
            "Name": "吕梁",
            "ProvinceId": 33
        },
        {
            "Id": 326,
            "Name": "长治",
            "ProvinceId": 33
        },
        {
            "Id": 327,
            "Name": "临汾",
            "ProvinceId": 33
        },
        {
            "Id": 328,
            "Name": "运城",
            "ProvinceId": 33
        },
        {
            "Id": 329,
            "Name": "朔州",
            "ProvinceId": 33
        },
        {
            "Id": 330,
            "Name": "株洲",
            "ProvinceId": 34
        },
        {
            "Id": 331,
            "Name": "张家界",
            "ProvinceId": 34
        },
        {
            "Id": 332,
            "Name": "湘西",
            "ProvinceId": 34
        },
        {
            "Id": 333,
            "Name": "益阳",
            "ProvinceId": 34
        },
        {
            "Id": 334,
            "Name": "怀化",
            "ProvinceId": 34
        },
        {
            "Id": 335,
            "Name": "郴州",
            "ProvinceId": 34
        },
        {
            "Id": 336,
            "Name": "娄底",
            "ProvinceId": 34
        },
        {
            "Id": 337,
            "Name": "邵阳",
            "ProvinceId": 34
        },
        {
            "Id": 338,
            "Name": "衡阳",
            "ProvinceId": 34
        },
        {
            "Id": 339,
            "Name": "常德",
            "ProvinceId": 34
        },
        {
            "Id": 340,
            "Name": "湘潭",
            "ProvinceId": 34
        },
        {
            "Id": 341,
            "Name": "永州",
            "ProvinceId": 34
        },
        {
            "Id": 342,
            "Name": "长沙",
            "ProvinceId": 34
        },
        {
            "Id": 343,
            "Name": "岳阳",
            "ProvinceId": 34
        }
    ]
});
