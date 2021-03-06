/*
 * Globalize Culture zh
 *
 * http://github.com/jquery/globalize
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * This file was generated by the Globalize Culture Generator
 * Translation: bugs found in this file need to be fixed in the generator
 */
/*
globalize说明
Site.globalize.format(1839.560, "n2") //数字格式化，2位小数
Site.globalize.format(1839.560, "c2") //货币格式化，2位小数

Site.globalize.format(new Date()) //日期格式化
Site.globalize.format(new Date(),'gg yyyy-M-d hh:mm:ss')
Site.globalize.format(new Date(),'f') //full

Site.globalize.format(new Date(),'t') //time,最多2个
Site.globalize.format(new Date(),'zz') //时区
Site.globalize.format(new Date(),'gg')

Site.globalize.format(new Date(),"d") //day,最多4个d
Site.globalize.format(new Date(),'M') //month
Site.globalize.format(new Date(),'yyyy') //year
Site.globalize.format(new Date(),'hh') //hour
Site.globalize.format(new Date(),'mm') //minute
Site.globalize.format(new Date(),'ss') //second

*/

(function( window, undefined ) {

var Globalize = document.Globalize;


Globalize.addCultureInfo( "zh", "default", {
	name: "zh",
	englishName: "Chinese",
	nativeName: "中文",
	language: "zh",
	numberFormat: {
		"NaN": "非数字",
		negativeInfinity: "负无穷大",
		positiveInfinity: "正无穷大",
		percent: {
			pattern: ["-n%","n%"]
		},
		currency: {
			pattern: ["$-n","$n"],
			symbol: "¥"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
				namesAbbr: ["周日","周一","周二","周三","周四","周五","周六"],
				namesShort: ["日","一","二","三","四","五","六"]
			},
			months: {
				names: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],
				namesAbbr: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]
			},
			AM: ["上午","上午","上午"],
			PM: ["下午","下午","下午"],
			eras: [{"name":"公元","start":null,"offset":0}],
			patterns: {
				d: "yyyy/M/d",
				D: "yyyy'年'M'月'd'日'",
				t: "H:mm",
				T: "H:mm:ss",
				f: "yyyy'年'M'月'd'日' H:mm",
				F: "yyyy'年'M'月'd'日' H:mm:ss",
				M: "M'月'd'日'",
				Y: "yyyy'年'M'月'"
			}
		}
	},

    // separator of parts of a date (e.g. '/' in 11/05/1955)
    '/': "/",
    // separator of parts of a time (e.g. ':' in 05:44 PM)
    ':': ":",
    // the first day of the week (0 = Sunday, 1 = Monday, etc)
    firstDay: 0,
    days: {
        // full day names
        names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        // abbreviated day names
        namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        // shortest day names
        namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    },
    months: {
        // full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
        names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],
        // abbreviated month names
        namesAbbr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""]
    },
    // AM and PM designators in one of these forms:
    // The usual view, and the upper and lower case versions
    //      [standard,lowercase,uppercase]
    // The culture does not use AM or PM (likely all standard date formats use 24 hour time)
    //      null
    AM: ["AM", "am", "AM"],
    PM: ["PM", "pm", "PM"],
    eras: [
    // eras in reverse chronological order.
    // name: the name of the era in this culture (e.g. A.D., C.E.)
    // start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
    // offset: offset in years from gregorian calendar
    { "name": "A.D.", "start": null, "offset": 0 }
    ],
    twoDigitYearMax: 2029,
    patterns: {
        // short date pattern
        d: "M/d/yyyy",
        // long date pattern
        D: "dddd, MMMM dd, yyyy",
        // short time pattern
        t: "h:mm tt",
        // long time pattern
        T: "h:mm:ss tt",
        // long date, short time pattern
        f: "dddd, MMMM dd, yyyy h:mm tt",
        // long date, long time pattern
        F: "dddd, MMMM dd, yyyy h:mm:ss tt",
        // month/day pattern
        M: "MMMM dd",
        // month/year pattern
        Y: "yyyy MMMM",
        // S is a sortable format that does not vary by culture
        S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
        // formatting of dates in MySQL DataBases
        ISO: "yyyy-MM-dd hh:mm:ss",
        ISO2: "yyyy-MM-dd HH:mm:ss",
        d1: "dd.MM.yyyy",
        d2: "dd-MM-yyyy",
        d3: "dd-MMMM-yyyy",
        d4: "dd-MM-yy",
        d5: "H:mm",
        d6: "HH:mm",
        d7: "HH:mm tt",
        d8: "dd/MMMM/yyyy",
        d9: "MMMM-dd",
        d10: "MM-dd",
        d11: "MM-dd-yyyy"
    },
    percentsymbol: "%",
    currencysymbol: "￥",
    currencysymbolposition: "before",
    decimalseparator: '.',
    thousandsseparator: ',',
    pagergotopagestring: "Go to page:",
    pagershowrowsstring: "Show rows:",
    pagerrangestring: " of ",
    pagerpreviousbuttonstring: "previous",
    pagernextbuttonstring: "next",
    pagerfirstbuttonstring: "first",
    pagerlastbuttonstring: "last",
    groupsheaderstring: "Drag a column and drop it here to group by that column",
    sortascendingstring: "升序",
    sortdescendingstring: "降序",
    sortremovestring: "Remove Sort",
    groupbystring: "Group By this column",
    groupremovestring: "Remove from groups",
    filterclearstring: "Clear",
    filterstring: "Filter",
    filtershowrowstring: "Show rows where:",
    filterorconditionstring: "或者",
    filterandconditionstring: "和",
    filterselectallstring: "(选择全部)",
    filterchoosestring: "请选择:",
    filterstringcomparisonoperators: ['空', '非空', 'enthalten', 'enthalten(match case)',
       '不包含', '不包含(match case)', '开始', '开始(match case)',
       '结束', '结束(match case)', '等于', '等于(match case)', 'null', 'not null'],
    filternumericcomparisonoperators: ['等于', '不等于', '少于', '少于 or 等于', '大于', '大于 or 等于', 'null', 'not null'],
    filterdatecomparisonoperators: ['等于', '不等于', '少于', '少于 or 等于', '大于', '大于 or 等于', 'null', 'not null'],
    filterbooleancomparisonoperators: ['等于', '不等于'],
    validationstring: "无效的输入值",
    emptydatastring: "没有数据",
    filterselectstring: "Select Filter",
    loadtext: "正在加载...",
    clearstring: "Clear",
    todaystring: "Today"

});

document.Globalize.cultureSelector = 'zh';
}( this ));




