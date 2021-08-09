import { Project, ProjectStatus } from './project';
import { TaskStatus } from './task';

describe('project', () => {
    describe('status', () => {
        it('should be To Do if no tasks', () => {
            const project: Project = new Project({ id: 1, name: 'Test Project' });
            expect(project.status).toBe(ProjectStatus.ToDo);
        });
        it('should be To Do if all tasks are To Do', () => {
            const project: Project = new Project({
                id: 1,
                name: 'Test Project',
                tasks: [
                    {
                        name: 'Test Task',
                        status: TaskStatus.ToDo
                    }
                ]
            });
            expect(project.status).toBe(ProjectStatus.ToDo);
        });
        it('should be Done if all tasks are Done', () => {
            const project: Project = new Project({
                id: 1,
                name: 'Test Project',
                tasks: [
                    {
                        name: 'Test Task',
                        status: TaskStatus.Done
                    }
                ]
            });
            expect(project.status).toBe(ProjectStatus.Done);
        });
        it('should be In Progress if some tasks are To Do and some tasks are Done', () => {
            const project: Project = new Project({
                id: 1,
                name: 'Test Project',
                tasks: [
                    {
                        name: 'Test Task',
                        status: TaskStatus.ToDo
                    },
                    {
                        name: 'Test Task',
                        status: TaskStatus.Done
                    }
                ]
            });
            expect(project.status).toBe(ProjectStatus.InProgress);
        });
    });
});
