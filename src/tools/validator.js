/*Validator类*/
class Validator {
  constructor() {
    this.cache = []; //保存校验规则
    this.strategies = {
      isNonEmpty(value, errorMsg) {
        return value === "" ? errorMsg : void 0;
      },
      minLength(value, length, errorMsg) {
        return value.length < length ? errorMsg : void 0;
      },
      isMoblie(value, errorMsg) {
        return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value) ? errorMsg : void 0;
      },
      isEmail(value, errorMsg) {
        return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
          ? errorMsg
          : void 0;
      },
    };
  }
  add(value, rules) {
    for (let rule of rules) {
      let strategyAry = rule.strategy.split(":"); //例如['minLength',6]
      let errorMsg = rule.errorMsg; //'用户名不能为空'
      this.cache.push(() => {
        let strategy = strategyAry.shift(); //用户挑选的strategy
        strategyAry.unshift(value); //把input的value添加进参数列表
        strategyAry.push(errorMsg); //把errorMsg添加进参数列表，[dom.value,6,errorMsg]
        return this.strategies[strategy].apply(value, strategyAry);
      });
    }
  }
  start() {
    for (let validatorFunc of this.cache) {
      let errorMsg = validatorFunc(); //开始校验，并取得校验后的返回信息
      if (errorMsg) {
        //r如果有确切返回值，说明校验没有通过
        return errorMsg;
      }
    }
  }
}
export default Validator;
