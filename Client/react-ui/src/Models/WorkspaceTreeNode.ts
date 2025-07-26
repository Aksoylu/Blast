export class WorkspaceTreeNode {
    Id: string;
    Name: string;
    IsCollection: boolean;
    IsFolder: boolean;
    Items?: WorkspaceTreeNode[] ;

    constructor(init?: Partial<WorkspaceTreeNode>) {
        Object.assign(this, init);
    }
}