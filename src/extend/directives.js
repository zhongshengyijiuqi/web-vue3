const decimal = {
    mounted(el, binding) {
        // 获取绑定的值
        const { value } = binding;
        // 解构出参数
        const { type, negative, integerNum } = value || {};
        console.log(binding)
        // 绑定事件
        el.addEventListener("input", (e) => {
            const inputVal = e.target.value.trim();
            const newVal = decimalFormat(inputVal, type,negative,integerNum);
            if (newVal !== inputVal) {
                e.target.value = newVal;
                // 触发 input 事件，确保 v-model 的数据同步
                e.target.dispatchEvent(new Event("input"));
            }
        });
    },
    updated(el, binding) {
        // 在 updated 钩子中重新绑定事件
        el.removeEventListener("input", el.handler);
        decimal.mounted(el, binding);
    },
    unmounted(el) {
        // 在组件卸载时移除事件
        el.removeEventListener("input", el.handler);
    },
};

// 格式化函数
function decimalFormat(value, type, negative = false, integerNum = 7) {
    if (!value) value = '';
    type = type != null ? type : 4;
    let str = value,
      len1 = str.substr(0, 1),
      len2 = str.substr(1, 1),
      len3 = str.substr(2, 1);
    //如果第一位是0，第二位不是点，就用数字把点替换掉
    if (str.length > 1 && len1 == 0 && len2 != ".") {
      str = str.substr(1, 1);
    }
    // 负数情况下，第2位是0时，第三为必须是小数点: -01 -> -0.
    if (negative && str.length > 2 && len1 === '-' && len2 == 0 && len3 != '.') {
      str = str.substr(0, 2);
    }
  
    //限制只能输入一个小数点
    if (str.indexOf(".") != -1) {
      let str_ = str.substr(str.indexOf(".") + 1);
      if (str_.indexOf(".") != -1) {
        str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
      }
    } else {
      //需求：输入整数也需保留4位小数
      // str = str + '.0000'
    }
    //保留小数;
    let reg = new RegExp('^([1-9][0-9]{0,' + integerNum + '}|0?)' + '(\\.[0-9]{0,' + type + '})?', 'g')
    if (negative) {
      reg = new RegExp('^-?([1-9][0-9]{0,' + integerNum + '}|0?)' + '(\\.[0-9]{0,' + type + '})?', 'g')
    }
    str = (str.match(reg) ?? [""])[0]
    return str;
}

export default { decimal };