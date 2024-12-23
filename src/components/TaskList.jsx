import Task from './Task';
import { useDispatch, useSelector } from 'react-redux';
/* 컴포넌트 생성할 실제 데이터를 redux store에서 받음 - src/App.jsx에 연결해서 컴포넌트 렌더링 할 수 있음 */
/* but 변경으로 인해 storybook story가 멈춤 - TaskList가 연결된 컴포넌트이기 때문 */
/* decorator에 의존하여 storybook story에서 mocked store 제공 가능 */
import { updateTaskState } from '../lib/store';

export default function TaskList() {
    /* store에서 state 찾기 */
    const tasks = useSelector ((state) => {
        const tasksInOrder = [
            ...state.taskbox.tasks.filter((t) => t.state === 'TASK_PINNED'),
            ...state.taskbox.tasks.filter((t) => t.state !== 'TASK_PINNED'),
        ];
        const filteredTasks = tasksInOrder.filter(
            (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
        );
        return filteredTasks;
    });

    const { status } = useSelector((state) => state.taskbox);
    const dispatch = useDispatch();

    const pinTask = (value) => {
        dispatch(updateTaskState({ id: value, newTaskState: 'TASK_PINNED'}));
    };
    /* Dispatching the pinned event back to store */

    const archiveTask = (value) => {
        dispatch(updateTaskState({ id: value, newTaskState: 'TASK_ARCHIVED'}));
    };
    /* Dispatching the archived event back to store */

    const LoadingRow = (
        <div className="loading-item">
        <span className="glow-checkbox" />
        <span className="glow-text">
            <span>Loading</span> <span>cool</span> <span>state</span>
        </span>
        </div>
    );
    if (status === 'loading') {
        return (
        <div className="list-items" data-testid="loading" key={"loading"}>
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
            {LoadingRow}
        </div>
        );
    }
  if (tasks.length === 0) {
    return (
      <div className="list-items" key={"empty"} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
  }

  return (
    <div className='list-items' data-testid='success' key={'success'}>
        {tasks.map((task) => (
            <Task
                key={task.id}
                task={task}
                onPinTask={(task) => pinTask(task)}
                onArchiveTask={(task) => archiveTask(task)}
            />
        ))}
    </div>
  );
}