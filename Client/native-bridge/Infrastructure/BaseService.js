export class BaseService {
    static _instances = new Map();

    constructor() {
        const ctor = this.constructor;
        if (BaseService._instances.has(ctor)) {
            return BaseService._instances.get(ctor);
        }
        BaseService._instances.set(ctor, this);
    }

    static getInstance(ServiceClass) {
        if (!BaseService._instances.has(ServiceClass)) {
            BaseService._instances.set(ServiceClass, new ServiceClass());
        }
        return BaseService._instances.get(ServiceClass);
    }

    /**
     * @param {Object<string, BaseService>} serviceRegister
     */
    InjectDependencies(serviceRegister) {
        for (const [serviceName, instance] of Object.entries(serviceRegister)) {
            const propName = serviceName; // zaten camelCase geliyor

            if (!Object.prototype.hasOwnProperty.call(this, propName)) {
                Object.defineProperty(this, propName, {
                    get: () => instance,
                    configurable: false,
                    enumerable: false,
                });
            }
        }

        return this;
    }
}
