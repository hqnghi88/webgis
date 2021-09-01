class Kernel {
    constructor() {
        this._instances = new Map();
        // for (var i = 0; i < CONFIGURATION.length; i++) {
        //     if (CONFIGURATION[i]['mode']) {
        //         console.log('new', CONFIGURATION[i]['class']);
        //         var myObject = window[CONFIGURATION[i]['class']]();
        //         this._instances.set(CONFIGURATION[i]['class'], myObject);
        //     }
        // }
        // console.log('instances', this._instances);
    }
    checkMode(className) {
        // console.log('Kernel.checkMode', className);
        for (var i = 0; i < CONFIGURATION.length; i++) {
            if (CONFIGURATION[i]['class'] == className) {
                return CONFIGURATION[i]['mode']
            }
        }
        return false;
    }

    addClass(classObject) {        
        this._instances.set(classObject.constructor.name, classObject);
        return classObject;
    }

    checkInstance(classObject) {
        return classObject.constructor.name in this._instances.keys();
    }
    getInstance(classObject) {
        if (classObject.constructor.name in this._instances.keys()) {
            return null;
        }
        else {
            // console.log('getInstance', classObject.constructor.name);
            return this._instances.get(classObject.constructor.name);
        }
    }
}

var kernel = new Kernel();