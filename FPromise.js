class FPromise {
    static PENDING = '待定'
    static FULFILLED = '成功'
    static REJECTED = '拒绝'
    constructor(func) {
        this.status = FPromise.PENDING // 状态属性默认是待定
        this.result = null // 初始结果为null，执行resolve或reject的时候会为结果赋值
        this.resolveCallbacks = []
        this.rejectCallbacks = []
        try {
            func(this.resolve.bind(this), this.reject.bind(this))
        } catch (err) {
            this.reject(err) //此处不需要绑定this
        }
    }
    resolve(result) {
        if (this.status === FPromise.PENDING) {
            this.result = result
            this.status = FPromise.FULFILLED
            this.resolveCallbacks.forEach((cb) => cb(result))
        }
    }
    reject(result) {
        if (this.status === FPromise.PENDING) {
            this.result = result
            this.status = FPromise.REJECTED
            this.rejectCallbacks.forEach((cb) => cb(result))
        }
    }
    then(onFULFILLED, onREJECTED) {
        onFULFILLED = typeof onFULFILLED === 'function' ? onFULFILLED : () => {}
        onREJECTED = typeof onREJECTED === 'function' ? onREJECTED : () => {}
        if (this.status === FPromise.PENDING) {
            this.resolveCallbacks.push(onFULFILLED)
            this.rejectCallbacks.push(onREJECTED)
        }
        if (this.status === FPromise.FULFILLED) {
            setTimeout(() => {
                onFULFILLED(this.result)
            })
        }
        if (this.status === FPromise.REJECTED) {
            setTimeout(() => {
                onREJECTED(this.result)
            })
        }
    }
}

exports.FPromise = FPromise