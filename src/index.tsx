/** @jsx vnode.create */

import {vnode} from "./Vnode";
let v = ['as', 'asd', '123as']


function A() {
    return (
        <div>
            <img src="avatar.png" className="profile" />
            <h3>{'asd'}</h3>
        </div>
    )
}

const profile = (
    <div>
        <A class={'asdasd'} ></A>
    </div>
)


console.log(profile)