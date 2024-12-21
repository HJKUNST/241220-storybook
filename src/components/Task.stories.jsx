import { fn } from "@storybook/test";

import Task from './Task';

export const ActionsData = {
    onArchiveTask: fn(),
    onPinTask: fn(),
};

export default {
    component: Task,
    title: 'Task',
    tags: ['autodocs'],
    excludeStories: /.*Data$/, //Data로 끝나는 export들은 스토리가 아님//
    /* 스토리북에는 두 가지 기본 구성 단계가 있습니다: 컴포넌트와 그 하위 스토리들입니다. 각 스토리를 컴포넌트의 변형이라고 생각해보세요. 한 컴포넌트는 필요한 만큼 많은 스토리를 가질 수 있습니다. */
    args: {
        ...ActionsData,
    },
};

export const Default = {
    args: {
        task: {
            id: '1',
            title: 'Test Task',
            state: 'TASK_INBOX',
        },
    },
};

export const Pinned = {
    args: {
        task: {
            ...Default.args.task,
            state: 'TASK_PINNED',
        },
    },
};

export const Archived = {
    args: {
        task: {
            ...Default.args.task,
            state: 'TASK_ARCHIVED',
        },
    },
};