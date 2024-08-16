
export let activeEffectScope;

class EffectScope {
    active = true;
    effects = [];
    parent;


    run(fn) {
        if (this.active) {
            try {
                this.parent = activeEffectScope
                activeEffectScope = this;
                return fn()
            } finally {
                activeEffectScope = this.parent;
                this.parent = undefined;
            }
        }

    }
    stop() {
        if(this.active){
            for (let i = 0; i < this.effects.length; i++) {
                this.effects[i].stop()
            }
            this.active = false
        }
       

    }



}


export function recordEffectScope(effect) {
    if (effect && activeEffectScope && activeEffectScope.active) {
        activeEffectScope.effects.push(effect)
    }

}

export function effectScope() {
    return new EffectScope()
}
