class Vnode {

    create(type, props, children) {
        if (!children)  return {type, props, children: null}

        let childArr = []
        const childrenLength = arguments.length - 2;
        for (let i = 0; i < childrenLength; i++) {
            const child = arguments[i + 2]
            if (Array.isArray(child)) childArr = [...childArr, ...child]

            childArr.push(child)
        }

        return {type, props, children: childArr}
    }
}

export const vnode = new Vnode()