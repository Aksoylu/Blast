export class WorkspaceService {
    /** @type {WorkspaceService|null} */
    static _instance = null;

    /** @type {FileSystemService|null} */
    #fileSystemService = null;

    constructor() {
        if (WorkspaceService._instance) {
            return WorkspaceService._instance;
        }
        WorkspaceService._instance = this;
    }

    /**
     * @returns {WorkspaceService}
    */
    static getInstance() {
        if (!WorkspaceService._instance) {
            WorkspaceService._instance = new WorkspaceService();
        }
        return WorkspaceService._instance;
    }

    /**
    * @description: Builder
    * @param {FileSystemService} fileSystemService 
    * @returns 
    */
    InjectDependencies(fileSystemService) {
        this.#fileSystemService = fileSystemService;
        return this;
    }

    async GetLocaleWorkspaceList() {
        try {
            const blastPath = await this.#fileSystemService.GetBlastPath();
            const workspacePath = path.join(blastPath, 'workspaces');
            console.log("workspacePath >>", workspacePath);
            const isWorkspacePathExist = await this.#fileSystemService.IsDirectoryExist(workspacePath);
            if (!isWorkspacePathExist.result) {
                await this.#fileSystemService.CreateDirectory(workspacePath);
            }

            const getSubDirectoryListResult = await this.#fileSystemService.GetSubdirectories(workspacePath);
            if (!getSubDirectoryListResult.result) {
                console.log(getSubDirectoryListResult);
            }
            const jsonString = await fs.readFile(sessionFilePath, 'utf-8');
            const jsonData = JSON.parse(jsonString);

            const userSession = new UserSession(jsonData)
            return { success: true, userSession: userSession };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }


}