import {} from 'react';
import './todoComponent.scss';
import type { TodoState } from '../../redux/todos/todosSlice';
import { useAppDispatch } from '../../actions/hooks';

import { todoMarkAsComplete } from '../../redux/todos/todosSlice';

const Todo = ({id,complete, todoMessage}:TodoState)=> {
    const dispatch = useAppDispatch();
    return (
        <div className={complete?"todoComponent--completed":"todoComponent--uncompleted"}>
            <button onClick={()=>dispatch(todoMarkAsComplete(id))}>Complete</button>
            <span className=''>{todoMessage}</span>
            <button>Delete</button>
        </div>
    )
}


export {Todo}